import React from 'react';
import { Package, Zap, DollarSign, Clock, CheckCircle2, XCircle, ArrowDown } from 'lucide-react';

export const WhyAndSolutionSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Part 1: Why Digital Product */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span>🚀</span>
            <span>স্মার্ট বিজনেস মডেল</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            কেন ২০২৬ সালে{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ডিজিটাল প্রোডাক্ট ব্যবসাই
            </span>{' '}
            সেরা চয়েস?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ফিজিক্যাল ই-কমার্সের ঝামেলা থেকে বের হয়ে আসুন। ডিজিটাল প্রোডাক্ট ব্যবসায় কোনো ডেলিভারি চার্জ বা স্টক রাখার প্রয়োজন নেই:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-xl mb-4">
              📦
            </div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">জিরো ইনভেন্টরি ও স্টক খরচ</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              একবার প্রোডাক্ট কিনলে বা তৈরি করলে তা হাজার হাজার কাস্টমারের কাছে বারবার বিক্রি করা যায়।
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-xl mb-4">
              ⚡
            </div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">১০০% অটোমেটেড ডেলিভারি</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              কুরিয়ার ডেলিভারির জন্য অপেক্ষা করতে হয় না। পেমেন্ট করার সাথে সাথেই কাস্টমার ড্রাইভে ফাইল পেয়ে যায়।
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center text-xl mb-4">
              💰
            </div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">৯০%+ প্রফিট মার্জিন</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              কোনো প্যাকিং চার্জ, পার্সেল রিটার্ন লস বা অতিরিক্ত খরচ নেই। পুরো বিক্রির টাকাটাই প্রায় আপনার নিট লাভ!
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-xl mb-4">
              🌙
            </div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2">২৪/৭ অটোমেটেড ইনকাম</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              আপনি যখন ঘুমাচ্ছেন বা অন্য কাজে ব্যস্ত, তখনও ওয়েবসাইট ও পেমেন্ট সিস্টেমের মাধ্যমে ব্যাকগ্রাউন্ডে বিক্রি হবে।
            </p>
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-12" />

        {/* Part 2: Problem vs Solution */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span>⚠️ ভুল বনাম সঠিক গাইডলাইন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            সাধারণত নতুনরা <span className="text-rose-600">যেসব সমস্যায় পড়ে</span> এবং আমরা যেভাবে{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              সমাধান দিচ্ছি
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            অনেকে ডিজিটাল প্রোডাক্ট বিজনেস শুরু করতে গিয়ে মাঝপথে আটকে যায়। কিন্তু আমাদের কোর্সে পাচ্ছেন প্রতিটি সমস্যার ১০০% প্র্যাকটিক্যাল সলিউশন:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Item 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-rose-600 block mb-1">❌ যে সমস্যায় সবাই পড়ে:</span>
              <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                প্রোডাক্ট কোথা থেকে সোর্স করবেন বা বিক্রি করার মতো কোয়ালিটি ফুল প্রোডাক্ট কোথায় পাবেন তা বুঝতে পারেন না।
              </p>
            </div>
            <div className="text-center text-slate-400 font-bold text-sm">↓</div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-emerald-700 block mb-1">✅ আমাদের সমাধান:</span>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                আমাদের প্যাকেজে পাচ্ছেন <strong>২TB এর বিশাল ইনফিনিটি রিসোর্স ড্রাইভ</strong>, যেখানে রেডিমেড সাবস্ক্রিপশন মেথড, সোর্স কোড ও টেমপ্লেট রয়েছে।
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-rose-600 block mb-1">❌ যে সমস্যায় সবাই পড়ে:</span>
              <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                ওয়েবসাইট বা ল্যান্ডিং পেজ তৈরি করতে ডেভেলপারকে ৫,০০০-১০,০০০ টাকা দিতে হয়, অথবা কোডিং না জানার কারণে আটকে যান।
              </p>
            </div>
            <div className="text-center text-slate-400 font-bold text-sm">↓</div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-emerald-700 block mb-1">✅ আমাদের সমাধান:</span>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                কোনো কোডিং ছাড়াই ১ ঘণ্টায় প্রিমিয়াম ল্যান্ডিং পেজ বানানোর ড্র্যাগ-অ্যান্ড-ড্রপ টিউটোরিয়াল এবং <strong>৫০০+ রেডি ল্যান্ডিং পেজ টেমপ্লেট</strong> দেওয়া হবে।
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-rose-600 block mb-1">❌ যে সমস্যায় সবাই পড়ে:</span>
              <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                মেটা এডে (Facebook Ads) ডলার খরচ হয় কিন্তু কোনো সেলস আসে না, আবার ফেসবুক একাউন্টও ব্যান হয়ে যায়।
              </p>
            </div>
            <div className="text-center text-slate-400 font-bold text-sm">↓</div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-emerald-700 block mb-1">✅ আমাদের সমাধান:</span>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                কম বাজেটে (CPA কম রেখে) লেজার-টার্গেটেড অডিয়েন্স রিসার্চ এবং <strong>অ্যাডের একাউন্ট সেফ রাখার সিক্রেট মেথড</strong> শেখানো হয়েছে।
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-rose-600 block mb-1">❌ যে সমস্যায় সবাই পড়ে:</span>
              <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                কাস্টমার পেমেন্ট করার পর ম্যানুয়ালি ড্রাইভের এক্সেস দিতে গিয়ে দিন-রাত ২৪ ঘণ্টা পিসির সামনে বসে থাকতে হয়।
              </p>
            </div>
            <div className="text-center text-slate-400 font-bold text-sm">↓</div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <span className="text-xs font-extrabold text-emerald-700 block mb-1">✅ আমাদের সমাধান:</span>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                বিকাশ/নগদে পেমেন্ট হওয়ার সাথে সাথেই কাস্টমার কীভাবে <strong>অটোমেটিক জিমেইলে ফাইল ও ড্রাইভ লিংক পেয়ে যাবে</strong>—সেই পুরো সিস্টেম সেটআপ দেখানো হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
