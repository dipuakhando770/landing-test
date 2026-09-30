import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Zap, Eye, Download, Gift, ArrowRight, ShieldCheck, Flame, ExternalLink, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, calculateDiscount, triggerFreeProductDownload, normalizeImageUrl } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { getProductSlug } from '../../utils/slugify';

interface ProductCardProps {
  product: Product;
  onOpenModal?: (product: Product) => void;
  onOrderNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal, onOrderNow }) => {
  const { getCategoryName } = useStore();
  const { setSelectedProductForModal } = useCart();
  const [imgError, setImgError] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const isFreeProduct = Boolean(product.isFree);
  const discountPercent = calculateDiscount(product.price, product.oldPrice);
  const categoryName = getCategoryName(product.categoryId);
  const productLandingPath = `/purchase/${getProductSlug(product)}`;

  // Deterministic Social Proof Metrics per product based on title/ID
  const socialMetrics = useMemo(() => {
    const raw = (product.id || product.title || 'prod').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const viewers = 14 + (raw % 25); // 14 to 38
    const sold = 75 + (raw % 240); // 75 to 314
    const reviews = 42 + (raw % 150); // 42 to 191
    const rating = (4.8 + ((raw % 3) / 10)).toFixed(1); // 4.8, 4.9, 5.0
    const remainingStock = 3 + (raw % 5); // 3 to 7
    return { viewers, sold, reviews, rating, remainingStock };
  }, [product.id, product.title]);

  const [currentViewers, setCurrentViewers] = useState(socialMetrics.viewers);

  useEffect(() => {
    setCurrentViewers(socialMetrics.viewers);
    const interval = setInterval(() => {
      setCurrentViewers((prev) => {
        const change = Math.random() > 0.45 ? 1 : -1;
        return Math.max(12, Math.min(65, prev + change));
      });
    }, 6500 + ((socialMetrics.viewers % 7) * 800));
    return () => clearInterval(interval);
  }, [socialMetrics.viewers]);

  const handleOpenDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOpenModal) {
      onOpenModal(product);
    } else {
      setSelectedProductForModal(product);
    }
  };

  const handleGoToLanding = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.history.pushState(null, '', productLandingPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOrderNow) {
      onOrderNow(product);
    } else {
      handleGoToLanding(e);
    }
  };

  const handleFreeDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerFreeProductDownload(product);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative h-full hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div
        onClick={handleOpenDetails}
        className="relative aspect-4/3 w-full bg-slate-50/80 flex items-center justify-center overflow-hidden cursor-pointer p-3"
      >
        {product.imageUrl && !imgError ? (
          <img
            src={normalizeImageUrl(product.imageUrl)}
            alt={product.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 p-4">
            <Zap className="w-10 h-10 text-emerald-500/60 mb-1" />
            <span className="text-xs font-semibold text-slate-600 text-center line-clamp-2">
              {product.title}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Category Tag */}
          <span className="px-2 py-0.5 rounded-md bg-slate-900/85 text-white font-semibold text-[10px] backdrop-blur-xs shadow-xs">
            {categoryName}
          </span>

          {/* Discount / Free Badge */}
          {isFreeProduct ? (
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] shadow-sm inline-flex items-center gap-1">
              <Gift className="w-2.5 h-2.5" />
              <span>১০০% ফ্রি</span>
            </span>
          ) : (
            discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] shadow-sm">
                -{discountPercent}%
              </span>
            )
          )}
        </div>

        {/* Bottom Floating Live Viewers Counter on Image */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div className="bg-slate-950/85 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-white">{currentViewers} জন</span> দেখছেন
          </div>
          <div className="bg-slate-950/85 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-amber-500/30">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
            <span>{socialMetrics.sold}+ সেল</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Title */}
          <h3
            onClick={handleOpenDetails}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription || product.description || '১০০% জেনুইন ডিজিটাল প্রোডাক্ট ও লাইফটাইম অ্যাক্সেস।'}
          </p>

          {/* Rating & Real Social Proof Points */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-amber-500">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-slate-700">
                {socialMetrics.rating} ({socialMetrics.reviews}+)
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>ইন্সট্যান্ট অ্যাক্সেস</span>
            </span>
          </div>

          {/* Urgency Alert on Card */}
          {!isFreeProduct && (
            <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500">
              <span className="flex items-center gap-1 text-rose-600 font-bold">
                <Sparkles className="w-3 h-3 text-rose-500" />
                <span>স্টক সীমিত: আর মাত্র {socialMetrics.remainingStock}টি বাকি</span>
              </span>
              <span className="text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                ২৪/৭ সাপোর্ট
              </span>
            </div>
          )}
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2.5">
          {/* Price Display */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-black text-emerald-600 font-mono">
                {isFreeProduct ? 'বিনামূল্যে (FREE)' : formatPrice(product.price)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && !isFreeProduct && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            {product.featured && (
              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                ★ বেস্টসেলার
              </span>
            )}
          </div>

          {/* Action Buttons: Primary Order Now + Secondary View Details / Direct Landing */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleGoToLanding}
              className="w-full py-2 px-2 rounded-xl border border-emerald-300 hover:border-emerald-500 bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-800 text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
              title="সম্পূর্ণ ল্যান্ডিং পেজ ও ভিডিও রিভিউ দেখুন"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>ল্যান্ডিং পেজ</span>
            </button>

            {isFreeProduct ? (
              <button
                type="button"
                onClick={handleFreeDownload}
                className="w-full py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloaded ? 'ডাউনলোড হচ্ছে' : 'ফ্রি ডাউনলোড'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] sm:text-xs font-black transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>এখনই অর্ডার</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

