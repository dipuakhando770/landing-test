import React from 'react';
import { Package, Zap, DollarSign, Clock, CheckCircle2, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { Product } from '../types';

interface WhyAndSolutionSectionProps {
  product?: Product | null;
}

export const WhyAndSolutionSection: React.FC<WhyAndSolutionSectionProps> = ({ product }) => {
  const title = product?.title || 'ডিজিটাল প্রোডাক্ট';

  return (
    <section className="py-14 md:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold mb-3">
            <span>🌟 প্রিমিয়াম কোয়ালিটি নিশ্চয়তা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            কেন আমাদের কাছ থেকে{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {title}
            </span>{' '}
            নিবেন?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            আমরা গ্রাহকদের জন্য ১০০% অরিজিনাল, ম্যালওয়্যার-মুক্ত এবং দ্রুততম ডেলিভারির নিশ্চয়তা প্রদান করি:
          </p>
        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-3">
              ⚡
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">ইন্সট্যান্ট অটো ডেলিভারি</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              পেমেন্ট সফল হওয়ার সাথে সাথে স্ক্রিনে ও আপনার ইমেইলে গুগল ড্রাইভ ডাউনলোড লিংক পৌঁছে যাবে।
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-lg mb-3">
              🛡️
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">১০০% নিরাপদ ও সুরক্ষিত</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              আমাদের সকল রিসোর্স এবং ফাইল সম্পূর্ণ ভাইরাস ও বাগ মুক্তভাবে ক্লাউড ড্রাইভে সংরক্ষিত।
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg mb-3">
              ♾️
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">লাইফটাইম ক্লাউড অ্যাক্সেস</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              একবার পারচেসে আজীবন অ্যাক্সেস। যখন ইচ্ছে তখন ক্লাউড থেকে ফাইল ডাউনলোড করে নিতে পারবেন।
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg mb-3">
              💬
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">২৪/৭ ডেডিকেটেড সাপোর্ট</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              ফাইল ইন্সটলেশন বা ব্যবহারের যেকোনো প্রয়োজনে আমাদের হোয়াটসঅ্যাপে সরাসরি হেল্প পাবেন।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
