import React from 'react';
import { Star, CheckCircle2, ShieldCheck, Users, ThumbsUp, MessageSquare, Play } from 'lucide-react';
import { Product } from '../types';

interface StudentReviewsSectionProps {
  product?: Product | null;
}

export const StudentReviewsSection: React.FC<StudentReviewsSectionProps> = ({ product }) => {
  const title = product?.title || 'ডিজিタル প্রোডাক্ট';

  return (
    <section className="py-16 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-2xs">
            <span className="flex text-amber-400">★★★★★</span>
            <span>🔥 ৩,০০০+ গ্রাহক কিনেছেন ও ৪.৯★ রেটিং দিয়েছেন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            বাংলাদেশজুড়ে ৩,০০০+ শিক্ষার্থী ও উদ্যোক্তা অলরেডি{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              কিনেছেন ও সফলভাবে কাজে লাগাচ্ছেন
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            কোনো বানিয়ে বলা কথা নয় — আমাদের সিস্টেম ও ড্রাইভ রিসোর্স নিয়ে গ্রাহকরা কী বলছেন নিজের চোখে দেখুন:
          </p>
        </div>

        {/* Video Reviews Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          {/* Video Review 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                  🎓
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">সাফল্যের গল্প ও রিভিউ — ১</h3>
                  <span className="text-[11px] text-slate-500">ডিজিটাল প্রোডাক্ট এন্টারপ্রেনার</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-700">
                <span>★★★★★</span>
                <span className="font-bold ml-1">✓ ভেরিফাইড</span>
              </div>
            </div>

            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl bg-black shadow-md">
              <iframe
                src="https://www.youtube.com/embed/_G9V-b_LgEM?loading=lazy&rel=0&modestbranding=1"
                title="Customer Review 1"
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-3 flex items-center gap-2 bg-white border border-slate-200/80 p-2.5 rounded-xl text-xs font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>প্র্যাকটিক্যাল গাইডলাইন ফলো করে ডিজিটাল প্রোডাক্ট সেলস কেস স্টাডি</span>
            </div>
          </div>

          {/* Video Review 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg shrink-0">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">সাফল্যের গল্প ও রিভিউ — ২</h3>
                  <span className="text-[11px] text-slate-500">ফ্রিল্যান্সার ও কন্টেন্ট ক্রিয়েটর</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-700">
                <span>★★★★★</span>
                <span className="font-bold ml-1">✓ ভেরিফাইড</span>
              </div>
            </div>

            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl bg-black shadow-md">
              <iframe
                src="https://www.youtube.com/embed/dMnVI7-zV1U?loading=lazy&rel=0&modestbranding=1"
                title="Customer Review 2"
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-3 flex items-center gap-2 bg-white border border-slate-200/80 p-2.5 rounded-xl text-xs font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>কম খরচে অটোমেটেড ডিজিটাল প্রোডাক্ট ডেলিভারি সিস্টেম রিভিউ</span>
            </div>
          </div>
        </div>

        {/* Written Customer Testimonials from 3,000+ Buyers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 text-left">
          {/* Review 1 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">ভেরিফায়েড ক্রেতা</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "বিকাশে পেমেন্ট কনফার্ম করার মাত্র ১ মিনিটের মধ্যে গুগল ড্রাইভ লিঙ্ক ও ইমেইল নোটিফিকেশন পেয়ে গিয়েছি। প্রতিটি ফাইল একদম প্রিমিয়াম ও গোছানো। ৩,০০০+ মানুষের আস্থা পাওয়ার যোগ্য সার্ভিস!"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">TA</div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">তানভীর আহমেদ</div>
                <div className="text-[10px] text-slate-500">মিরপুর, ঢাকা • ডিজিটাল মার্কেটার</div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">ভেরিফায়েড ক্রেতা</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "ক্যানভা প্রো ও গ্রাফিক্স ডিজাইন রিসোর্সগুলো আমার এজেন্সির কাজের স্পিড কয়েক গুণ বাড়িয়ে দিয়েছে। এই দামে এত হিউজ কালেকশন পাওয়া সত্যি অবিশ্বাস্য।"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center">MR</div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">মোহাম্মদ রাশেদুল হক</div>
                <div className="text-[10px] text-slate-500">জিইসি মোড়, চট্টগ্রাম • গ্রাফিক্স ডিজাইনার</div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">ভেরিফায়েড ক্রেতা</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "ভিডিও এডিটিং মোশন গ্রাফিক্স ও সাউন্ড এফেক্টস প্যাকগুলো আমার ইউটিউব চ্যানেল ও ক্লায়েন্টের কাজে প্রতিদিন লাগছে। ১০০% অরিজিনাল ফাইল ও লাইফটাইম সাপোর্ট।"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">AI</div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">আরিফুল ইসলাম</div>
                <div className="text-[10px] text-slate-500">জিন্দাবাজার, সিলেট • ভিডিও এডিটর</div>
              </div>
            </div>
          </div>

          {/* Review 4 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">ভেরিফায়েড ক্রেতা</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "আমি প্রথমে ভেবেছিলাম হয়ত ড্রাইভ ডাউনলোড লিমিট থাকবে, কিন্তু গুগল ড্রাইভ ফুল হাই-স্পিড লাইফটাইম অ্যাক্সেস। সাপোর্ট টিমও হোয়াটসঅ্যাপে খুব হেল্পফুল।"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">SK</div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">সাজ্জাদুল করিম</div>
                <div className="text-[10px] text-slate-500">বোয়ালিয়া, রাজশাহী • ফ্রিল্যান্সার</div>
              </div>
            </div>
          </div>

          {/* Review 5 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">ভেরিফায়েড ক্রেতা</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "মোবাইলে ক্যানভা এবং ক্যাপকাট দুটোই ব্যবহার করছি। আমার ফেসবুক পেজের কনটেন্ট তৈরি এখন মুহূর্তের ব্যাপার। ৩,০০০+ স্টুডেন্টদের রিভিউ দেখেই নিয়েছিলাম, একদম পারফেক্ট!"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center">FA</div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">ফারহানা আক্তার</div>
                <div className="text-[10px] text-slate-500">কান্দিরপাড়, কুমিল্লা • কনটেন্ট ক্রিয়েটর</div>
              </div>
            </div>
          </div>

          {/* Review 6 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2 hover:border-emerald-400 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">ভেরিফায়েড ক্রেতা</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "ওয়ার্ডপ্রেস থিম, প্লাগইনস এবং কোডিং সোর্স কোডগুলো দিয়ে ক্লায়েন্টের ৩টা ওয়েবসাইট ডেলিভারি দিয়েছি। ডিজিটাল প্রোডাক্ট বিজনেসের জন্য নাসির ডিজিটাল হাব সেরা।"
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">NH</div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">নাজমুল হক</div>
                <div className="text-[10px] text-slate-500">শিববাড়ি, খুলনা • ওয়েব ডেভেলপার</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Counter Metrics */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto flex items-center justify-around gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600">৩,০০০+</div>
            <div className="text-[11px] font-semibold text-slate-600">গ্রাহক কিনেছেন</div>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-teal-600">৯৯.৪%</div>
            <div className="text-[11px] font-semibold text-slate-600">পজিটিভ রিভিউ</div>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-blue-600">২৪/৭</div>
            <div className="text-[11px] font-semibold text-slate-600">লাইভ ড্রাইভ এক্সেস</div>
          </div>
        </div>
      </div>
    </section>
  );
};
