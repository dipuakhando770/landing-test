import React from 'react';
import { Smartphone, Monitor, Tablet, Globe, Chrome } from 'lucide-react';

interface DeviceAndGeoAnalyticsProps {
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browserBreakdown: Array<{ name: string; percent: number }>;
  osBreakdown: Array<{ name: string; percent: number }>;
}

export const DeviceAndGeoAnalytics: React.FC<DeviceAndGeoAnalyticsProps> = ({
  deviceBreakdown,
  browserBreakdown = [],
  osBreakdown = []
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Hind_Siliguri',sans-serif]">
      {/* 1. Device Category Breakdown */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Smartphone className="w-5 h-5 text-emerald-400" />
          <span>ডিভাইস ক্যাটাগরি (Device Breakdown)</span>
        </h3>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-xs">মোবাইল ফোন (Mobile)</div>
                <div className="text-[10px] text-slate-500">Android / iOS Smartphone</div>
              </div>
            </div>
            <span className="font-black text-emerald-400 text-sm font-mono">
              {deviceBreakdown.mobile}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-xs">ডেস্কটপ / ল্যাপটপ</div>
                <div className="text-[10px] text-slate-500">Windows / macOS PC</div>
              </div>
            </div>
            <span className="font-black text-blue-400 text-sm font-mono">
              {deviceBreakdown.desktop}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Tablet className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-xs">ট্যাবলেট (Tablet / iPad)</div>
                <div className="text-[10px] text-slate-500">iPadOS / Android Tab</div>
              </div>
            </div>
            <span className="font-black text-purple-300 text-sm font-mono">
              {deviceBreakdown.tablet}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Browsers */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Chrome className="w-5 h-5 text-blue-400" />
          <span>ব্রাউজার ডিস্ট্রিবিউশন (Browsers)</span>
        </h3>

        <div className="space-y-3 pt-1">
          {browserBreakdown.map((b) => (
            <div key={b.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>{b.name}</span>
                <span className="text-blue-400 font-mono font-bold">{b.percent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  style={{ width: `${b.percent}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Operating Systems */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Globe className="w-5 h-5 text-purple-400" />
          <span>অপারেটিং সিস্টেম (OS)</span>
        </h3>

        <div className="space-y-3 pt-1">
          {osBreakdown.map((os) => (
            <div key={os.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>{os.name}</span>
                <span className="text-purple-300 font-mono font-bold">{os.percent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  style={{ width: `${os.percent}%` }}
                  className="h-full bg-purple-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
