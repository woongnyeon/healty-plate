/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import { useEditor } from "@tiptap/react";
import { useShallow } from "zustand/react/shallow";

import { useRecipeEditorStore, type RecipeEditorState } from "../store/EditStore";
import { useEditQuery } from "./query/useEditQuery";
import { useSearchIngredient } from "./util/useSearchIngredient";
import { useTitle } from "./Content/useTitle";
import { useIngredient } from "./Ingredient/useIngredient";

export const useEdit = () => {
  // 1. 상태 관리 (zustand/shallow) 가져오기
  const {
    tags,
    ingredients,
    contentHtml,
    totalKcal,
    addTag,
    removeTag,
    setContentHtml,
    addIngredient,
    removeIngredient,
    saveToLocalStorage,
    loadFromLocalStorage,
  } = useRecipeEditorStore(
    useShallow((state: RecipeEditorState) => ({
      tags: state.tags,
      ingredients: state.ingredients,
      contentHtml: state.contentHtml,
      totalKcal: state.totalKcal,
      addTag: state.addTag,
      removeTag: state.removeTag,
      setContentHtml: state.setContentHtml,
      addIngredient: state.addIngredient,
      removeIngredient: state.removeIngredient,
      saveToLocalStorage: state.saveToLocalStorage,
      loadFromLocalStorage: state.loadFromLocalStorage,
    }))
  );

  const isHydratingRef = useRef(false);
  const hasCheckedDraftRef = useRef(false);

  // 2. 임시 저장 로직
  useEffect(() => {
    if (hasCheckedDraftRef.current) return;
    hasCheckedDraftRef.current = true;

    const hasData = localStorage.getItem("recipe-editor-draft");
    if (hasData) {
      if (window.confirm("임시 저장된 글이 있습니다. 불러오시겠습니까?")) {
        const success = loadFromLocalStorage();
        if (success) {
          isHydratingRef.current = true;
        }
      }
    }
  }, []);

  // 3. 에디터 설정
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "레시피를 작성해 주세요…" }),
      Underline,
      Image,
      Youtube.configure({ inline: false }),
    ],
    // 초기 content는 hook 호출 시점의 contentHtml (비어있을 수 있음)
    // 실제 draft 로드 시에는 아래 useEffect에서 처리
    content: contentHtml, 
    editorProps: {
      attributes: {
        class:
          "ProseMirror outline-none focus:outline-none " +
          "prose prose-sm max-w-none leading-7 text-gray-800 " +
          "min-h-[360px]",
      },
    },
    onUpdate: ({ editor }) => {
      // 에디터 -> 스토어 단방향 업데이트
      setContentHtml(editor.getHTML());
    },
  });

  // 콘텐츠 HTML -> 에디터 동기화 (Hydration 시에만 1회성)
  useEffect(() => {
    if (editor && isHydratingRef.current) {
        // 이미 Editor가 있고, Hydration 플래그가 켜져 있다면
        // 스토어의 contentHtml을 에디터에 주입
        editor.commands.setContent(contentHtml);
        // 플래그 끄기 (이후에는 에디터 -> 스토어 단방향)
        isHydratingRef.current = false;
    }
  }, [contentHtml, editor]);

  // 4. 서브 훅 관리

  // 4-1. 제목 관련 로직
  const titleProps = useTitle({
    maxLength: 60,
    allowNewLine: false,
    onEnter: () => editor?.commands.focus(),
  });

  // 4-2. 재료 검색 로직
  const { ingredientQuery } = useEditQuery();
  const { data: allIngredients = [] } = ingredientQuery();
  const searchValues = useSearchIngredient(allIngredients);

  // 4-3. 재료 리스트 UI 로직 (키보드, 수동 추가)
  // 리스트 컴포넌트로 로직 넘기기
  const ingredientListLogic = useIngredient({
    query: searchValues.query,
    isOpen: searchValues.isSearching,
    items: searchValues.results.map((r) => ({
      id: Number(r.id),
      name: r.name,
      baseAmount: r.amount ?? 0,
      baseKcal: r.kcal ?? 0,
    })),
    onSelect: (item) => {
      addIngredient({
        id: Date.now(), // TODO: crypto.randomUUID()로 변경 권장 (숫자 ID 이슈 해결 후)
        name: item.name,
        amount: item.baseAmount ?? 0,
        kcal: item.baseKcal ?? 0,
      });
      searchValues.setQuery("");
    },
    onClose: () => searchValues.setQuery(""),
    onManualAdd: ({ name, amount, kcal }) => {
      addIngredient({
        id: Date.now(), 
        name,
        amount,
        kcal,
      });
    },
  });

  // 5. 페이지 액션
  const handleSaveDraft = () => {
    saveToLocalStorage();
  };

  const handleSubmit = () => {
    console.log("작성 완료 (TODO: API Call)", {
      title: titleProps.title,
      tags,
      ingredients,
      contentHtml,
    });
  };

  const submitDisabled = titleProps.title.trim().length === 0;

  return {
    editor,
    
    // 타이틀 에디터 props 넘기기
    titleProps,

    // 태그 에디터 props 넘기기
    tagProps: {
      tags,
      onAdd: addTag,
      onRemove: removeTag,
    },

    // 재료 에디터 props 넘기기
    ingredientProps: {
      ingredients,
      totalKcal,
      onRemove: removeIngredient,
      searchValues, // 입력창에 여전히 필요
      // 리스트 컴포넌트로 로직 넘기기
      ingredientListProps: ingredientListLogic,
    },

    // 액션
    actions: {
      onSaveDraft: handleSaveDraft,
      onSubmit: handleSubmit,
      submitDisabled,
    },
  };
};
