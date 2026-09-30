import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Settings,
  Flame,
  ShieldCheck,
  ShoppingCart,
  LogOut,
  Store,
  Zap,
  CreditCard,
  Activity,
  Menu,
  X,
  Search,
  BellRing,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Moon,
  Globe,
  ChevronLeft,
  ShoppingBag,
  Bell,
  Maximize2,
  Calendar,
  Command,
  FileText,
  User,
  Phone,
  LayoutGrid
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { ProductManager } from './ProductManager';
import { CategoryManager } from './CategoryManager';
import { HeroSettingsManager } from './HeroSettingsManager';
import { StoreSettingsManager } from './StoreSettingsManager';
import { CampaignsManager } from './CampaignsManager';
import { BenefitsManager } from './BenefitsManager';
import { OrdersManager } from './OrdersManager';
import { PaybdManager } from './PaybdManager';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SeoHealthDashboard } from './SeoHealthDashboard';
import { LandingPagesManager } from './LandingPagesManager';
import { subscribeToOrders } from '../firebase/services';
import { Order } from '../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const AdminLayout: React.FC<{ onBackToStore: () => void }> = ({ onBackToStore }) => {
  const { user, isAdmin, logout } = useAuth();
  const { settings, products, categories, campaigns } = useStore();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [liveVisitorsCount, setLiveVisitorsCount] = useState<number>(Math.floor(Math.random() * 5) + 3);

  // Global Search Engine State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    orders: Order[];
    products: typeof products;
    pages: { id: string; label: string; group: string }[];
  }>({ orders: [], products: [], pages: [] });

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeToOrders((newOrders: Order[]) => {
      setOrders(newOrders);
      const pending = newOrders.filter(
        (o) =>
          o.status === 'pending' ||
          (!o.status && o.paymentStatus !== 'paid' && o.paymentStatus !== 'completed')
      ).length;
      setPendingOrdersCount(pending);
    });

    // Simulate real-time online visitor fluctuation
    const interval = setInterval(() => {
      setLiveVisitorsCount(prev => {
        const diff = Math.random() > 0.5 ? 1 : -1;
        return Math.max(3, prev + diff);
      });
    }, 15000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  const activeBannersCount = (settings.heroSlides || []).filter((s) => s.active !== false).length;
  const isPaybdActive = settings.paybd?.enabled !== false;

  const navItems: NavGroup[] = [
    {
      group: 'মূল মেনু',
      items: [
        { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
        {
          id: 'orders',
          label: 'অর্ডার ও অনুমোদন',
          icon: ShoppingCart,
          badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} টি পেন্ডিং` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-black animate-pulse',
        },
        { id: 'analytics', label: 'লাইভ অ্যানালিটিক্স', icon: Activity },
      ],
    },
    {
      group: 'মার্কেটিং ও ফানেল',
      items: [
        {
          id: 'landing_pages',
          label: 'ল্যান্ডিং পেজ ম্যানেজার',
          icon: ShoppingBag,
          badge: 'New',
          badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-black',
        },
        { id: 'hero', label: 'হিরো ব্যানার স্লাইডার', icon: Sparkles, badge: activeBannersCount },
        { id: 'campaigns', label: 'সাপ্তাহিক অফার', icon: Flame, badge: campaigns.length },
        { id: 'benefits', label: 'সুবিধাসমূহ (Trust)', icon: ShieldCheck },
      ],
    },
    {
      group: 'ক্যাটালগ ম্যানেজমেন্ট',
      items: [
        { id: 'products', label: 'পণ্যসমূহ (Products)', icon: Package, badge: products.length },
        { id: 'categories', label: 'ক্যাটাগরি সমূহ', icon: Layers, badge: categories.length },
      ],
    },
    {
      group: 'সিস্টেম ও কনফিগারেশন',
      items: [
        {
          id: 'paybd',
          label: 'PayBD পেমেন্ট গেটওয়ে',
          icon: CreditCard,
          badge: isPaybdActive ? 'সক্রিয়' : 'বন্ধ',
          badgeColor: isPaybdActive ? 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400',
        },
        {
          id: 'seo',
          label: 'SEO ও কনভার্সন মনিটর',
          icon: Globe,
          badge: 'রেডি',
          badgeColor: 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/30',
        },
        { id: 'settings', label: 'ওয়েবসাইট ও SMTP সেটিংস', icon: Settings },
      ],
    },
  ];

  // Live Multi-Entity Search Handler
  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults({ orders: [], products: [], pages: [] });
      setShowSearchDropdown(false);
      return;
    }

    const q = val.toLowerCase();

    // 1. Search Sidebar Tabs / Pages
    const matchedPages: any[] = [];
    navItems.forEach((group) => {
      group.items.forEach((item) => {
        if (item.label.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)) {
          matchedPages.push({
            id: item.id,
            label: item.label,
            group: group.group
          });
        }
      });
    });

    // 2. Search Products
    const matchedProducts = products.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      (p.slug && p.slug.toLowerCase().includes(q)) ||
      p.id.toLowerCase().includes(q)
    );

    // 3. Search Orders (By ID, name, email, phone, transaction ID)
    const matchedOrders = orders.filter((o) =>
      o.id.toLowerCase().includes(q) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
      (o.customerAddress && o.customerAddress.toLowerCase().includes(q)) ||
      ((o as any).customerEmail && (o as any).customerEmail.toLowerCase().includes(q)) ||
      (o.paymentTrxId && o.paymentTrxId.toLowerCase().includes(q)) ||
      ((o as any).transactionId && (o as any).transactionId.toLowerCase().includes(q))
    );

    setSearchResults({
      orders: matchedOrders.slice(0, 5),
      products: matchedProducts.slice(0, 5),
      pages: matchedPages.slice(0, 4)
    });
    setShowSearchDropdown(true);
  };

  const handleSelectSearchResult = (type: 'page' | 'product' | 'order', id: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    if (type === 'page') {
      setActiveTab(id);
    } else if (type === 'product') {
      setActiveTab('products');
    } else if (type === 'order') {
      setActiveTab('orders');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-200 flex flex-col antialiased font-['Hind_Siliguri',sans-serif] selection:bg-emerald-500 selection:text-white">
      
      {/* 1. TOP PREMIUM COMMAND HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu & Brand Lockup */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.websiteName}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                    ND
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-sm sm:text-base text-white tracking-tight leading-none">
                    {settings.websiteName || 'Nasir Digital Hub'}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    🟢 {liveVisitorsCount} Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 hidden sm:block">
                  বিজনেস ইন্টেলিজেন্স ও সুপার অ্যাডমিন প্যানেল
                </p>
              </div>
            </div>
          </div>

          {/* 2. GLOBAL SEARCH ENGINE (MIDDLE ZONE) */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-md relative z-50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="অর্ডার ID, পণ্য, গ্রাহক বা পেজ খুঁজুন (Global Search)..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                className="w-full bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 focus:border-indigo-500 rounded-xl pl-11 pr-10 py-2.5 text-xs text-white focus:outline-none transition-all shadow-inner placeholder-slate-500"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-700 flex items-center gap-0.5 select-none">
                <Command className="w-2.5 h-2.5" /> K
              </span>
            </div>

            {/* Smart Search Dropdown Popover */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-4 max-h-[420px] overflow-y-auto animate-in fade-in duration-200">
                
                {/* Pages Result */}
                {searchResults.pages.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">মেনু ও পেজেস ({searchResults.pages.length})</div>
                    <div className="grid grid-cols-1 gap-1">
                      {searchResults.pages.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectSearchResult('page', p.id)}
                          className="w-full flex items-center justify-between text-left p-2 rounded-lg bg-slate-950/40 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-all text-xs"
                        >
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
                            {p.label}
                          </span>
                          <span className="text-[10px] text-slate-500">{p.group}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Result */}
                {searchResults.products.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">পণ্য ক্যাটালগ ({searchResults.products.length})</div>
                    <div className="grid grid-cols-1 gap-1">
                      {searchResults.products.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectSearchResult('product', p.id)}
                          className="w-full flex items-center gap-3 text-left p-2 rounded-lg bg-slate-950/40 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-all text-xs"
                        >
                          <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-white truncate">{p.title}</div>
                            <div className="text-[10px] text-emerald-400 font-bold">৳{p.price} BDT</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Orders Result */}
                {searchResults.orders.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">গ্রাহকের অর্ডার ও ইনভয়েস ({searchResults.orders.length})</div>
                    <div className="grid grid-cols-1 gap-1">
                      {searchResults.orders.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => handleSelectSearchResult('order', o.id)}
                          className="w-full flex items-center justify-between text-left p-2 rounded-lg bg-slate-950/40 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 transition-all text-xs"
                        >
                          <div className="min-w-0 flex-1 pr-4">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span className="text-slate-400 font-mono">#{o.id.slice(0, 8)}</span>
                              <span className="truncate">{o.customerName}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                              <Phone className="w-2.5 h-2.5" /> {o.customerPhone}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-black text-emerald-400 font-mono">৳{o.total} BDT</span>
                            <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{o.status || 'pending'}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.pages.length === 0 && searchResults.products.length === 0 && searchResults.orders.length === 0 && (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    কোনো মিল পাওয়া যায়নি। অন্য কিছু দিয়ে চেষ্টা করুন।
                  </div>
                )}

              </div>
            )}
          </div>

          {/* 3. RIGHT ZONE ACTIONS */}
          <div className="flex items-center gap-3">
            
            {/* Active Pending Orders Jump Alert */}
            {pendingOrdersCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-black hover:bg-amber-500/20 transition-all animate-pulse"
                title="অপেক্ষমাণ অর্ডার অ্যাপ্রুভ করুন"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>{pendingOrdersCount} টি অপেক্ষমাণ</span>
              </button>
            )}

            {/* Quick Add Product */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/10 text-indigo-400 hover:text-white border border-indigo-500/20 text-xs font-bold transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>নতুন পণ্য</span>
            </button>

            {/* Live Store Exit */}
            <button
              type="button"
              onClick={onBackToStore}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all active:scale-95 shrink-0"
            >
              <Store className="w-3.5 h-3.5" />
              <span>লাইভ স্টোর</span>
            </button>

            {/* Administrator Profile Card */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800 shrink-0">
              <div className="hidden xl:block text-right">
                <span className="block text-xs font-bold text-slate-100">{user.displayName || 'Super Admin'}</span>
                <span className="block text-[10px] text-slate-400 truncate max-w-[120px]">{user.email}</span>
              </div>

              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 transition-colors"
                title="লগআউট করুন"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 relative">
        
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside
          className={`lg:shrink-0 transition-all duration-300 ${
            sidebarOpen
              ? 'fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-6 overflow-y-auto block'
              : sidebarCollapsed
              ? 'lg:w-20 hidden lg:block'
              : 'lg:w-64 hidden lg:block'
          }`}
        >
          {sidebarOpen && (
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 lg:hidden">
              <h3 className="font-black text-white text-base">মেনু ও নেভিগেশন</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Sidebar Nav Items Container */}
          <div className="space-y-6 sticky top-24">
            
            {navItems.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                {!sidebarCollapsed && (
                  <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-500 leading-none">
                    {group.group}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all relative group/item cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20 border border-emerald-500/40'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800/60'
                        }`}
                        title={sidebarCollapsed ? tab.label : ''}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 transition-transform group-hover/item:scale-105 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          {!sidebarCollapsed && <span>{tab.label}</span>}
                        </div>

                        {tab.badge !== undefined && !sidebarCollapsed && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                              tab.badgeColor ||
                              (isActive ? 'bg-white/20 text-white' : 'bg-slate-950 text-slate-300 border border-slate-800')
                            }`}
                          >
                            {tab.badge}
                          </span>
                        )}

                        {/* Collapsed Tooltip */}
                        {sidebarCollapsed && (
                          <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-[11px] font-bold rounded-xl border border-slate-800 shadow-2xl opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                            {tab.label}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Sidebar Collapse Toggle Button (Desktop Only) */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-full p-2.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white transition-all text-xs font-bold cursor-pointer"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4 mr-2" />}
              {!sidebarCollapsed && <span>মেনু ছোট করুন</span>}
            </button>

            {/* Micro Cloud Sync Card */}
            {!sidebarCollapsed && (
              <div className="p-4 rounded-3xl bg-slate-900/40 border border-slate-850 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>ক্লাউড সিঙ্ক্রোনাইজেশন</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  সকল অর্ডার ডাটা, লাইভ মেটা পিক্সেল ইভেন্টস ও সিস্টেম কনফিগারেশন সরাসরি ক্লাউড ডাটাবেজে সংরক্ষিত হচ্ছে।
                </p>
              </div>
            )}

          </div>
        </aside>

        {/* 3. DYNAMIC ACTIVE VIEW WORKSPACE PORTAL */}
        <main className="flex-1 min-w-0 bg-slate-900/20 border border-slate-850/20 rounded-3xl p-1.5 sm:p-3 lg:p-0">
          <div className="animate-in fade-in duration-200">
            {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
            {activeTab === 'landing_pages' && <LandingPagesManager />}
            {activeTab === 'orders' && <OrdersManager />}
            {activeTab === 'analytics' && <AnalyticsDashboard />}
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'categories' && <CategoryManager />}
            {activeTab === 'hero' && <HeroSettingsManager />}
            {activeTab === 'campaigns' && <CampaignsManager />}
            {activeTab === 'benefits' && <BenefitsManager />}
            {activeTab === 'paybd' && <PaybdManager />}
            {activeTab === 'seo' && <SeoHealthDashboard />}
            {activeTab === 'settings' && <StoreSettingsManager />}
          </div>
        </main>

      </div>
    </div>
  );
};
