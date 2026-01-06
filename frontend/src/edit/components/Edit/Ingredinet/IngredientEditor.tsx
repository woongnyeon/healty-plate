import { IngredientCard } from "./IngredientCard";
import { IngredientList } from "./IngredientList";
import type { Ingredient, IngredientUnit } from "../../../types/Ingredient";

interface UseIngredientReturn {
  activeIndex: number;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  sliced: any[];
  name: string;
  amount: string;
  unit: IngredientUnit;
  kcal: string;
  setName: (v: string) => void;
  setAmount: (v: string) => void;
  setUnit: (v: IngredientUnit) => void;
  setKcal: (v: string) => void;
  handleManualAdd: () => void;
  onSelect: (item: any) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

interface IngredientEditorProps {
  ingredients: Ingredient[];
  totalKcal: number;
  settings: {
    showIngredients: boolean;
    showKcal: boolean;
  };
  onRemove: (id: number) => void;

  // 검색 입력 상태
  searchValues: {
    query: string;
    setQuery: (q: string) => void;
    isSearching: boolean;
  };

  // 재료 검색 리스트 props
  ingredientListProps: UseIngredientReturn;

  // 설정 토글 함수
  onToggle: (key: "showIngredients" | "showKcal") => void;
}

export const IngredientEditor = ({
  ingredients,
  totalKcal,
  settings,
  onRemove,
  searchValues,
  ingredientListProps,
  onToggle,
}: IngredientEditorProps) => {
  const { query, setQuery, isSearching } = searchValues;
  const isListOpen = isSearching;

  return (
    <div className="mt-12 w-full max-w-[520px]">
      <IngredientCard
        ingredients={ingredients}
        totalKcal={totalKcal}
        settings={settings}
        onRemove={onRemove}
        onToggle={onToggle}
      />

      <div className="mt-3">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
          <span className="text-gray-400">
            <svg
            className="w-4 h-4 text-tertiary mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2z" />
          </svg>
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={ingredientListProps.handleKeyDown}
            placeholder="재료 검색"
            className="w-full text-sm outline-none"
          />
        </div>

        <IngredientList
          query={query}
          isOpen={isListOpen}
          // 리스트 컴포넌트로 로직 넘기기
          {...ingredientListProps}
        />
      </div>
    </div>
  );
};
