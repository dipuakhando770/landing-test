import React from 'react';
import { Play, Lock, Globe, Sparkles, Smartphone, Award, Clock } from 'lucide-react';

export const VideoOverview: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header Stack */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span>কোর্স ও সিস্টেম ওভারভিউ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            ৩ মিনিটে দেখুন কীভাবে একটি সিস্টেম আপনার <span className="text-blue-600">অটোমেটেড ইনকাম</span> চালু করবে!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদম প্র্যাকটিক্যালি স্ক্রিন রেকর্ডিংয়ের মাধ্যমে দেখানো হয়েছে কীভাবে জিরো থেকে প্রোডাক্ট সিলেক্ট করা, ওয়েবসাইট বানানো এবং এডস রান করা হয়।
          </p>
        </div>

        {/* Macbook Mockup Frame */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto mb-10 text-left">
          {/* Mockup Top Window Controls */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 rounded-t-xl mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700/80 px-4 py-1 rounded-md text-slate-400 text-xs font-mono">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>nasirdigitalhub.com/combo-pack-blueprint</span>
            </div>
            <div className="w-12"></div>
          </div>

          {/* 16:9 Video Aspect Ratio Frame */}
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/qyrEbcHIohA?loading=lazy&rel=0&modestbranding=1"
              title="Digital Product Business Course Overview"
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Bottom Live Status */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 mt-3 flex items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span>
              <strong className="text-white">সিস্টেম আপডেট:</strong> ২০২৬ ডিজিটাল প্রোডাক্ট বিজনেস সেলস সিস্টেম লাইভ দেখুন
            </span>
          </div>
        </div>

        {/* 3 Takeaway Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
              ⚡
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">কোর্সের মোট ডিউরেশন</h4>
              <p className="text-xs text-slate-500">কম্প্যাক্ট ও পয়েন্ট-টু-পয়েন্ট প্র্যাকটিক্যাল গাইড</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
              🎯
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">কারা শিখতে পারবে?</h4>
              <p className="text-xs text-slate-500">শিক্ষার্থী, ফ্রিল্যান্সার বা চাকরিজীবী যেকোনো বয়সের মানুষ</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
              📱
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">ডিভাইস সাপোর্ট</h4>
              <p className="text-xs text-slate-500">মোবাইল বা ল্যাপটপ যেকোনোটি দিয়ে করা সম্ভব</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
