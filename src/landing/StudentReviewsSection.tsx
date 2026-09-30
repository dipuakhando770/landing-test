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
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>শিক্ষার্থী ও গ্রাহকদের ভিডিও রিভিউ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            আমাদের সিস্টেম ও রিসোর্স ব্যবহার করে{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              গ্রাহকরা কীভাবে সফলতা পাচ্ছেন?
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            সরাসরি ভিডিওতে দেখুন বাস্তব অভিজ্ঞতা ও গ্রাহকদের সন্তুষ্টির রিভিউ:
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

        {/* Written Customer Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড অর্ডার</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "পেমেন্ট কনফার্ম করার সাথে সাথেই গুগল ড্রাইভ লিংক পেয়ে গিয়েছি। {title}-এর প্রতিটি ফাইল একদম প্রিমিয়াম।"
            </p>
            <div className="text-[11px] font-bold text-slate-900 pt-1">তানভীর আহমেদ • ঢাকা</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড অর্ডার</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "দাম অনুযায়ী এত রিসোর্স কোথাও পাইনি। সাপোর্ট গ্রুপে ইনস্ট্যান্ট হেল্প পাওয়া যায়। সত্যিই দারুণ!"
            </p>
            <div className="text-[11px] font-bold text-slate-900 pt-1">মেহেদী হাসান • চট্টগ্রাম</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড অর্ডার</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "ইনস্ট্যান্ট ডেলিভারি ও ১০০% অরিজিনাল ফাইল। কোনো ঝামেলা ছাড়াই নিজের ডিভাইসে ডাউনলোড করতে পেরেছি।"
            </p>
            <div className="text-[11px] font-bold text-slate-900 pt-1">আরিফুল ইসলাম • সিলেট</div>
          </div>
        </div>

        {/* Trust Counter Metrics */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto flex items-center justify-around gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600">৪,৫০০+</div>
            <div className="text-[11px] font-semibold text-slate-600">সফল ডেলিভারি</div>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-teal-600">৯৯.২%</div>
            <div className="text-[11px] font-semibold text-slate-600">পজিটিভ রিভিউ</div>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-blue-600">২৪/৭</div>
            <div className="text-[11px] font-semibold text-slate-600">লাইভ সাপোর্ট</div>
          </div>
        </div>
      </div>
    </section>
  );
};
