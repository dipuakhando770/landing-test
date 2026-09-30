import React from 'react';
import { Activity, Clock, ShoppingBag, Eye, CheckCircle2, ShoppingCart, UserCheck } from 'lucide-react';

interface HourlyData {
  hour: string;
  revenue: number;
  orders: number;
  paidOrders: number;
}

interface RecentOrder {
  id: string;
  cus_name: string;
  amount: number;
  package_name: string;
  status: string;
  created_at: string;
}

interface RealtimeAndHourlySectionProps {
  realtimeActiveCount: number;
  hourlyData: HourlyData[];
  recentOrders: RecentOrder[];
}

export const RealtimeAndHourlySection: React.FC<RealtimeAndHourlySectionProps> = ({
  realtimeActiveCount = 4,
  hourlyData = [],
  recentOrders = []
}) => {
  const maxHourlyRev = Math.max(...hourlyData.map((h) => h.revenue), 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-['Hind_Siliguri',sans-serif]">
      {/* Left Column: Today's Hourly Sales Histogram */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>আজকের ঘণ্টায় ঘণ্টায় সেলস হিষ্টোগ্রাম (Hourly Sales Distribution)</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            00:00 → 23:00 পিক আওয়ার্স
          </span>
        </div>

        {/* 24 Hours Mini Bar Grid */}
        <div className="pt-2">
          <div className="h-32 flex items-end gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {hourlyData.map((h) => {
              const heightPct = Math.max(8, (h.revenue / maxHourlyRev) * 100);
              const hasSales = h.paidOrders > 0;

              return (
                <div
                  key={h.hour}
                  className="flex-1 min-w-[20px] flex flex-col items-center gap-1 group relative cursor-pointer"
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-950 border border-slate-800 p-2 rounded-lg text-[10px] text-white whitespace-nowrap shadow-2xl z-20 pointer-events-none">
                    <div className="font-bold text-amber-400">{h.hour} ঘটিকা</div>
                    <div>বিক্রি: ৳{h.revenue}</div>
                    <div>অর্ডার: {h.orders} টি</div>
                  </div>

                  <div className="w-full bg-slate-950 rounded-t-lg overflow-hidden h-full flex items-end">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all ${
                        hasSales ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-slate-800'
                      }`}
                    />
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono rotate-90 sm:rotate-0 mt-1">
                    {h.hour.split(':')[0]}h
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Live Active Online Visitors & Live Activity Timeline */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        {/* Real-time Indicator */}
        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-semibold mb-0.5">এখন অনলাইনে আছেন</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {realtimeActiveCount} জন ভিজিটর
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-300">LIVE</span>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="space-y-2">
          <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>লাইভ অ্যাক্টিভিটি টাইমলাইন</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    {order.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    <div className="truncate">
                      <div className="font-bold text-white truncate">{order.cus_name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">#{order.id.slice(-6)}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-black text-emerald-400 font-mono">৳{order.amount}</div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(order.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xs text-slate-500 py-4">
                অ্যাক্টিভিটি ডাটা প্রক্রিয়াধীন...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
