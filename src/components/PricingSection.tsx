import React, { useState, useEffect } from 'react';
import { Flame, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 }; // Reset loop
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>সীমিত সময়ের স্পেশাল অফার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            কোর্স ও ২TB রিসোর্স বান্ডেল{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              একসাথে এনরোল করুন
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            এককালীন পেমেন্টে পাবেন কোর্সের লাইফটাইম অ্যাক্সেস, ২TB ড্রাইভার অ্যাক্সেস এবং ভিআইপি সাপোর্ট গ্রুপে যুক্ত হওয়ার সুবিধা!
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-slate-50 border-2 border-blue-600 rounded-3xl p-6 sm:p-10 shadow-xl relative max-w-3xl mx-auto text-left">
          {/* Top Badge */}
          <div className="text-center mb-6">
            <span className="bg-rose-600 text-white text-xs font-extrabold px-3.5 py-1 rounded-full inline-block mb-3 shadow-md shadow-rose-600/30">
              ৯০% ডিসকাউন্ট অফার
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 font-sans">
              Digital Product Business Combo Pack
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              কোর্স + ২TB ইনফিনিটি রিসোর্স ড্রাইভ + সিক্রেট মার্কেটিং গাইড
            </p>
          </div>

          {/* High Urgency Countdown Box */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 mb-8 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-950 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
              <span>অফারের সময় সীমিত!</span>
              <span className="bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md text-xs">
                আর মাত্র ৭টি স্লট বাকি আছে
              </span>
            </div>

            {/* Live Clock Display */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-amber-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>অফার শেষ হতে বাকি:</span>
              </span>
              <div className="flex items-center gap-1.5 font-mono font-black text-white">
                <div className="bg-amber-600 px-3 py-1.5 rounded-lg flex flex-col items-center leading-none">
                  <span className="text-lg sm:text-xl font-bold">{formatNumber(timeLeft.minutes)}</span>
                  <span className="text-[9px] font-sans font-normal opacity-90">মিনিট</span>
                </div>
                <span className="text-amber-600 text-xl font-bold">:</span>
                <div className="bg-amber-600 px-3 py-1.5 rounded-lg flex flex-col items-center leading-none">
                  <span className="text-lg sm:text-xl font-bold">{formatNumber(timeLeft.seconds)}</span>
                  <span className="text-[9px] font-sans font-normal opacity-90">সেকেন্ড</span>
                </div>
              </div>
            </div>

            {/* Seat Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="w-full bg-amber-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-rose-600 h-2.5 rounded-full w-[88%]"></div>
              </div>
              <p className="text-[11px] font-bold text-amber-800">৮৮% সিট অলরেডি বুকড হয়ে গেছে!</p>
            </div>
          </div>

          {/* Price Tag */}
          <div className="text-center mb-8">
            <span className="text-sm text-slate-400 line-through font-semibold block mb-1">
              নিয়মিত মূল্য: ৳৭৪,০০০
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl sm:text-6xl font-black text-blue-600 tracking-tight">৳২৯৯</span>
              <span className="text-sm font-bold text-slate-500">/ এককালীন</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 mt-2 block">
              ✓ আর কোনো হিডেন চার্জ বা মাসিক ফি নেই!
            </span>
          </div>

          {/* Features Check Grid */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 mb-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-semibold text-slate-700">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span>৮টি কমপ্লিট ভিডিও কোর্স মডিউল</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span>২TB প্রিমিয়াম গুগল ড্রাইভ রিসোর্স অ্যাক্সেস</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span>৫০+ সাবস্ক্রিপশন মেথড ও সফটওয়্যার ফাইল</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span>৫০০+ প্রম্পট ও ল্যান্ডিং পেজ রেডি টেমপ্লেট</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span>অটোমেটেড বিকাশ/নগদ পেমেন্ট ও ডেলিভারি সেটআপ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span>প্রাইভেট সাপোর্ট গ্রুপে লাইফটাইম অ্যাক্সেস</span>
              </li>
            </ul>
          </div>

          {/* Checkout Button */}
          <a
            href="#order-now"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base sm:text-lg py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/45 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 text-center mb-6"
          >
            <span>এখনই ২৯৯ টাকায় এনরোল করুন</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Guarantee Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>১০০% নিরাপদ PayBD পেমেন্ট</span>
              </span>
              <span>⚡ ইনস্ট্যান্ট ড্রাইভ অ্যাক্সেস</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="bg-pink-600 text-white px-2 py-0.5 rounded text-[10px]">বিকাশ</span>
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[10px]">নগদ</span>
              <span className="bg-purple-700 text-white px-2 py-0.5 rounded text-[10px]">রকেট</span>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px]">কার্ড</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
