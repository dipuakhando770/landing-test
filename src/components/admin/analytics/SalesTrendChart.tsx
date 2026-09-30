import React from 'react';
import { Layers, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface SalesTrendChartProps {
  data: Array<{
    date: string;
    paidOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
    orders: number;
  }>;
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => Math.max(d.orders, 1)), 5);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl font-['Hind_Siliguri',sans-serif] space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>অর্ডার স্ট্যাটাস ট্রেন্ড (Paid vs Pending vs Cancelled)</span>
        </h3>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>পরিশোধিত ({data.reduce((sum, d) => sum + d.paidOrders, 0)})</span>
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>পেন্ডিং ({data.reduce((sum, d) => sum + d.pendingOrders, 0)})</span>
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <XCircle className="w-3.5 h-3.5" />
            <span>বাতিল ({data.reduce((sum, d) => sum + d.cancelledOrders, 0)})</span>
          </span>
        </div>
      </div>

      {/* Grouped Bar Visualizer */}
      <div className="space-y-3 pt-2">
        {data.slice(-7).map((d, index) => {
          const paidPct = (d.paidOrders / maxVal) * 100;
          const pendingPct = (d.pendingOrders / maxVal) * 100;
          const cancelledPct = (d.cancelledOrders / maxVal) * 100;

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{d.date}</span>
                <span className="text-white font-bold">{d.orders} টি মোট অর্ডার</span>
              </div>

              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
                <div
                  style={{ width: `${paidPct}%` }}
                  className="h-full bg-emerald-500 rounded-l-full transition-all"
                  title={`পরিশোধিত: ${d.paidOrders} টি`}
                />
                <div
                  style={{ width: `${pendingPct}%` }}
                  className="h-full bg-amber-500 transition-all"
                  title={`পেন্ডিং: ${d.pendingOrders} টি`}
                />
                <div
                  style={{ width: `${cancelledPct}%` }}
                  className="h-full bg-rose-500 rounded-r-full transition-all"
                  title={`বাতিল: ${d.cancelledOrders} টি`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
