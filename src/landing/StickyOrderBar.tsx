import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { scrollToElement } from '../utils/navigation';

interface StickyOrderBarProps {
  product?: Product | null;
}

export const StickyOrderBar: React.FC<StickyOrderBarProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const displayPrice = product?.price || 299;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
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
    <div id="sticky-order-bar" className="fixed bottom-0 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl transition-all font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-slate-950 items-center justify-center text-lg shadow-md shrink-0">
            <Flame className="w-5 h-5" />
          </span>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">
              স্পেশাল ছাড়ে আজীবন অ্যাক্সেস মাত্র <span className="text-emerald-400 font-extrabold text-sm sm:text-base">৳{displayPrice}</span> টাকায়!
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              ড্রাইভ রিসোর্স + ইনস্ট্যান্ট ইমেইল অ্যাক্সেস + ভিআইপি সাপোর্ট
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <button
          type="button"
          onClick={() => scrollToElement('order-now')}
          className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer"
        >
          <span>এখনই অর্ডার করুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
