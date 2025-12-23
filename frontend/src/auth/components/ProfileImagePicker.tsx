interface ProfileImageProps {
  previewUrl: string | null;
  defaultSrc: string;
  onPick: () => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImagePicker = ({
  previewUrl,
  defaultSrc,
  onPick,
  fileRef,
  onFileChange,
}: ProfileImageProps) => {
  return (
    <div className="flex flex-col items-start">
      <div className="w-[240px] h-[240px] rounded-full overflow-hidden shadow-lg bg-gray-100">
        <img
          src={previewUrl ?? defaultSrc}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-6 w-[240px]">
        <button
          type="button"
          onClick={onPick}
          className="w-full rounded-full border border-gray-200 py-3 text-sm font-medium hover:bg-gray-50 transition"
        >
          📷 사진 변경
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={onFileChange}
        />

        <p className="mt-3 text-xs text-gray-400 text-center">
          JPG, PNG 파일만 가능합니다.
          <br />
          (최대 5MB)
        </p>
      </div>
    </div>
  );
};
