import React from 'react';
import { Users, UserPlus, RefreshCw, Calculator, DollarSign, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface OrderAndCustomerProps {
  customerAnalytics: {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    repeatPurchaseRate: number;
    ltv: number;
  };
  orderStatusCounts: {
    paid: number;
    pending: number;
    cancelled: number;
    total: number;
  };
}

export const OrderAndCustomerSection: React.FC<OrderAndCustomerProps> = ({
  customerAnalytics,
  orderStatusCounts
}) => {
  const totalOrders = Math.max(orderStatusCounts.total, 1);
  const paidPct = Math.round((orderStatusCounts.paid / totalOrders) * 100);
  const pendingPct = Math.round((orderStatusCounts.pending / totalOrders) * 100);
  const cancelledPct = Math.round((orderStatusCounts.cancelled / totalOrders) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-['Hind_Siliguri',sans-serif]">
      {/* 1. Customer Analytics */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>কাস্টমার অ্যানালিটিক্স (Customer Metrics & LTV)</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            মোট কাস্টমার: {customerAnalytics.totalCustomers} জন
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
              <UserPlus className="w-4 h-4" />
              <span>নতুন কাস্টমার</span>
            </div>
            <div className="text-xl font-black text-white">
              {customerAnalytics.newCustomers} জন
            </div>
            <div className="text-[10px] text-slate-500">প্রথমবার কেনাকাটা করেছে</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-teal-400 font-semibold">
              <RefreshCw className="w-4 h-4" />
              <span>রিটার্নিং কাস্টমার</span>
            </div>
            <div className="text-xl font-black text-teal-300">
              {customerAnalytics.returningCustomers} জন
            </div>
            <div className="text-[10px] text-slate-500">পুনরায় অর্ডার করেছে</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-purple-400 font-semibold">
              <Calculator className="w-4 h-4" />
              <span>রিপিট পারচেস রেট</span>
            </div>
            <div className="text-xl font-black text-purple-300">
              {customerAnalytics.repeatPurchaseRate}%
            </div>
            <div className="text-[10px] text-slate-500">পুনরাবৃত্তি অর্ডারের হার</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>কাস্টমার LTV (গড় মূল্য)</span>
            </div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              ৳{customerAnalytics.ltv.toLocaleString('bn-BD')}
            </div>
            <div className="text-[10px] text-slate-500">Customer Lifetime Value</div>
          </div>
        </div>
      </div>

      {/* 2. Order Status Distribution Donut Representation */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            <span>অর্ডার স্ট্যাটাস ডিস্ট্রিবিউশন (Order Distribution)</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            মোট অর্ডার: {orderStatusCounts.total} টি
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
          {/* Conic Gradient Donut SVG */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <div
              className="w-36 h-36 rounded-full"
              style={{
                background: `conic-gradient(#10b981 0% ${paidPct}%, #f59e0b ${paidPct}% ${paidPct + pendingPct}%, #f43f5e ${paidPct + pendingPct}% 100%)`
              }}
            />
            <div className="absolute inset-4 rounded-full bg-slate-900 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 font-semibold">কনফার্মড</span>
              <span className="text-lg font-black text-emerald-400">{paidPct}%</span>
            </div>
          </div>

          {/* Status Breakdown Legend */}
          <div className="space-y-3 text-xs w-full max-w-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30">
              <span className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>পরিশোধিত (Paid)</span>
              </span>
              <span className="font-extrabold text-white">{orderStatusCounts.paid} টি ({paidPct}%)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-amber-500/30">
              <span className="flex items-center gap-2 font-bold text-amber-400">
                <Clock className="w-4 h-4" />
                <span>অপেক্ষমাণ (Pending)</span>
              </span>
              <span className="font-extrabold text-white">{orderStatusCounts.pending} টি ({pendingPct}%)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-rose-500/30">
              <span className="flex items-center gap-2 font-bold text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>বাতিল (Cancelled)</span>
              </span>
              <span className="font-extrabold text-white">{orderStatusCounts.cancelled} টি ({cancelledPct}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
