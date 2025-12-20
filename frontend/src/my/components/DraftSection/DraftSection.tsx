import { DraftList } from "./DraftList";

export const DraftSection = () => {
  const drafts = [
    { id: "1", title: "차돌박이 된장찌개", updatedAt: "2025-12-17 14:30" },
    { id: "2", title: "웅웅찬 두루치기", updatedAt: "2025-12-17 14:30" },
    { id: "3", title: "김병년 숙주볶음", updatedAt: "2025-12-17 14:30" },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500">♡</span>
          <h2 className="text-base font-semibold text-gray-900">
            임시 저장 레시피
          </h2>
        </div>
      </div>
      <DraftList
        items={drafts}
        onEdit={(id) => console.log("edit", id)}
        onDelete={(id) => console.log("delete", id)}
      />
    </div>
  );
};
