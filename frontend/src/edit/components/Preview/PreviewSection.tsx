import { useRecipeEditorStore } from "../../store/EditStore";

export const PreviewSection = () => {
  const title = useRecipeEditorStore((s) => s.title);
  const tags = useRecipeEditorStore((s) => s.tags);
  const ingredients = useRecipeEditorStore((s) => s.ingredients);
  const contentHtml = useRecipeEditorStore((s) => s.contentHtml);

  return (
    <aside className="min-w-0">
      <div className="rounded-2xl bg-gray-50 p-5">
        <div className="text-lg font-black">{title || "제목"}</div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white px-3 py-1 text-xs shadow"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm font-bold text-gray-700">재료</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {ingredients.map((i) => (
            <span
              key={i.id}
              className="rounded-full bg-white px-3 py-1 text-xs shadow"
            >
              {i.name} {i.amount}g
            </span>
          ))}
        </div>

        <div
          className="prose prose-sm mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </aside>
  );
};
