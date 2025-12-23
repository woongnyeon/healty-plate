import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "./useAuth";

export const useDivdePath = () => {
  const [params] = useSearchParams();
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const isFirstLoginParam = params.get("isFirstLogin");
  console.log(isFirstLoginParam);

  useEffect(() => {
    if (isFirstLoginParam === "false") {
      handleLogin();
      return;
    }
    if (isFirstLoginParam === "true") {
      navigate("/register");
      return;
    }
  }, []);
};
