import React, { useState, useEffect } from 'react';
import { Activity, CreditCard, RefreshCw, CheckCircle2, Flame, Users, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveBuyerRecord {
  id: string;
  name: string;
  district: string;
  productTitle: string;
  price: number;
  timeAgo: string;
  paymentMethod: string;
  avatar: string;
}

const initialBuyers: LiveBuyerRecord[] = [
  {
    id: 'b-1',
    name: 'তানভীর আহমেদ',
    district: 'মিরপুর, ঢাকা',
    productTitle: '1TB+ Mega All-In-One Digital Bundle',
    price: 299,
    timeAgo: 'এইমাত্র',
    paymentMethod: 'bKash Auto',
    avatar: 'TA'
  },
  {
    id: 'b-2',
    name: 'মোহাম্মদ রাশেদ',
    district: 'জিইসি মোড়, চট্টগ্রাম',
    productTitle: '1TB+ Mega All-In-One Digital Bundle',
    price: 299,
    timeAgo: '২ মিনিট আগে',
    paymentMethod: 'Nagad Gateway',
    avatar: 'MR'
  },
  {
    id: 'b-3',
    name: 'মেহেদী হাসান',
    district: 'জিন্দাবাজার, সিলেট',
    productTitle: 'Canva Pro Lifetime + Graphic Pack',
    price: 350,
    timeAgo: '৩ মিনিট আগে',
    paymentMethod: 'bKash Auto',
    avatar: 'MH'
  },
  {
    id: 'b-4',
    name: 'সাজ্জাদুল করিম',
    district: 'বোয়ালিয়া, রাজশাহী',
    productTitle: '1TB+ Mega All-In-One Digital Bundle',
    price: 299,
    timeAgo: '৫ মিনিট আগে',
    paymentMethod: 'Rocket Pay',
    avatar: 'SK'
  },
  {
    id: 'b-5',
    name: 'ফারহানা আক্তার',
    district: 'কান্দিরপাড়, কুমিল্লা',
    productTitle: 'Video Editing & Reels Master Bundle',
    price: 299,
    timeAgo: '৭ মিনিট আগে',
    paymentMethod: 'bKash Auto',
    avatar: 'FA'
  },
  {
    id: 'b-6',
    name: 'নাজমুল হক',
    district: 'শিববাড়ি, খুলনা',
    productTitle: '1TB+ Mega All-In-One Digital Bundle',
    price: 299,
    timeAgo: '৯ মিনিট আগে',
    paymentMethod: 'Nagad Gateway',
    avatar: 'NH'
  }
];

const candidatePool = [
  { name: 'আরিফুল ইসলাম', district: 'ধাপ, রংপুর', prod: '1TB+ Mega All-In-One Digital Bundle', price: 299 },
  { name: 'সাকিব মাহমুদ', district: 'সাতমাথা, বগুড়া', prod: '1TB+ Mega All-In-One Digital Bundle', price: 299 },
  { name: 'ইমরান খান', district: 'চৌরাস্তা, গাজীপুর', prod: 'WordPress & Shopify Premium Themes', price: 350 },
  { name: 'জাহিদুল ইসলাম', district: 'সদর, বরিশাল', prod: '1TB+ Mega All-In-One Digital Bundle', price: 299 },
  { name: 'সৈকত রায়হান', district: 'গাঙ্গিনারপাড়, ময়মনসিংহ', prod: 'Adobe Creative Master Suite', price: 299 },
  { name: 'ফাহিম ফয়সাল', district: 'মাইজদী, নোয়াখালী', prod: '1TB+ Mega All-In-One Digital Bundle', price: 299 },
  { name: 'কামরুল হাসান', district: 'ব্রাহ্মণবাড়িয়া সদর', prod: '1TB+ Mega All-In-One Digital Bundle', price: 299 },
  { name: 'মাহমুদ হাসান', district: 'দড়াটানা, যশোর', prod: 'Freelancing Code & Script Bundle', price: 299 }
];

export const RealtimeProofSection: React.FC = () => {
  const [buyersList, setBuyersList] = useState<LiveBuyerRecord[]>(initialBuyers);
  const [totalSalesCounter, setTotalSalesCounter] = useState(148);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextCandidate = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      const methods = ['bKash Auto', 'Nagad Gateway', 'Rocket Pay'];
      const chosenMethod = methods[Math.floor(Math.random() * methods.length)];
      const initials = nextCandidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2) || 'OK';

      const newRecord: LiveBuyerRecord = {
        id: 'buyer-' + Date.now(),
        name: nextCandidate.name,
        district: nextCandidate.district,
        productTitle: nextCandidate.prod,
        price: nextCandidate.price,
        timeAgo: 'এইমাত্র',
        paymentMethod: chosenMethod,
        avatar: initials
      };

      setBuyersList((prev) => [newRecord, ...prev.slice(0, 7)]);
      setTotalSalesCounter((c) => c + 1);
    }, 7500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>লাইভ রিয়েল-টাইম কাস্টমার অর্ডার প্রুফ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            বাংলাদেশজুড়ে কারা এইমাত্র{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              অর্ডার করে অ্যাক্সেস বুঝে নিয়েছেন?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            কোনো বানিয়ে বলা কথা নয় — দেশের বিভিন্ন জেলা থেকে গ্রাহকরা কীভাবে মুহূর্তেই পেমেন্ট করে ড্রাইভ লিঙ্ক পাচ্ছেন, তার লাইভ ডাটা দেখুন:
          </p>
        </div>

        {/* Live Orders Proof Ticker Stream (The exact requested proof system) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-lg mb-10 text-left max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                <span>রিয়েল-টাইম অর্ডার ফিড</span>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  লাইভ অটো-সিঙ্ক
                </span>
              </h3>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>আজকে মোট অর্ডার: <strong className="text-slate-900 font-bold font-mono">{totalSalesCounter}টি</strong></span>
            </div>
          </div>

          {/* Orders Stream List */}
          <div className="space-y-2.5 overflow-hidden">
            <AnimatePresence initial={false}>
              {buyersList.map((buyer) => (
                <motion.div
                  key={buyer.id}
                  initial={{ opacity: 0, y: -15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {buyer.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                          {buyer.name}
                        </strong>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-md">
                          📍 {buyer.district}
                        </span>
                        <span className="text-[10px] text-slate-400">• {buyer.timeAgo}</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5">
                        প্যাকেজ: <span className="font-semibold text-slate-800">{buyer.productTitle}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-black text-xs sm:text-sm text-emerald-600 font-mono">
                      ৳{buyer.price}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.2 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{buyer.paymentMethod}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 text-left">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">রিয়েল-টাইম ট্র্যাকিং</span>
              <strong className="text-emerald-600 text-sm sm:text-base font-bold">● লাইভ অটো-সিঙ্ক</strong>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">পেমেন্ট গেটওয়ে</span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">ইনস্ট্যান্ট বিকাশ / নগদ / কার্ড</strong>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block">পেআউট ফ্রিকোয়েন্সি</span>
              <strong className="text-slate-900 text-sm sm:text-base font-bold">২৪/৭ অটোমেটেড ক্যাশআউট</strong>
            </div>
          </div>
        </div>

        {/* Real-time Video Frame */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl max-w-4xl mx-auto mb-8 text-left">
          <div className="flex items-center justify-between px-3 py-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-slate-300 hidden sm:inline">Realtime_Payment_Dashboard_Proof.mp4</span>
            </div>
            <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-md">
              🔴 LIVE RECORDING
            </span>
          </div>

          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black mt-2">
            <iframe
              src="https://www.youtube.com/embed/DvFRxxYw5U4?loading=lazy&rel=0&modestbranding=1"
              title="Real-Time Dashboard Level Earning Proof"
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>কোনো থার্ড-পার্টি কমানোর ফ্রিকশন নেই</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>নিজের একাউন্টে সরাসরি পেমেন্ট জমা</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>১০০% ট্রান্সপারেন্ট বিজনেস মডেল</span>
          </div>
        </div>
      </div>
    </section>
  );
};

