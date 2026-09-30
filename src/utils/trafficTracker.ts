/**
 * Advanced Traffic Tracking & UTM Attribution System
 * 
 * Features:
 * 1. Automatic UTM & Ad Click Detection (fbclid, gclid, ttclid, utm_source, utm_campaign, etc.)
 * 2. Smart Traffic Channel Categorization (Facebook Ads, Facebook Organic, Google Ads, Direct, etc.)
 * 3. Session Persistence (Stores attribution in localStorage/sessionStorage for full order journey)
 * 4. Meta Pixel & CAPI Parameter Enrichment (_fbp, _fbc cookies)
 * 5. Real-time Firebase Activity & Traffic Analytics Logging
 */

export interface TrafficAttribution {
  channel: 'Facebook Ads' | 'Facebook Organic' | 'Google Ads' | 'Google Organic' | 'TikTok Ads' | 'YouTube' | 'Direct Traffic' | 'Referral';
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  ttclid: string;
  referrer: string;
  landingPage: string;
  fbp: string;
  fbc: string;
  timestamp: string;
}

const ATTRIBUTION_STORAGE_KEY = 'ndh_traffic_attribution';

/**
 * Gets or creates the Meta _fbp cookie value
 */
export function getFbpCookie(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_fbp=([^;]+)/);
  if (match) return match[1];
  
  const createdFbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 10000000000)}`;
  try {
    document.cookie = `_fbp=${createdFbp}; path=/; max-age=7776000; SameSite=Lax`;
  } catch {}
  return createdFbp;
}

/**
 * Gets or creates the Meta _fbc cookie value from fbclid parameter
 */
export function getFbcCookie(fbclidParam?: string): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_fbc=([^;]+)/);
  if (match) return match[1];

  if (fbclidParam) {
    const createdFbc = `fb.1.${Date.now()}.${fbclidParam}`;
    try {
      document.cookie = `_fbc=${createdFbc}; path=/; max-age=7776000; SameSite=Lax`;
    } catch {}
    return createdFbc;
  }
  return '';
}

/**
 * Determines exact Traffic Channel based on URL search params and referrer
 */
function classifyTrafficChannel(
  params: URLSearchParams,
  referrer: string
): TrafficAttribution['channel'] {
  const source = (params.get('utm_source') || '').toLowerCase();
  const medium = (params.get('utm_medium') || '').toLowerCase();
  const fbclid = params.get('fbclid') || '';
  const gclid = params.get('gclid') || '';
  const ttclid = params.get('ttclid') || '';

  // 1. Meta / Facebook Ads Detection
  if (fbclid || (source.includes('facebook') || source.includes('fb') || source.includes('ig') || source.includes('instagram')) && (medium.includes('cpc') || medium.includes('paid') || medium.includes('ad') || fbclid)) {
    return 'Facebook Ads';
  }

  // 2. Google Ads
  if (gclid || (source.includes('google') || source.includes('gads')) && (medium.includes('cpc') || medium.includes('paid') || medium.includes('ppc'))) {
    return 'Google Ads';
  }

  // 3. TikTok Ads
  if (ttclid || source.includes('tiktok')) {
    return 'TikTok Ads';
  }

  // 4. Organic Social / Search Referrers
  const ref = referrer.toLowerCase();
  if (ref.includes('facebook.com') || ref.includes('instagram.com') || ref.includes('m.facebook.com') || ref.includes('l.facebook.com')) {
    return 'Facebook Organic';
  }
  if (ref.includes('google.com') || ref.includes('google.com.bd')) {
    return 'Google Organic';
  }
  if (ref.includes('youtube.com') || ref.includes('youtu.be')) {
    return 'YouTube';
  }

  // 5. Direct Traffic (No referrer and no campaign params)
  if (!referrer && !source && !fbclid && !gclid) {
    return 'Direct Traffic';
  }

  return 'Referral';
}

/**
 * Captures current visit attribution and stores it in persistent session storage
 */
export function captureTrafficAttribution(): TrafficAttribution {
  if (typeof window === 'undefined') {
    return {
      channel: 'Direct Traffic',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      fbclid: '',
      gclid: '',
      ttclid: '',
      referrer: '',
      landingPage: '/',
      fbp: '',
      fbc: '',
      timestamp: new Date().toISOString()
    };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || '';
    const fbclid = urlParams.get('fbclid') || '';
    const gclid = urlParams.get('gclid') || '';
    const ttclid = urlParams.get('ttclid') || '';
    const utm_source = urlParams.get('utm_source') || (fbclid ? 'FacebookAds' : '');
    const utm_medium = urlParams.get('utm_medium') || (fbclid ? 'paid_social' : '');
    const utm_campaign = urlParams.get('utm_campaign') || '';
    const utm_content = urlParams.get('utm_content') || '';
    const utm_term = urlParams.get('utm_term') || '';

    const channel = classifyTrafficChannel(urlParams, referrer);
    const fbp = getFbpCookie();
    const fbc = getFbcCookie(fbclid);

    const attribution: TrafficAttribution = {
      channel,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      gclid,
      ttclid,
      referrer,
      landingPage: window.location.pathname + window.location.search,
      fbp,
      fbc,
      timestamp: new Date().toISOString()
    };

    // If new click has UTM or FBCLID, override stored attribution
    if (fbclid || utm_source || utm_campaign || !localStorage.getItem(ATTRIBUTION_STORAGE_KEY)) {
      localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
    }

    return attribution;
  } catch (e) {
    return {
      channel: 'Direct Traffic',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      fbclid: '',
      gclid: '',
      ttclid: '',
      referrer: '',
      landingPage: '/',
      fbp: '',
      fbc: '',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Gets currently saved traffic attribution for checkout or order payload
 */
export function getSavedTrafficAttribution(): TrafficAttribution {
  if (typeof window === 'undefined') {
    return captureTrafficAttribution();
  }

  try {
    const savedSession = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (savedSession) return JSON.parse(savedSession);

    const savedLocal = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (savedLocal) return JSON.parse(savedLocal);
  } catch {}

  return captureTrafficAttribution();
}
