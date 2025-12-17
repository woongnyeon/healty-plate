interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center w-full rounded-full border border-bgsecondary px-4 py-3 bg-white">
        <svg
          className="w-4 h-4 text-tertiary mr-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2z" />
        </svg>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="요리명, 재료, 카테고리로 검색"
          className="w-full outline-none text-sm text-primary placeholder:text-tertiary"
        />
      </div>

      <button className="shrink-0 px-5 py-3 rounded-full bg-main text-white text-sm font-medium">
        검색
      </button>
    </div>
  );
};
