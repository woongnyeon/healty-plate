import { useEffect, useState, useMemo, useRef } from "react";
import type { Ingredient } from "../../types/Ingredient";

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
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (!isOpen) return;
        setActiveIndex(0);
    }, [isOpen, query])

    const sliced = useMemo(() => items.slice(0, 8), [items]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [kcal, setKcal] = useState<string>("");
    
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
    
    return {
        activeIndex,
        ingredients,
        wrapperRef,
        setIngredients,
        sliced,
        name,
        amount,
        kcal,
        setName,
        setAmount,
        setKcal,
        handleManualAdd,
    }   
}
