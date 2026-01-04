import { IngredientCard } from "./IngredientCard";
import { IngredientList } from "./IngredientList";
import type { Ingredient } from "../../../types/Ingredient";

interface UseIngredientReturn {
  activeIndex: number;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  sliced: any[];
  name: string;
  amount: string;
  kcal: string;
  setName: (v: string) => void;
  setAmount: (v: string) => void;
  setKcal: (v: string) => void;
  handleManualAdd: () => void;
  onSelect: (item: any) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

interface IngredientEditorProps {
  ingredients: Ingredient[];
  totalKcal: number;
  onRemove: (id: number) => void;

  // 검색 입력 상태
  searchValues: {
    query: string;
    setQuery: (q: string) => void;
    isSearching: boolean;
  };

  // 재료 검색 리스트 props
  ingredientListProps: UseIngredientReturn;
}

export const IngredientEditor = ({
  ingredients,
  totalKcal,
  onRemove,
  searchValues,
  ingredientListProps,
}: IngredientEditorProps) => {
  const { query, setQuery, isSearching } = searchValues;
  const isListOpen = isSearching;

  return (
    <div className="mt-12 w-full max-w-[520px]">
      <IngredientCard
        ingredients={ingredients}
        totalKcal={totalKcal}
        onRemove={onRemove}
      />

      <div className="mt-3">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
          <span className="text-gray-400">검색</span>
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
