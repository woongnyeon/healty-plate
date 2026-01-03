import { useEffect } from "react"
import { useRecipeEditorStore } from "../../store/EditStore"
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Youtube from "@tiptap/extension-youtube"

export const useContent = () => {
    const title = useRecipeEditorStore((s) => s.title);
    const tags = useRecipeEditorStore((s) => s.tags);
    const contentHtml = useRecipeEditorStore((s) => s.contentHtml);

    const setTitle = useRecipeEditorStore((s) => s.setTitle);
    const addTag = useRecipeEditorStore((s) => s.addTag);
    const removeTag = useRecipeEditorStore((s) => s.removeTag);
    const setContentHtml = useRecipeEditorStore((s) => s.setContentHtml);

    const saveToLocalStorage = useRecipeEditorStore((s) => s.saveToLocalStorage);
    const loadFromLocalStorage = useRecipeEditorStore((s) => s.loadFromLocalStorage);
    useEffect(() => {
        const hasData = localStorage.getItem("recipe-editor-draft");
        if (hasData) {
            if (hasData) {
                if (window.confirm("임시 저장된 글이 있습니다. 불러오시겠습니까?")) {
                    loadFromLocalStorage();
                }
            }
        }
    }, [loadFromLocalStorage]);

    

    const editor = useEditor({
        extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: "레시피를 작성해 주세요…" }),
        Underline,
        Image,
        Youtube.configure({ inline: false }),
        ],
        content: contentHtml,
        editorProps: {
        attributes: {
            "data-placeholder": "레시피를 작성해 주세요…",
            class:
            "ProseMirror outline-none focus:outline-none " +
            "prose prose-sm max-w-none leading-7 text-gray-800 " +
            "min-h-[360px]",
        },
        },
        onUpdate: ({ editor }) => {
        setContentHtml(editor.getHTML());
        },
    });

    useEffect(() => {
    if (editor && contentHtml !== editor.getHTML()) {
      editor.commands.setContent(contentHtml);
    }
  }, [contentHtml, editor]);

  const saveDraft = () => {
    saveToLocalStorage();
  };

  const submit = () => {
    console.log("작성 완료");
  }

return {
        title,
        tags,
        contentHtml,
        setTitle,
        addTag,
        removeTag,
        setContentHtml,
        saveToLocalStorage,
        loadFromLocalStorage,
        editor,
        saveDraft,
        submit,
    }
}