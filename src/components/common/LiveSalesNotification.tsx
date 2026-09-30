import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Zap, X, Star, Flame, Eye, MessageCircle, Users } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLiveActivity } from '../../context/LiveActivityContext';
import { Product } from '../../types';
import { getProductSlug } from '../../utils/slugify';

interface NotificationItem {
  type: 'order' | 'review' | 'viewer' | 'chat';
  customerName?: string;
  location?: string;
  timeAgo?: string;
  product?: Product;
  reviewText?: string;
  viewerCount?: number;
  newJoiners?: number;
  chatTopic?: string;
}

const customerNames = [
  { name: 'তানভীর আহমেদ', loc: 'ঢাকা' },
  { name: 'রাশেদুল ইসলাম', loc: 'চট্টগ্রাম' },
  { name: 'মেহেদী হাসান', loc: 'সিলেট' },
  { name: 'সাব্বির হোসেন', loc: 'রাজশাহী' },
  { name: 'নাজমুল হক', loc: 'খুলনা' },
  { name: 'জাহিদুল ইসলাম', loc: 'বরিশাল' },
  { name: 'আরিফুল ইসলাম', loc: 'রংপুর' },
  { name: 'কামরুল হাসান', loc: 'কুমিল্লা' },
  { name: 'সাকিব মাহমুদ', loc: 'বগুড়া' },
  { name: 'ইমরান খান', loc: 'গাজীপুর' },
  { name: 'সৈকত রায়হান', loc: 'ময়মনসিংহ' },
  { name: 'ফাহিম ফয়সাল', loc: 'নোয়াখালী' },
  { name: 'ফারহানা আক্তার', loc: 'দিনাজপুর' },
  { name: 'মাহমুদ হাসান', loc: 'যশোর' }
];

const customerReviews = [
  'অর্ডার সম্পন্ন করার ২ মিনিটের মধ্যে গুগল ড্রাইভ লিঙ্ক মেইলে পেয়েছি!',
  'ফ্রিল্যান্সারদের জন্য সেরা রিসোর্স বান্ডেল, সবগুলো টুলস ১০০% পারফেক্ট কাজ করে।',
  'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার জন্য এর চেয়ে দারুণ বান্ডেল আর হতে পারে না।',
  'ভিআইপি সাপোর্ট টিম অসাধারণ, ড্রাইভ ডাউনলোড করতে কোনো সমস্যা হয়নি।'
];

const chatTopics = [
  'সরাসরি হোয়াটসঅ্যাপে কথা বলে ১TB মেগা বান্ডেল নিশ্চিত করলেন',
  'ক্যানভা প্রো ও ভিডিও বান্ডেল লাইসেন্স সম্পর্কিত তথ্য নিয়ে অর্ডার করলেন',
  'ড্রাইভ ব্যাকআপ ও মোবাইল ব্যবহারের নিয়ম জেনে যুক্ত হলেন',
  'PayBD গেটওয়েতে পেমেন্ট করে তাৎক্ষণিক গুগল ড্রাইভ লিংক বুঝে নিলেন'
];

const times = ['এইমাত্র', '১ মিনিট আগে', '২ মিনিট আগে', '৩ মিনিট আগে', '৪ মিনিট আগে'];

