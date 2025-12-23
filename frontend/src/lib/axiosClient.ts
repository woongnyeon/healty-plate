import axios, { type AxiosInstance } from "axios";
import { clearTokens, updateAccessToken, getAccessToken } from "./tokenStorage";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

console.log(axiosClient.defaults.baseURL);

const authFreeEndpoints = [
  "/auth/reissue",
  "/auth/token",
  "/auth/register",
  "/users/duplicate",
  "/oauth2",
  "/login",
];

const setupInterceptors = (client: AxiosInstance, skipAuth = false) => {
  client.interceptors.request.use((config) => {
    const isFree = authFreeEndpoints.some((endpoint) =>
      (config.url ?? "").startsWith(endpoint)
    );

    if (!skipAuth && !isFree) {
      const accessToken = getAccessToken();
      if (accessToken) {
        // ✅ 오타 수정: Beare -> Bearer
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !skipAuth
      ) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axiosClient.post("/auth/token");

          const newAccessToken = refreshResponse.data.access_token;
          console.log(refreshResponse.data.access_token);
          updateAccessToken(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          console.error("토큰 갱신 실패", refreshError);
          clearTokens();
          if (typeof window !== "undefined") window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
};

setupInterceptors(axiosClient);

export const apiRequest = {
  default: axiosClient,
};

export default axiosClient;
