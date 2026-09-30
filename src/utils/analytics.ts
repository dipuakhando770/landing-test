import { logActivity } from '../firebase/services';
import { ActivityType, OrderItem, Product } from '../types';
import { metaPixel } from './metaPixel';
import { captureTrafficAttribution, getSavedTrafficAttribution } from './trafficTracker';

function getDeviceInfo(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const width = window.innerWidth;
  const isMobile = width < 768;
  const ua = navigator.userAgent;
  let browser = 'Browser';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';

  return `${isMobile ? '📱 Mobile' : '💻 Desktop'} (${browser})`;
}

export const analytics = {
  trackPageView: (path: string, title?: string) => {
    // Capture traffic source, UTM parameters, fbclid and fbp/fbc cookies
    const attribution = captureTrafficAttribution();

    // Send traffic ping to backend for real-time traffic dashboard
    try {
      fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attribution),
        keepalive: true
      }).catch(() => {});
    } catch {}

    // 1. Meta Pixel PageView (with duplicate prevention)
    metaPixel.trackPageView(path);

    // 2. Real-time Firebase Activity log with full Traffic Source attribution
    logActivity({
      type: 'page_view',
      title: title || `পেজ ভিজিট: ${path}`,
      path,
      device: `${getDeviceInfo()} • ${attribution.channel}${attribution.utm_campaign ? ` (${attribution.utm_campaign})` : ''}`,
    });
  },

  trackProductView: (product: { id: string; title: string; price?: number; slug?: string } | Product) => {
    const attribution = getSavedTrafficAttribution();

    // 1. Meta Pixel + CAPI ViewContent
    metaPixel.trackViewContent(product as Product);

    // 2. Real-time Firebase Activity log
    logActivity({
      type: 'product_view',
      title: `পণ্য দেখা হয়েছে: ${product.title}`,
      productId: product.id,
      productTitle: product.title,
      path: `/product/${product.slug || product.id}`,
      amount: product.price,
      device: `${getDeviceInfo()} • ${attribution.channel}`,
    });
  },

  trackAddToCart: (product: Product, quantity = 1) => {
    const attribution = getSavedTrafficAttribution();

    // 1. Meta Pixel + CAPI AddToCart
    metaPixel.trackAddToCart(product, quantity);

    // 2. Real-time Firebase Activity log
    logActivity({
      type: 'add_to_cart',
      title: `কার্টে যোগ করা হয়েছে: ${product.title}`,
      productTitle: product.title,
      productId: product.id,
      amount: (product.price || 0) * quantity,
      device: `${getDeviceInfo()} • ${attribution.channel}`,
    });
  },

  trackRemoveFromCart: (productTitle: string, productId?: string) => {
    logActivity({
      type: 'remove_from_cart',
      title: `কার্ট থেকে রিমুভ: ${productTitle}`,
      productTitle,
      productId,
      device: getDeviceInfo(),
    });
  },

  trackCheckoutStart: (
    items: { productId: string; price: number; quantity?: number; title?: string }[],
    totalAmount: number
  ) => {
    const attribution = getSavedTrafficAttribution();

    // 1. Meta Pixel + CAPI InitiateCheckout
    metaPixel.trackInitiateCheckout(items, totalAmount);

    // 2. Real-time Firebase Activity log
    logActivity({
      type: 'checkout_start',
      title: `চেকআউট শুরু হয়েছে (${items.length}টি পণ্য) • সোর্স: ${attribution.channel}`,
      amount: totalAmount,
      device: `${getDeviceInfo()} • ${attribution.channel}${attribution.utm_campaign ? ` (${attribution.utm_campaign})` : ''}`,
    });
  },

  /**
   * Internal order placement logger.
   */
  trackOrderPlaced: (orderId: string, customerName: string, customerPhone: string, amount: number) => {
    const attribution = getSavedTrafficAttribution();

    logActivity({
      type: 'order_placed',
      title: `নতুন অর্ডার প্লেস হয়েছে (#${orderId.slice(-6)}) • ${attribution.channel}`,
      orderId,
      customerName,
      customerPhone,
      amount,
      device: `${getDeviceInfo()} • ${attribution.channel}${attribution.utm_campaign ? ` [Campaign: ${attribution.utm_campaign}]` : ''}`,
    });
  },

  /**
   * CRITICAL: Track verified successful purchase.
   * Fired ONLY after backend or payment gateway confirms order status is PAID / COMPLETED.
   */
  trackOrderPaid: (orderData: {
    orderId: string;
    amount: number;
    items: OrderItem[];
    customerEmail?: string;
    customerPhone?: string;
    customerName?: string;
    paymentMethod?: string;
    transactionId?: string;
  }) => {
    const attribution = getSavedTrafficAttribution();

    // 1. Meta Pixel + CAPI Purchase (with strict deduplication and deterministic eventID)
    metaPixel.trackPurchase(orderData);

    // 2. Real-time Firebase Activity log
    logActivity({
      type: 'order_placed',
      title: `পেমেন্ট সম্পন্ন ও অর্ডার ডেলিভারি (#${orderData.orderId.slice(-6)}) • ${attribution.channel}`,
      orderId: orderData.orderId,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      amount: orderData.amount,
      device: `${getDeviceInfo()} • ${attribution.channel}${attribution.utm_campaign ? ` [Campaign: ${attribution.utm_campaign}]` : ''}`,
    });
  },

  trackOrderCancelled: (orderId: string, customerName?: string) => {
    logActivity({
      type: 'order_cancelled',
      title: `অর্ডার বাতিল করা হয়েছে (#${orderId.slice(-6)})`,
      orderId,
      customerName,
      device: getDeviceInfo(),
    });
  },

  trackWhatsAppClick: (productTitle?: string) => {
    const attribution = getSavedTrafficAttribution();

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'WhatsAppContact', {
          content_name: productTitle || 'General Support',
          channel: attribution.channel,
        });
      }
    } catch {
      // Ignore fbq errors
    }

    logActivity({
      type: 'whatsapp_click',
      title: `হোয়াটসঅ্যাপে যোগাযোগ: ${productTitle || 'সরাসরি হেল্পলাইন'}`,
      productTitle,
      device: `${getDeviceInfo()} • ${attribution.channel}`,
    });
  },

  trackDirectDownload: (productTitle: string, productId?: string) => {
    logActivity({
      type: 'direct_download',
      title: `সরাসরি ডাউনলোড শুরু: ${productTitle}`,
      productTitle,
      productId,
      device: getDeviceInfo(),
    });
  },
};
