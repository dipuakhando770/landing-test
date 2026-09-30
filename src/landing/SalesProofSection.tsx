import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, DollarSign, Calendar, BookOpen } from 'lucide-react';
import { scrollToElement } from '../utils/navigation';

export const SalesProofSection: React.FC = () => {
  return (
    <section id="proofs" className="py-16 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>লাইভ সেলস প্রুফ ড্যাশবোর্ড</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            একটি ইবুক থেকেই ৬ মাসে{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ২৫,০০,০০০+ টাকা
            </span>{' '}
            সেলসের রিয়েল লাইভ প্রুফ!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            কোনো ফেক স্ক্রিনশট নয়—নিচের ভিডিওতে সরাসরি ড্যাশবোর্ড রিফ্রেশ করে পেমেন্ট ফিল্টার ও ইনকাম প্রুফ দেখানো হয়েছে।
          </p>
        </div>

        {/* 3 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-8 text-left">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">মোট জেনারেটেড রেভিনিউ</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 my-2">৳ ২৫,০০,০০০+</div>
            <span className="text-xs text-slate-400">ইনস্ট্যান্ট বিকাশ/ব্যাংক পেআউট</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">সময়সীমা</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 my-2">৬ মাস</div>
            <span className="text-xs text-slate-400">অটোমেটেড সেলস সিস্টেম</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">সোর্স প্রোডাক্ট</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 my-2">১টি মাত্র ইবুক</div>
            <span className="text-xs text-slate-400">জিরো ডেলিভারি বা শিপিং কস্ট</span>
          </div>
        </div>

        {/* Video Frame */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl max-w-4xl mx-auto mb-8 text-left">
          <div className="flex items-center justify-between px-3 py-2 text-slate-400 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="bg-slate-800 text-sky-400 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-bold">
                📊 Dashboard Proof
              </span>
              <span className="text-slate-300 hidden sm:inline">6_Months_25Lakh_Sales_Proof.mp4</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% ভেরিফাইড প্রুফ</span>
            </div>
          </div>

          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black mt-2">
            <iframe
              src="https://www.youtube.com/embed/6bFN3S4OIA4?loading=lazy&rel=0&modestbranding=1"
              title="6 Months 25 Lakh Proof Video"
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Takeaway CTA Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
              💡
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">এই ভিডিও থেকে আপনার মূল শিক্ষা:</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                সঠিক প্রোডাক্ট সিলেক্ট করে একটি পারফেক্ট এডস ক্যাম্পেইন চালালে ডিজিটাল প্রোডাক্ট দিয়ে কত দ্রুত স্কেল করা সম্ভব!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => scrollToElement('order-now')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-center shrink-0 shadow-md shadow-blue-600/20 cursor-pointer"
          >
            এই সিস্টেমটি শিখুন ৳২৯৯ এ
          </button>
        </div>
      </div>
    </section>
  );
};
