import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  ArrowRight,
  ArrowUpDown,
  CheckCircle2,
  Mail,
  Smartphone,
  Headphones,
  SlidersHorizontal,
  ChevronRight,
  Clock,
  Gift,
  Star,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Category } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { HeroSection } from '../sections/HeroSection';
import { EmptyState } from '../components/common/EmptyState';
import { PackageOpen } from 'lucide-react';
import { getProductSlug } from '../utils/slugify';

interface HomePageProps {
  onNavigateToShop: (categoryId?: string) => void;
  onNavigateToAdmin: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToShop,
  onSelectProduct,
}) => {
  const { products, categories, loading, setSelectedCategory } = useStore();

  // Filter & Search State for "All Products" section on Homepage
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'newest'>('popular');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // 1. Popular Products (Featured or first 4-8 products)
  const popularProducts = useMemo(() => {
    const featured = products.filter((p) => p.featured && p.available !== false);
    if (featured.length >= 4) return featured.slice(0, 8);
    return products.filter((p) => p.available !== false).slice(0, 8);
  }, [products]);

  // 2. Featured Offer Product (Main combo package or first product)
  const featuredOfferProduct = useMemo(() => {
    return products.find((p) => p.slug?.includes('bundle') || p.slug?.includes('combo') || p.featured) || products[0];
  }, [products]);

  // 3. Filtered & Sorted All Products
  const filteredAllProducts = useMemo(() => {
    let list = products.filter((p) => p.available !== false);

    // Category filter
    if (selectedCatFilter !== 'all') {
      if (selectedCatFilter === 'offers') {
        list = list.filter((p) => p.oldPrice && p.oldPrice > p.price);
      } else if (selectedCatFilter === 'free') {
        list = list.filter((p) => p.isFree || p.price === 0);
      } else {
        list = list.filter((p) => p.categoryId === selectedCatFilter);
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
      // default 'popular'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCatFilter, searchQuery, sortBy]);

  const activeCategories = useMemo(() => {
    return categories.filter((c) => c.active !== false);
  }, [categories]);

  const scrollToAllProducts = () => {
    const el = document.getElementById('all-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToProductPurchase = (product: Product) => {
    const landingPath = `/purchase/${getProductSlug(product)}`;
    window.history.pushState(null, '', landingPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-['Hind_Siliguri',sans-serif] space-y-12 sm:space-y-16 pb-20">
      {/* 1. HERO BANNER SECTION */}
      <section className="pt-2 sm:pt-4">
        <HeroSection
          onShopClick={(catId) => {
            if (catId) {
              setSelectedCategory(catId);
              onNavigateToShop(catId);
            } else {
              scrollToAllProducts();
            }
          }}
        />

        {/* Hero Quick Action Bar with 2 Clear CTAs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>আজকের স্পেশাল অফার চলমান</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                এক ক্লিকেই পেয়ে যান আপনার কাঙ্ক্ষিত ডিজিটাল রিসোর্স ও সফটওয়্যার
              </h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToAllProducts}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <span>সকল প্রোডাক্ট</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigateToProductPurchase(featuredOfferProduct)}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 hover:shadow-emerald-600/40 cursor-pointer whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
                <span>🔥 আজকের স্পেশাল অফার</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED OFFERS / LIMITED TIME SPOTLIGHT */}
      {featuredOfferProduct && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>🔥 Limited Offer / Best Value Spotlight</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  {featuredOfferProduct.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                  {featuredOfferProduct.shortDescription ||
                    'সম্পূর্ণ অটোমেটেড ডিজিটাল প্রোডাক্ট বিজনেস সেটআপ রোডম্যাপ ও ১০০TB+ প্রিমিয়াম ক্লাউড রিসোর্স। লাইফটাইম অ্যাক্সেস ও ২৪/৭ ভিআইপি সাপোর্ট সহ।'}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <span className="text-xs text-slate-400 block">ক্লাউড ড্রাইভ</span>
                    <strong className="text-sm font-extrabold text-emerald-400">১০০TB+ রিসোর্স</strong>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <span className="text-xs text-slate-400 block">ডেলিভারি</span>
                    <strong className="text-sm font-extrabold text-teal-400">ইন্সট্যান্ট অটো এক্সেস</strong>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <span className="text-xs text-slate-400 block">মেয়াদ</span>
                    <strong className="text-sm font-extrabold text-blue-400">লাইফটাইম সাপোর্ট</strong>
                  </div>
                </div>
              </div>

              {/* Price & CTA Action */}
              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 block">অফার প্রাইস:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                        ৳{featuredOfferProduct.price}
                      </span>
                      {featuredOfferProduct.oldPrice && (
                        <span className="text-sm text-slate-400 line-through font-mono">
                          ৳{featuredOfferProduct.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                    লিমিটেড অফার
                  </span>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleNavigateToProductPurchase(featuredOfferProduct)}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>এখনই অর্ডার করুন (৳{featuredOfferProduct.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PayBD গেটওয়ে দিয়ে নিরাপদ পেমেন্ট ও ইন্সট্যান্ট এক্সেস</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. POPULAR PRODUCTS (🔥 জনপ্রিয় প্রোডাক্ট) */}
      {popularProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
                <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>টপ সেলিং আইটেম</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                🔥 জনপ্রিয় প্রোডাক্ট
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                গ্রাহকদের সবচেয়ে পছন্দের এবং সর্বাধিক ব্যবহৃত ডিজিটাল রিসোর্স ও টুলস
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToAllProducts}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              <span>সকল পণ্য দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Layout: Desktop 4-col, Tablet 3-col, Mobile 2-col */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. CATEGORIES NAVIGATION */}
      {activeCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📁</span>
                <span>ক্যাটাগরি সমূহ</span>
              </h3>
              <span className="text-xs text-slate-500">আপনার পছন্দের ক্যাটাগরি বেছে নিন</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  setSelectedCatFilter('all');
                  scrollToAllProducts();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCatFilter === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ✨ সকল প্রোডাক্ট ({products.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCatFilter('offers');
                  scrollToAllProducts();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCatFilter === 'offers'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>হট ডিসকাউন্ট</span>
              </button>

              {activeCategories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                const isSelected = selectedCatFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCatFilter(cat.id);
                      scrollToAllProducts();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.icon || '•'}</span>
                    <span>{cat.name}</span>
                    {count > 0 && <span className="text-[10px] opacity-75">({count})</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. ALL PRODUCTS (✨ সকল প্রোডাক্ট) - COMPLETE DISCOVERY ENGINE */}
      <section id="all-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Section Heading & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>কমপ্লিট ক্যাটালগ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ✨ সকল প্রোডাক্ট
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                মোট {filteredAllProducts.length} টি ডিজিটাল পণ্য পাওয়া গেছে
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Field */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="প্রোডাক্ট খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 outline-none bg-white transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative min-w-[160px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-700 outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="popular">জনপ্রিয়তা</option>
                  <option value="newest">নতুন প্রোডাক্ট</option>
                  <option value="price_asc">মূল্য: কম থেকে বেশি</option>
                  <option value="price_desc">মূল্য: বেশি থেকে কম</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredAllProducts.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {filteredAllProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenModal={onSelectProduct}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredAllProducts.length && (
                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-200 hover:border-slate-300 text-xs sm:text-sm font-extrabold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>আরও প্রোডাক্ট দেখুন (+{filteredAllProducts.length - visibleCount})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 bg-white rounded-3xl border border-slate-200">
              <EmptyState
                icon={PackageOpen}
                title="কোনো প্রোডাক্ট পাওয়া যায়নি"
                description="আপনার সার্চ অনুযায়ী কোনো পণ্য মেলেনি। অন্য কি-ওয়ার্ড দিয়ে খুঁজুন অথবা ফিল্টার পরিবর্তন করুন।"
                actionText="সকল প্রোডাক্ট দেখুন"
                onAction={() => {
                  setSearchQuery('');
                  setSelectedCatFilter('all');
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 5.5 CUSTOMER REVIEWS & SOCIAL PROOF SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold px-3 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                <span>ভেরিফায়েড গ্রাহকদের প্রতিক্রিয়া</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                আমাদের সন্তুষ্ট গ্রাহকদের আসল রিভিউ ও অভিজ্ঞতা
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                একদম রিয়েল অভিজ্ঞতা — তারা কীভাবে মুহূর্তেই ড্রাইভে এক্সেস পেয়েছেন এবং কাজে লাগাচ্ছেন
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-4 shrink-0">
              <div className="text-center border-r border-slate-200 pr-4">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">৪.৯</span>
                <span className="text-[10px] text-slate-400 block">/ ৫.০ স্কোর</span>
              </div>
              <div>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 mt-1 block">
                  ১,৪৫০+ সফল অর্ডার ও ডেলিভারি
                </span>
              </div>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Review 1 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:border-emerald-400/80 transition-all shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>ভেরিফায়েড ক্রেতা</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  "বিকাশে পেমেন্ট সম্পন্ন করার মাত্র ২ মিনিটের ভেতর ইমেইল ও স্ক্রিনে সরাসরি গুগল ড্রাইভ লিঙ্ক পেয়ে গেছি! এত বড় ১০০TB কালেকশনে প্রতিটা ক্যাটাগরি সুশৃঙ্খলভাবে সাজানো।"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  MR
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">মোহাম্মদ রাশেদুল হক</h4>
                  <span className="text-[10px] text-slate-400">চট্টগ্রাম • গ্রাফিক্স ডিজাইনার</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:border-emerald-400/80 transition-all shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>ভেরিফায়েড ক্রেতা</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  "ফ্রিল্যান্সারদের জন্য ক্যানভা প্রিমিয়াম টেমপ্লেট ও মোশন গ্রাফিক্স রিসোর্সগুলো এক কথায় সোনার খনি! এই দামে এত রিসোর্স কোথাও পাওয়া অসম্ভব। নাসির হাবকে অসংখ্য ধন্যবাদ।"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  TA
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">তানভীর আহমেদ</h4>
                  <span className="text-[10px] text-slate-400">ঢাকা • ডিজিটাল মার্কেটার</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:border-emerald-400/80 transition-all shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>ভেরিফায়েড ক্রেতা</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  "আমি ড্রাইভ লিংক ডাউনলোড করার সময় একটু সমস্যায় পড়েছিলাম, হোয়াটসঅ্যাপে মেসেজ দেওয়ার ৩ মিনিটের মধ্যে টিম সাপোর্ট দিয়ে সমাধান করে দিল। লাইফটাইম অ্যাক্সেসের প্রতিশ্রুতি শতভাগ সত্যি।"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  SK
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">সাজ্জাদুল করিম</h4>
                  <span className="text-[10px] text-slate-400">সিলেট • ভিডিও এডিটর</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Quick CTA Strip */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 fill-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">
                  আজকের মেগা অফারে নিজের ডিজিটাল প্রোডাক্ট বান্ডেল সংগ্রহ করুন
                </h4>
                <p className="text-xs text-slate-300">
                  ১০০TB ক্লাউড ড্রাইভ রিসোর্স ও আজীবন অ্যাক্সেস মাত্র ৳২৯৯ টাকায়!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleNavigateToProductPurchase(featuredOfferProduct)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>অফারটি এখনই নিন</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. TRUST & SUPPORT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              কেন নাসির ডিজিটাল হাব থেকে কেনাকাটা করবেন?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ১০০% নিরাপদ, দ্রুততম ডেলিভারি ও বিশ্বস্ত ডিজিটাল সেবার নিশ্চয়তা
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">নিরাপদ পেমেন্ট</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                বিকাশ, নগদ ও কার্ডে পে করার সম্পূর্ণ এনক্রিপ্টেড PayBD গেটওয়ে।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">ইন্সট্যান্ট ডেলিভারি</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই স্ক্রিনে ড্রাইভ ও অ্যাক্সেস লিংক।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">ইমেইল ডেলিভারি</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                আপনার ইমেইলে আজীবন অ্যাক্সেসের যাবতীয় ফাইল ও ইন্সট্রাকশন ব্যাকআপ।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">২৪/৭ ভিআইপি সাপোর্ট</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                যেকোনো প্রয়োজনে হোয়াটসঅ্যাপ ও টেলিগ্রামে ডেডিকেটেড হেল্পলাইন।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">মোবাইল ও পিসি সাপোর্ট</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                মোবাইল বা কম্পিউটার যেকোনো ডিভাইসে সহজে ব্যবহার ও ডাউনলোড।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mx-auto space-y-5 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              আপনার পছন্দের ডিজিটাল প্রোডাক্টটি এখনই নিন
            </h2>
            <p className="text-xs sm:text-base text-emerald-100 max-w-xl mx-auto">
              দেরি না করে আজই আপনার ব্যবসা বা ফ্রিল্যান্সিং ক্যারিয়ারকে আরও এক ধাপ এগিয়ে নিয়ে যান প্রিমিয়াম ডিজিটাল টুলস ও বান্ডেল দিয়ে।
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={scrollToAllProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm sm:text-base hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>সকল প্রোডাক্ট দেখুন</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>
              <a
                href="/purchase"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 fill-slate-950" />
                <span>১০০TB মেগা বান্ডেল অর্ডার (৳২৯৯)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
