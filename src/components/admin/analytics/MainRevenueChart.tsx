import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, BarChart2 } from 'lucide-react';

interface TimeSeriesPoint {
  date: string;
  revenue: number;
  orders: number;
  paidOrders: number;
  pendingOrders?: number;
  cancelledOrders?: number;
  visitors?: number;
}

interface MainRevenueChartProps {
  data: TimeSeriesPoint[];
}

export const MainRevenueChart: React.FC<MainRevenueChartProps> = ({ data = [] }) => {
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'orders' | 'visitors'>('revenue');
  const [hoveredPoint, setHoveredPoint] = useState<TimeSeriesPoint | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-500 font-['Hind_Siliguri',sans-serif]">
        কোনো চার্ট ডাটা পাওয়া যায়নি।
      </div>
    );
  }

  const maxValue = Math.max(
    ...data.map((d) => (selectedMetric === 'revenue' ? d.revenue : selectedMetric === 'orders' ? d.orders : d.visitors || 0)),
    10
  );

  const chartHeight = 220;
  const chartWidth = 700;

  // Build SVG path points
  const points = data.map((d, index) => {
    const val = selectedMetric === 'revenue' ? d.revenue : selectedMetric === 'orders' ? d.orders : d.visitors || 0;
    const x = (index / Math.max(1, data.length - 1)) * chartWidth;
    const y = chartHeight - (val / maxValue) * (chartHeight - 30);
    return { x, y, val, d };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl font-['Hind_Siliguri',sans-serif] space-y-4">
      {/* Header & Metric Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>রেভিনিউ ও সেলস ট্রেন্ড অ্যানালিটিক্স</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            নির্ধারিত সময়সীমায় বিক্রয় ও অর্ডারের পরিবর্তনশীল রেখচিত্র
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedMetric('revenue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMetric === 'revenue'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>রেভিনিউ (৳)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMetric('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMetric === 'orders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার সংখ্যা</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMetric('visitors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMetric === 'visitors'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ভিজিটর ট্রাফিক</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative pt-2">
        <div className="w-full overflow-x-auto scrollbar-none">
          <svg className="w-full h-60 min-w-[600px] overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={
                    selectedMetric === 'revenue'
                      ? '#10b981'
                      : selectedMetric === 'orders'
                      ? '#2563eb'
                      : '#a855f7'
                  }
                  stopOpacity="0.4"
                />
                <stop
                  offset="100%"
                  stopColor={
                    selectedMetric === 'revenue'
                      ? '#10b981'
                      : selectedMetric === 'orders'
                      ? '#2563eb'
                      : '#a855f7'
                  }
                  stopOpacity="0.0"
                />
              </linearGradient>
            </defs>

            {/* Grid Horizontal Reference Lines */}
            {[0.25, 0.5, 0.75].map((ratio, i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight * ratio}
                x2={chartWidth}
                y2={chartHeight * ratio}
                stroke="#1e293b"
                strokeDasharray="4 4"
              />
            ))}

            {/* Filled Gradient Area */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Main Smooth Line */}
            <path
              d={pathD}
              fill="none"
              stroke={
                selectedMetric === 'revenue'
                  ? '#34d399'
                  : selectedMetric === 'orders'
                  ? '#60a5fa'
                  : '#c084fc'
              }
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((pt, i) => (
              <g key={i} className="cursor-pointer group" onMouseEnter={() => setHoveredPoint(pt.d)}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  className={
                    selectedMetric === 'revenue'
                      ? 'fill-emerald-400 stroke-slate-900 stroke-2'
                      : selectedMetric === 'orders'
                      ? 'fill-blue-400 stroke-slate-900 stroke-2'
                      : 'fill-purple-400 stroke-slate-900 stroke-2'
                  }
                />
              </g>
            ))}
          </svg>
        </div>

        {/* X-Axis Date Labels */}
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-800">
          {data.slice(0, 8).map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </div>

      {/* Hover Tooltip Box */}
      {hoveredPoint && (
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl shadow-2xl flex flex-wrap items-center justify-between gap-4 text-xs animate-fadeIn">
          <div>
            <span className="text-slate-400 font-bold">{hoveredPoint.date}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-black">
              রেভিনিউ: ৳{hoveredPoint.revenue.toLocaleString('bn-BD')}
            </span>
            <span className="text-blue-400 font-bold">
              মোট অর্ডার: {hoveredPoint.orders} টি ({hoveredPoint.paidOrders} টি পরিশোধিত)
            </span>
            <span className="text-amber-400 font-bold">
              গড় অর্ডার মূল্য (AOV): ৳{hoveredPoint.paidOrders > 0 ? Math.round(hoveredPoint.revenue / hoveredPoint.paidOrders) : 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
