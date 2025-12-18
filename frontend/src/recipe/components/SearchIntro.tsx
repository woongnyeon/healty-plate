interface SearchIntroProps {
  onTagClick: (value: string) => void;
}

export const SearchIntro = ({ onTagClick }: SearchIntroProps) => {
  return (
    <section className="w-full flex flex-col items-center text-center py-12 space-y-6">
      <h2 className="text-lg md:text-xl font-semibold text-primary">
        다양한 레시피를 레시피북에서 검색해보세요!
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        {["#간단요리", "#저자극", "#다이어트", "#영상", "#칼로리폭탄"].map(
          (tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-3 py-1.5 rounded-full bg-main/10 text-main text-xs font-medium hover:bg-main/20 transition-colors"
            >
              {tag}
            </button>
          )
        )}
      </div>
    </section>
  );
};
