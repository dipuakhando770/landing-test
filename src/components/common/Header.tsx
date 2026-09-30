import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Phone,
  Menu,
  X,
  Sparkles,
  Flame,
  ChevronDown,
  LayoutGrid,
  CheckCircle2,
  Package,
  HelpCircle,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { sanitizeWhatsAppNumber } from '../../utils/formatters';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentView: 'home' | 'shop' | 'admin' | 'product' | 'landing';
  setCurrentView: (view: 'home' | 'shop' | 'admin' | 'product' | 'landing') => void;
  onSelectCategory?: (categoryId?: string) => void;
  onOpenOrderHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onSelectCategory,
  onOpenOrderHistory,
}) => {
  const { settings, categories, searchQuery, setSearchQuery, setSelectedCategory, selectedCategory } = useStore();
  const { cartCount, setIsCartOpen } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [userOrdersCount, setUserOrdersCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const data = localStorage.getItem('ndh_user_order_history_v1');
      return data ? JSON.parse(data).length : 0;
    } catch {
      return 0;
    }
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const data = localStorage.getItem('ndh_user_order_history_v1');
        setUserOrdersCount(data ? JSON.parse(data).length : 0);
      } catch {
        setUserOrdersCount(0);
      }
    };
    window.addEventListener('ndh_user_orders_updated', handleUpdate);
    return () => window.removeEventListener('ndh_user_orders_updated', handleUpdate);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    if (currentView !== 'shop') {
      setCurrentView('shop');
      window.history.pushState(null, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (catId?: string) => {
    setSelectedCategory(catId || null);
    setCategoryDropdownOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setCurrentView('shop');
      window.history.pushState(null, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (path: string, view: 'home' | 'shop') => {
    setSelectedCategory(null);
    setCurrentView(view);
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setSelectedCategory(null);
    setCurrentView('landing');
    window.history.pushState(null, '', '/purchase');
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayCategories = categories.filter((c) => c.active !== false);

  const whatsappPhone = settings.whatsappNumber || '01962780922';
  const targetNumber = sanitizeWhatsAppNumber(whatsappPhone);
  const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent('আসসালামু আলাইকুম! আমি নাসির ডিজিটাল হাব থেকে প্রোডাক্ট সম্পর্কে জানতে চাই।')}`;

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* 1. Top Announcement Ticker (Smooth Horizontal Movement / Marquee) */}
      {settings.announcement?.enabled !== false && (() => {
        const announcementText =
          settings.announcement?.text ||
          '🔥 আজকের বিশেষ অফার — ১০০TB ডিজিটাল বান্ডেল ও প্রিমিয়াম সফটওয়্যার লাইসেন্সে পাচ্ছেন আকর্ষণীয় ছাড়!';
        const announcementLink = settings.announcement?.link || '';

        const handleTickerClick = () => {
          if (!announcementLink) return;
          if (announcementLink.startsWith('http')) {
            window.open(announcementLink, '_blank', 'noopener,noreferrer');
          } else if (announcementLink.startsWith('#')) {
            const el = document.querySelector(announcementLink);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          } else if (announcementLink.startsWith('/')) {
            window.location.href = announcementLink;
          }
        };

        return (
          <div className="bg-[#070b14] text-slate-200 text-xs py-2 px-3 sm:px-4 border-b border-slate-800 relative overflow-hidden select-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
              {/* Left Badge */}
              <div className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-sm z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>🔥 ঘোষণা</span>
              </div>

              {/* Center Moving Ticker with Left/Right Fades */}
              <div className="flex-1 overflow-hidden relative cursor-pointer group" onClick={handleTickerClick}>
                {/* Subtle Edge Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#070b14] to-transparent z-1 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#070b14] to-transparent z-1 pointer-events-none" />

                <div className="animate-ticker-marquee text-xs sm:text-sm font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors py-0.5 flex items-center">
                  <span className="inline-flex items-center gap-3 pr-8">
                    <span>{announcementText}</span>
                    <span className="text-amber-400 font-extrabold text-[11px]">✦ লাইফটাইম অ্যাক্সেস</span>
                    <span className="text-teal-300 font-extrabold text-[11px]">✦ ২৪/৭ সাপোর্ট</span>
                    <span className="text-rose-400 font-extrabold text-[11px]">✦ ইনস্ট্যান্ট ডেলিভারি</span>
                  </span>
                  <span className="inline-flex items-center gap-3 pr-8">
                    <span>{announcementText}</span>
                    <span className="text-amber-400 font-extrabold text-[11px]">✦ লাইফটাইম অ্যাক্সেস</span>
                    <span className="text-teal-300 font-extrabold text-[11px]">✦ ২৪/৭ সাপোর্ট</span>
                    <span className="text-rose-400 font-extrabold text-[11px]">✦ ইনস্ট্যান্ট ডেলিভারি</span>
                  </span>
                </div>
              </div>

              {/* Right Live Support */}
              <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-300 shrink-0 z-10">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>২৪/৭ লাইভ সাপোর্ট</span>
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors font-mono"
                >
                  {whatsappPhone}
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigateTo('/', 'home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none"
            aria-label={settings.websiteName || 'Nasir Digital Hub'}
          >
            <BrandLogo variant="header" />
          </button>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-xl hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center border-2 border-emerald-600/80 hover:border-emerald-600 rounded-full overflow-hidden bg-white shadow-xs transition-colors">
            <select
              value={selectedCategory || ''}
              onChange={(e) => {
                const cat = e.target.value;
                setSelectedCategory(cat || null);
                if (currentView !== 'shop') {
                  setCurrentView('shop');
                  window.history.pushState(null, '', '/shop');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="bg-slate-50 border-r border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="">সকল ক্যাটাগরি</option>
              {displayCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="প্রোডাক্ট খুঁজুন (যেমন: Canva, Bundle, Video Editing)..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />

            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>খুঁজুন</span>
            </button>
          </form>
        </div>

        {/* Right Zone Controls: Orders, WhatsApp, Cart, Menu */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* WhatsApp Quick CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>সাপোর্ট</span>
          </a>

          {/* User Orders History Button */}
          {onOpenOrderHistory && (
            <button
              type="button"
              onClick={onOpenOrderHistory}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              title="আমার পূর্ববর্তী অর্ডারসমূহ"
            >
              <Package className="w-3.5 h-3.5 text-slate-600" />
              <span>আমার অর্ডার</span>
              {userOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                  {userOrdersCount}
                </span>
              )}
            </button>
          )}

          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title="শপিং ব্যাগ"
          >
            <ShoppingBag className="w-5 h-5 text-slate-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50 cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Sub-Navigation Link Bar (Desktop: Home, All Products, Categories, Offers, About, Support) */}
      <div className="bg-slate-50/90 border-t border-slate-200 px-4 sm:px-6 lg:px-8 hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2">
          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {/* Category Dropdown Button */}
            <div className="relative mr-2" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  categoryDropdownOpen
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>ক্যাটাগরি সমূহ</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Flyout Panel */}
              {categoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="p-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      ক্যাটাগরি বেছে নিন
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(undefined)}
                      className="text-[11px] font-bold text-emerald-600 hover:underline"
                    >
                      সব দেখুন
                    </button>
                  </div>

                  <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(undefined)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                        !selectedCategory
                          ? 'bg-emerald-50 text-emerald-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'
                      }`}
                    >
                      <span>✨ সকল প্রোডাক্ট</span>
                      {!selectedCategory && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>

                    {displayCategories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'
                          }`}
                        >
                          <span className="truncate">{cat.icon || '📁'} {cat.name}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav: Home */}
            <button
              type="button"
              onClick={() => navigateTo('/', 'home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                currentView === 'home' && !selectedCategory
                  ? 'bg-emerald-100/70 text-emerald-800'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-white'
              }`}
            >
              Home
            </button>

            {/* All Products */}
            <button
              type="button"
              onClick={() => navigateTo('/shop', 'shop')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                currentView === 'shop' && !selectedCategory
                  ? 'bg-emerald-100/70 text-emerald-800'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-white'
              }`}
            >
              All Products
            </button>

            {/* Offers */}
            <button
              type="button"
              onClick={navigateToLanding}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Offers</span>
            </button>

            {/* Category Quick Tabs */}
            {displayCategories.slice(0, 4).map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-100/70 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-white'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </nav>

          {/* Right Highlights */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={navigateToLanding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>১০০TB মেগা বান্ডেল (৳২৯৯)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-xl animate-fadeIn">
          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-emerald-600 rounded-xl overflow-hidden bg-white shadow-xs">
            <input
              type="text"
              placeholder="প্রোডাক্ট খুঁজুন..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold"
            >
              Search
            </button>
          </form>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => navigateTo('/', 'home')}
              className="p-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-left"
            >
              🏠 Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/shop', 'shop')}
              className="p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-left"
            >
              🛍️ All Products
            </button>
            <button
              type="button"
              onClick={navigateToLanding}
              className="p-3 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>🔥 Mega Offers</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-teal-50 text-teal-900 hover:bg-teal-100 text-left flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>💬 24/7 Support</span>
            </a>
          </div>

          {/* Mobile Categories List */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              ক্যাটাগরি ব্রাউজ করুন
            </p>
            <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => handleCategoryClick(undefined)}
                className="p-2 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 text-left"
              >
                ✨ সকল প্রোডাক্ট
              </button>
              {displayCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="p-2 rounded-lg bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 text-left truncate"
                >
                  {cat.icon || '📁'} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
