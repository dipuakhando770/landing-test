import React from 'react';
import { ShieldCheck, MessageCircle, Clock, Video, Users, CheckCircle2 } from 'lucide-react';

export const MentorAndSupportSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span>🎧</span>
            <span>লাইফটাইম গাইডলাইন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            আপনি একা নন, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">আমাদের ডেডিকেটেড টিম</span> সবসময় সাথে আছে!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            কোর্স বা ড্রাইভের রিসোর্স নিয়ে যেকোনো সমস্যায় আপনাকে সাহায্য করতে আমাদের প্রাইভেট সাপোর্ট গ্রুপ ও এক্সপার্ট মেন্টরশিপ রেডি রয়েছে:
          </p>
        </div>

        {/* 2 Support Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Mentor Bio Card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-slate-600 bg-slate-200 px-3 py-1 rounded-full inline-block mb-6">
                মেন্টর পরিচিতি
              </span>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                  👨‍💻
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Minhazul Asif</h3>
                  <p className="text-xs sm:text-sm font-bold text-blue-600">ডিজিটাল এন্টারপ্রেনার & মার্কেটিং এক্সপার্ট</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                গত ৫ বছর ধরে ডিজিটাল প্রোডাক্ট বিজনেস এবং অনলাইন এডভার্টাইজিং নিয়ে কাজ করছি। আমার প্র্যাকটিক্যাল অভিজ্ঞতা থেকেই এই কোর্সটি সাজানো হয়েছে, যাতে নতুনরা কোনো অপ্রয়োজনীয় থিওরি ছাড়াই সরাসরি প্রফিটেবল বিজনেস দাঁড় করাতে পারে।
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% প্র্যাকটিক্যাল ও পরীক্ষিত বিজনেস স্ট্র্যাটেজি</span>
            </div>
          </div>

          {/* VIP Support Guarantee Card */}
          <div className="lg:col-span-7 bg-white border-2 border-blue-600 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block mb-4">
                ভিআইপি সাপোর্ট
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                প্রাইভেট টেলিগ্রাম & ফেসবুক সিক্রেট সাপোর্ট গ্রুপ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                কোর্সে এনরোল করার সাথে সাথেই আপনাকে আমাদের স্টুডেন্টদের সিক্রেট সাপোর্ট কমিউনিটিতে যুক্ত করে নেওয়া হবে।
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-slate-900">২৪/৭ সাপোর্ট সুবিধা:</strong> কাজ করতে গিয়ে কোথাও আটকে গেলে মেসেজ দিলেই ইনস্ট্যান্ট হেল্প পাবেন।
                  </div>
                </li>

                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-slate-900">সাপ্তাহিক লাইভ কিউ-এ (Q&A) সেশন:</strong> মেন্টরের সাথে সরাসরি কথা বলে প্রবলেম সলভ করার সুবিধা।
                  </div>
                </li>

                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <strong className="text-slate-900">নিয়মিত নতুন আপডেট:</strong> ড্রাইভে নতুন কোনো মেথড বা প্রোডাক্ট যুক্ত হলে তার ফ্রি আপডেট পাবেন।
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
