import React from 'react';
import { Calendar, RefreshCw, GitCompare } from 'lucide-react';

export type PeriodType = 'today' | 'yesterday' | '7d' | '14d' | '30d' | 'this_month' | 'last_month' | 'this_year' | 'custom';

interface DateRangeSelectorProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  startDate?: string;
  endDate?: string;
  onCustomDatesChange?: (start: string, end: string) => void;
  compareMode: boolean;
  onCompareToggle: (enabled: boolean) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  startDate = '',
  endDate = '',
  onCustomDatesChange,
  compareMode,
  onCompareToggle,
  onRefresh,
  isLoading = false
}) => {
  const periods: { id: PeriodType; label: string }[] = [
    { id: 'today', label: 'আজ' },
    { id: 'yesterday', label: 'গতকাল' },
    { id: '7d', label: 'শেষ ৭ দিন' },
    { id: '14d', label: 'শেষ ১৪ দিন' },
    { id: '30d', label: 'শেষ ৩০ দিন' },
    { id: 'this_month', label: 'এই মাস' },
    { id: 'last_month', label: 'গত মাস' },
    { id: 'this_year', label: 'এই বছর' },
    { id: 'custom', label: 'কাস্টম রেঞ্জ' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-['Hind_Siliguri',sans-serif]">
      {/* Date Range Options */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
          <Calendar className="w-4 h-4 text-emerald-400 ml-1.5 shrink-0" />
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => onPeriodChange(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedPeriod === p.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Range Date Pickers & Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {selectedPeriod === 'custom' && (
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onCustomDatesChange?.(e.target.value, endDate)}
              className="bg-transparent text-white border-none focus:outline-none font-medium cursor-pointer"
            />
            <span className="text-slate-500 font-bold">থেকে</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onCustomDatesChange?.(startDate, e.target.value)}
              className="bg-transparent text-white border-none focus:outline-none font-medium cursor-pointer"
            />
          </div>
        )}

        {/* Compare Toggle */}
        <button
          type="button"
          onClick={() => onCompareToggle(!compareMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            compareMode
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
          }`}
          title="পূর্ববর্তী সমমান মেয়াদের সাথে পারফর্মেন্স তুলনা করুন"
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>আগের পিরিয়ডের সাথে তুলনা</span>
        </button>

        {/* Refresh button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-xl border border-slate-700 transition-all cursor-pointer shrink-0"
          title="ডাটা রিফ্রেশ করুন"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>
    </div>
  );
};
