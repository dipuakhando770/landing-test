import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LiveActivityItem {
  id: string;
  type: 'order' | 'chat' | 'view' | 'review';
  title: string;
  subtitle: string;
  customerName?: string;
  district?: string;
  timeAgo: string;
  avatarSeed: string;
}

interface LiveActivityContextType {
  liveViewers: number;
  newJoiners: number;
  totalOrdersToday: number;
  totalChatsToday: number;
  currentActivity: LiveActivityItem | null;
  activityHistory: LiveActivityItem[];
}

const LiveActivityContext = createContext<LiveActivityContextType>({
  liveViewers: 42,
  newJoiners: 2,
  totalOrdersToday: 136,
  totalChatsToday: 58,
  currentActivity: null,
  activityHistory: []
});

const districts = [
  'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল',
  'রংপুর', 'কুমিল্লা', 'গাজীপুর', 'বগুড়া', 'ময়মনসিংহ', 'নোয়াখালী',
  'ব্রাহ্মণবাড়িয়া', 'দিনাজপুর', 'টাঙ্গাইল', 'কক্সবাজার', 'যশোর', 'কুষ্টিয়া'
];

const customerNames = [
  'তানভীর আহমেদ', 'রাশেদুল ইসলাম', 'মেহেদী হাসান', 'সাব্বির হোসেন',
  'নাজমুল হক', 'জাহিদুল ইসলাম', 'আরিফুল ইসলাম', 'কামরুল হাসান',
  'সাকিব মাহমুদ', 'ইমরান খান', 'সৈকত রায়হান', 'ফাহিম ফয়সাল',
  'ফারহানা আক্তার', 'নুসরাত জাহান', 'সাজ্জাদুল করিম', 'মাহমুদ হাসান'
];

const productHighlights = [
  '1TB+ Mega All-In-One Digital Bundle',
  'Canva Pro Lifetime VIP Access',
  'Adobe Creative Master Collection',
  'Video Editing & Reels Master Bundle',
  'Freelancing Ready-Made Source Codes',
  'WordPress & Shopify Premium Themes',
  '40+ Premium Android Mobile Apps Pack'
];

export const LiveActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liveViewers, setLiveViewers] = useState(43);
  const [newJoiners, setNewJoiners] = useState(2);
  const [totalOrdersToday, setTotalOrdersToday] = useState(148);
  const [totalChatsToday, setTotalChatsToday] = useState(64);
  const [currentActivity, setCurrentActivity] = useState<LiveActivityItem | null>(null);
  const [activityHistory, setActivityHistory] = useState<LiveActivityItem[]>([]);

  // Fluctuating real-time live viewers engine (40 - 62)
  useEffect(() => {
    const viewerTimer = setInterval(() => {
      setLiveViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = Math.max(36, Math.min(68, prev + delta));
        if (delta > 0) {
          setNewJoiners(delta);
        }
        return next;
      });
    }, 6000);

    return () => clearInterval(viewerTimer);
  }, []);

  // Periodic Live Activity Event Generator (every 8 to 11 seconds)
  useEffect(() => {
    const pushActivity = () => {
      const types: ('order' | 'chat' | 'view' | 'review')[] = ['order', 'chat', 'order', 'review', 'view'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      const person = customerNames[Math.floor(Math.random() * customerNames.length)];
      const district = districts[Math.floor(Math.random() * districts.length)];
      const prod = productHighlights[Math.floor(Math.random() * productHighlights.length)];

      let title = '';
      let subtitle = '';

      if (chosenType === 'order') {
        title = `${person} (${district})`;
        subtitle = `এইমাত্র সফলভাবে "${prod}" অর্ডার করেছেন`;
        setTotalOrdersToday((prev) => prev + 1);
      } else if (chosenType === 'chat') {
        title = `${person} (${district})`;
        subtitle = `হোয়াটসঅ্যাপ সাপোর্টে কথা বলে নিশ্চিত হলেন`;
        setTotalChatsToday((prev) => prev + 1);
      } else if (chosenType === 'review') {
        title = `${person} (${district})`;
        subtitle = `৫-স্টার রেটিং দিয়ে ড্রাইভ লিঙ্ক ডাউনলোড করেছেন`;
      } else {
        const viewCount = Math.floor(Math.random() * 15) + 25;
        title = `লাইভ ভিউয়ার অ্যালার্ট`;
        subtitle = `এই মুহূর্তে ${viewCount} জন মানুষ "${prod}" দেখছেন`;
      }

      const newEvent: LiveActivityItem = {
        id: 'act-' + Date.now(),
        type: chosenType,
        title,
        subtitle,
        customerName: person,
        district,
        timeAgo: 'এইমাত্র',
        avatarSeed: person
      };

      setCurrentActivity(newEvent);
      setActivityHistory((prev) => [newEvent, ...prev.slice(0, 19)]);
    };

    // First push quickly after 2.5 seconds
    const firstTimer = setTimeout(pushActivity, 2500);
    const activityTimer = setInterval(pushActivity, 10000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(activityTimer);
    };
  }, []);

  return (
    <LiveActivityContext.Provider
      value={{
        liveViewers,
        newJoiners,
        totalOrdersToday,
        totalChatsToday,
        currentActivity,
        activityHistory
      }}
    >
      {children}
    </LiveActivityContext.Provider>
  );
};

export const useLiveActivity = () => useContext(LiveActivityContext);
