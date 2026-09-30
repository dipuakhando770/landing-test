import React from 'react';
import { Globe, Sparkles, ArrowDown, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TrafficSourceItem {
  channel: string;
  visits: number;
  percent: number;
}

interface MetaAdsFunnelItem {
  stage: string;
  count: number;
  conversion: number;
  dropoff: number;
}

interface TrafficAndMetaAdsSectionProps {
  trafficSources: TrafficSourceItem[];
  metaAdsFunnel: MetaAdsFunnelItem[];
}

export const TrafficAndMetaAdsSection: React.FC<TrafficAndMetaAdsSectionProps> = ({
  trafficSources = [],
  metaAdsFunnel = []
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-['Hind_Siliguri',sans-serif]">
      {/* 1. Traffic Sources Breakdown */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <span>ট্রাফিক সোর্স ব্রেকডাউন (Traffic Sources)</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            মোট ভিজিটর: {trafficSources.reduce((sum, s) => sum + s.visits, 0)} জন
          </span>
        </div>

        <div className="space-y-3">
          {trafficSources.map((source) => (
            <div key={source.channel} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      source.channel === 'Facebook Ads'
                        ? 'bg-blue-500'
                        : source.channel === 'Facebook Organic'
                        ? 'bg-teal-400'
                        : source.channel.includes('Google')
                        ? 'bg-amber-400'
                        : 'bg-slate-500'
                    }`}
                  />
                  <span>{source.channel}</span>
                </span>
                <span className="font-bold text-white font-mono">
                  {source.visits} জন ({source.percent}%)
                </span>
              </div>

              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  style={{ width: `${Math.min(100, Math.max(5, source.percent))}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    source.channel === 'Facebook Ads'
                      ? 'bg-blue-500'
                      : source.channel === 'Facebook Organic'
                      ? 'bg-teal-400'
                      : source.channel.includes('Google')
                      ? 'bg-amber-400'
                      : 'bg-slate-600'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Facebook Ads Funnel */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>মেটা এডস কনভার্সন ফানেল (Facebook Ads Funnel)</span>
          </h3>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            Real Tracking Data
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {metaAdsFunnel.map((item, index) => (
            <React.Fragment key={index}>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1.5 hover:border-blue-500/40 transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span>{item.stage}</span>
                  <span className="text-emerald-400 font-mono text-sm">{item.count} জন</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-blue-400 font-semibold">
                    কনভার্সন: {item.conversion}%
                  </span>
                  {item.dropoff > 0 && (
                    <span className="text-rose-400 font-medium">
                      ড্রপ-অফ (Drop-off): {item.dropoff}%
                    </span>
                  )}
                </div>

                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, Math.max(8, item.conversion))}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                  />
                </div>
              </div>

              {index < metaAdsFunnel.length - 1 && (
                <div className="flex justify-center -my-1">
                  <ArrowDown className="w-4 h-4 text-slate-600 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
