import { useQuery } from "@tanstack/react-query";
import type { Ingredient } from "../types/Ingredient";
import { useEditApi } from "./useEditApi";

export const useEditQuery = () => {
  const { fetchAllIngredients } = useEditApi();
  const ingredientQuery = () => {
    return useQuery<Ingredient[]>({
      queryKey: ["ingredients", "all"],
      queryFn: fetchAllIngredients,
      staleTime: 1000 * 60 * 10,
    });
  };

  return {
    ingredientQuery,
  };
};
