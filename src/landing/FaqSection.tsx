import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface FaqSectionProps {
  product?: Product | null;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ product }) => {
  const [openId, setOpenId] = useState<number | null>(1);
  const title = product?.title || 'প্রোডাক্ট';
  const price = product?.price || 299;

  const dynamicFaqs = [
    {
      id: 1,
      question: `১. পেমেন্ট করার পর কীভাবে "${title}" এর অ্যাক্সেস পাব?`,
      answer: `আমাদের ডেলিভারি সিস্টেম সম্পূর্ণ স্বয়ংক্রিয়! PayBD গেটওয়েতে বিকাশ, নগদ বা কার্ডে পেমেন্ট সফল হওয়ার সাথে সাথে আপনার স্ক্রিনে ড্রাইভ লিংক দেখাবে এবং আপনার দেওয়া ইমেইলে লাইফটাইম অ্যাক্সেস লিঙ্ক স্বয়ংক্রিয়ভাবে পাঠিয়ে দেওয়া হবে।`
    },
    {
      id: 2,
      question: `২. এই প্রোডাক্টের জন্য কি ভবিষ্যতে কোনো অতিরিক্ত ফি দিতে হবে?`,
      answer: `না, কোনো লুকানো বা মাসিক চার্জ নেই। একবার ৳${price} টাকায় অর্ডার করলেই আপনি আজীবন (Lifetime) এক্সেস পাবেন এবং সকল ভবিষ্যৎ আপডেট ফ্রিতে পাবেন।`
    },
    {
      id: 3,
      question: `৩. আমার কম্পিউটার বা মোবাইলে কি এটি ব্যবহার করা যাবে?`,
      answer: `হ্যাঁ, আমাদের প্রতিটি ডিজিটাল রিসোর্স এবং গাইড মোবাইল, ল্যাপটপ এবং ডেক্সটপ যেকোনো ডিভাইসে সহজে ব্যবহার ও ডাউনলোডযোগ্য।`
    },
    {
      id: 4,
      question: `৪. ফাইল ডাউনলোড বা ব্যবহারে সমস্যা হলে কী করব?`,
      answer: `আমাদের রয়েছে ২৪/৭ ডেডিকেটেড হোয়াটসঅ্যাপ ও ইমেইল সাপোর্ট। যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করলে সঙ্গে সঙ্গে সমাধান করে দেওয়া হবে।`
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>সাধারণ জিজ্ঞাসা (FAQ)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
            আপনার মনে কি কোনো <span className="text-emerald-600">প্রশ্ন আছে?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            গ্রাহকদের সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তরের তালিকা:
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {dynamicFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white border-emerald-500 shadow-md shadow-emerald-500/5'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
