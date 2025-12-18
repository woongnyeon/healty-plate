import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface StatisticsGraphProps {
  title: string;
  data: {
    label: string;
    views: number;
    likes: number;
  }[];
}

export const StatisticsGraph = ({ title, data }: StatisticsGraphProps) => {
  return (
    <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        {/* 범례 */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            조회수
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            좋아요
          </div>
        </div>
      </div>

      {/* 그래프 */}
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8A00" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#FF8A00" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis hide />

            <Tooltip
              cursor={{ stroke: "#E5E7EB", strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />

            {/* 조회수 */}
            <Area
              type="monotone"
              dataKey="views"
              stroke="#FF8A00"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              dot={{ r: 4, fill: "#FF8A00" }}
              activeDot={{ r: 5 }}
            />

            {/* 좋아요 */}
            <Line
              type="monotone"
              dataKey="likes"
              stroke="#CBD5E1"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
