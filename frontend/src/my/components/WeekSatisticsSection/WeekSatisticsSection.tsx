import { WeekSatisticsBar } from "./WeekSatisticsBar";

export const WeekSatisticsSection = () => {
  const weekData = [
    { label: "Mon", value: 2 },
    { label: "Tue", value: 4 },
    { label: "Wed", value: 3 },
    { label: "Thu", value: 6 },
    { label: "Fri", value: 5 },
    { label: "Sat", value: 8 },
    { label: "Sun", value: 1 },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500">♡</span>
          <h2 className="text-base font-semibold text-gray-900">
            주간 통계 추이
          </h2>
        </div>
      </div>
      <WeekSatisticsBar title="주간 레시피 작성 현황" data={weekData} />
    </div>
  );
};
