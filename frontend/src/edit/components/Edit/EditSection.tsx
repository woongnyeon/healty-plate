import { EditToolBar } from "./Toolbar/EditToolBar";
import { TitleEditor } from "./Content/TitleEditor";
import { TagEditor } from "./Tag/TagEditor";
import { IngredientEditor } from "./Ingredinet/IngredientEditor";
import { RecipeEditor } from "./Content/RecipeEditor";
import { EditActionBar } from "./Content/EditActionBar";
import { useEdit } from "../../hooks/useEdit";

export const EditSection = () => {
  const { editor, titleProps, tagProps, ingredientProps, actions } = useEdit();

  if (!editor) return null;

  return (
    <section className="relative flex h-full min-w-0 flex-col overflow-hidden">
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-32">
        <div className="sticky top-0 z-20 bg-white/95 pb-4 pt-2 backdrop-blur-sm">
          <div className="flex justify-center">
            <EditToolBar editor={editor} />
          </div>
          <div className="mt-4 border-t border-gray-100" />
        </div>

        <TitleEditor {...titleProps} />

        <IngredientEditor {...ingredientProps} />

        <div className="mt-20 w-full">
          <RecipeEditor editor={editor} />
        </div>
        <TagEditor {...tagProps} />
      </div>

      {/* 액션 바 고정 */}
      <div className="absolute bottom-0 left-0 z-50 w-full border-t border-gray-100/50 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1000px] justify-end">
          <EditActionBar
            onSaveDraft={actions.onSaveDraft}
            onSubmit={actions.onSubmit}
            submitDisabled={actions.submitDisabled}
          />
        </div>
      </div>
    </section>
  );
};
