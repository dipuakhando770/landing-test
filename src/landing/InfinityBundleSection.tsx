import React from 'react';
import { HardDrive, BookOpen, Layout, Code, Video, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { scrollToElement } from '../utils/navigation';

export const InfinityBundleSection: React.FC = () => {
  return (
    <section id="bundle" className="py-16 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span>🔥</span>
            <span>মেগা বোনাস রিসোর্স বান্ডেল</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            বানাতে হবে না কোনো প্রোডাক্ট—সাথে পাচ্ছেন{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ২,০০০ GB (2TB) প্রিমিয়াম ডিজিটাল প্রোডাক্ট!
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদম রেডি রিসোর্স! কোর্সটি নেওয়ার সাথে সাথেই পাবেন ২TB সাইজের বিশাল ড্রাইভ এক্সেস। এখান থেকে যেকোনো ডিজিটাল প্রোডাক্ট ডাউনলোড করে আপনি সরাসরি নিজের নামে সেল শুরু করতে পারবেন।
          </p>
        </div>

        {/* Video Overview of Drive */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl max-w-4xl mx-auto mb-10 text-left">
          <div className="flex items-center justify-between px-3 py-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <HardDrive className="w-4 h-4 text-sky-400" />
              <span className="text-slate-200">2TB_Infinity_Resource_Drive_Overview.mp4</span>
            </div>
            <span className="bg-slate-800 text-sky-400 border border-slate-700 text-[11px] font-bold px-2 py-0.5 rounded">
              ⚡ INSTANT ACCESS
            </span>
          </div>

          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black mt-2">
            <iframe
              src="https://www.youtube.com/embed/je4EEcbJbTM?loading=lazy&rel=0&modestbranding=1"
              title="2000 GB Infinity Digital Product Bundle Overview"
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="bg-slate-800/80 rounded-xl p-3 mt-3 flex items-center gap-3 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span>
              <strong className="text-white">ড্রাইভ লাইভ স্ট্যাটাস:</strong> ২,০০০ জিবি আনলিমিটেড লাইফটাইম অ্যাক্সেস ও নিয়মিত নতুন ড্রাইভ আপডেট
            </span>
          </div>
        </div>

        {/* 4 Category Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10 text-left">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start hover:border-blue-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">প্রিমিয়াম ইবুক ও গাইড বান্ডেল</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                বাংলা ও ইংরেজি ভাষাভিত্তিক হাই-ডিমান্ড ৫০০+ ইবুক যা সরাসরি রিসেলযোগ্য।
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start hover:border-blue-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">সোশ্যাল মিডিয়া গ্রাফিক্স ও ক্যানভা কিট</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                হাজার হাজার রেডি সোশ্যাল মিডিয়া পোস্ট, ব্যানার, রিলস ও ভিডিও টেমপ্লেট।
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start hover:border-blue-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">ওয়েবসাইট থিম ও প্লাগইন কালেকশন</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ওয়ার্ডপ্রেসের সেরা সব প্রিমিয়াম থিম ও এলিমেন্টর প্লাগইনের লাইফটাইম কালেকশন।
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start hover:border-blue-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">ভিডিও এডিটিং ও সফটওয়্যার এসেটস</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ভিডিও প্রিসেট, সাউন্ড ইফেক্ট, মোশন গ্রাফিক্স ও প্রয়োজনীয় সফটওয়্যার বান্ডেল।
              </p>
            </div>
          </div>
        </div>

        {/* Value Banner */}
        <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left text-white shadow-xl">
          <div>
            <span className="bg-white/20 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              মূল্যমান: ৳১,৭০,০০০+
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold">
              আজকে কোর্সে যুক্ত হলে এই ২TB ইনফিনিটি বান্ডেল সম্পূর্ণ ফ্রি!
            </h3>
          </div>
          <button
            type="button"
            onClick={() => scrollToElement('order-now')}
            className="w-full sm:w-auto bg-white text-rose-600 hover:bg-slate-50 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md text-center shrink-0 cursor-pointer"
          >
            ৳২৯৯ এ ২TB বান্ডেল সহ এনরোল করুন
          </button>
        </div>
      </div>
    </section>
  );
};
