let inMemoryPages: any[] = [
  {
    id: 'lp-purchase',
    slug: 'purchase',
    productId: 'combo-299',
    title: 'ফ্রিল্যান্সিং ও ডিজিটাল প্রোডাক্ট ১০০TB বান্ডেল',
    status: 'published',
    isDefault: true,
    hero: {
      badge: '💥 মেগা ডিসকাউন্ট অফার • লিমিটেড টাইম',
      title: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন ও ১০০TB রিসোর্স',
      subtitle: 'কোনো পূর্ব অভিজ্ঞতা ছাড়াই মাত্র ৩-৭ দিনের মধ্যে নিজের লাভজনক ডিজিটাল প্রোডাক্ট বিজনেস শুরু করুন।',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      ctaText: 'এখনই অর্ডার করুন মাত্র ২৯৯ টাকায়'
    },
    offer: {
      regularPrice: 2499,
      currentPrice: 299,
      discountPercent: 88,
      badge: 'সবচেয়ে জনপ্রিয়',
      timerMinutes: 15,
      stockCount: 7
    },
    benefits: [
      { icon: 'Zap', title: '১০০TB+ প্রিমিয়াম ক্লাউড রিসোর্স', description: 'গ্রাফিক্স, ভিডিও টেমপ্লেট, সফটওয়্যার ও রেডিমেড ডিজিটাল অ্যাসেটস।' },
      { icon: 'ShieldCheck', title: 'লাইফটাইম ড্রাইভ ব্যাকআপ', description: 'একবার পেমেন্টে আজীবন গুগল ড্রাইভ ফোল্ডার অ্যাক্সেস ও নিয়মিত আপডেট।' },
      { icon: 'DollarSign', title: 'হাই-কনভার্টিং সেলস ফানেল', description: 'ফেসবুক ও মেটা অ্যাডস মাস্টারি কোর্স সহ রেডি ল্যান্ডিং পেজ ফাইল।' },
      { icon: 'Users', title: '২৪/৭ ভিআইপি টেলিগ্রাম সাপোর্ট', description: 'যেকোনো সমস্যায় সরাসরি মেন্টর ও প্রাইভেট কমিউনিটি গাইডলাইন।' }
    ],
    curriculum: [
      { module: 'মডিউল ১', lesson: 'ডিজিটাল প্রোডাক্ট বিজনেস ফান্ডামেন্টাল', description: 'বিজনেস মডেল, নিশ সিলেকশন ও টার্গেট অডিয়েন্স রিসার্চ।' },
      { module: 'মডিউল ২', lesson: 'ক্যানভা ও রেডিমেড গ্রাফিক্স কাস্টমাইজেশন', description: 'নিজের ব্র্যান্ড লোগো ও পোস্টার ডিজাইন তৈরি।' },
      { module: 'মডিউল ৩', lesson: 'মেটা অ্যাডস ও সেলস ফানেল সেটআপ', description: 'কম খরচে বেশি সেলস আনার ফেসবুক অ্যাড ক্যাম্পেইন মেথড।' },
      { module: 'মডিউল ৪', lesson: 'পেমেন্ট গেটওয়ে ও অটো ডেলিভারি', description: 'বিকাশ/নগদ স্বয়ংক্রিয় পেমেন্ট ও মেইল ডেলিভারি ইন্টিগ্রেশন।' }
    ],
    bonus: [
      { title: '১০,০০০+ ভাইরাল সোশ্যাল মিডিয়া রিলস বান্ডেল', description: 'ইনস্টাগ্রাম ও ফেসবুক রিলসে দ্রুত ভিউ বাড়ানোর ভিডিও কিট', value: 999 },
      { title: 'প্রিমিয়াম ওয়ার্ডপ্রেস ও এলিমেন্টর থিম প্যাক', description: 'নিজের পেশাদার ইকমার্স ও পোর্টফোলিও ওয়েবসাইট বানানোর ফাইল', value: 1499 },
      { title: 'ভিআইপি টেলিগ্রাম প্রাইভেট কমিউনিটি ইনভাইট', description: 'লাইফটাইম সিক্রেট আপডেট ও মেন্টরশিপ সাপোর্ট', value: 1999 }
    ],
    faq: [
      { question: 'পেমেন্ট করার পর আমি কীভাবে ফাইলগুলো পাবো?', answer: 'পেমেন্ট সফল হওয়ার সাথে সাথে স্ক্রিনে ১০০TB গুগল ড্রাইভ ফোল্ডার লিংক ও আপনার ইমেইলে সকল ইন্সট্রাকশন স্বয়ংক্রিয়ভাবে চলে যাবে।' },
      { question: 'ড্রাইভের অ্যাক্সেস কতদিন থাকবে?', answer: 'আপনি লাইফটাইম (আজীবন) আনলিমিটেড ডাউনলোড ও এক্সেস সুবিধা পাবেন।' },
      { question: 'আমি কি আমার মোবাইল দিয়ে কাজ করতে পারব?', answer: 'হ্যাঁ, ড্রাইভের অধিকাংশ রিসোর্স এবং ভিডিও টিউটোরিয়াল মোবাইল ও কম্পিউটার উভয় ডিভাইসে ব্যবহার করা সম্ভব।' },
      { question: 'কোনো সমস্যা হলে সাপোর্ট কোথায় পাবো?', answer: 'আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ (+8801875656565) এবং ভিআইপি টেলিগ্রাম গ্রুপে ২৪/৭ সাপোর্ট দেওয়া হয়।' }
    ],
    testimonials: [
      { name: 'তানভীর আহমেদ', role: 'ডিজিটাল উদ্যোক্তা', review: 'মাত্র ২৯৯ টাকায় এত বিশাল রিসোর্স ও ক্লিয়ার গাইডলাইন পাব ভাবিনি। আলহামদুলিল্লাহ ১ম সপ্তাহেই আমার সেল শুরু হয়েছে!', rating: 5 },
      { name: 'রাকিবুল হাসান', role: 'ফ্রিল্যান্সার', review: '১০০TB ড্রাইভের কালেকশন এক কথায় অসাধারণ। ক্যানভা টেমপ্লেটগুলো ব্যবহার করে দ্রুত ক্লায়েন্ট ডেলিভারি দিতে পারছি।', rating: 5 },
      { name: 'সুমাইয়া জাহান', role: 'গ্রাফিক ডিজাইনার', review: 'ইনস্ট্যান্ট ইমেইল ডেলিভারি ও টেলিগ্রাম সাপোর্ট খুব হেল্পফুল ছিল। ধন্যবাদ নাসির ডিজিটাল হাবকে।', rating: 5 }
    ],
    finalCta: {
      heading: 'আজই শুরু করুন আপনার সফল ডিজিটাল প্রোডাক্ট বিজনেস',
      description: 'অফারটি যেকোনো সময় শেষ হয়ে যেতে পারে। মাত্র ২৯৯ টাকায় ১০০TB রিসোর্স নিয়ে এখনই আপনার যাত্রা শুরু করুন।',
      buttonText: 'এখনই অর্ডার করুন — মাত্র ৳২৯৯'
    },
    delivery: {
      driveUrl: 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
      downloadUrl: 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
      vipTelegramUrl: 'https://t.me/+nasir_digital_hub_vip_support',
      customMessage: 'Nasir Digital Hub-এ অর্ডার করার জন্য ধন্যবাদ। নিচে আপনার লাইফটাইম ড্রাইভ ফোল্ডার ও টেলিগ্রাম লিংক দেওয়া হলো।'
    },
    seo: {
      metaTitle: 'ডিজিটাল প্রোডাক্ট বিজনেস ১০০TB বান্ডেল - নাসির ডিজিটাল হাব',
      metaDescription: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার কমপ্লিট সল্যুশন ও ১০০TB ক্লাউড ড্রাইভ রিসোর্স মাত্র ২৯৯ টাকায়।'
    },
    stats: {
      views: 1420,
      ctaClicks: 520,
      formsStarted: 310,
      ordersCreated: 240,
      successfulPayments: 198,
      totalRevenue: 59202
    }
  }
];

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, pages: inMemoryPages });
  }

  if (req.method === 'POST') {
    try {
      const pageData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const existingIdx = inMemoryPages.findIndex((p) => p.id === pageData.id || p.slug === pageData.slug);
      if (existingIdx >= 0) {
        inMemoryPages[existingIdx] = { ...inMemoryPages[existingIdx], ...pageData, updatedAt: new Date().toISOString() };
      } else {
        inMemoryPages.unshift({
          ...pageData,
          id: pageData.id || `lp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      return res.status(200).json({ success: true, message: 'Landing page saved successfully', pages: inMemoryPages });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e?.message || 'Invalid JSON input' });
    }
  }

  return res.status(200).json({ success: true, pages: inMemoryPages });
}
