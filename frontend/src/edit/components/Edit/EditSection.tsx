import { EditToolBar } from "./Toolbar/EditToolBar";
import { TitleEditor } from "./Content/TitleEditor";
import { TagEditor } from "./Tag/TagEditor";
import { IngredientEditor } from "./Ingredinet/IngredientEditor";
import { RecipeEditor } from "./Content/RecipeEditor";
import { EditActionBar } from "./Content/EditActionBar";
import { useContent } from "../../hooks/Content/useContent";

export const EditSection = () => {
  const { editor, title, tags, addTag, removeTag,setTitle,saveDraft, submit } = useContent();

  if (!editor) return null;

  return (
    <section className="min-w-0">
      <div className="sticky top-0 z-20 bg-white pt-2">
        <div className="flex justify-center">
          <EditToolBar editor={editor} />
        </div>
        <div className="mt-4 border-t border-gray-100" />
      </div>

      <TitleEditor
        title={title}
        onChangeTitle={setTitle}
        allowNewLine={false}
        maxLength={60}
        onEnter={() => editor.commands.focus()}
      />

      <TagEditor tags={tags} onAdd={addTag} onRemove={removeTag} />

      <IngredientEditor />

      <div className="mt-10 w-full max-w-[720px]">
        <div className="max-h-[60vh] overflow-y-auto">
          <RecipeEditor editor={editor} />
        </div>
      </div>

      <EditActionBar
        onSaveDraft={saveDraft}
        onSubmit={submit}
        submitDisabled={title.trim().length === 0}
      />
    </section>
  );
};
