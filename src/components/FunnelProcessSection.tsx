import React from 'react';
import { Package, Globe, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

export const FunnelProcessSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span>🔄</span>
            <span>অটোমেটেড ইনকাম মডেল</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            কীভাবে কাজ করে আমাদের এই{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ডিজিটাল প্রোডাক্ট বিজনেস ফানেল?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদম সোজা হিসাব! এই ৪টি ধাপ ফলো করে আপনি কোনো নিজস্ব প্রোডাক্ট না বানিয়েই সম্পূর্ণ অটোমেটেড উপায়ে ইনকাম শুরু করতে পারবেন:
          </p>
        </div>

        {/* 4 Step Funnel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Step 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                STEP 01
              </span>
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">1. Digital Product</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                আমাদের ২TB ইনফিনিটি ড্রাইভ থেকে হাই-ডিমান্ড রিসেলযোগ্য ডিজিটাল প্রোডাক্ট নির্বাচন করবেন।
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                STEP 02
              </span>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">2. Website / Landing Page</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                জিরো-কোডিংয়ে তৈরি করবেন হাই-কনভার্টিং ল্যান্ডিং পেজ এবং কানেক্ট করবেন অটোমেটেড পেমেন্ট।
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                STEP 03
              </span>
              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">3. Target Marketing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                আমাদের মেটা এডস সিক্রেট স্ট্রেটেজি দিয়ে ফেসবুক ও ইনস্টাগ্রামে সঠিক অডিয়েন্সের কাছে বিজ্ঞাপন চালাবেন।
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-amber-50/60 border-2 border-amber-400 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-extrabold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                FINAL GOAL
              </span>
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">4. Automated Profit 💰</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ২৪/৭ অটোমেটেড সেলস আসবে এবং বিকাশ/নগদে সরাসরি লাভ ঢুকবে—আপনি যখন ঘুমাচ্ছেন তখনও!
              </p>
            </div>
          </div>
        </div>

        {/* Summary Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-slate-700 max-w-3xl mx-auto text-left">
          <span className="text-xl">💡</span>
          <div>
            <strong>এই পুরো ফানেল সিস্টেমটি কীভাবে সেটআপ করবেন?</strong> আমাদের কোর্সের প্রতিটি ভিডিওতে একদম স্ক্রিন শেয়ার করে স্টেপ-বাই-স্টেপ প্র্যাকটিক্যালি শেখানো হয়েছে!
          </div>
        </div>
      </div>
    </section>
  );
};
