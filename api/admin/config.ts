export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return res.status(200).json({
    paybdApiKey: process.env.PAYBD_API_KEY || '',
    paybdSecretKey: process.env.PAYBD_SECRET_KEY || '',
    paybdBrandKey: process.env.PAYBD_BRAND_KEY || 'r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ',
    metaPixelId: process.env.META_PIXEL_ID || '2547695409029693',
    metaCapiAccessToken: process.env.META_CAPI_ACCESS_TOKEN || '',
    metaTestEventCode: process.env.META_TEST_EVENT_CODE || ''
  });
}
