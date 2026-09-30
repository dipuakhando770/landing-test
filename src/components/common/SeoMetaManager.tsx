import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { getProductFullUrl, getProductSlug } from '../../utils/slugify';

interface SeoMetaManagerProps {
  currentView: 'home' | 'shop' | 'admin' | 'product' | 'landing' | 'success' | 'simulator';
  activeProduct?: Product | null;
}

function upsertMetaTag(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(
    `meta[${attrName}="${attrValue}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined' || !href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const SeoMetaManager: React.FC<SeoMetaManagerProps> = ({
  currentView,
  activeProduct,
}) => {
  const { settings, products } = useStore();

  useEffect(() => {
    const siteName = settings.websiteName || 'Nasir Digital Hub';
    const baseMetaTitle =
      settings.metaTitle ||
      `${siteName} — ${settings.tagline || 'প্রিমিয়াম ডিজিটাল প্রোডাক্ট মার্কেটপ্লেস'}`;
    const baseMetaDesc =
      settings.metaDescription ||
      settings.description ||
      'বাংলাদেশের সেরা ডিজিটাল প্রোডাক্ট, সফটওয়্যার লাইসেন্স, প্রিমিয়াম সাবস্ক্রিপশন, ডিজাইন টেমপ্লেট ও অনলাইন টুলস শপ।';
    const baseKeywords =
      settings.metaKeywords ||
      'Nasir Digital Hub, ডিজিটাল প্রোডাক্ট, সফটওয়্যার লাইসেন্স, প্রিমিয়াম সাবস্ক্রিপশন, Canva Pro, Digital Products BD, Meta Ads, Freelancing Bundle';

    const baseOrigin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://www.nasirdigitalhub.com';

    let finalTitle = baseMetaTitle;
    let finalDescription = baseMetaDesc;
    let finalImage =
      settings.ogImageUrl ||
      settings.logoUrl ||
      (settings.heroSlides && settings.heroSlides[0]?.imageUrl) ||
      '';
    let canonicalUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : baseOrigin;

    // Target product for Product view or Landing view
    const targetProduct = activeProduct || (currentView === 'landing' ? products.find((p) => p.featured) || products[0] : null);

    if (currentView === 'landing' && targetProduct) {
      finalTitle = `${targetProduct.title} — মাত্র ৳${targetProduct.price} টাকায় লাইফটাইম অ্যাক্সেস | ${siteName}`;
      finalDescription =
        targetProduct.shortDescription ||
        targetProduct.description?.slice(0, 160) ||
        `${targetProduct.title} নিয়ে এখনই আপনার অটোমেটেড ডিজিটাল প্রোডাক্ট বিজনেস শুরু করুন। আজকের অফারে মাত্র ৳${targetProduct.price} টাকায়।`;
      if (targetProduct.imageUrl) {
        finalImage = targetProduct.imageUrl;
      }
      canonicalUrl = `${baseOrigin}/purchase/${getProductSlug(targetProduct)}`;
    } else if (currentView === 'product' && targetProduct) {
      finalTitle = `${targetProduct.title} — ৳${targetProduct.price} | ${siteName}`;
      finalDescription =
        targetProduct.shortDescription ||
        targetProduct.description?.slice(0, 160) ||
        baseMetaDesc;
      if (targetProduct.imageUrl) {
        finalImage = targetProduct.imageUrl;
      }
      canonicalUrl = getProductFullUrl(targetProduct);
    } else if (currentView === 'shop') {
      finalTitle = `সকল ডিজিটাল প্রোডাক্ট ও সফটওয়্যার — ${siteName}`;
      canonicalUrl = `${baseOrigin}/shop`;
    } else if (currentView === 'admin') {
      finalTitle = `অ্যাডমিন প্যানেল — ${siteName}`;
    }

    // 1. Browser Title & Basic SEO Meta Tags
    document.title = finalTitle;
    upsertMetaTag('name', 'description', finalDescription);
    upsertMetaTag('name', 'keywords', baseKeywords);
    upsertMetaTag('name', 'author', siteName);
    upsertMetaTag('name', 'application-name', siteName);
    upsertMetaTag(
      'name',
      'robots',
      currentView === 'admin'
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1'
    );

    // 2. OpenGraph Tags for Social Sharing & Meta
    upsertMetaTag('property', 'og:type', (currentView === 'product' || currentView === 'landing') ? 'product' : 'website');
    upsertMetaTag('property', 'og:site_name', siteName);
    upsertMetaTag('property', 'og:title', finalTitle);
    upsertMetaTag('property', 'og:description', finalDescription);
    if (canonicalUrl) {
      upsertMetaTag('property', 'og:url', canonicalUrl);
      upsertLinkTag('canonical', canonicalUrl);
    }
    if (finalImage && !finalImage.startsWith('data:')) {
      upsertMetaTag('property', 'og:image', finalImage);
    }

    // 3. Twitter / X Card
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', finalTitle);
    upsertMetaTag('name', 'twitter:description', finalDescription);
    if (finalImage && !finalImage.startsWith('data:')) {
      upsertMetaTag('name', 'twitter:image', finalImage);
    }

    // 4. Meta Pixel ViewContent Track for Product / Landing
    if (typeof (window as any).fbq === 'function' && targetProduct && (currentView === 'product' || currentView === 'landing')) {
      try {
        (window as any).fbq('track', 'ViewContent', {
          content_name: targetProduct.title,
          content_ids: [targetProduct.id],
          content_type: 'product',
          value: targetProduct.price,
          currency: 'BDT',
        });
      } catch (e) {
        console.warn('Pixel ViewContent trace note:', e);
      }
    }

    // 5. Schema.org JSON-LD Structured Data for Google Ranking
    const scriptId = 'dynamic-seo-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const structuredData = (currentView === 'product' || currentView === 'landing') && targetProduct
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: targetProduct.title,
          description: finalDescription,
          image: targetProduct.imageUrl && !targetProduct.imageUrl.startsWith('data:') ? targetProduct.imageUrl : undefined,
          sku: targetProduct.id,
          brand: {
            '@type': 'Brand',
            name: siteName,
          },
          offers: {
            '@type': 'Offer',
            price: String(targetProduct.price),
            priceCurrency: 'BDT',
            availability: targetProduct.available !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: canonicalUrl,
            priceValidUntil: '2028-12-31',
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: baseOrigin,
          description: baseMetaDesc,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseOrigin}/shop?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        };

    scriptEl.textContent = JSON.stringify(structuredData);
  }, [settings, currentView, activeProduct, products]);

  return null;
};
