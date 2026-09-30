import React from 'react';
import { Home } from 'lucide-react';
import { scrollToElement } from '../utils/navigation';
import { BrandLogo } from '../components/common/BrandLogo';

interface HeaderProps {
  onOpenGatewayInfo?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 font-['Hind_Siliguri',sans-serif]">
      {/* Top Notification Announcement Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
        </span>
        <span>🔥 আজকের স্পেশাল অফার: মাত্র <strong>৳২৯৯</strong> টাকায় লাইফটাইম অ্যাক্সেস + <strong>১০০TB ডিজিটাল বান্ডেল ফ্রি!</strong></span>
        <button
          type="button"
          onClick={() => scrollToElement('order-now')}
          className="underline font-bold text-yellow-300 hover:text-white transition-colors ml-2 hidden sm:inline cursor-pointer"
        >
          এখনই নিন →
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <BrandLogo variant="header" />
        </a>

        {/* Navigation & Order Now CTA */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1 text-xs">
              <Home className="w-3.5 h-3.5" />
              <span>মূল ওয়েবসাইট</span>
            </a>
            <button type="button" onClick={() => scrollToElement('curriculum')} className="hover:text-blue-600 transition-colors text-xs cursor-pointer">
              কারিকুলাম
            </button>
            <button type="button" onClick={() => scrollToElement('proofs')} className="hover:text-blue-600 transition-colors text-xs cursor-pointer">
              লাইভ প্রুফ
            </button>
            <button type="button" onClick={() => scrollToElement('bundle')} className="hover:text-blue-600 transition-colors text-xs cursor-pointer">
              ১০০TB ড্রাইভ
            </button>
            <button type="button" onClick={() => scrollToElement('faq')} className="hover:text-blue-600 transition-colors text-xs cursor-pointer">
              প্রশ্নোত্তর
            </button>
          </nav>

          <button
            type="button"
            onClick={() => scrollToElement('order-now')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>এখনই অর্ডার করুন</span>
            <span className="text-yellow-300">৳২৯৯</span>
          </button>
        </div>
      </div>
    </header>
  );
};
