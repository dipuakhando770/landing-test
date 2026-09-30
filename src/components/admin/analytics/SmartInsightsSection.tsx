import React from 'react';
import { Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';

interface SmartInsightsSectionProps {
  insights: string[];
}

export const SmartInsightsSection: React.FC<SmartInsightsSectionProps> = ({ insights = [] }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 rounded-2xl shadow-xl font-['Hind_Siliguri',sans-serif] space-y-4">
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>স্মার্ট বিজনেস ইনসাইটস (Automated Real Data Intelligence)</span>
        </h3>
        <span className="text-xs text-indigo-300 font-bold bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
          রিয়েল-টাইম ক্যালকুলেটেড ইনসাইটস
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {insights.map((insightText, index) => (
          <div
            key={index}
            className="bg-slate-950/80 border border-indigo-500/20 p-3.5 rounded-xl flex items-start gap-3 hover:border-indigo-500/40 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {insightText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
