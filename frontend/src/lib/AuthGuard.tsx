import { useLocation, Navigate } from "react-router-dom";
import { useAuthLogin } from "../auth/hooks/useAutoLogin";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { isChecking, isLoggedIn } = useAuthLogin();

  const protectedRoutes = ["/my", "/edit", "/register"];
  const authRoutes = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // ✅ 체크 중엔 무조건 로딩(여기서 children 렌더 X)
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aurora-blue-gradient-diagonal">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">인증 상태를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // ✅ 보호 라우트인데 로그인 안 됐으면, children 보여주지 말고 즉시 리다이렉트
  if (isProtectedRoute && !isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: pathname }} />;
  }

  // ✅ 로그인 상태인데 로그인/회원가입 접근하면 즉시 리다이렉트
  if (isAuthRoute && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
