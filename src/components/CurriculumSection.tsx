import React, { useState } from 'react';
import { ChevronDown, Play, BookOpen, ArrowRight } from 'lucide-react';

interface ModuleData {
  id: string;
  badge: string;
  title: string;
  lessonsCount: number;
  lessons: string[];
}

const curriculumModules: ModuleData[] = [
  {
    id: 'm1',
    badge: 'MODULE 01',
    title: 'ডিজিটাল প্রোডাক্ট বিজনেস মাইন্ডসেট ও ফান্ডামেন্টালস',
    lessonsCount: 5,
    lessons: [
      'ডিজিটাল প্রোডাক্ট বিজনেস কী এবং কেন এটি ২০২৬ সালের সবচেয়ে লাভজনক বিজনেস মডেল?',
      'হাই-প্রফিট ভার্সাস লো-প্রফিট ডিজিটাল প্রোডাক্টের পার্থক্য।',
      'কপিরাইট ও লিগ্যাল ইস্যু ছাড়া সেফলি বিজনেস পরিচালনা করার গাইডলাইন।',
      'জিরো ইনভেস্টমেন্টে শুরু করার মূল স্ট্র্যাটেজি ও রোডম্যাপ।',
      'পেমেন্ট গেটওয়ে এবং অটোমেটেড ফান্ড রিসিভিং সিস্টেম পরিচিতি।'
    ]
  },
  {
    id: 'm2',
    badge: 'MODULE 02',
    title: '২TB ইনফিনিটি রিসোর্স ড্রাইভ মাস্টারক্লাস ও সোর্সিং',
    lessonsCount: 6,
    lessons: [
      '২TB গুগল ড্রাইভ রিসোর্স অ্যাক্সেস এবং ফাইল অর্গানাইজ করার সঠিক উপায়।',
      'প্রিমিয়াম সফটওয়্যার, সোর্স কোড ও টেমপ্লেট ফিল্টারিং সিস্টেম।',
      'সাবস্ক্রিপশন মেথড (Adobe, Netflix, Canva Pro) সেফলি আনলক করার সিক্রেট প্রসেস।',
      'রেডি-মেড ডিজিটাল প্রোডাক্ট রিসেল রাইট (PLR/MRR) ব্যবহারের নিয়ম।',
      'ড্রাইভার যেকোনো ফাইল কাস্টমারদের কাছে ইনস্ট্যান্ট ডেলিভারি করার অটোমেশন।',
      'ট্রেন্ডিং প্রোডাক্ট আইডেন্টিফিকেশন: মার্কেটে এখন কোনটা সবচেয়ে বেশি বিক্রি হচ্ছে?'
    ]
  },
  {
    id: 'm3',
    badge: 'MODULE 03',
    title: 'জিরো-কোডিং হাই-কনভার্টিং ল্যান্ডিং পেজ ডিজাইন',
    lessonsCount: 7,
    lessons: [
      'ডোমেইন ও হোস্টিং সেটআপ এবং ওয়ার্ডপ্রেস ইন্সটলেশন।',
      'Elementor দিয়ে ১ ঘণ্টায় SaaS স্টাইলের প্রিমিয়াম ল্যান্ডিং পেজ তৈরি।',
      'আমাদের ৫০০+ প্রম্পট ও ল্যান্ডিং পেজ টেমপ্লেট ইম্পোর্ট করার সিক্রেট ট্রিক।',
      'হাই-কনভার্টিং কপিরাইটিং ও সেলস ট্রিগার এলিমেন্ট প্লেসমেন্ট।',
      'মোবাইল রেসপন্সিভ অপটিমাইজেশন ও স্পিড আপ ৯৯+ পেজস্পিড ফিক্স।',
      'ফেক ট্রাস্ট ব্যাজ বনাম রিয়েল সোশ্যাল প্রুফ উইজেট ইন্টিগ্রেশন।',
      'কাউন্টডাউন টাইমার, স্টক লিমিট ও আর্জেন্ট ট্র্যাকিং ফিচার যুক্ত করা।'
    ]
  },
  {
    id: 'm4',
    badge: 'MODULE 04',
    title: 'অটোমেটেড পেমেন্ট গেটওয়ে ও ইনস্ট্যান্ট ডেলিভারি সেটআপ',
    lessonsCount: 5,
    lessons: [
      'বিকাশ, নগদ ও রকেট অটোমেটেড পেমেন্ট ইন্টিগ্রেশন।',
      'পেমেন্ট কনফার্ম হওয়ার সাথে সাথে অটোমেটিক ড্রাইভ লিংক বা ফাইল ডেলিভারি সিস্টেম।',
      'অটোমেটিক ইমেইল এবং হোয়াটসঅ্যাপ কনফার্মেশন মেসেজ সেটআপ।',
      'ম্যানুয়াল অর্ডার ভেরিফিকেশন বনাম অটোমেটিক পেমেন্ট গেটওয়ের সুবিধা।',
      'কাস্টমার ডেটাবেস ম্যানেজমেন্ট এবং ফিউচার রিমার্কেটিং লিস্ট বিল্ডিং।'
    ]
  },
  {
    id: 'm5',
    badge: 'MODULE 05',
    title: 'হাই-কনভার্টিং এড ক্রিয়েটিভ ও ক্যানভা প্রফেশনাল ডিজাইন',
    lessonsCount: 5,
    lessons: [
      'ফেসবুক এডের জন্য আই-ক্যাচিং পোস্টার ও ব্যানার ডিজাইনিং (ক্যানভা প্রো)।',
      '১৫ সেকেন্ডের হাই-কনভার্টিং এড ভিডিও মেকিং ট্রিকস।',
      'বাংলা ও ইংরেজি ক্রিয়েটিভ কপিরাইটিং ফ্রেমওয়ার্ক (AIDA & PAS Model)।',
      'কম্পিটিটরদের এডের সিক্রেট এনালাইসিস এবং Ad Library হ্যাকিং।',
      'কম খরচে ১০ গুণ বেশি ক্লিক পাওয়ার হুক (Hook) ও হেডলাইন রাইটিং।'
    ]
  },
  {
    id: 'm6',
    badge: 'MODULE 06',
    title: 'এডভান্সড মেটা (ফেসবুক ও ইনস্টাগ্রাম) এডস মার্কেটিং',
    lessonsCount: 8,
    lessons: [
      'ফেসবুক বিজনেস ম্যানেজার, এড অ্যাকাউন্ট ও পেজ প্রফেশনাল সেটআপ।',
      'মেটা পিক্সেল (Meta Pixel) ও কনভার্সন এপিআই (CAPI) সঠিক নিয়মে ইন্টিগ্রেশন।',
      'লেজার-টার্গেটেড অডিয়েন্স রিসার্চ: ডিজিটাল প্রোডাক্ট কার কাছে বিক্রি করবেন?',
      'সেলস ক্যাম্পেইন তৈরি, বাজেটিং এবং বিডিং স্ট্র্যাটেজি।',
      'Custom Audience এবং Lookalike Audience (LAL) তৈরি করে স্কেলিং।',
      'এড রিজেক্ট বা অ্যাকাউন্ট ব্যান হওয়া থেকে বাঁচার সিক্রেট গাইড।',
      'রি-টার্গেটিং ক্যাম্পেইন দিয়ে পরিত্যক্ত কাস্টমারদের ফিরিয়ে আনা।',
      'কম বাজেটে (CPA কম রেখে) প্রতিদিন ৫০+ অর্ডার বের করার সিক্রেট মেথড।'
    ]
  },
  {
    id: 'm7',
    badge: 'MODULE 07',
    title: 'অর্গানিক মার্কেটিং ও ফ্রি ক্লায়েন্ট হান্টিং মেথড',
    lessonsCount: 4,
    lessons: [
      'ফেসবুক গ্রুপ ও পার্সোনাল ব্র্যান্ডিংয়ের মাধ্যমে অ্যাড ছাড়া অর্গানিক সেলস।',
      'লিঙ্কডইন (LinkedIn) ও পিন্টারেস্ট (Pinterest) থেকে হাই-টিকিট ক্লায়েন্ট হান্টিং।',
      'শর্ট ভিডিও (Reels / Shorts) বানিয়ে অর্গানিক ট্রাফিক জেনারেট করার টেকনিক।',
      'ফ্রি ক্লায়েন্টদের সাথে প্রফেশনাল ডিল ক্লোজিং চ্যাট টিপস।'
    ]
  },
  {
    id: 'm8',
    badge: 'MODULE 08',
    title: 'বিজনেস স্কেলিং, টিম বিল্ডিং ও অটোমেশন',
    lessonsCount: 4,
    lessons: [
      'দৈনিক ইনকাম ১০০০ টাকা থেকে ১০,০০০ টাকায় স্কেল করার প্রফিটেবল স্ট্র্যাটেজি।',
      'ফুললি প্যাসিভ বিজনেসে রূপান্তর: আপনি না থাকলেও কীভাবে সেলস হবে?',
      'কাস্টমার সাপোর্ট ও মেসেজিং হ্যান্ডেল করার জন্য চ্যাটবট ইন্টিগ্রেশন।',
      'আপনার প্রথম রিমোট টিম বা ভার্চুয়াল অ্যাসিস্ট্যান্ট হায়ার করার গাইড।'
    ]
  }
];

