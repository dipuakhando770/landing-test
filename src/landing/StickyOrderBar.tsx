import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { scrollToElement } from '../utils/navigation';

interface StickyOrderBarProps {
  product?: Product | null;
}

export const StickyOrderBar: React.FC<StickyOrderBarProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const displayPrice = product?.price || 299;
  const regularPrice = product?.oldPrice || (displayPrice > 400 ? displayPrice * 5 : 2499);
  const discountPercent = Math.round(((regularPrice - displayPrice) / regularPrice) * 100);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Show sticky bar after minimal scroll
      if (scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if user has scrolled near bottom (within 900px of page bottom)
      if (scrollY + windowHeight >= totalHeight - 900) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleOrderClick = () => {
    scrollToElement('order-now');
  };

  return (
    <aside
      id="sticky-order-bar"
      aria-label="Order CTA Bar"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 font-['Hind_Siliguri',sans-serif] ${
        isNearBottom
          ? 'bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 border-t-2 border-emerald-400 shadow-[0_-12px_40px_rgba(16,185,129,0.45)] ring-2 ring-emerald-500/50'
          : 'bg-[#070b14]/95 backdrop-blur-xl border-t border-emerald-500/30 shadow-[0_-8px_30px_rgba(0,0,0,0.7)]'
      } px-3 sm:px-4 py-2.5 sm:py-3`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Info & Live Counter */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-300 text-amber-300 animate-pulse" />
            </span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-base font-black text-white leading-tight">
                স্পেশাল অফার মাত্র <span className="text-emerald-400 font-black text-base sm:text-lg">৳{displayPrice}</span>
              </span>
              {regularPrice > displayPrice && (
                <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                  ৳{regularPrice}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full bg-rose-600/90 text-white font-black text-[10px] sm:text-[11px] shadow-xs shrink-0">
                {discountPercent}% ছাড়
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-300 truncate">
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>লাইফটাইম অ্যাক্সেস</span>
              </span>
              <span className="hidden md:inline text-slate-500">•</span>
              <span className="hidden md:flex items-center gap-1 text-teal-300">
                <ShieldCheck className="w-3 h-3" />
                <span>ইনস্ট্যান্ট অটো ডেলিভারি</span>
              </span>
              <span className="hidden lg:inline text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                ⚡ স্টক মাত্র ৩টি বাকি!
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Button (Pulsing High-Conversion Button) */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={handleOrderClick}
            className={`relative group overflow-hidden px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-xl font-black text-xs sm:text-base text-white transition-all transform active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-xl ${
              isNearBottom
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 shadow-emerald-500/50 hover:brightness-110 ring-2 ring-white/60 animate-bounce'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/40 hover:scale-105'
            }`}
          >
            {/* Shimmer light sweep */}
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-300 text-amber-300 shrink-0" />
            <span className="tracking-wide">
              {isNearBottom ? '👉 এখনই অর্ডার সম্পন্ন করুন' : 'এখনই অর্ডার করুন'}
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>
    </aside>
  );
};

