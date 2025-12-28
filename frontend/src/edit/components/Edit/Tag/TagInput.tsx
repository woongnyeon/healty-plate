interface TagInputProps {
  onSubmit: (tags: string) => void;
}

export const TagInput = ({ onSubmit }: TagInputProps) => {
  return (
    <input
      type="text"
      placeholder="태그 입력 (Enter)"
      className="min-w-[140px] bg-transparent text-sm outline-none placeholder:text-gray-400"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = e.currentTarget.value.trim();
          if (!value) return;
          onSubmit(value);
          e.currentTarget.value = "";
        }
      }}
    />
  );
};
