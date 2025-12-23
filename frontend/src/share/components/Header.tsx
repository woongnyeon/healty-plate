import { Link } from "react-router-dom";
import { useGetUserInfo } from "../../auth/hooks/useAuthQuery";
import { useAuth } from "../../auth/hooks/useAuth";

export const Header = () => {
  const { data: userInfo } = useGetUserInfo();
  const { handleLogout } = useAuth();

  const isActive = !!userInfo;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="h-14 flex items-center justify-between px-4 md:px-10 lg:px-[90px]">
        <img src="/assets/logo.png" alt="logo" className="h-6" />

        <div className="flex items-center gap-4">
          {isActive ? (
            <div className="flex gap-2">
              <Link
                to="/my"
                className="text-sm md:text-base text-primary font-medium"
              >
                마이페이지
              </Link>
              <Link
                to="/"
                className="text-sm md:text-base text-primary font-medium"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm md:text-base text-primary font-medium"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