export const CurriculumSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('m1');

  const toggleModule = (id: string) => {
    setActiveModule(activeModule === id ? '' : id);
  };

  return (
    <section id="curriculum" className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>স্টেপ-বাই-স্টেপ রোডম্যাপ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            কোর্সে কী কী শেখানো হবে?{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              সম্পূর্ণ কারিকুলাম
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদম জিরো থেকে প্রফিটেবল বিজনেস দাঁড় করানো পর্যন্ত যা যা প্রয়োজন—সবকিছু ৮টি সুসংগঠিত মডিউলে সাজানো হয়েছে। ড্রপডাউনে ক্লিক করে লেসনগুলো দেখে নিন:
          </p>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-3.5 mb-10">
          {curriculumModules.map((module) => {
            const isOpen = activeModule === module.id;
            return (
              <div
                key={module.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen ? 'bg-white border-blue-600 shadow-md shadow-blue-500/5' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full shrink-0 ${
                        isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {module.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {module.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {module.lessonsCount}টি লেসন
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-slate-100 animate-fadeIn">
                    <ul className="space-y-3 pt-2">
                      {module.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            <Play className="w-2.5 h-2.5 fill-blue-600" />
                          </span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Lifetime Access Callout */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl">
          <div className="space-y-1.5 text-left">
            <span className="text-xs font-bold text-sky-400">⚡ লাইফটাইম এক্সেস</span>
            <h3 className="text-base sm:text-lg font-bold">
              কোর্সের সকল ভিডিও HD কোয়ালিটিতে রেকর্ডেড, যেকোনো সময় দেখতে পারবেন!
            </h3>
          </div>
          <a
            href="#order-now"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            <span>এখনই কোর্সটি কিনুন</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
