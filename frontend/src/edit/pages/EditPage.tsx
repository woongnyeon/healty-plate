import { EditSection } from "../components/Edit/EditSection";
import { PreviewSection } from "../components/Preview/PreviewSection";

export const EditPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-white pt-16">
      <div className="mx-auto flex h-full max-w-full flex-col px-4 md:px-6 lg:px-8">
        <div className="pt-6" />

        {/* 메인 컨텐츠 영역: 높이 100% 고정, 내부 스크롤 없음 (각 섹션이 스크롤 담당) */}
        <div className="flex-1 h-full min-h-0 pb-0 overflow-hidden">
          <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1.4fr]">
            {/* 왼쪽: 에디터 섹션 (독립 스크롤) */}
            <div className="h-full min-h-0 overflow-hidden">
              <EditSection />
            </div>
            
            {/* 오른쪽: 미리보기 섹션 (독립 스크롤) */}
            <div className="hidden h-full min-h-0 overflow-hidden lg:block">
              <PreviewSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
