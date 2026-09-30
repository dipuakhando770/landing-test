import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, FolderCheck, FileText, CheckCircle2, Download } from 'lucide-react';
import { Product } from '../types';
import { scrollToElement } from '../utils/navigation';
import { useStore } from '../context/StoreContext';

interface ProductEcosystemSectionProps {
  product?: Product | null;
}

export const ProductEcosystemSection: React.FC<ProductEcosystemSectionProps> = ({ product }) => {
  const { getCategoryName } = useStore();

  if (!product) return null;

  const categoryName = getCategoryName(product.categoryId);

  // Parse lines or bullet points from description
  const descriptionBullets = (product.description || '')
    .split('\n')
    .map((l) => l.trim().replace(/^[-•*✓\d+.]\s*/, ''))
    .filter((l) => l.length > 5 && !l.includes('http') && !l.includes('ডেলিভারি প্রক্রিয়া'))
    .slice(0, 8);

  const displayFeatures = descriptionBullets.length >= 3
    ? descriptionBullets
    : [
        '১০০% ফুল প্রিমিয়াম ও অরিজিনাল রিসোর্স ফাইল',
        'লাইফটাইম আনলিমিটেড গুগল ড্রাইভ অ্যাক্সেস',
        'এক ক্লিকেই ইনস্ট্যান্ট ডাউনলোড ও ফুল ইন্সটলেশন গাইড',
        'মোবাইল, ল্যাপটপ এবং কম্পিউটার উভয়ের জন্য উপযোগী',
        'ভবিষ্যতের সকল নতুন আপডেট সম্পূর্ণ ফ্রিতে উপভোগ করুন',
        '২৪/৭ ডেডিকেটেড ভিআইপি কাস্টমার সাপোর্ট'
      ];

  return (
    <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>প্রোডাক্ট ফিচার ও রিসোর্স বিস্তারিত</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            এই প্যাকেজে যা যা পাচ্ছেন ({categoryName})
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {product.shortDescription ||
              'নিচে উল্লেখিত প্রতিটি ফাইল, রিসোর্স ও এক্সেস আপনি পেমেন্ট সম্পন্ন করার সাথে সাথে ইনস্ট্যান্ট পেয়ে যাবেন।'}
          </p>
        </div>

        {/* Dynamic Feature Inclusions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {displayFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 hover:border-emerald-500/50 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex items-start gap-3.5"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                ✓
              </span>
              <div className="space-y-0.5">
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug block">
                  {item}
                </span>
                <span className="text-[11px] text-slate-400 block font-normal">
                  ভেরিফাইড ও ১০০% কার্যকারিতা নিশ্চিত
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specification & Guarantee Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ইন্সট্যান্ট অ্যাক্সেস রেডি</span>
            </div>
            <h3 className="text-base sm:text-xl font-bold">
              {product.title} — মাত্র ৳{product.price} টাকায় এখনই সংগ্রহ করুন
            </h3>
            <p className="text-xs text-slate-300">
              নিরাপদ PayBD পেমেন্ট, ইনস্ট্যান্ট ইমেইল অ্যাক্সেস ও লাইফটাইম সাপোর্ট
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToElement('order-now')}
            className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>এখনই অর্ডার করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
