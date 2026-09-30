import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: '১. এই কোর্সটি কি লাইভ হবে নাকি রেকর্ডেড ভিডিও?',
    answer: 'কোর্সের প্রতিটি লেসন একদম পরিষ্কার HD কোয়ালিটিতে আগেই রেকর্ডেড করে সাজানো আছে। এনরোল করার সাথে সাথেই আপনি সব ভিডিও এবং ২TB ড্রাইভের অ্যাক্সেস পেয়ে যাবেন। ফলে আপনার সুবিধাজনক সময়ে যেকোনো স্থান থেকে কোর্সটি দেখে নিতে পারবেন।'
  },
  {
    id: 2,
    question: '২. ২TB গুগল ড্রাইভ রিসোর্সের অ্যাক্সেস কতদিনের জন্য থাকবে?',
    answer: 'আপনি একবার ২৯৯ টাকা দিয়ে এনরোল করলে ২TB ড্রাইভের লাইফটাইম (Lifetime Access) পেয়ে যাবেন। ভবিষ্যতে আমরা ড্রাইভে নতুন কোনো রিসোর্স বা সফটওয়্যার আপডেট করলে তার জন্য কোনো বাড়তি ফি দিতে হবে না।'
  },
  {
    id: 3,
    question: '৩. আমার ল্যাপটপ বা পিসি নেই, আমি কি শুধু মোবাইল দিয়ে কাজ করতে পারব?',
    answer: 'হ্যাঁ, একদম পারবেন! আমাদের কোর্সে মোবাইল দিয়ে ক্যানভা অ্যাপে এড ডিজাইন করা, মোবাইল ফেসবুকে Meta Ads Manager অ্যাপ দিয়ে বিজ্ঞাপন চালানো এবং মোবাইল থেকে কাস্টমারকে ড্রাইভের লিংক ডেলিভারি করার পুরো প্রসেস আলাদাভাবে শেখানো হয়েছে।'
  },
  {
    id: 4,
    question: '৪. পেমেন্ট করার পর কীভাবে কোর্স এবং ড্রাইভ অ্যাক্সেস পাব?',
    answer: 'আমাদের পেমেন্ট সিস্টেম সম্পূর্ণ অটোমেটেড! বিকাশ বা নগদে পেমেন্ট কনফার্ম করার সাথে সাথেই আপনার দেওয়া জিমেইলে অটোমেটিক কোর্স ড্যাশবোর্ড এবং ২TB ড্রাইভের অ্যাক্সেস লিংক পৌঁছে যাবে।'
  },
  {
    id: 5,
    question: '৫. কোর্স চলাকালীন কোনো সমস্যা হলে বা কাজ বুঝতে না পারলে সাপোর্ট পাব কীভাবে?',
    answer: 'আমাদের রয়েছে সিক্রেট প্রাইভেট সাপোর্ট গ্রুপ। কাজ করার সময় কোনো জায়গায় আটকে গেলে গ্রুপে পোস্ট বা মেসেজ করলেই আমাদের সাপোর্ট টিম আপনাকে স্ক্রিন শেয়ার বা চ্যাটের মাধ্যমে প্রবলেম সলভ করে দেবে।'
  },
  {
    id: 6,
    question: '৬. এই ২৯৯ টাকা ছাড়া আর কি ভবিষ্যতে অন্য কোনো হিডেন চার্জ আছে?',
    answer: 'না, কোনো হিডেন চার্জ নেই। ২৯৯ টাকা হচ্ছে এককালীন ফি। এরপর কোর্স দেখা বা ২TB ড্রাইভের ফাইল ব্যবহারের জন্য কোনো মাসিক বা বার্ষিক ফি দিতে হবে না।'
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-slate-50 border-t border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>সাধারণ জিজ্ঞাসা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            আপনার মনে কি কোনো <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">প্রশ্ন আছে?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            কোর্সে এনরোল করার আগে কাস্টমারদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলোর উত্তর নিচে দেওয়া হলো:
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen ? 'bg-white border-blue-600 shadow-md shadow-blue-500/5' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
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
