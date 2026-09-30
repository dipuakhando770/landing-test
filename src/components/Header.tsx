import React from 'react';
import { Shield, Sparkles, PhoneCall, HelpCircle, CheckCircle, Sliders, Activity } from 'lucide-react';

interface HeaderProps {
  onOpenGatewayInfo?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGatewayInfo, onOpenAdmin }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B1020]/95 backdrop-blur-md border-b border-white/10 text-white">
      {/* Top Notification Announcement */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
        </span>
        <span>🔥 আজকের স্পেশাল অফার: মাত্র <strong>৳২৯৯</strong> টাকায় লাইফটাইম অ্যাক্সেস + <strong>২TB ডিজিটাল বান্ডেল ফ্রি!</strong></span>
        <a href="#order-now" className="underline font-bold text-yellow-300 hover:text-white transition-colors ml-2 hidden sm:inline">
          এখনই নিন →
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            N
          </div>
          <div>
            <div className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-1.5">
              <span>Nasir Digital Hub</span>
              <span className="bg-blue-500/20 text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-400/30">PRO</span>
            </div>
            <p className="text-[11px] text-slate-400">Digital Product Business Academy</p>
          </div>
        </a>

        {/* Navigation / Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#curriculum" className="hover:text-blue-400 transition-colors">কারিকুলাম</a>
            <a href="#proofs" className="hover:text-blue-400 transition-colors">লাইভ প্রুফ</a>
            <a href="#bundle" className="hover:text-blue-400 transition-colors">২TB ড্রাইভ</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">প্রশ্নোত্তর</a>
          </nav>

          {/* Admin Dashboard Trigger */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer"
              title="Open Admin Dashboard & Meta Pixel Settings"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">অ্যাডমিন প্যানেল</span>
            </button>
          )}

          {/* PayBD Integration Status Indicator */}
          {onOpenGatewayInfo && (
            <button
              onClick={onOpenGatewayInfo}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer"
              title="PayBD Payment Gateway Status"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">PayBD:</span>
              <span className="text-emerald-400 font-semibold">Active</span>
            </button>
          )}

          <a
            href="#order-now"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <span>অর্ডার করুন</span>
            <span className="text-yellow-300">৳২৯৯</span>
          </a>
        </div>
      </div>
    </header>
  );
};
