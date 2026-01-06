import type { RefObject } from "react";
import type { IngredientUnit } from "../../../types/Ingredient";
import { UNIT_LABELS } from "../../../types/Ingredient";

// 재료 검색 결과
interface IngredientSearchItem {
  id: number;
  name: string;
  baseAmount?: number;
  baseKcal?: number;
};

// 재료 검색 리스트 props
interface IngredientListProps {
  query: string;
  isOpen: boolean;
    
  // 상태
  activeIndex: number;
  sliced: IngredientSearchItem[];
  wrapperRef: RefObject<HTMLDivElement | null>;
  name: string;
  amount: string;
  unit: IngredientUnit;
  kcal: string;
  setName: (v: string) => void;
  setAmount: (v: string) => void;
  setUnit: (v: IngredientUnit) => void;
  setKcal: (v: string) => void;
  handleManualAdd: () => void;
  
  // 콜백
  onSelect: (item: IngredientSearchItem) => void;
}

export const IngredientList = ({
  query,
  isOpen,
  activeIndex,
  sliced,
  wrapperRef,
  name,
  amount,
  unit,
  kcal,
  setName,
  setAmount,
  setUnit,
  setKcal,
  handleManualAdd,
  onSelect,
}: IngredientListProps) => {

  if (!isOpen) return null;

  return (
    <div
      ref={wrapperRef}
      className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl ring-1 ring-gray-100"
    >
      <div className="bg-gray-50/50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
        추천 재료
      </div>

      <div className="max-h-[280px] overflow-auto custom-scrollbar">
        {sliced.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-2xl">🤔</span>
            <p className="mt-2 text-sm text-gray-500">
              "<span className="font-semibold text-gray-800">{query}</span>" 검색
              결과가 없어요.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {sliced.map((item: IngredientSearchItem, idx: number) => {
              const active = idx === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className={[
                      "group flex w-full items-center justify-between px-5 py-3.5 text-left transition-all",
                      active ? "bg-emerald-50 text-emerald-900" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <div>
                      <div className="text-base font-bold text-gray-800 group-hover:text-emerald-700">
                        {item.name}
                      </div>
                      {(item.baseAmount || item.baseKcal) && (
                        <div className="mt-0.5 text-xs font-medium text-gray-400 group-hover:text-emerald-600/70">
                          {item.baseAmount != null ? `${item.baseAmount}g` : ""}
                          {item.baseAmount && item.baseKcal ? " · " : ""}
                          {item.baseKcal != null ? `${item.baseKcal}kcal` : ""}
                        </div>
                      )}
                    </div>
                    
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                         <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                             <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                           </svg>
                         </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-100 bg-gray-50/80 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <span>직접 추가하기</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="flex flex-col gap-2">
          {/* 재료명 입력 (전체 너비) */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="재료명 (예: 소고기)"
            className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/20"
          />
          
          {/* 양, 단위, 칼로리, 추가 버튼 */}
          <div className="flex items-center gap-2">
            {/* 양 + 단위 */}
            <div className="flex flex-1 items-center gap-1">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="양"
                className="w-full min-w-0 rounded-lg border-0 bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/20"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as IngredientUnit)}
                className="shrink-0 rounded-lg border-0 bg-white px-2 py-2 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500/20"
              >
                {(Object.keys(UNIT_LABELS) as IngredientUnit[]).map((u) => (
                  <option key={u} value={u}>
                    {UNIT_LABELS[u]}
                  </option>
                ))}
              </select>
            </div>

            {/* 칼로리 */}
            <div className="relative flex-1">
              <input
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
                placeholder="칼로리"
                className="w-full rounded-lg border-0 bg-white pl-3 pr-10 py-2 text-sm shadow-sm ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">kcal</span>
            </div>

            {/* 추가 버튼 */}
            <button
              type="button"
              onClick={handleManualAdd}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
