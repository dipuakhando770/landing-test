import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const ProductEcosystemSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Product Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            যেসব{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Digital Product
            </span>{' '}
            নিয়ে ব্যবসা শেখানো হবে
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            নিচের প্রতিটি হাই-ডিমান্ড ডিজিটাল প্রোডাক্ট, সফটওয়্যার ও প্রিমিয়াম মেথড আমাদের এই কম্বো প্যাকেজে রেডি পাবেন — যা দিয়ে আজই বিজনেস শুরু করতে পারবেন:
          </p>
        </div>

        {/* 3 Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-stretch">
          {/* Category 1 */}
          <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-6 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
              ক্যাটাগরি #০১
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 mb-1">কি পাবেন এই প্যাকেজে?</h3>
              <p className="text-xs text-slate-500 mb-6">আপনার ডিজিটাল বিজনেসের মূল ফাউন্ডেশন এসেটস:</p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>Graphics & Design Resources</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>Premium Templates (Website + App + Presentation)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>Video & Editing Resource Pack</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>Office & Productivity Tools</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>eBooks, Guides & Learning Materials</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-bold text-blue-600 pt-1">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ★
                  </span>
                  <span>আরও অনেক Premium Digital Asset!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Category 2 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <span className="inline-block bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-extrabold px-3 py-1 rounded-full mb-3">
                ক্যাটাগরি #০২
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 font-sans">
                Premium Subscription Methods
              </h3>
              <p className="text-xs text-slate-500 mb-6">মার্কেটে সবচেয়ে বেশি চাহিদাসম্পন্ন সিক্রেট মেথডসমূহ:</p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>নেটফ্লিক্স মেথড (Netflix Method)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>জিমেইল মেথড (Gmail Bulk Method)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>ইউটিউব প্রিমিয়াম মেথড (YouTube Premium)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>স্পটিফাই মেথড (Spotify Pro)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>এডওবি ক্রিয়েটিভ ক্লাউড মেথড (Adobe CC)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>ক্যানভা প্রো মেথড (Canva Pro Lifetime)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Category 3 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold px-3 py-1 rounded-full mb-3">
                ক্যাটাগরি #০৩
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 font-sans">
                Advanced Digital Assets
              </h3>
              <p className="text-xs text-slate-500 mb-6">দ্রুত স্কেলিং ও হাই-প্রফিটের জন্য এডভান্সড প্রোডাক্টস:</p>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>চ্যাটজিপিটি প্রিমিয়াম মেথড (ChatGPT Plus)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>টুইটার ব্লু / X Premium মেথড</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>প্রিমিয়াম VPN মেথডস (Nord/Express)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>৫০০+ প্রম্পট ও ল্যান্ডিং পেজ টেমপ্লেট</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>হাই টিকিট লার্নিং ই-কমার্স ওয়েবসাইট</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>হাজার হাজার গ্রাফিক্স রিসোর্স ফাইল</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>লাইফটাইম ড্রাইভ অ্যাক্সেস রেডি</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              এই সকল প্রিমিয়াম ডিজিটাল এসেটস পাচ্ছেন মাত্র ৳২৯৯ এর কম্বো কোর্সে!
            </h3>
          </div>
          <a
            href="#order-now"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 shrink-0"
          >
            <span>সব প্রোডাক্ট সহ এনরোল করুন</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
