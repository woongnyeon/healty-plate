import { useEffect, useMemo, useRef, useState } from "react";

type IngredientSearchItem = {
  id: number;
  name: string;
  baseAmount?: number;
  baseKcal?: number;
};

interface IngredientListProps {
  query: string;
  isOpen: boolean;
  items: IngredientSearchItem[];
  onSelect: (item: IngredientSearchItem) => void;
  onClose?: () => void;

  onManualAdd: (payload: { name: string; amount: number; kcal: number }) => void;
}

export const IngredientList = ({
  query,
  isOpen,
  items,
  onSelect,
  onClose,
  onManualAdd,
}: IngredientListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
  }, [isOpen, query]);

  const sliced = useMemo(() => items.slice(0, 8), [items]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [kcal, setKcal] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, sliced.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter") {
        if (!sliced.length) return;
        onSelect(sliced[activeIndex]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, sliced, activeIndex, onSelect, onClose]);

  const handleManualAdd = () => {
    const parsedAmount = Number(amount);
    const parsedKcal = Number(kcal);

    if (!name.trim()) return;

    onManualAdd({
      name: name.trim(),
      amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
      kcal: Number.isFinite(parsedKcal) ? parsedKcal : 0,
    });

    setName("");
    setAmount("");
    setKcal("");
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={wrapperRef}
      className="mt-3 ronded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="px-4 py-3 text-sm font-extrabold text-gray-200">
        추천 재료
      </div>

      <div className="max-h-[220px] overflow-auto px-2 pb-2">
        {sliced.length === 0 ? (
          <div className="px-3 py-6 text-sm text-gray-400">
            "{query}" 검색 결과가 없어요.
          </div>
        ) : (
          <ul className="space-y-1">
            {sliced.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className={[
                      "w-full rounded-xl px-3 py-3 text-left transition",
                      active ? "bg-gray-50" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <div className="text-lg font-black text-gray-900">
                      {item.name}
                    </div>
                    {(item.baseAmount || item.baseKcal) && (
                      <div className="mt-1 text-base font-semibold text-gray-900">
                        {item.baseAmount != null ? `${item.baseKcal}g` : ""}
                        {item.baseKcal != null ? `${item.baseKcal}Kcal` : ""}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div className="text-sm text-gray-400">찾는 재료가 없다면?</div>

        <div className="mt-2 flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="재료명 (예: 소고기)"
            className="flex-1 rounded-full bg-white px-3 py-2 text-xs outline-none ring-1 ring-gray-200"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="양 (예: 100)"
            className="w-[90px] rounded-full bg-white px-3 py-2 text-xs outline-none ring-1 ring-gray-200"
          />
          <input
            value={kcal}
            onChange={(e) => setKcal(e.target.value)}
            placeholder="Kcal"
            className="w-[80px] rounded-full bg-white px-3 py-2 text-xs outline-none ring-1 ring-gray-200"
          />
          <button
            type="button"
            onClick={handleManualAdd}
            className="rounded-full bg-gray-900 px-5 py-2 text-xs font-semibold text-white"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};
