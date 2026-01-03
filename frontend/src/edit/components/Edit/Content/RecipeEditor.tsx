import { EditorContent, Editor } from "@tiptap/react";

interface RecipeEditorProps {
  editor: Editor;
}

export const RecipeEditor = ({ editor }: RecipeEditorProps) => {
  return (
    <div className="mt-10 w-full max-w-[720px] bg-white px-6 py-6">
      <EditorContent editor={editor} />
    </div>
  );
};
