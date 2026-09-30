import React from 'react';
import { Smartphone, MessageSquare, CreditCard, Send, CheckCircle2 } from 'lucide-react';

export const MobileFlowSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span>📱</span>
            <span>মোবাইল দিয়েই ইনকাম শুরু</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            শুধুমাত্র <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">মোবাইল দিয়েই</span> কি এই বিজনেস সম্ভব?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদম সম্ভব ভাই! আপনার যদি কোনো পিসি বা ল্যাপটপ না থাকে, তবুও আমাদের দেওয়া ২TB রিসোর্স ব্যবহার করে আজই মোবাইল দিয়ে এই অটোমেটেড ইনকাম শুরু করতে পারবেন:
          </p>
        </div>

        {/* 4 Step Mobile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-orange-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">1. মোবাইল দিয়ে বিজ্ঞাপন</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                আমাদের দেওয়া ভিডিও/ছবি এডস ক্যানভা দিয়ে বানিয়ে মোবাইল থেকেই Meta Ads Manager দিয়ে চালু করবেন।
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-cyan-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">2. মেসেজ ও কাস্টমার চ্যাট</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                বিজ্ঞাপন দেখে কাস্টমার পেজে মেসেজ করলে আমাদের রেডিমেড চ্যাট কপি দিয়ে রিপ্লাই করবেন।
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">3. পেমেন্ট কনফার্মেশন</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                কাস্টমার বিকাশ বা নগদে পেমেন্ট করলে অ্যাপ থেকে ট্রানজ্যাকশন আইডি ভেরিফাই করে পেমেন্ট কনফার্ম করবেন।
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-2xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-4">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-2">4. ড্রাইভ লিংক ডেলিভারি</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                আমাদের ড্রাইভ থেকে প্রোডাক্ট লিংক মোবাইল থেকে কপি করে কাস্টমারের ইনবক্সে পাঠিয়ে দেবেন। কাজ শেষ!
              </p>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-7 max-w-4xl mx-auto flex items-center gap-4 text-left text-white shadow-xl">
          <span className="text-2xl shrink-0">💡</span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-amber-300 font-bold">এই ৪টি কাজই মোবাইল থেকে করা সম্ভব!</strong> আমাদের কোর্সে মোবাইল ইউজারদের জন্য কীভাবে ক্যানভা এবং Meta Ads Manager অ্যাপ ব্যবহার করে এই পুরো সিস্টেম সেটআপ করা যায় তার আলাদা গাইডলাইন রয়েছে।
          </p>
        </div>
      </div>
    </section>
  );
};
