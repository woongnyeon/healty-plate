import type { RefObject } from "react";

interface TitleEditorProps {
  title: string;
  ref: RefObject<HTMLTextAreaElement | null>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  currentLength: number;
    
  // 설정용 props
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const TitleEditor = ({
  title,
  ref: inputRef,
  handleChange,
  handleKeyDown,
  currentLength,
  placeholder = "레시피 제목을 입력하세요",
  maxLength = 60,
  showCount = true,
}: TitleEditorProps) => {
  return (
    <div className="mt-16">
      <textarea
        ref={inputRef}
        value={title}
        onChange={handleChange}
        placeholder={placeholder}
        rows={1}
        spellCheck={false}
        onKeyDown={handleKeyDown}
        className="
          w-full resize-none overflow-hidden bg-transparent
          text-[44px] leading-[1.15] font-extrabold tracking-[-0.02em]
          text-gray-900 outline-none
          placeholder:text-gray-200
        "
      />

      {/* 밑줄 */}
      <div className="mt-5 h-[6px] w-[56px] rounded-full bg-gray-200" />

      {/* 글자수 */}
      {showCount && (
        <div className="mt-2 text-xs text-gray-300">
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
};
