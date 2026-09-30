import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Zap, Eye, Download, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, calculateDiscount, triggerFreeProductDownload, normalizeImageUrl } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { getProductPath, getProductSlug } from '../../utils/slugify';

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

  const handleOpenDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOpenModal) {
      onOpenModal(product);
    } else {
      setSelectedProductForModal(product);
    }
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOrderNow) {
      onOrderNow(product);
    } else {
      window.history.pushState(null, '', productLandingPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {/* Category Tag (Clean, Unboxed) */}
          <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-white font-semibold text-[10px] backdrop-blur-xs shadow-xs">
            {categoryName}
          </span>

          {/* Discount Badge */}
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

          {/* Rating & Trust Points */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              ))}
              <span className="text-[11px] font-bold text-slate-700 ml-1">5.0</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>ইন্সট্যান্ট অ্যাক্সেস</span>
            </span>
          </div>
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

          {/* Action Buttons: Primary Order Now + Secondary View Details */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleOpenDetails}
              className="w-full py-2 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>বিস্তারিত দেখুন</span>
            </button>

            {isFreeProduct ? (
              <button
                type="button"
                onClick={handleFreeDownload}
                className="w-full py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloaded ? 'ডাউনলোড হচ্ছে' : 'ফ্রি ডাউনলোড'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
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
