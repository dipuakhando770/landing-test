import React, { useState, useEffect } from 'react';
import { Flame, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { scrollToElement } from '../utils/navigation';
import { formatPrice, calculateDiscount } from '../utils/formatters';

interface PricingSectionProps {
  product?: Product | null;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  if (!product) return null;

  const displayTitle = product.title;
  const displayPrice = product.price;
  const displayOldPrice = product.oldPrice || (displayPrice > 0 ? (displayPrice > 400 ? Math.round(displayPrice * 1.8) : displayPrice * 3) : 0);
  const discountPercent = calculateDiscount(displayPrice, displayOldPrice);
  const isFree = Boolean(product.isFree);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="pricing" className="py-14 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-1 rounded-full text-xs font-bold mb-3">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>সীমিত সময়ের স্পেশাল অফার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
            {displayTitle}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {isFree ? 'ফ্রি ডাউনলোড' : 'লাইফটাইম অ্যাক্সেস'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            এককালীন পেমেন্টে পাবেন ফুল প্রিমিয়াম ফাইল, ক্লাউড ড্রাইভ অ্যাক্সেস ও ২৪/৭ ভিআইপি সাপোর্ট!
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-slate-50 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-xl relative max-w-2xl mx-auto text-left">
          {/* Top Badge */}
          <div className="text-center mb-6">
            {discountPercent > 0 && !isFree && (
              <span className="bg-rose-600 text-white text-xs font-extrabold px-3.5 py-1 rounded-full inline-block mb-2 shadow-md shadow-rose-600/30">
                {discountPercent}% ডিসকাউন্ট অফার
              </span>
            )}
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
              {displayTitle}
            </h3>
            <p className="text-xs text-slate-500">
              ক্লাউড ড্রাইভ রিসোর্স অ্যাক্সেস + ইনস্ট্যান্ট ইমেইল ডেলিভারি + লাইফটাইম সাপোর্ট
            </p>
          </div>

          {/* Urgency Countdown Box */}
          {!isFree && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 mb-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-amber-950 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                <span>অফারের সময় সীমিত!</span>
                <span className="bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[11px]">
                  আর মাত্র ৫টি স্লট বাকি
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>বাকি সময়:</span>
                </span>
                <div className="flex items-center gap-1 font-mono font-black text-white text-sm">
                  <div className="bg-amber-600 px-2.5 py-1 rounded-lg">
                    <span>{formatNumber(timeLeft.minutes)} মি</span>
                  </div>
                  <span className="text-amber-600 font-bold">:</span>
                  <div className="bg-amber-600 px-2.5 py-1 rounded-lg">
                    <span>{formatNumber(timeLeft.seconds)} সে</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="text-center mb-6">
            {displayOldPrice > displayPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold block mb-0.5 font-mono">
                নিয়মিত মূল্য: ৳{displayOldPrice}
              </span>
            )}
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight font-mono">
                {isFree ? 'FREE' : `৳${displayPrice}`}
              </span>
              <span className="text-xs font-bold text-slate-500">/ এককালীন</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 mt-1 block">
              ✓ আর কোনো লুকানো চার্জ নেই • ইনস্ট্যান্ট ডেলিভারি
            </span>
          </div>

          {/* Features Check Grid */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mb-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] shrink-0">✓</span>
                <span>অরিজিনাল প্রিমিয়াম রিসোর্স ফাইল</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] shrink-0">✓</span>
                <span>লাইফটাইম ক্লাউড অ্যাক্সেস</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] shrink-0">✓</span>
                <span>ইন্সট্যান্ট ইমেইল অটো ডেলিভারি</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] shrink-0">✓</span>
                <span>২৪/৭ ভিআইপি হোয়াটসঅ্যাপ সাপোর্ট</span>
              </li>
            </ul>
          </div>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => scrollToElement('order-now')}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] text-center cursor-pointer"
          >
            <span>এখনই অর্ডার প্লেস করুন ({isFree ? 'ফ্রি' : `৳${displayPrice}`})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
