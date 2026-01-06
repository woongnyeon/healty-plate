import { useRecipeEditorStore } from "../../store/EditStore";
import { useShallow } from "zustand/react/shallow";

/**
 * 태그 편집 로직을 담당하는 훅
 * Store의 태그 상태와 액션을 캡슐화합니다.
 */
export const useEditTags = () => {
  const { tags, addTag, removeTag } = useRecipeEditorStore(
    useShallow((state) => ({
      tags: state.tags,
      addTag: state.addTag,
      removeTag: state.removeTag,
    }))
  );

  return {
    tags,
    onAdd: addTag,
    onRemove: removeTag,
  };
};
