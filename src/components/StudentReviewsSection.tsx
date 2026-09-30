import React from 'react';
import { Star, CheckCircle2, ShieldCheck, Users, ThumbsUp, MessageSquare } from 'lucide-react';

export const StudentReviewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span className="text-amber-500 font-black">★</span>
            <span>শিক্ষার্থীদের সাফল্য ও মতামত</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            আমাদের শিক্ষার্থীরা{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              কীভাবে সফলতা পাচ্ছেন?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদম শুন্য থেকে শুরু করে আমাদের অটোমেটেড সিস্টেম ও গাইডলাইন ফলো করে তারা কীভাবে নিজের বিজনেসে সাফল্য পেয়েছেন — তাদের মুখ থেকেই শুনুন:
          </p>
        </div>

        {/* Video Reviews Stack */}
        <div className="space-y-8 mb-12 text-left">
          {/* Review 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm hover:border-blue-300 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
                  🎓
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">স্টুডেন্ট সাফল্য গল্প — ১</h3>
                  <span className="text-xs text-slate-500">ডিজিটাল প্রোডাক্ট এন্টারপ্রেনার</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold">
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <span className="text-emerald-600 font-bold ml-1">✓ ভেরিফাইড স্টুডেন্ট</span>
              </div>
            </div>

            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl bg-black shadow-md">
              <iframe
                src="https://www.youtube.com/embed/_G9V-b_LgEM?loading=lazy&rel=0&modestbranding=1"
                title="Student Success Review 1"
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex items-center gap-2 bg-white border border-slate-200/80 p-3 rounded-xl text-xs sm:text-sm font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>প্র্যাকটিক্যাল রোডম্যাপ ফলো করে তৈরি করা ডিজিটাল প্রোডাক্ট বিজনেস কেস স্টাডি</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm hover:border-blue-300 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl shrink-0">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">স্টুডেন্ট সাফল্য গল্প — ২</h3>
                  <span className="text-xs text-slate-500">ডিজিটাল প্রোডাক্ট এন্টারপ্রেনার</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold">
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <span className="text-emerald-600 font-bold ml-1">✓ ভেরিফাইড স্টুডেন্ট</span>
              </div>
            </div>

            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl bg-black shadow-md">
              <iframe
                src="https://www.youtube.com/embed/dMnVI7-zV1U?loading=lazy&rel=0&modestbranding=1"
                title="Student Success Review 2"
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex items-center gap-2 bg-white border border-slate-200/80 p-3 rounded-xl text-xs sm:text-sm font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>প্র্যাকটিক্যাল রোডম্যাপ ফলো করে তৈরি করা ডিজিটাল প্রোডাক্ট বিজনেস কেস স্টাডি</span>
            </div>
          </div>
        </div>

        {/* Trust Counter Metrics */}
        <div className="bg-slate-50 border border-slate-300/80 rounded-2xl sm:rounded-full p-5 sm:p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 shadow-sm">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">৪,৪২৭+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600">সফল শিক্ষার্থী</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">৯৮%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600">পজিটিভ স্যাটিসফ্যাকশন</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600">২৪/৭</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600">সিক্রেট গ্রুপ সাপোর্ট</div>
          </div>
        </div>
      </div>
    </section>
  );
};
