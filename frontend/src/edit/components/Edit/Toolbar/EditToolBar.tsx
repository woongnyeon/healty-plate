import { Editor } from "@tiptap/react";
import { EditToolBtn } from "./EditToolBtn";
import { EditToolIconBtn } from "./EditToolIconBtn";
import { Divider } from "./Divider";
import { useToolbar } from "../../../hooks/Toolbar/useToolbar";

interface EditToolBarProps {
  editor: Editor;
}

export const EditToolBar = ({ editor }: EditToolBarProps) => {
  const { fileInputRef, setIsLinkPopupOpen, toggleLinkPopup, applyLink, handleKeyDown, addImage, handleImageUpload, isLinkPopupOpen, linkUrl, setLinkUrl, popupRef } = useToolbar(editor);

  return (
    <div className="relative flex justify-center">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div
        className="
          flex items-center gap-1
          rounded-2xl border border-gray-100 bg-white
          px-4 py-2
          shadow-sm
          relative
          z-10
        "
      >
        {/* Headings */}
        <EditToolBtn
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </EditToolBtn>
        <EditToolBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </EditToolBtn>
        <EditToolBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </EditToolBtn>

        <Divider />

        {/* Text Styles */}
        <EditToolBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <span className="font-bold font-serif text-lg">B</span>
        </EditToolBtn>

        <EditToolBtn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="underline underline-offset-2 text-lg">U</span>
        </EditToolBtn>

        <EditToolBtn
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <span className="line-through text-lg">T</span>
        </EditToolBtn>

        <EditToolBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="italic font-serif text-lg">I</span>
        </EditToolBtn>

        <Divider />

        {/* Inserts */}
        {/* Link - Relative Container for positioning popup */}
        <div className="relative">
            <EditToolIconBtn onClick={toggleLinkPopup}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isLinkPopupOpen ? "text-gray-900" : ""}
            >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            </EditToolIconBtn>
            
            {/* Link Popup */}
            {isLinkPopupOpen && (
                <div 
                    ref={popupRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-gray-700">URL 입력</span>
                         <button onClick={() => setIsLinkPopupOpen(false)} className="ml-auto text-gray-400 hover:text-gray-600">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                         </button>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            autoFocus
                            type="text" 
                            className="flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-gray-400"
                            placeholder="https://..."
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            onClick={applyLink}
                            className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Image */}
        <EditToolIconBtn onClick={addImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            <path d="M15 9h.01" />
            <path d="M15 6v6" />
            <path d="M18 9h-6" />
          </svg>
        </EditToolIconBtn>

        {/* Quote */}
        <EditToolBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          </svg>
        </EditToolBtn>
      </div>
    </div>
  );
};
