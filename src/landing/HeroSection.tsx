import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, DollarSign, Smartphone, Users, Clock, Gift, Lock } from 'lucide-react';
import { Product } from '../types';
import { scrollToElement } from '../utils/navigation';
import { calculateDiscount } from '../utils/formatters';

interface HeroSectionProps {
  product?: Product | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ product }) => {
  const displayTitle = product?.title || 'ডিজিটাল প্রোডাক্ট বিজনেস ব্লুপ্রিন্ট';
  const displayPrice = product?.price ?? 299;
  const displayOldPrice = product?.oldPrice || (displayPrice > 0 ? (displayPrice > 400 ? Math.round(displayPrice * 1.8) : 74000) : 0);
  const discountPercent = calculateDiscount(displayPrice, displayOldPrice) || 90;
  const isFree = Boolean(product?.isFree);

  return (
    <section className="py-14 sm:py-20 bg-[#ffffff] text-slate-900 border-b border-slate-200/90 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Off-White Pill Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
            <span>ডিজিটাল প্রোডাক্ট বিজনেস ব্লুপ্রিন্ট • ২০২৬</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5 tracking-tight max-w-4xl mx-auto">
          আপনি যখন ঘুমিয়ে থাকবেন, তখনও আপনার ফোনে{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ডিজিটাল প্রোডাক্টের সেলস নোটিফিকেশন
          </span>{' '}
          আসতে থাকবে!
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          কোনো ইনভেন্টরি, ডেলিভারি বা প্যাকিংয়ের ঝামেলা ছাড়াই — জিরো থেকে একটি ফুল অটোমেটেড ডিজিটাল প্রোডাক্ট বিজনেস দাঁড় করানোর ১০০% প্র্যাকটিক্যাল রোডম্যাপ।
        </p>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 text-left max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xl font-black mb-4">
              $
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">২৪/৭ অটোমেটেড ইনকাম</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ওয়েবসাইট ও পেমেন্ট সেটআপের পর সিস্টেম নিজেই কাস্টমার থেকে টাকা রিসিভ করবে ও প্রোডাক্ট পাঠাবে।
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-xl font-black mb-4">
              ⚡
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">জিরো প্রোডাক্ট কস্ট</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              একবার প্রোডাক্ট বানাবেন বা রেডি বান্ডেল ব্যবহার করবেন, আর সারাজীবন আনলিমিটেড বার সেল করবেন।
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center text-xl font-black mb-4">
              💻
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">লোকেশন ফ্রিডম</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              বাসায় বসে, ঘুরতে গিয়ে বা মোবাইল দিয়েই আপনার নিজের লাভজনক বিজনেস সম্পূর্ণ নিয়ন্ত্রণ করুন।
            </p>
          </div>
        </div>

        {/* Off-White Glassmorphic Offer Banner */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 text-left max-w-4xl mx-auto shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">
                রেগুলার মূল্য <del className="text-rose-500 font-bold">৳{displayOldPrice.toLocaleString('bn-BD')}</del>
              </span>
              <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                🔥 {discountPercent}% ইনস্ট্যান্ট ডিসকাউন্ট
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-slate-900">আজকের স্পেশাল অফার:</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
                {isFree ? 'FREE' : `৳${displayPrice}`}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ লাইফটাইম</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-lg">
              <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                সাথে পাবেন <strong>৳১,৭০,০০০ টাকার ২ TB প্রিমিয়াম ডিজিটাল রিসোর্স বান্ডেল</strong> একদম ফ্রি!
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToElement('order-now')}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ লাইফস্টাইল বিজনেস শুরু করুন</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>১০০% ইনস্ট্যান্ট অ্যাক্সেস • সিকিউর চেকআউট</span>
            </span>
          </div>
        </div>

        {/* Off-White Trust Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-full py-3 px-6 max-w-3xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>মোবাইল বা কম্পিউটার দিয়ে করা সম্ভব</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>৪,৪২৭+ সফল শিক্ষার্থী</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>লাইফটাইম সাপোর্ট ও আপডেট</span>
          </div>
        </div>
      </div>
    </section>
  );
};
