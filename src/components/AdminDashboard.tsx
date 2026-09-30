import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Settings,
  Activity,
  CreditCard,
  Key,
  Database,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  ArrowLeft,
  ExternalLink,
  Lock,
  Sparkles,
  TrendingUp,
  Sliders,
  Globe,
  GitBranch,
  ShoppingBag,
  Package,
  Plus,
  Edit2,
  Trash2,
  Check,
  Clock,
  Flame,
  Layers,
  Copy,
  BarChart2,
  Users
} from 'lucide-react';
import { LandingProduct } from '../types/payment';
import { BiAnalyticsDashboard } from './admin/analytics/BiAnalyticsDashboard';

interface AdminConfig {
  landingPageTitle?: string;
  landingPageSlug?: string;
  activeProductId?: string;
  heroBadge?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  countdownMinutes?: number;
  stockLeft?: number;
  discountPercent?: number;
  mainProductUrl: string;
  checkoutMode: 'main_store_redirect' | 'paybd_direct_api';
  metaPixelId: string;
  metaCapiAccessToken: string;
  metaTestEventCode: string;
  paybdBrandKey: string;
  paybdApiKey: string;
  paybdSecretKey: string;
  productName: string;
  productPrice: number;
}

interface OrderItem {
  id: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  amount: number;
  package_name: string;
  status: string;
  created_at: string;
  transaction_id?: string;
  checkout_url?: string;
}

interface PixelLog {
  id: string;
  event_name: string;
  timestamp: string;
  event_source: string;
  status: string;
  details?: any;
}

