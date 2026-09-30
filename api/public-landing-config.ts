export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const defaultProduct = {
    id: 'combo-299',
    name: 'Freelancing Digital Product Business 100TB Bundle',
    price: 299,
    regularPrice: 2499,
    badge: 'সবচেয়ে জনপ্রিয়',
    tagline: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কার্যকরী কমপ্লিট রোডম্যাপ + ১০০TB রিসোর্স',
    description: '১০০TB+ প্রিমিয়াম ডিজিটাল প্রোডাক্ট বান্ডেল, ফেসবুক ও মেটা অ্যাডস মাস্টারি, ক্যানভা প্রো মেথড এবং লাইফটাইম ভিআইপি সাপোর্ট।',
    isPopular: true,
    isActive: true
  };

  return res.status(200).json({
    landingPageTitle: 'পারচেস',
    landingPageSlug: 'purchase',
    heroBadge: '💥 মেগা ডিসকাউন্ট অফার • লিমিটেড টাইম',
    heroHeadline: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন ও ১০০TB রিসোর্স',
    heroSubheadline: 'কোনো পূর্ব অভিজ্ঞতা ছাড়াই মাত্র ৩-৭ দিনের মধ্যে নিজের লাভজনক ডিজিটাল প্রোডাক্ট বিজনেস শুরু করুন।',
    countdownMinutes: 15,
    stockLeft: 7,
    discountPercent: 88,
    activeProduct: defaultProduct,
    allProducts: [defaultProduct],
    metaPixelId: process.env.META_PIXEL_ID || '2547695409029693',
    checkoutMode: 'paybd_direct_api'
  });
}
