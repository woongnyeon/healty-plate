import { useEffect } from "react";
import { useGetUserInfo } from "../../auth/hooks/useAuthQuery";

export const Profile = () => {
  const user = useGetUserInfo();
  useEffect(() => {
    console.log(user?.data?.email);
  });
  return (
    <section className="w-full flex justify-between items-center px-8 py-10">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src="assets/logo.png"
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border flex items-center justify-center shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </button>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex gap-1">
              <h2 className="text-primary text-card-title font-semibold">
                {user?.data?.nickname}
              </h2>
              <span className="text-profile text-profile-items pt-1">
                (heisfxxkingay)
              </span>
            </div>
            <p className="mt-1 text-profile text-profile-items text-sm">
              {user?.data?.provider}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-10 text-center">
        <div>
          <p className="text-lg font-semibold">1,240</p>
          <p className="text-sm text-gray-500">팔로워</p>
        </div>
        <div>
          <p className="text-lg font-semibold">45</p>
          <p className="text-sm text-gray-500">팔로잉</p>
        </div>
        <div>
          <p className="text-lg font-semibold">156</p>
          <p className="text-sm text-gray-500">레시피</p>
        </div>
      </div>
    </section>
  );
};