export const AdminDashboard: React.FC<{ onBackToSite: () => void }> = ({ onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'landing_page' | 'store_link' | 'pixel' | 'paybd' | 'orders' | 'tester' | 'analytics'>('analytics');
  const [trafficAnalytics, setTrafficAnalytics] = useState<any>(null);
  const [isTrafficLoading, setIsTrafficLoading] = useState(false);

  const fetchTrafficAnalytics = async () => {
    setIsTrafficLoading(true);
    try {
      const res = await fetch('/api/admin/traffic-analytics');
      const data = await res.json();
      setTrafficAnalytics(data);
    } catch (err) {
      console.error('Error fetching traffic analytics:', err);
    } finally {
      setIsTrafficLoading(false);
    }
  };
  const [config, setConfig] = useState<AdminConfig>({
    landingPageTitle: 'পারচেস',
    landingPageSlug: 'purchase',
    activeProductId: 'combo-299',
    heroBadge: '💥 মেগা ডিসকাউন্ট অফার • লিমিটেড টাইম',
    heroHeadline: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন ও ১০০TB রিসোর্স',
    heroSubheadline: 'কোনো পূর্ব অভিজ্ঞতা ছাড়াই মাত্র ৩-৭ দিনের মধ্যে নিজের লাভজনক ডিজিটাল প্রোডাক্ট বিজনেস শুরু করুন।',
    countdownMinutes: 15,
    stockLeft: 7,
    discountPercent: 88,
    mainProductUrl: 'https://www.nasirdigitalhub.com/product/freelancing-digital-product-business-100tb-digital-product-bundle-all-product-price-only-299',
    checkoutMode: 'main_store_redirect',
    metaPixelId: '2547695409029693',
    metaCapiAccessToken: '',
    metaTestEventCode: '',
    paybdBrandKey: 'r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ',
    paybdApiKey: '',
    paybdSecretKey: '',
    productName: 'Freelancing Digital Product Business 100TB Bundle',
    productPrice: 299
  });

  const [products, setProducts] = useState<LandingProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<LandingProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [stats, setStats] = useState<{
    totalOrders: number;
    completedOrders: number;
    totalRevenue: number;
    pixelEventsSent: number;
    recentOrders: OrderItem[];
    recentLogs: PixelLog[];
  }>({
    totalOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    pixelEventsSent: 0,
    recentOrders: [],
    recentLogs: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Test Event state
  const [testEventName, setTestEventName] = useState('PageView');
  const [testEmail, setTestEmail] = useState('customer@gmail.com');
  const [testPhone, setTestPhone] = useState('01875656565');
  const [testValue, setTestValue] = useState('299');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const fetchConfigAndStats = async () => {
    setIsLoading(true);
    try {
      const [cfgRes, statRes, prodRes] = await Promise.all([
        fetch('/api/admin/config'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/products')
      ]);
      const cfgData = await cfgRes.json();
      const statData = await statRes.json();
      const prodData = await prodRes.json();
      
      setConfig(cfgData);
      setStats(statData);
      if (prodData && prodData.products) {
        setProducts(prodData.products);
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigAndStats();
    fetchTrafficAnalytics();
  }, []);

  const handleSaveConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessMsg('সকল সেটিংস সফলভাবে আপডেট ও সেভ হয়েছে!');
        setTimeout(() => setSaveSuccessMsg(null), 4000);
        fetchConfigAndStats();
      } else {
        alert(data.message || 'Failed to save settings');
      }
    } catch (err: any) {
      alert('Error saving settings: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetActiveProduct = async (productId: string) => {
    try {
      const res = await fetch('/api/admin/products/set-active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessMsg(`'পারচেস' ল্যান্ডিং পেজে সক্রিয় প্রোডাক্ট সেট করা হয়েছে!`);
        setTimeout(() => setSaveSuccessMsg(null), 4000);
        fetchConfigAndStats();
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  const handleSaveProduct = async (productToSave: LandingProduct) => {
    try {
      const res = await fetch('/api/admin/products/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSave)
      });
      const data = await res.json();
      if (data.success) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchConfigAndStats();
        setSaveSuccessMsg('প্রোডাক্ট সফলভাবে সংরক্ষণ করা হয়েছে!');
        setTimeout(() => setSaveSuccessMsg(null), 4000);
      }
    } catch (e: any) {
      alert('Error saving product: ' + e.message);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে আপনি এই প্রোডাক্টটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchConfigAndStats();
        setSaveSuccessMsg('প্রোডাক্ট সফলভাবে মুছে ফেলা হয়েছে');
        setTimeout(() => setSaveSuccessMsg(null), 3000);
      } else {
        alert(data.message);
      }
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  const handleSendTestEvent = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/test-pixel-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: testEventName,
          email: testEmail,
          phone: testPhone,
          value: testValue,
          currency: 'BDT'
        })
      });
      const data = await res.json();
      setTestResult(data);
      fetchConfigAndStats();
    } catch (err: any) {
      setTestResult({ success: false, error: err.message });
    } finally {
      setIsSendingTest(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Hind_Siliguri',sans-serif]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-white tracking-tight">Nasir Digital Hub</h1>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs px-2 py-0.5 rounded-full font-bold">
                  কন্ট্রোল প্যানেল
                </span>
              </div>
              <p className="text-xs text-slate-400">ল্যান্ডিং পেজ, প্রোডাক্ট সিলেকশন ও মেটা পিক্সেল ম্যানেজার</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/purchase"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white px-3 py-2 rounded-xl border border-indigo-500/30 transition-all font-semibold"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
              <span>/purchase ভিউ</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>

            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-2 text-xs md:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ইউজার সাইটে ফিরে যান</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Success alert message */}
        {saveSuccessMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-semibold text-sm">{saveSuccessMsg}</span>
            </div>
            <button
              onClick={() => setSaveSuccessMsg(null)}
              className="text-emerald-400 hover:text-emerald-200 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
              <span>সক্রিয় ল্যান্ডিং প্রোডাক্ট</span>
              <Package className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-white truncate">
              {products.find(p => p.id === config.activeProductId)?.name.slice(0, 20) || 'Combo Pack'}...
            </div>
            <div className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1">
              <span>মূল্য: ৳{products.find(p => p.id === config.activeProductId)?.price || 299}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded">সক্রিয়</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
              <span>মোট তৈরি অর্ডার</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">{stats.totalOrders} টি</div>
            <div className="text-xs text-blue-400 mt-1 font-medium">
              ল্যান্ডিং পেজ ট্র্যাকিং
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
              <span>পেমেন্ট সফল / কনফার্মড</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{stats.completedOrders} টি</div>
            <div className="text-xs text-emerald-400/80 mt-1 font-semibold">
              মোট আয়: ৳{stats.totalRevenue.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
              <span>মেটা পিক্সেল CAPI ইভেন্ট</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{stats.pixelEventsSent} টি</div>
            <div className="text-xs text-amber-400/80 mt-1 font-medium">
              Pixel ID: {config.metaPixelId}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('analytics');
              fetchTrafficAnalytics();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>📊 লাইভ ট্রাফিক ও ফেসবুক অ্যাডস অ্যানালিটিক্স</span>
          </button>

          <button
            onClick={() => setActiveTab('landing_page')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'landing_page'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ল্যান্ডিং পেজ (পারচেস) কন্ট্রোল</span>
          </button>

          <button
            onClick={() => setActiveTab('store_link')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'store_link'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>মেইন স্টোর ও চেকআউট মোড</span>
          </button>

          <button
            onClick={() => setActiveTab('pixel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pixel'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>মেটা পিক্সেল ও CAPI</span>
          </button>

          <button
            onClick={() => setActiveTab('paybd')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'paybd'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>PayBD গেটওয়ে কি-সমূহ</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>অর্ডার ও ট্রানজ্যাকশন হিস্ট্রি</span>
          </button>

          <button
            onClick={() => setActiveTab('tester')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tester'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>লাইভ ইভেন্ট টেস্টার</span>
          </button>
        </div>

        {/* TAB 1: LANDING PAGE (PURCHASE) MANAGER */}
        {activeTab === 'landing_page' && (
          <div className="space-y-8">
            {/* Header info banner */}
            <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-800/40 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <ShoppingBag className="w-4 h-4" />
                  <span>ল্যান্ডিং পেজের নাম: <strong className="text-white text-sm font-black">পারচেস (/purchase)</strong></span>
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  পারচেস ল্যান্ডিং পেজে সক্রিয় প্রোডাক্ট এবং টেক্সট কনফিগারেশন
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  এখানে অ্যাডমিন প্যানেল থেকে যে প্রোডাক্টটি সিলেক্ট করে দেওয়া হবে, ফেসবুক অ্যাডস ক্যাম্পেইনে আসা ইউজাররা সরাসরি সেই প্রোডাক্টটি <strong>পারচেস</strong> করবে।
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/purchase"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 inline-flex items-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>লাইভ পেজ প্রিভিউ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      name: '',
                      price: 299,
                      regularPrice: 2499,
                      badge: 'নতুন অফার',
                      tagline: '',
                      description: '',
                      features: ['১০০TB ক্লাউড ড্রাইভ লাইফটাইম এক্সেস', 'ভিআইপি টেলিগ্রাম সাপোর্ট'],
                      driveAccessUrl: 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
                      vipTelegramUrl: 'https://t.me/+nasir_digital_hub_vip_support',
                      mainProductUrl: config.mainProductUrl
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>নতুন প্রোডাক্ট যোগ করুন</span>
                </button>
              </div>
            </div>

            {/* Products List & Active Product Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-400" />
                  <span>ল্যান্ডিং পেজ প্রোডাক্ট ক্যাটালগ (যেকোনো একটিকে সক্রিয় করুন)</span>
                </h3>
                <span className="text-xs text-slate-400">মোট প্রোডাক্ট: {products.length} টি</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {products.map((prod) => {
                  const isActive = prod.id === config.activeProductId || prod.isActive;
                  return (
                    <div
                      key={prod.id}
                      className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                        isActive
                          ? 'bg-gradient-to-b from-blue-950/70 to-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/30'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -top-3 right-4 bg-emerald-500 text-slate-950 text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>পারচেস পেজে সক্রিয়</span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-indigo-500/20 text-indigo-300 text-[11px] font-bold px-2 py-0.5 rounded-md border border-indigo-500/30">
                            {prod.badge || 'প্যাকেজ'}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">ID: {prod.id}</span>
                        </div>

                        <h4 className="text-base font-bold text-white mb-2 line-clamp-2">
                          {prod.name}
                        </h4>

                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-black text-yellow-400">৳{prod.price}</span>
                          {prod.regularPrice && (
                            <span className="text-xs line-through text-slate-500">৳{prod.regularPrice}</span>
                          )}
                          {prod.regularPrice && (
                            <span className="text-[11px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded">
                              {Math.round((1 - prod.price / prod.regularPrice) * 100)}% ছাড়
                            </span>
                          )}
                        </div>

                        {prod.tagline && (
                          <p className="text-xs text-slate-300 mb-3 line-clamp-2 italic">
                            "{prod.tagline}"
                          </p>
                        )}

                        <div className="space-y-1.5 mb-4 text-xs text-slate-300">
                          {(prod.features || []).slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                        {isActive ? (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>বর্তমানে সিলেক্টেড</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetActiveProduct(prod.id)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>পারচেসে সেট করুন</span>
                          </button>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {products.length > 1 && (
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Landing Page Content Customization */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                <span>পারচেস ল্যান্ডিং পেজের হেডলাইন ও টাইমার সেটিংস</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ল্যান্ডিং পেজের শিরোনাম (Title)
                  </label>
                  <input
                    type="text"
                    value={config.landingPageTitle || 'পারচেস'}
                    onChange={(e) => setConfig({ ...config, landingPageTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500"
                    placeholder="পারচেস"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">ল্যান্ডিং পেজের নাম ও রাউটিং ট্যাগ</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    হিরো সেকশন অফার ব্যাজ
                  </label>
                  <input
                    type="text"
                    value={config.heroBadge || ''}
                    onChange={(e) => setConfig({ ...config, heroBadge: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500"
                    placeholder="💥 মেগা ডিসকাউন্ট অফার • লিমিটেড টাইম"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    মূল আকর্ষণীয় হেডলাইন (Hero Headline)
                  </label>
                  <input
                    type="text"
                    value={config.heroHeadline || ''}
                    onChange={(e) => setConfig({ ...config, heroHeadline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500"
                    placeholder="ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন ও ১০০TB রিসোর্স"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    সাব-হেডলাইন (Sub-Headline)
                  </label>
                  <textarea
                    rows={2}
                    value={config.heroSubheadline || ''}
                    onChange={(e) => setConfig({ ...config, heroSubheadline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500"
                    placeholder="কোনো পূর্ব অভিজ্ঞতা ছাড়াই মাত্র ৩-৭ দিনের মধ্যে নিজের লাভজনক ডিজিটাল প্রোডাক্ট বিজনেস শুরু করুন।"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    কাউন্টডাউন টাইমার (মিনিট)
                  </label>
                  <input
                    type="number"
                    value={config.countdownMinutes || 15}
                    onChange={(e) => setConfig({ ...config, countdownMinutes: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    লাইভ স্টক কাউন্টার (বাকি সিট)
                  </label>
                  <input
                    type="number"
                    value={config.stockLeft || 7}
                    onChange={(e) => setConfig({ ...config, stockLeft: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveConfig()}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  <span>পরিবর্তনসমূহ সেভ করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STORE LINK & CHECKOUT MODE */}
        {activeTab === 'store_link' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>মেইন প্রোডাক্ট সাইট লিঙ্ক ও চেকআউট ইন্টিগ্রেশন</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                ল্যান্ডিং পেজে ইউজার অর্ডার প্লেস করলে তারা কোন সিস্টেমে পেমেন্ট সম্পন্ন করবে তা নির্ধারণ করুন।
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
              <label className="block text-xs font-semibold text-slate-300">
                মেইন ওয়েবসাইট প্রোডাক্ট লিঙ্ক (Main Store Product URL)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={config.mainProductUrl}
                  onChange={(e) => setConfig({ ...config, mainProductUrl: e.target.value })}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                  placeholder="https://www.nasirdigitalhub.com/product/..."
                />
                <a
                  href={config.mainProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>ভিজিট</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-[11px] text-slate-400">
                কাস্টমার যখন ল্যান্ডিং পেজে তথ্য পূরণ করে অর্ডার করবে, তখন এই লিঙ্কের চেকআউটে নাম ও ইমেইল সহ রিডাইরেক্ট হবে।
              </p>
            </div>

            {/* Mode selection radio */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                চেকআউট মোড নির্বাচন করুন
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    config.checkoutMode === 'main_store_redirect'
                      ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="checkoutMode"
                    value="main_store_redirect"
                    checked={config.checkoutMode === 'main_store_redirect'}
                    onChange={() => setConfig({ ...config, checkoutMode: 'main_store_redirect' })}
                    className="mt-1 text-blue-600"
                  />
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>মেইন সাইট চেকআউট রিডাইরেক্ট (সুপারিশকৃত)</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">Active</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      ল্যান্ডিং পেজে নাম, ইমেইল ও ফোন ইনপুট দিয়ে সাবমিট করার সাথে সাথে মেটা পিক্সেল InitiateCheckout ফায়ার হবে এবং ইউজারের ডেটা সহ nasirdigitalhub.com প্রোডাক্ট পেজে নিয়ে যাবে।
                    </p>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    config.checkoutMode === 'paybd_direct_api'
                      ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="checkoutMode"
                    value="paybd_direct_api"
                    checked={config.checkoutMode === 'paybd_direct_api'}
                    onChange={() => setConfig({ ...config, checkoutMode: 'paybd_direct_api' })}
                    className="mt-1 text-blue-600"
                  />
                  <div>
                    <div className="font-bold text-sm text-white">ডিরেক্ট PayBD API পেমেন্ট</div>
                    <p className="text-xs text-slate-400 mt-1">
                      সার্ভার সরাসরি PayBD ক্রিয়েট পেমেন্ট API কল করে বিকাশ/নগদ গেটওয়ে URL জেনারেট করবে।
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Git repository metadata reference */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <GitBranch className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold text-xs text-indigo-300">কানেক্টেড গিটহাব রিপোজিটরি</div>
                <div className="text-xs font-mono text-slate-300 mt-1 select-all bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  git@github.com:dipuakhando770/Md-Nasir.git
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  এই রিপোজিটরির আন্ডারে থাকা পেমেন্ট গেটওয়ে এবং প্রোডাক্ট আর্কিটেকচারের সাথে নিরবচ্ছিন্ন সংযোগ স্থাপন করা হয়েছে।
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleSaveConfig()}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>সেটিংস সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: META PIXEL & CAPI */}
        {activeTab === 'pixel' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>মেটা পিক্সেল ও সার্ভার-সাইড কনভার্সন API (CAPI)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                ফেসবুক অ্যাড ট্র্যাকিং ও ইভেন্ট রিসিভ করার জন্য সঠিক মেটা পিক্সেল আইডি এবং CAPI অ্যাক্সেস টোকেন কনফিগার করুন।
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  মেটা পিক্সেল আইডি (Meta Pixel ID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.metaPixelId}
                    onChange={(e) => setConfig({ ...config, metaPixelId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                    placeholder="2547695409029693"
                  />
                  <span className="absolute right-3 top-2.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  কনভার্সন API অ্যাক্সেস টোকেন (Meta CAPI Access Token)
                </label>
                <textarea
                  rows={3}
                  value={config.metaCapiAccessToken}
                  onChange={(e) => setConfig({ ...config, metaCapiAccessToken: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                  placeholder="EAATy2vLAjF8BSrP2k9qxwXx0pRaUWsto..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  টেস্ট ইভেন্ট কোড (Meta Test Event Code - ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={config.metaTestEventCode}
                  onChange={(e) => setConfig({ ...config, metaTestEventCode: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  placeholder="TEST12345"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleSaveConfig()}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>পিক্সেল সেটিংস সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PAYBD GATEWAY */}
        {activeTab === 'paybd' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span>PayBD কাস্টম গেটওয়ে সেটিংস</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                নিরাপদ সার্ভার-সাইড হেডার এবং ভেরিফিকেশন কি-সমূহ।
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  BRAND-KEY / DEVICE-KEY
                </label>
                <input
                  type="text"
                  value={config.paybdBrandKey}
                  onChange={(e) => setConfig({ ...config, paybdBrandKey: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  placeholder="r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  API-KEY
                </label>
                <input
                  type="password"
                  value={config.paybdApiKey}
                  onChange={(e) => setConfig({ ...config, paybdApiKey: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  placeholder="PayBD মার্চেন্ট API কি"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  SECRET-KEY
                </label>
                <input
                  type="password"
                  value={config.paybdSecretKey}
                  onChange={(e) => setConfig({ ...config, paybdSecretKey: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  placeholder="PayBD মার্চেন্ট Secret কি"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleSaveConfig()}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>গেটওয়ে কি সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS & TRANSACTIONS */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span>অর্ডার ও ট্রানজ্যাকশন হিস্ট্রি</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">ল্যান্ডিং পেজ থেকে তৈরি হওয়া অর্ডার তালিকা।</p>
              </div>
              <button
                onClick={fetchConfigAndStats}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Refresh Orders"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {stats.recentOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                এখনো কোনো অর্ডার তৈরি হয়নি। ল্যান্ডিং পেজে একটি টেস্ট অর্ডার প্লেস করুন।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">অর্ডার ID</th>
                      <th className="p-3">কাস্টমার নাম</th>
                      <th className="p-3">মোবাইল / WhatsApp</th>
                      <th className="p-3">ইমেইল</th>
                      <th className="p-3">প্যাকেজ</th>
                      <th className="p-3">মূল্য</th>
                      <th className="p-3">স্ট্যাটাস</th>
                      <th className="p-3">সময়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {stats.recentOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-850">
                        <td className="p-3 font-mono font-bold text-white">{ord.id}</td>
                        <td className="p-3 font-medium text-white">{ord.cus_name}</td>
                        <td className="p-3 font-mono text-slate-300">{ord.cus_phone || 'N/A'}</td>
                        <td className="p-3 text-slate-400">{ord.cus_email}</td>
                        <td className="p-3 text-indigo-300 font-medium">{ord.package_name}</td>
                        <td className="p-3 font-bold text-yellow-400">৳{ord.amount}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'COMPLETED'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{new Date(ord.created_at).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: EVENT TESTER */}
        {activeTab === 'tester' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-400" />
                <span>মেটা পিক্সেল CAPI লাইভ ইভেন্ট টেস্টার</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                সরাসরি ফেসবুক সার্ভারে টেস্ট ইভেন্ট পাঠিয়ে সঠিক সিগন্যাল যাচাই করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">ইভেন্টের নাম</label>
                <select
                  value={testEventName}
                  onChange={(e) => setTestEventName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="PageView">PageView</option>
                  <option value="InitiateCheckout">InitiateCheckout</option>
                  <option value="Purchase">Purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">অ্যামাউন্ট (BDT)</label>
                <input
                  type="number"
                  value={testValue}
                  onChange={(e) => setTestValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">টেস্ট ইমেইল</label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">টেস্ট ফোন</label>
                <input
                  type="text"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSendTestEvent}
                disabled={isSendingTest}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                {isSendingTest ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>টেস্ট ইভেন্ট পাঠান</span>
              </button>
            </div>

            {testResult && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mt-4">
                <div className="text-xs font-bold text-white mb-2">সার্ভার রেসপন্স:</div>
                <pre className="text-[11px] font-mono text-emerald-400 bg-slate-900 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: LIVE TRAFFIC ANALYTICS & META AD ATTRIBUTION */}
        {activeTab === 'analytics' && <BiAnalyticsDashboard />}
      </main>

      {/* Edit / Add Product Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-400" />
                <span>প্রোডাক্ট যোগ / সম্পাদনা করুন</span>
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">প্রোডাক্টের নাম</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-blue-500"
                  placeholder="Freelancing Digital Product Business 100TB Bundle"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">অফার মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-blue-500"
                    placeholder="299"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">রেগুলার মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.regularPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, regularPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="2499"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">ব্যাজ টেক্সট</label>
                <input
                  type="text"
                  value={editingProduct.badge || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="সবচেয়ে জনপ্রিয় / মেগা প্যাক"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">সংক্ষিপ্ত ট্যাগলাইন</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">গুগল ড্রাইভ এক্সেস লিঙ্ক (সাকসেস পেজের জন্য)</label>
                <input
                  type="url"
                  value={editingProduct.driveAccessUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, driveAccessUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                  placeholder="https://drive.google.com/drive/..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">টেলিগ্রাম ভিআইপি গ্রুপ লিঙ্ক</label>
                <input
                  type="url"
                  value={editingProduct.vipTelegramUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, vipTelegramUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                  placeholder="https://t.me/+..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => handleSaveProduct(editingProduct)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
              >
                প্রোডাক্ট সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
