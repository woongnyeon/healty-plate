interface RegisterFooterProps {
  onBack: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
}

export const RegisterFooter = ({
  onBack,
  onSubmit,
  submitDisabled,
}: RegisterFooterProps) => {
  return (
    <div className="mt-10 flex items-center justify-between border-t pt-8">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
      >
        이전
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled}
        className="px-10 py-4 rounded-xl bg-orange-400 text-white font-bold hover:brightness-95 transition shadow-md disabled:opacity-50"
      >
        가입 완료
      </button>
    </div>
  );
};
