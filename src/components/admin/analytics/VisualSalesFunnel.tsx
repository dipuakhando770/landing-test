import React from 'react';
import { Filter, ChevronDown, CheckCircle } from 'lucide-react';

interface FunnelStage {
  stage: string;
  count: number;
  conversion: number;
  dropoff: number;
}

interface VisualSalesFunnelProps {
  stages: FunnelStage[];
}

export const VisualSalesFunnel: React.FC<VisualSalesFunnelProps> = ({ stages = [] }) => {
  if (!stages || stages.length === 0) return null;

  const topCount = stages[0]?.count || 1;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl font-['Hind_Siliguri',sans-serif] space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-400" />
          <span>সামগ্রিক সেলস ফানেল অ্যানালিটিক্স (Sales Conversion Funnel)</span>
        </h3>
        <p className="text-xs text-slate-400">
          ভিজিটর থেকে কনফার্মড পেমেন্ট পর্যন্ত প্রতিটি ধাপের কাস্টমার ড্রপ-অফ রিপোর্ট
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {stages.map((stage, idx) => {
          const widthPct = Math.max(15, (stage.count / topCount) * 100);

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-300 font-bold text-[10px] flex items-center justify-center border border-slate-700">
                    {idx + 1}
                  </span>
                  <span>{stage.stage}</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-white font-extrabold text-sm">{stage.count} জন</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                    {stage.conversion}%
                  </span>
                </div>
              </div>

              {/* Visual Funnel Bar */}
              <div className="w-full bg-slate-950 p-1 rounded-xl border border-slate-800">
                <div
                  style={{ width: `${widthPct}%` }}
                  className="h-7 bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 rounded-lg flex items-center justify-end px-3 text-[11px] font-bold text-white shadow-inner transition-all duration-500"
                >
                  {stage.dropoff > 0 && (
                    <span className="text-rose-200 text-[10px]">
                      ড্রপ-অফ: {stage.dropoff}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
