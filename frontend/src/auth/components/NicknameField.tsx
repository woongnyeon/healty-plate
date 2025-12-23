interface NickNameFieldProps {
  value: string;
  onChange: (v: string) => void;

  required?: boolean;

  checking: boolean;
  isAvailable: boolean | null;
  message: string;

  onCheck: () => void;
  error?: string; // 유효성 에러
}

export const NicknameField = ({
  value,
  onChange,
  required = true,
  checking,
  isAvailable,
  message,
  onCheck,
  error,
}: NickNameFieldProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">닉네임</label>
        {required && (
          <span className="text-xs text-orange-500 font-semibold">
            필수 입력
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          placeholder="닉네임을 입력해주세요"
        />

        <button
          type="button"
          onClick={onCheck}
          disabled={checking}
          className="rounded-xl px-4 py-3 text-sm font-semibold border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
        >
          {checking ? "확인 중..." : "중복 확인" }
        </button>

        {isAvailable === true && (
          <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
            ✅ 사용 가능
          </div>
        )}
        {isAvailable === false && (
          <div className="flex items-center gap-2 text-sm text-red-500 font-semibold">
            ❌ 사용 불가
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-400">{message}</p>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
