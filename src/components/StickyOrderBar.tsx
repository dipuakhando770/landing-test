import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame } from 'lucide-react';

export const StickyOrderBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1020]/95 backdrop-blur-md border-t border-slate-700/80 px-4 py-3 shadow-2xl transition-all font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white items-center justify-center text-lg shadow-md shrink-0">
            <Flame className="w-5 h-5" />
          </span>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">
              ৯০% ছাড়ে আজীবন অ্যাক্সেস মাত্র <span className="text-emerald-400 font-extrabold text-sm sm:text-base">৳২৯৯</span> টাকায়!
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              কোর্স + ২TB ইনফিনিটি ড্রাইভ + ভিআইপি সাপোর্ট
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <a
          href="#order-now"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 whitespace-nowrap"
        >
          <span>এখনি অর্ডার করুন</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
