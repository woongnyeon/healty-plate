import { useEffect, useState, useMemo, useRef } from "react";

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

export const useIngredient = ({
    query,
    isOpen,
    items,
    onSelect,
    onClose,
    onManualAdd,
}: IngredientListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    

    useEffect(() => {
        if (!isOpen) return;
        setActiveIndex(0);
    }, [isOpen, query])

    const sliced = useMemo(() => items.slice(0, 8), [items]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [kcal, setKcal] = useState<string>("");
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, sliced.length - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault(); 
        if (!sliced.length) return;
        onSelect(sliced[activeIndex]);
        return;
      }
    };

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
    
    return {
        activeIndex,
        wrapperRef,
        sliced,
        name,
        amount,
        kcal,
        setName,
        setAmount,
        setKcal,
        handleManualAdd,
        onSelect,
        handleKeyDown,
    }   
}
