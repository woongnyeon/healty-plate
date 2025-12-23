import { MAX_DESC } from "../utills/validators";

interface IntroTextAreaProps {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export const IntroTextarea = ({
  value,
  onChange,
  error,
}: IntroTextAreaProps) => {
  return (
    <div className="mt-8">
      <label className="text-sm font-semibold">한 줄 소개</label>

      <div className="mt-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[140px] rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400 resize-none"
          placeholder="자신을 소개해 주세요"
        />

        <div className="mt-2 flex justify-end text-xs text-gray-400">
          <span
            className={
              value.length > MAX_DESC ? "text-red-500 font-semibold" : ""
            }
          >
            {value.length}
          </span>
          /{MAX_DESC}자
        </div>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};
