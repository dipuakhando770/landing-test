import React from 'react';
import { Activity, CreditCard, RefreshCw, CheckCircle2 } from 'lucide-react';

export const RealtimeProofSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>লাইভ পেমেন্ট ও অ্যাকাউন্ট হিস্ট্রি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            বিশ্বাস না হলে{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              সরাসরি ড্যাশবোর্ড লেভেল ইনকাম প্রুফ
            </span>{' '}
            নিজের চোখে দেখুন!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            প্রতিদিনের সেলস ট্রানজেকশন, বিকাশ/ব্যাংক পেআউট রিপোর্ট এবং রিয়েল-টাইম কাস্টমার পেমেন্ট ডাটা লাইভ দেখুন এই ভিডিওতে:
          </p>
        </div>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 text-left">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">রিয়েল-টাইম ট্র্যাকিং</span>
              <strong className="text-emerald-600 text-sm sm:text-base font-bold">● লাইভ অটো-সিঙ্ক</strong>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">পেমেন্ট গেটওয়ে</span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">ইনস্ট্যান্ট বিকাশ / নগদ / কার্ড</strong>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">পেআউট ফ্রিকোয়েন্সি</span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">২৪/৭ অটোমেটেড ক্যাশআউট</strong>
            </div>
          </div>
        </div>

        {/* Real-time Video Frame */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl max-w-4xl mx-auto mb-8 text-left">
          <div className="flex items-center justify-between px-3 py-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-slate-300 hidden sm:inline">Realtime_Payment_Dashboard_Proof.mp4</span>
            </div>
            <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-md">
              🔴 LIVE RECORDING
            </span>
          </div>

          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black mt-2">
            <iframe
              src="https://www.youtube.com/embed/DvFRxxYw5U4?loading=lazy&rel=0&modestbranding=1"
              title="Real-Time Dashboard Level Earning Proof"
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>কোনো থার্ড-পার্টি কমানোর ফ্রিকশন নেই</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>নিজের একাউন্টে সরাসরি পেমেন্ট জমা</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>১০০% ট্রান্সপারেন্ট বিজনেস মডেল</span>
          </div>
        </div>
      </div>
    </section>
  );
};
