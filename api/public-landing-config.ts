export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const route = (req.query?.route || req.url || '').toString().toLowerCase();

  if (route.includes('payment-config-status')) {
    return res.status(200).json({
      brandKey: process.env.PAYBD_BRAND_KEY || 'r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ',
      hasApiKey: !!process.env.PAYBD_API_KEY,
      hasSecretKey: !!process.env.PAYBD_SECRET_KEY,
      gatewayUrl: process.env.PAYBD_CREATE_URL || 'https://app-paybd.pipilikhost.com/api/payment/create',
      checkoutMode: process.env.CHECKOUT_MODE || 'paybd_direct_api'
    });
  }

  if (route.includes('public-pixel-config')) {
    return res.status(200).json({
      pixelId: process.env.META_PIXEL_ID || '2547695409029693',
      hasCapiToken: !!process.env.META_CAPI_ACCESS_TOKEN,
      testEventCode: process.env.META_TEST_EVENT_CODE || ''
    });
  }

  if (route.includes('track-visit') || route.includes('log-activity') || route.includes('activities')) {
    if (req.method === 'GET') {
      try {
        const rtdbRes = await fetch('https://nasirdigitalhub-d859f-default-rtdb.firebaseio.com/activity_logs.json');
        if (rtdbRes.ok) {
          const cloudData = await rtdbRes.json();
          if (cloudData && typeof cloudData === 'object') {
            const list = Object.entries(cloudData).map(([key, val]: [string, any]) => ({
              id: key,
              ...val
            }));
            list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            return res.status(200).json({ success: true, activities: list.slice(0, 150) });
          }
        }
      } catch {}
      return res.status(200).json({ success: true, activities: [] });
    }

    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const timestamp = Number(data.timestamp) || Date.now();
      const rawId = String(data.id || 'act_' + Math.random().toString(36).substring(2, 9) + '_' + timestamp);
      const logEntry = {
        id: rawId,
        type: data.type || 'page_view',
        title: data.title || (data.channel ? `পেজ ভিজিট: / (${data.channel})` : 'ইউজার অ্যাক্টিভিটি'),
        path: data.path || '/',
        device: data.device || `${data.channel || 'Direct'}${data.utm_campaign ? ` (${data.utm_campaign})` : ''}`,
        timestamp,
        ...(data.productId ? { productId: data.productId } : {}),
        ...(data.productTitle ? { productTitle: data.productTitle } : {}),
        ...(data.orderId ? { orderId: data.orderId } : {}),
        ...(typeof data.amount === 'number' ? { amount: data.amount } : {})
      };

      // Write to Firebase RTDB non-blockingly
      Promise.all([
        fetch(`https://nasirdigitalhub-d859f-default-rtdb.firebaseio.com/activity_logs/${rawId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logEntry)
        }),
        fetch(`https://nasirdigitalhub-d859f-default-rtdb.firebaseio.com/activities/${rawId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logEntry)
        })
      ]).catch(() => {});

      return res.status(200).json({
        success: true,
        sessionId: rawId
      });
    } catch (e) {
      return res.status(200).json({
        success: true,
        sessionId: `VIS-${Date.now()}`
      });
    }
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