export const LiveSalesNotification: React.FC = () => {
  const { products } = useStore();
  const { liveViewers, newJoiners } = useLiveActivity();
  const [notification, setNotification] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (products.length === 0) return;

    let step = 0;

    const showNotification = () => {
      const available = products.filter((p) => p.available !== false);
      const pool = available.length > 0 ? available : products;
      const randomProduct = pool[Math.floor(Math.random() * pool.length)];
      const randomPerson = customerNames[Math.floor(Math.random() * customerNames.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      step = (step + 1) % 4;

      if (step === 1) {
        // High Live Viewers & Auto Join alert
        setNotification({
          type: 'viewer',
          product: randomProduct,
          viewerCount: liveViewers,
          newJoiners: newJoiners || 2
        });
      } else if (step === 2) {
        // Live Customer Chat Support Event
        const topic = chatTopics[Math.floor(Math.random() * chatTopics.length)];
        setNotification({
          type: 'chat',
          customerName: randomPerson.name,
          location: randomPerson.loc,
          timeAgo: randomTime,
          chatTopic: topic,
          product: randomProduct
        });
      } else if (step === 3) {
        // Real Customer Review
        const rev = customerReviews[Math.floor(Math.random() * customerReviews.length)];
        setNotification({
          type: 'review',
          customerName: randomPerson.name,
          location: randomPerson.loc,
          reviewText: rev,
          product: randomProduct
        });
      } else {
        // Verified Purchase
        setNotification({
          type: 'order',
          customerName: randomPerson.name,
          location: randomPerson.loc,
          timeAgo: randomTime,
          product: randomProduct
        });
      }

      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5200);
    };

    // First trigger after 2.5 seconds
    const initialTimer = setTimeout(showNotification, 2500);
    const interval = setInterval(showNotification, 10500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [products, liveViewers, newJoiners]);

  if (!notification || !isVisible) return null;

  const handleClick = () => {
    if (!notification.product) return;
    const landingPath = `/purchase/${getProductSlug(notification.product)}`;
    window.history.pushState(null, '', landingPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[315px] sm:max-w-sm pointer-events-auto font-['Hind_Siliguri',sans-serif]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={handleClick}
            className="cursor-pointer bg-slate-950/95 hover:bg-slate-900 backdrop-blur-xl border border-emerald-500/40 hover:border-emerald-500/80 rounded-2xl p-3 shadow-2xl flex items-center gap-3 text-slate-100 group transition-all"
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
              {notification.product?.imageUrl ? (
                <img
                  src={notification.product.imageUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="min-w-0 flex-1">
              {notification.type === 'order' && (
                <>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{notification.customerName} ({notification.location})</span>
                    <span className="text-slate-400">• {notification.timeAgo}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors mt-0.5">
                    {notification.product?.title}
                  </h5>
                  <div className="flex items-center justify-between text-[11px] mt-0.5">
                    <span className="font-black text-emerald-400">
                      ৳{notification.product?.price}
                    </span>
                    <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/15 px-1.5 py-0.2 rounded border border-amber-500/30">
                      ইনস্ট্যান্ট ডেলিভারি
                    </span>
                  </div>
                </>
              )}

              {notification.type === 'chat' && (
                <>
                  <div className="flex items-center gap-1 text-[10px] text-[#25D366] font-bold">
                    <MessageCircle className="w-3 h-3 fill-[#25D366]" />
                    <span>{notification.customerName} ({notification.location})</span>
                    <span className="text-slate-400">• {notification.timeAgo}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-200 line-clamp-1 mt-0.5">
                    {notification.chatTopic}
                  </p>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>লাইভ চ্যাট সহায়তা সম্পন্ন</span>
                  </div>
                </>
              )}

              {notification.type === 'viewer' && (
                <>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                    <Flame className="w-3 h-3 fill-amber-400 animate-pulse" />
                    <span>লাইভ ভিজিটর সংখ্যা বৃদ্ধি</span>
                  </div>
                  <h5 className="text-xs font-bold text-emerald-300 truncate mt-0.5">
                    এইমাত্র আরও {notification.newJoiners} জন যুক্ত হলেন (মোট {notification.viewerCount} জন লাইভ)
                  </h5>
                  <div className="text-[10px] text-slate-300 mt-0.5 truncate">
                    {notification.product?.title}
                  </div>
                </>
              )}

              {notification.type === 'review' && (
                <>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span>{notification.customerName} ({notification.location})</span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-200 line-clamp-1 mt-0.5">
                    "{notification.reviewText}"
                  </p>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                    ভেরিফায়েড ক্রেতা রিভিউ
                  </div>
                </>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white shrink-0 cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


