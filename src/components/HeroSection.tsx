import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, DollarSign, Clock, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-white overflow-hidden font-['Hind_Siliguri',sans-serif]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Pulsing Pill Badge */}
        <div className="inline-flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-slate-700 mb-6 transition-all shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span>ডিজিটাল প্রোডাক্ট বিজনেস ব্লুপ্রিন্ট • ২০২৬</span>
          <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">আপডেটেড</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 leading-[1.3] md:leading-[1.3] mb-6 tracking-tight">
          আপনি যখন ঘুমিয়ে থাকবেন, তখনও আপনার ফোনে{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            ডিজিটাল প্রোডাক্টের সেলস নোটিফিকেশন
          </span>{' '}
          আসতে থাকবে!
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          কোনো ইনভেন্টরি, ডেলিভারি বা প্যাকিংয়ের ঝামেলা ছাড়াই — জিরো থেকে একটি ফুল অটোমেটেড ডিজিটাল প্রোডাক্ট বিজনেস দাঁড় করানোর ১০০% প্র্যাকটিক্যাল রোডম্যাপ।
        </p>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 text-left">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">২৪/৭ অটোমেটেড ইনকাম</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              ওয়েবসাইট ও পেমেন্ট সেটআপের পর সিস্টেম নিজেই কাস্টমার থেকে টাকা রিসিভ করবে ও প্রোডাক্ট পাঠাবে।
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">জিরো প্রোডাক্ট কস্ট</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              একবার প্রোডাক্ট বানাবেন বা রেডি বান্ডেল ব্যবহার করবেন, আর সারাজীবন আনলিমিটেড বার সেল করবেন।
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">লোকেশন ফ্রিডম</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              বাসায় বসে, ঘুরতে গিয়ে বা মোবাইল দিয়েই আপনার নিজের লাভজনক বিজনেস সম্পূর্ণ নিয়ন্ত্রণ করুন।
            </p>
          </div>
        </div>

        {/* Glassmorphic Special Offer Banner */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-lg mb-8 relative overflow-hidden">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-slate-500 line-through">রেগুলার মূল্য ৳৭৪,০০০</span>
              <span className="bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold px-2.5 py-0.5 rounded-md">
                🔥 ৯০% ইনস্ট্যান্ট ডিসকাউন্ট
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-lg font-bold text-slate-900">আজকের অফার মূল্য:</span>
              <span className="text-4xl sm:text-5xl font-extrabold text-emerald-600">৳২৯৯</span>
              <span className="text-sm font-semibold text-slate-500">/ লাইফটাইম</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>সাথে পাবেন <strong>৳১,৭০,০০০ টাকার ২ TB প্রিমিয়াম ডিজিটাল রিসোর্স বান্ডেল</strong> একদম ফ্রি!</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end w-full md:w-auto shrink-0 gap-2">
            <a
              href="#order-now"
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 text-center"
            >
              <span>⚡ লাইফস্টাইল বিজনেস শুরু করুন</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% ইনস্ট্যান্ট অ্যাক্সেস • সিকিউর PayBD চেকআউট</span>
            </span>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-slate-50 border border-slate-200/80 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>মোবাইল বা কম্পিউটার দিয়ে করা সম্ভব</span>
          </div>
          <div className="hidden sm:block w-px h-3.5 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>৪,৪২৭+ সফল শিক্ষার্থী</span>
          </div>
          <div className="hidden sm:block w-px h-3.5 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>লাইফটাইম সাপোর্ট ও আপডেট</span>
          </div>
        </div>
      </div>
    </section>
  );
};
