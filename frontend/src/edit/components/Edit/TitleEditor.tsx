import { useLayoutEffect, useRef } from "react";

interface TitleEditorProps {
    title: string;
    onChangeTitle: (value: string) => void;

    placeholder?: string;
    allowNewLine: boolean;
    maxLength?: number;
    showCount?: boolean;
    onEnter?: () => void;
}

export const TitleEditor = ({title,
  onChangeTitle,
  placeholder = "레시피 제목을 입력하세요",
  allowNewLine = true,
  maxLength = 60,
  showCount = true,
  onEnter,} : TitleEditorProps) => {

    const ref = useRef<HTMLTextAreaElement | null>(null);

    const autoResize = () => {
        const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    }

    useLayoutEffect(() => {
        autoResize();
    }, [title]);

    const handleChange = (v: string) => {
    // 길이 제한
    if (maxLength && v.length > maxLength) {
      onChangeTitle(v.slice(0, maxLength));
      return;
    }
    onChangeTitle(v);
  };
    return (
    <div className="mt-16">
      <textarea
        ref={ref}
        value={title}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        spellCheck={false}
        onKeyDown={(e) => {
          if (!allowNewLine && e.key === "Enter") {
            e.preventDefault();
            onEnter?.();
          }
        }}
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
          {title.length} / {maxLength}
        </div>
      )}
    </div>
  );
}
