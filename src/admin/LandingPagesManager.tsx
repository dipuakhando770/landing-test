import React, { useState, useEffect, useMemo } from 'react';
import {
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
  ExternalLink,
  Eye,
  Sliders,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Globe,
  Activity,
  Send,
  Sparkles,
  CreditCard,
  TrendingUp,
  Database,
  Link as LinkIcon,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  ShieldCheck,
  Zap,
  HelpCircle,
  MessageSquare,
  Gift,
  BookOpen,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  X,
  Play,
  Share2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, Product } from '../types';
import { subscribeToOrders, updateOrderStatus, updateStoreSettings } from '../firebase/services';
import { formatPrice, formatDate } from '../utils/formatters';
import { getProductSlug } from '../utils/slugify';

export interface LandingPageData {
  id: string;
  slug: string;
  productId: string;
  title: string;
  status: 'published' | 'draft';
  isDefault?: boolean;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    videoUrl?: string;
    imageUrl?: string;
    ctaText?: string;
  };
  offer: {
    regularPrice: number;
    currentPrice: number;
    discountPercent: number;
    badge: string;
    timerMinutes: number;
    stockCount: number;
  };
  benefits: Array<{ icon: string; title: string; description: string }>;
  curriculum: Array<{ module: string; lesson: string; description: string }>;
  bonus: Array<{ title: string; description: string; value: number; imageUrl?: string }>;
  faq: Array<{ question: string; answer: string }>;
  testimonials: Array<{ name: string; role?: string; review: string; rating?: number }>;
  finalCta: { heading: string; description: string; buttonText: string };
  delivery: {
    driveUrl: string;
    downloadUrl?: string;
    vipTelegramUrl?: string;
    customMessage?: string;
    additionalResources?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    ogTitle?: string;
  };
  stats: {
    views: number;
    ctaClicks: number;
    formsStarted: number;
    ordersCreated: number;
    successfulPayments: number;
    totalRevenue: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

const defaultLandingPage: LandingPageData = {
  id: 'lp-freelancing-bundle',
  slug: 'freelancing-digital-product-bundle',
  productId: 'freelancing-digital-product-business-100tb-digital-product-bundle-all-product-price-only-299',
  title: 'ফ্রিল্যান্সিং ও ডিজিটাল প্রোডাক্ট ১০০TB বান্ডেল',
  status: 'published',
  isDefault: true,
  hero: {
    badge: '💥 মেগা ডিসকাউন্ট অফার • লিমিটেড টাইম',
    title: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন ও ১০০TB রিসোর্স',
    subtitle: 'কোনো পূর্ব অভিজ্ঞতা ছাড়াই মাত্র ৩-৭ দিনের মধ্যে নিজের লাভজনক ডিজিটাল প্রোডাক্ট বিজনেস শুরু করুন।',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ctaText: 'এখনই অর্ডার করুন মাত্র ২৯৯ টাকায়'
  },
  offer: {
    regularPrice: 2499,
    currentPrice: 299,
    discountPercent: 88,
    badge: 'সবচেয়ে জনপ্রিয়',
    timerMinutes: 15,
    stockCount: 7
  },
  benefits: [
    { icon: 'Zap', title: '১০০TB+ প্রিমিয়াম ক্লাউড রিসোর্স', description: 'গ্রাফিক্স, ভিডিও টেমপ্লেট, সফটওয়্যার ও রেডিমেড ডিজিটাল অ্যাসেটস।' },
    { icon: 'ShieldCheck', title: 'লাইফটাইম ড্রাইভ ব্যাকআপ', description: 'একবার পেমেন্টে আজীবন গুগল ড্রাইভ ফোল্ডার অ্যাক্সেস ও নিয়মিত আপডেট।' },
    { icon: 'DollarSign', title: 'হাই-কনভার্টিং সেলস ফানেল', description: 'ফেসবুক ও মেটা অ্যাডস মাস্টারি কোর্স সহ রেডি ল্যান্ডিং পেজ ফাইল।' },
    { icon: 'Users', title: '২৪/৭ ভিআইপি টেলিগ্রাম সাপোর্ট', description: 'যেকোনো সমস্যায় সরাসরি মেন্টর ও প্রাইভেট কমিউনিটি গাইডলাইন।' }
  ],
  curriculum: [
    { module: 'মডিউল ১', lesson: 'ডিজিটাল প্রোডাক্ট বিজনেস ফান্ডামেন্টাল', description: 'বিজনেস মডেল, নিশ সিলেকশন ও টার্গেট অডিয়েন্স রিসার্চ।' },
    { module: 'মডিউল ২', lesson: 'ক্যানভা ও রেডিমেড গ্রাফিক্স কাস্টমাইজেশন', description: 'নিজের ব্র্যান্ড লোগো ও পোস্টার ডিজাইন তৈরি।' },
    { module: 'মডিউল ৩', lesson: 'মেটা অ্যাডস ও সেলস ফানেল সেটআপ', description: 'কম খরচে বেশি সেলস আনার ফেসবুক অ্যাড ক্যাম্পেইন মেথড।' },
    { module: 'মডিউল ৪', lesson: 'পেমেন্ট গেটওয়ে ও অটো ডেলিভারি', description: 'বিকাশ/নগদ স্বয়ংক্রিয় পেমেন্ট ও মেইল ডেলিভারি ইন্টিগ্রেশন।' }
  ],
  bonus: [
    { title: '১০,০০০+ ভাইরাল সোশ্যাল মিডিয়া রিলস বান্ডেল', description: 'ইনস্টাগ্রাম ও ফেসবুক রিলসে দ্রুত ভিউ বাড়ানোর ভিডিও কিট', value: 999 },
    { title: 'প্রিমিয়াম ওয়ার্ডপ্রেস ও এলিমেন্টর থিম প্যাক', description: 'নিজের পেশাদার ইকমার্স ও পোর্টফোলিও ওয়েবসাইট বানানোর ফাইল', value: 1499 },
    { title: 'ভিআইপি টেলিগ্রাম প্রাইভেট কমিউনিটি ইনভাইট', description: 'লাইফটাইম সিক্রেট আপডেট ও মেন্টরশিপ সাপোর্ট', value: 1999 }
  ],
  faq: [
    { question: 'পেমেন্ট করার পর আমি কীভাবে ফাইলগুলো পাবো?', answer: 'পেমেন্ট সফল হওয়ার সাথে সাথে স্ক্রিনে ১০০TB গুগল ড্রাইভ ফোল্ডার লিংক ও আপনার ইমেইলে সকল ইন্সট্রাকশন স্বয়ংক্রিয়ভাবে চলে যাবে।' },
    { question: 'ড্রাইভের অ্যাক্সেস কতদিন থাকবে?', answer: 'আপনি লাইফটাইম (আজীবন) আনলিমিটেড ডাউনলোড ও এক্সেস সুবিধা পাবেন।' },
    { question: 'আমি কি আমার মোবাইল দিয়ে কাজ করতে পারব?', answer: 'হ্যাঁ, ড্রাইভের অধিকাংশ রিসোর্স এবং ভিডিও টিউটোরিয়াল মোবাইল ও কম্পিউটার উভয় ডিভাইসে ব্যবহার করা সম্ভব।' },
    { question: 'কোনো সমস্যা হলে সাপোর্ট কোথায় পাবো?', answer: 'আমাদের ডেডিকেটেড হোয়াটসঅ্যাপ (+8801875656565) এবং ভিআইপি টেলিগ্রাম গ্রুপে ২৪/৭ সাপোর্ট দেওয়া হয়।' }
  ],
  testimonials: [
    { name: 'তানভীর আহমেদ', role: 'ডিজিটাল উদ্যোক্তা', review: 'মাত্র ২৯৯ টাকায় এত বিশাল রিসোর্স ও ক্লিয়ার গাইডলাইন পাব ভাবিনি। আলহামদুলিল্লাহ ১ম সপ্তাহেই আমার সেল শুরু হয়েছে!', rating: 5 },
    { name: 'রাকিবুল হাসান', role: 'ফ্রিল্যান্সার', review: '১০০TB ড্রাইভের কালেকশন এক কথায় অসাধারণ। ক্যানভা টেমপ্লেটগুলো ব্যবহার করে দ্রুত ক্লায়েন্ট ডেলিভারি দিতে পারছি।', rating: 5 },
    { name: 'সুমাইয়া জাহান', role: 'গ্রাফিক ডিজাইনার', review: 'ইনস্ট্যান্ট ইমেইল ডেলিভারি ও টেলিগ্রাম সাপোর্ট খুব হেল্পফুল ছিল। ধন্যবাদ নাসির ডিজিটাল হাবকে।', rating: 5 }
  ],
  finalCta: {
    heading: 'আজই শুরু করুন আপনার সফল ডিজিটাল প্রোডাক্ট বিজনেস',
    description: 'অফারটি যেকোনো সময় শেষ হয়ে যেতে পারে। মাত্র ২৯৯ টাকায় ১০০TB রিসোর্স নিয়ে এখনই আপনার যাত্রা শুরু করুন।',
    buttonText: 'এখনই অর্ডার করুন — মাত্র ৳২৯৯'
  },
  delivery: {
    driveUrl: 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
    downloadUrl: 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
    vipTelegramUrl: 'https://t.me/+nasir_digital_hub_vip_support',
    customMessage: 'Nasir Digital Hub-এ অর্ডার করার জন্য ধন্যবাদ। নিচে আপনার লাইফটাইম ড্রাইভ ফোল্ডার ও টেলিগ্রাম লিংক দেওয়া হলো।'
  },
  seo: {
    metaTitle: 'ডিজিটাল প্রোডাক্ট বিজনেস ১০০TB বান্ডেল - নাসির ডিজিটাল হাব',
    metaDescription: 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার কমপ্লিট সল্যুশন ও ১০০TB ক্লাউড ড্রাইভ রিসোর্স মাত্র ২৯৯ টাকায়।'
  },
  stats: {
    views: 1420,
    ctaClicks: 520,
    formsStarted: 310,
    ordersCreated: 240,
    successfulPayments: 198,
    totalRevenue: 59202
  }
};

export const LandingPagesManager: React.FC = () => {
  const { products: storeProducts, getCategoryName, settings } = useStore();
  
  // 10 Sub-tabs navigation matching prompt specification
  const [activeTab, setActiveTab] = useState<
    | 'all_pages'
    | 'create_page'
    | 'products'
    | 'orders'
    | 'payments'
    | 'email_delivery'
    | 'customers'
    | 'analytics'
    | 'templates'
    | 'settings'
  >('all_pages');

  const [landingPages, setLandingPages] = useState<LandingPageData[]>([defaultLandingPage]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Landing Page Editor State
  const [editingPage, setEditingPage] = useState<LandingPageData>(defaultLandingPage);
  const [activeEditorSection, setActiveEditorSection] = useState<
    'hero' | 'offer' | 'benefits' | 'curriculum' | 'bonus' | 'faq' | 'testimonials' | 'finalCta' | 'delivery' | 'seo'
  >('hero');

  // Selected Product for Auto-Load
  const [selectedAutoLoadProductId, setSelectedAutoLoadProductId] = useState<string>('');

  // Orders Search & Filter State
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'all' | 'paid' | 'pending' | 'failed'>('all');
  const [emailStatusFilter, setEmailStatusFilter] = useState<'all' | 'sent' | 'failed' | 'pending'>('all');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [resendingEmailId, setResendingEmailId] = useState<string | null>(null);

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    paybdApiKey: '',
    paybdSecretKey: '',
    paybdBrandKey: 'r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ',
    metaPixelId: '2547695409029693',
    metaCapiAccessToken: '',
    metaTestEventCode: '',
    smtpHost: 'smtp.hostinger.com',
    smtpPort: '465',
    smtpUser: 'nasirdigitalhub@pipilikhost.com',
    smtpPass: ''
  });

  // Test Email State
  const [testEmailRecipient, setTestEmailRecipient] = useState('mdnasirhassan365.02@gmail.com');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);

  // Fetch initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [lpRes, cfgRes] = await Promise.all([
        fetch('/api/admin/landing-pages'),
        fetch('/api/admin/config')
      ]);
      const lpData = await lpRes.json();
      const cfgData = await cfgRes.json();

      if (lpData && lpData.pages && lpData.pages.length > 0) {
        setLandingPages(lpData.pages);
      }
      if (cfgData) {
        setSettingsForm({
          paybdApiKey: cfgData.paybdApiKey || '',
          paybdSecretKey: cfgData.paybdSecretKey || '',
          paybdBrandKey: cfgData.paybdBrandKey || 'r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ',
          metaPixelId: cfgData.metaPixelId || '2547695409029693',
          metaCapiAccessToken: cfgData.metaCapiAccessToken || '',
          metaTestEventCode: cfgData.metaTestEventCode || '',
          smtpHost: 'smtp.hostinger.com',
          smtpPort: '465',
          smtpUser: 'nasirdigitalhub@pipilikhost.com',
          smtpPass: ''
        });
      }
    } catch (e) {
      console.warn('Fetched with fallback defaults');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsub = subscribeToOrders((newOrders) => {
      setOrders(newOrders);
      setLoadingOrders(false);
    });
    return () => unsub();
  }, []);

  // Auto-load Product details into Landing Page Editor
  const handleAutoLoadProduct = (productId: string) => {
    setSelectedAutoLoadProductId(productId);
    const prod = storeProducts.find((p) => p.id === productId);
    if (!prod) return;

    setEditingPage((prev) => ({
      ...prev,
      productId: prod.id,
      title: `${prod.title} — স্পেশাল ল্যান্ডিং পেজ`,
      slug: prod.slug || `product-${prod.id}`,
      hero: {
        badge: '🔥 মেগা ডিসকাউন্ট অফার • বিশেষ সুযোগ',
        title: prod.title,
        subtitle: prod.shortDescription || prod.description.slice(0, 150) || 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কার্যকরী কমপ্লিট সল্যুশন।',
        imageUrl: prod.imageUrl,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        ctaText: `এখনই অর্ডার করুন মাত্র ৳${prod.price} টাকায়`
      },
      offer: {
        regularPrice: prod.oldPrice || (prod.price > 400 ? prod.price * 5 : 2499),
        currentPrice: prod.price,
        discountPercent: Math.round((((prod.oldPrice || prod.price * 2) - prod.price) / (prod.oldPrice || prod.price * 2)) * 100) || 80,
        badge: 'সবচেয়ে জনপ্রিয়',
        timerMinutes: 15,
        stockCount: 7
      },
      delivery: {
        driveUrl: prod.downloadUrl || 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
        downloadUrl: prod.downloadUrl || 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access',
        vipTelegramUrl: 'https://t.me/+nasir_digital_hub_vip_support',
        customMessage: `${prod.title} সফলভাবে কেনার জন্য ধন্যবাদ! নিচে আপনার রিসোর্স ও ড্রাইভ লিংক দেওয়া হলো।`
      },
      seo: {
        metaTitle: `${prod.title} - নাসির ডিজিটাল হাব`,
        metaDescription: prod.shortDescription || prod.description.slice(0, 160) || 'নাসির ডিজিটাল হাব থেকে স্পেশাল ছাড়ে এখনই অর্ডার করুন।'
      }
    }));
  };

  // Save Landing Page
  const handleSaveLandingPage = async () => {
    setIsSaving(true);
    try {
      // 1. Save to local storage for immediate persistence
      try {
        const localSaved = [...landingPages];
        const existingIdx = localSaved.findIndex((p) => p.id === editingPage.id || p.slug === editingPage.slug);
        if (existingIdx >= 0) {
          localSaved[existingIdx] = { ...editingPage, updatedAt: new Date().toISOString() };
        } else {
          localSaved.unshift({ ...editingPage, updatedAt: new Date().toISOString() });
        }
        setLandingPages(localSaved);
        localStorage.setItem('ndh_custom_landing_pages', JSON.stringify(localSaved));
      } catch (locErr) {
        console.warn('Local save note:', locErr);
      }

      // 2. Persist to API
      try {
        const response = await fetch('/api/admin/landing-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingPage)
        });
        if (response.ok) {
          const data = await response.json().catch(() => null);
          if (data && data.pages) {
            setLandingPages(data.pages);
          }
        }
      } catch (apiErr) {
        console.warn('API save fallback applied:', apiErr);
      }

      setSuccessMsg(`ল্যান্ডিং পেজ "${editingPage.title}" সফলভাবে সেভ হয়েছে!`);
      setTimeout(() => setSuccessMsg(null), 4000);
      setActiveTab('all_pages');
    } catch (e: any) {
      console.error('Save error:', e);
      setSuccessMsg(`ল্যান্ডিং পেজ সেভ হয়েছে (লোকালি সংরক্ষিত)।`);
      setActiveTab('all_pages');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Landing Page
  const handleDeleteLandingPage = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ল্যান্ডিং পেজটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/landing-pages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data && data.pages) {
        setLandingPages(data.pages);
      }
      setSuccessMsg('ল্যান্ডিং পেজ সফলভাবে মুছে ফেলা হয়েছে!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      alert('Error: ' + e.message);
    }
  };

  // Copy Link Helper
  const copyLink = (slug: string) => {
    const cleanSlug = (!slug || slug === 'purchase' || slug === 'landing')
      ? 'freelancing-digital-product-bundle'
      : slug;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.nasirdigitalhub.com';
    const fullUrl = `${origin}/purchase/${cleanSlug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Resend Order Email Trigger
  const handleResendOrderEmail = async (order: Order) => {
    setResendingEmailId(order.id);
    try {
      const res = await fetch('/api/admin/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          recipientEmail: order.customerEmail || order.customerAddress,
          customDriveUrl: order.items?.[0]?.downloadUrl
        })
      });
      const data = await res.json();
      alert(data.message || 'ইমেইল সফলভাবে পাঠানো হয়েছে!');
    } catch (e: any) {
      alert('ইমেইল পাঠাতে ত্রুটি: ' + e.message);
    } finally {
      setResendingEmailId(null);
    }
  };

  // Filtered Orders Calculation
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchSearch =
        !orderSearchTerm ||
        ord.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
        (ord.customerName && ord.customerName.toLowerCase().includes(orderSearchTerm.toLowerCase())) ||
        (ord.customerPhone && ord.customerPhone.includes(orderSearchTerm)) ||
        (ord.customerEmail && ord.customerEmail.toLowerCase().includes(orderSearchTerm.toLowerCase())) ||
        (ord.paymentTrxId && ord.paymentTrxId.toLowerCase().includes(orderSearchTerm.toLowerCase()));

      const matchStatus =
        orderStatusFilter === 'all' ||
        (orderStatusFilter === 'completed' && (ord.status === 'completed' || ord.paymentStatus === 'paid')) ||
        (orderStatusFilter === 'pending' && (ord.status === 'pending' || !ord.status)) ||
        (orderStatusFilter === 'cancelled' && ord.status === 'cancelled');

      const matchPayment =
        paymentStatusFilter === 'all' ||
        (paymentStatusFilter === 'paid' && (ord.paymentStatus === 'paid' || ord.status === 'completed')) ||
        (paymentStatusFilter === 'pending' && ord.paymentStatus === 'pending') ||
        (paymentStatusFilter === 'failed' && ord.paymentStatus === 'failed');

      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, orderSearchTerm, orderStatusFilter, paymentStatusFilter]);

  // Unique Customers List
  const customersList = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; email: string; orderCount: number; totalSpend: number; lastOrder: string }>();
    orders.forEach((o) => {
      const key = o.customerPhone || o.customerEmail || o.customerName;
      if (!key) return;
      const existing = map.get(key);
      const isPaid = o.paymentStatus === 'paid' || o.status === 'completed';
      const amount = isPaid ? o.total || 0 : 0;
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpend += amount;
        existing.lastOrder = formatDate(o.createdAt);
      } else {
        map.set(key, {
          name: o.customerName || 'গ্রাহক',
          phone: o.customerPhone || '—',
          email: o.customerEmail || '—',
          orderCount: 1,
          totalSpend: amount,
          lastOrder: formatDate(o.createdAt)
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // Total Analytics Metrics
  const totalStats = useMemo(() => {
    const completed = orders.filter((o) => o.status === 'completed' || o.paymentStatus === 'paid');
    const totalRev = completed.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalViews = landingPages.reduce((sum, p) => sum + (p.stats?.views || 0), 0) || 1420;
    const totalCta = landingPages.reduce((sum, p) => sum + (p.stats?.ctaClicks || 0), 0) || 520;
    const conversionRate = totalViews > 0 ? ((completed.length / totalViews) * 100).toFixed(1) : '14.2';

    return {
      totalViews,
      totalCta,
      totalOrders: orders.length,
      completedOrders: completed.length,
      totalRev,
      conversionRate
    };
  }, [orders, landingPages]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-['Hind_Siliguri',sans-serif] p-4 sm:p-6 lg:p-8">
      {/* Top Banner & Control Center Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>ল্যান্ডিং পেজ ও সেলস ফানেল কন্ট্রোল হাব</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              প্রতিটি প্রোডাক্টের জন্য হাই-কনভার্টিং ল্যান্ডিং পেজ তৈরি, কাস্টমাইজেশন, PayBD ইনস্ট্যান্ট পেমেন্ট,
              স্বয়ংক্রিয় অর্ডার প্রসেসিং ও SMTP/Hostinger ইনস্ট্যান্ট ইমেইল ডেলিভারি পরিচালনা করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setEditingPage({
                  ...defaultLandingPage,
                  id: `lp-${Date.now()}`,
                  slug: `offer-${Date.now().toString().slice(-4)}`,
                  title: 'নতুন স্পেশাল অফার ল্যান্ডিং পেজ',
                  isDefault: false
                });
                setActiveTab('create_page');
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ল্যান্ডিং পেজ বানান</span>
            </button>
          </div>
        </div>

        {/* Master Landing Page vs Direct Product Mode Control Bar (1-Click Switch) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              settings.landingPagesEnabled
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white">
                  ফেসবুক অ্যাড ট্রাফিক ও ল্যান্ডিং পেজ মোড:
                </h3>
                <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  settings.landingPagesEnabled
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                }`}>
                  {settings.landingPagesEnabled
                    ? '🔵 পূর্ণাঙ্গ ল্যান্ডিং পেজ ফানেল চালু'
                    : '🟢 সরাসরি ক্লিন প্রোডাক্ট পেজ (রিকমেন্ডেড)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {settings.landingPagesEnabled
                  ? 'ফেসবুক অ্যাডের লিংকে ভিজিট করলে পূর্ণাঙ্গ ভিডিও ও সেলস ল্যান্ডিং ফানেল লোড হচ্ছে।'
                  : 'ফেসবুক অ্যাডের পুরাতন লিংক (`/purchase/...`) থেকে আসা ক্রেতারা সরাসরি ফাস্ট প্রোডাক্ট পেজে অর্ডার করতে পারছে।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              type="button"
              onClick={async () => {
                const nextState = !settings.landingPagesEnabled;
                try {
                  await updateStoreSettings({
                    ...settings,
                    landingPagesEnabled: nextState
                  });
                  setSuccessMsg(
                    nextState
                      ? 'পূর্ণাঙ্গ ল্যান্ডিং পেজ ফানেল মোড চালু করা হয়েছে!'
                      : 'সরাসরি প্রোডাক্ট পেজ মোড চালু করা হয়েছে (ফেসবুক অ্যাড ট্রাফিক সরাসরি প্রোডাক্টে যাবে)!'
                  );
                  setTimeout(() => setSuccessMsg(null), 4000);
                } catch (e: any) {
                  alert('Error updating setting: ' + e.message);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-2 ${
                settings.landingPagesEnabled
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>
                {settings.landingPagesEnabled
                  ? 'সরাসরি প্রোডাক্ট মোডে পরিবর্তন করুন (OFF)'
                  : 'পূর্ণাঙ্গ ল্যান্ডিং মোডে পরিবর্তন করুন (ON)'}
              </span>
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-bold flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 10 Sub-Tabs Navigation Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-1.5 flex items-center overflow-x-auto gap-1 shadow-lg scrollbar-none">
          {[
            { id: 'all_pages', label: 'সকল ল্যান্ডিং পেজ', icon: ShoppingBag, count: landingPages.length },
            { id: 'create_page', label: 'পেজ বিল্ডার / এডিটর', icon: Edit2 },
            { id: 'products', label: 'প্রোডাক্ট ও ডেলিভারি লিংক', icon: Package, count: storeProducts.length },
            { id: 'orders', label: 'অর্ডার তালিকা', icon: FileText, count: orders.length },
            { id: 'payments', label: 'পেমেন্টস (PayBD)', icon: CreditCard },
            { id: 'email_delivery', label: 'ইমেইল ডেলিভারি লগ', icon: Mail },
            { id: 'customers', label: 'কাস্টমার ডিরেক্টরি', icon: Users, count: customersList.length },
            { id: 'analytics', label: 'ফানেল অ্যানালিটিক্স', icon: Activity },
            { id: 'templates', label: 'ডিজাইন টেমপ্লেটস', icon: Layers },
            { id: 'settings', label: 'গেটওয়ে ও পিক্সেল সেটিংস', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SUBTAB 1: ALL LANDING PAGES (EVERY PRODUCT HAS ITS OWN DEDICATED LANDING PAGE) */}
        {/* ========================================================= */}
        {activeTab === 'all_pages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">সকল প্রোডাক্টের ডেডিকেটেড ল্যান্ডিং পেজ তালিকা</h3>
                <p className="text-xs text-slate-400">
                  স্টোরের প্রতিটি প্রোডাক্টের জন্য নিজস্ব স্বয়ংক্রিয় ল্যান্ডিং পেজ তৈরি করা আছে। নিচে প্রতিটি পেজের লিংক দেখুন ও কপি করুন:
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                মোট প্রোডাক্ট ল্যান্ডিং পেজ: {storeProducts.length}টি
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeProducts.map((prod) => {
                const cleanSlug = getProductSlug(prod);
                const liveUrl = `/purchase/${cleanSlug}`;
                const displayPrice = prod.price;
                const regPrice = prod.oldPrice || (displayPrice > 0 ? (displayPrice > 400 ? Math.round(displayPrice * 1.8) : displayPrice * 3) : 0);

                return (
                  <div
                    key={prod.id}
                    className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                          {getCategoryName(prod.categoryId)}
                        </span>
                        {prod.featured && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-400/30">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-400 transition-colors line-clamp-2" title={prod.title}>
                        {prod.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2">
                        {prod.shortDescription || prod.description?.slice(0, 100) || 'ডিজিটাল প্রোডাক্ট ও রিসোর্স।'}
                      </p>

                      <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>প্রোডাক্ট আইডি:</span>
                          <span className="font-mono font-bold text-slate-200 truncate max-w-[150px]">{prod.id}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>প্রাইসিং:</span>
                          <div className="flex items-baseline gap-1.5">
                            {regPrice > displayPrice && (
                              <span className="line-through text-[11px] text-slate-500">৳{regPrice}</span>
                            )}
                            <span className="text-emerald-400 font-extrabold text-sm">
                              {prod.isFree ? 'FREE' : `৳${displayPrice}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>ল্যান্ডিং URL:</span>
                          <span className="font-mono text-indigo-400 truncate max-w-[160px]">/purchase/{cleanSlug}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>লাইভ দেখুন</span>
                        </a>
                        <button
                          onClick={() => copyLink(cleanSlug)}
                          className="px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          {copiedSlug === cleanSlug ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>লিংক কপি</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => handleAutoLoadProduct(prod.id)}
                        className="w-full px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>কাস্টমাইজ ও কনফিগার করুন</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 2: CREATE / EDIT LANDING PAGE */}
        {/* ========================================================= */}
        {activeTab === 'create_page' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-emerald-400" />
                  <span>ল্যান্ডিং পেজ কাস্টমাইজার ও সেকশন বিল্ডার</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Google AI Studio-এর প্রমাণিত হাই-কনভার্টিং A4 ডিজাইন টেমপ্লেটে আপনার নিজস্ব কন্টেন্ট ও প্রাইস বসান।
                </p>
              </div>

              {/* Product Auto-Load Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-300 whitespace-nowrap">প্রোডাক্ট থেকে অটো-লোড:</span>
                <select
                  value={selectedAutoLoadProductId}
                  onChange={(e) => handleAutoLoadProduct(e.target.value)}
                  className="bg-slate-950 border border-emerald-500/50 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- প্রোডাক্ট নির্বাচন করুন --</option>
                  {storeProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (৳{p.price})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section Switcher Tabs */}
            <div className="flex items-center overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-800">
              {[
                { id: 'hero', label: '1. Hero ব্যানার', icon: Sparkles },
                { id: 'offer', label: '2. Offer & প্রাইস', icon: DollarSign },
                { id: 'benefits', label: '3. Benefits (সুবিধাসমূহ)', icon: Zap },
                { id: 'curriculum', label: '4. Curriculum (মডিউল)', icon: BookOpen },
                { id: 'bonus', label: '5. Bonus (বোনাসেস)', icon: Gift },
                { id: 'faq', label: '6. FAQ (প্রশ্নোত্তর)', icon: HelpCircle },
                { id: 'testimonials', label: '7. Testimonials (রিভিউ)', icon: MessageSquare },
                { id: 'finalCta', label: '8. Final CTA (অর্ডার)', icon: Flame },
                { id: 'delivery', label: '9. Delivery (ড্রাইভ লিংক)', icon: ShieldCheck },
                { id: 'seo', label: '10. SEO ও মেটা', icon: Globe }
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveEditorSection(sec.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    activeEditorSection === sec.id
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{sec.label}</span>
                </button>
              ))}
            </div>

            {/* SECTION EDITORS */}
            <div className="space-y-6">
              {/* 1. HERO SECTION */}
              {activeEditorSection === 'hero' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">ল্যান্ডিং পেজ টাইটেল (Title):</label>
                      <input
                        type="text"
                        value={editingPage.title}
                        onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">ক্যাম্পেইন ইউআরএল স্লাগ (Slug):</label>
                      <div className="flex items-center">
                        <span className="bg-slate-800 px-3 py-2.5 text-xs text-slate-400 rounded-l-xl border border-r-0 border-slate-800">
                          /purchase/
                        </span>
                        <input
                          type="text"
                          value={editingPage.slug}
                          onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-r-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">হিরো ব্যাজ টেক্সট (Hero Badge):</label>
                      <input
                        type="text"
                        value={editingPage.hero?.badge || ''}
                        onChange={(e) => setEditingPage({ ...editingPage, hero: { ...editingPage.hero, badge: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">মূল হেডলাইন (Main Headline):</label>
                      <textarea
                        rows={2}
                        value={editingPage.hero?.title || ''}
                        onChange={(e) => setEditingPage({ ...editingPage, hero: { ...editingPage.hero, title: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">সাব-হেডলাইন (Sub-Headline):</label>
                      <textarea
                        rows={2}
                        value={editingPage.hero?.subtitle || ''}
                        onChange={(e) => setEditingPage({ ...editingPage, hero: { ...editingPage.hero, subtitle: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">ভিডিও এম্বেড লিংক (YouTube Embed URL):</label>
                      <input
                        type="text"
                        value={editingPage.hero?.videoUrl || ''}
                        onChange={(e) => setEditingPage({ ...editingPage, hero: { ...editingPage.hero, videoUrl: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. OFFER & PRICING */}
              {activeEditorSection === 'offer' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">অফার সেল প্রাইস (৳):</label>
                    <input
                      type="number"
                      value={editingPage.offer?.currentPrice || 299}
                      onChange={(e) => setEditingPage({ ...editingPage, offer: { ...editingPage.offer, currentPrice: Number(e.target.value) } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-emerald-400 font-extrabold focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">রেগুলার প্রাইস (৳):</label>
                    <input
                      type="number"
                      value={editingPage.offer?.regularPrice || 2499}
                      onChange={(e) => setEditingPage({ ...editingPage, offer: { ...editingPage.offer, regularPrice: Number(e.target.value) } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">কাউন্টডাউন টাইমার (মিনিট):</label>
                    <input
                      type="number"
                      value={editingPage.offer?.timerMinutes || 15}
                      onChange={(e) => setEditingPage({ ...editingPage, offer: { ...editingPage.offer, timerMinutes: Number(e.target.value) } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">অবশিষ্ট স্টক কাউন্টার:</label>
                    <input
                      type="number"
                      value={editingPage.offer?.stockCount || 7}
                      onChange={(e) => setEditingPage({ ...editingPage, offer: { ...editingPage.offer, stockCount: Number(e.target.value) } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 3. BENEFITS */}
              {activeEditorSection === 'benefits' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">ফিচার ও বেনিফিট কার্ডসমূহ (৪ টি):</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(editingPage.benefits || []).map((b, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                        <span className="text-[11px] font-extrabold text-emerald-400">কার্ড #{idx + 1}</span>
                        <input
                          type="text"
                          value={b.title}
                          onChange={(e) => {
                            const newB = [...editingPage.benefits];
                            newB[idx].title = e.target.value;
                            setEditingPage({ ...editingPage, benefits: newB });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none"
                          placeholder="টাইটেল"
                        />
                        <textarea
                          rows={2}
                          value={b.description}
                          onChange={(e) => {
                            const newB = [...editingPage.benefits];
                            newB[idx].description = e.target.value;
                            setEditingPage({ ...editingPage, benefits: newB });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                          placeholder="বিস্তারিত বিবরণ"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. CURRICULUM */}
              {activeEditorSection === 'curriculum' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">কোর্স ও ড্রাইভ মডিউল তালিকা:</h3>
                  <div className="space-y-3">
                    {(editingPage.curriculum || []).map((c, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={c.module}
                          onChange={(e) => {
                            const newC = [...editingPage.curriculum];
                            newC[idx].module = e.target.value;
                            setEditingPage({ ...editingPage, curriculum: newC });
                          }}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-emerald-400 focus:outline-none"
                          placeholder="মডিউল নং"
                        />
                        <input
                          type="text"
                          value={c.lesson}
                          onChange={(e) => {
                            const newC = [...editingPage.curriculum];
                            newC[idx].lesson = e.target.value;
                            setEditingPage({ ...editingPage, curriculum: newC });
                          }}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none"
                          placeholder="টপিক নেম"
                        />
                        <input
                          type="text"
                          value={c.description}
                          onChange={(e) => {
                            const newC = [...editingPage.curriculum];
                            newC[idx].description = e.target.value;
                            setEditingPage({ ...editingPage, curriculum: newC });
                          }}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                          placeholder="সংক্ষিপ্ত বিবরণ"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. BONUS */}
              {activeEditorSection === 'bonus' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">ফ্রি বোনাস আইটেমসমূহ:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(editingPage.bonus || []).map((b, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                        <span className="text-[11px] font-extrabold text-amber-400">বোনাস #{idx + 1} (মূল্য ৳{b.value})</span>
                        <input
                          type="text"
                          value={b.title}
                          onChange={(e) => {
                            const newBonus = [...editingPage.bonus];
                            newBonus[idx].title = e.target.value;
                            setEditingPage({ ...editingPage, bonus: newBonus });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none"
                          placeholder="বোনাস টাইটেল"
                        />
                        <textarea
                          rows={2}
                          value={b.description}
                          onChange={(e) => {
                            const newBonus = [...editingPage.bonus];
                            newBonus[idx].description = e.target.value;
                            setEditingPage({ ...editingPage, bonus: newBonus });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                          placeholder="বোনাস বিবরণ"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. FAQ */}
              {activeEditorSection === 'faq' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">সাধারণ প্রশ্নোত্তর (FAQ):</h3>
                  <div className="space-y-3">
                    {(editingPage.faq || []).map((f, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                        <input
                          type="text"
                          value={f.question}
                          onChange={(e) => {
                            const newF = [...editingPage.faq];
                            newF[idx].question = e.target.value;
                            setEditingPage({ ...editingPage, faq: newF });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none"
                          placeholder="প্রশ্ন"
                        />
                        <textarea
                          rows={2}
                          value={f.answer}
                          onChange={(e) => {
                            const newF = [...editingPage.faq];
                            newF[idx].answer = e.target.value;
                            setEditingPage({ ...editingPage, faq: newF });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                          placeholder="উত্তর"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. TESTIMONIALS */}
              {activeEditorSection === 'testimonials' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">গ্রাহক রিভিউ ও প্রমাণ:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(editingPage.testimonials || []).map((t, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => {
                            const newT = [...editingPage.testimonials];
                            newT[idx].name = e.target.value;
                            setEditingPage({ ...editingPage, testimonials: newT });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none"
                          placeholder="গ্রাহকের নাম"
                        />
                        <textarea
                          rows={3}
                          value={t.review}
                          onChange={(e) => {
                            const newT = [...editingPage.testimonials];
                            newT[idx].review = e.target.value;
                            setEditingPage({ ...editingPage, testimonials: newT });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                          placeholder="রিভিউ মেসেজ"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. FINAL CTA */}
              {activeEditorSection === 'finalCta' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">অর্ডার সেকশন হেডিং (Heading):</label>
                    <input
                      type="text"
                      value={editingPage.finalCta?.heading || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, finalCta: { ...editingPage.finalCta, heading: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">বাটন টেক্সট (Button Text):</label>
                    <input
                      type="text"
                      value={editingPage.finalCta?.buttonText || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, finalCta: { ...editingPage.finalCta, buttonText: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 9. DELIVERY SETTINGS */}
              {activeEditorSection === 'delivery' && (
                <div className="space-y-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>পেমেন্ট সাকসেস ডেলিভারি কনফিগারেশন</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">গুগল ড্রাইভ অ্যাক্সেস ফোল্ডার লিংক:</label>
                    <input
                      type="text"
                      value={editingPage.delivery?.driveUrl || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, delivery: { ...editingPage.delivery, driveUrl: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">ভিআইপি টেলিগ্রাম কমিউনিটি লিংক:</label>
                    <input
                      type="text"
                      value={editingPage.delivery?.vipTelegramUrl || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, delivery: { ...editingPage.delivery, vipTelegramUrl: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">কাস্টম ডেলিভারি মেসেজ (ইমেইলে যাবে):</label>
                    <textarea
                      rows={2}
                      value={editingPage.delivery?.customMessage || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, delivery: { ...editingPage.delivery, customMessage: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 10. SEO */}
              {activeEditorSection === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">এসইও টাইটেল (SEO Title):</label>
                    <input
                      type="text"
                      value={editingPage.seo?.metaTitle || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaTitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">মেটা ডেসক্রিপশন (Meta Description):</label>
                    <textarea
                      rows={2}
                      value={editingPage.seo?.metaDescription || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, seo: { ...editingPage.seo, metaDescription: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Save & Preview Bar */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('all_pages')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                বাতিল করুন
              </button>

              <button
                onClick={handleSaveLandingPage}
                disabled={isSaving}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>সম্পূর্ণ ল্যান্ডিং পেজ সেভ করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 3: PRODUCTS & DELIVERY CONFIG */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span>প্রোডাক্ট ক্যাটালগ ও ডেলিভারি লিংক ম্যানেজমেন্ট</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  প্রতিটি প্রোডাক্টের জন্য গুগল ড্রাইভ, ভিআইপি টেলিগ্রাম ও ডাউনলোড লিংক আলাদাভাবে কনফিগার করুন।
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">প্রোডাক্ট নাম</th>
                    <th className="p-3.5">প্রাইস</th>
                    <th className="p-3.5">ড্রাইভ লিংক</th>
                    <th className="p-3.5">টেলিগ্রাম সাপোর্ট</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {storeProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2.5">
                        <img src={p.imageUrl} alt="" className="w-8 h-8 rounded-lg object-contain bg-slate-800" />
                        <div>
                          <div>{p.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {p.id}</div>
                        </div>
                      </td>
                      <td className="p-3.5 font-black text-emerald-400">৳{p.price}</td>
                      <td className="p-3.5 font-mono text-[11px] text-indigo-400 truncate max-w-[200px]">
                        {p.downloadUrl || 'ডিফল্ট ১০০TB ক্লাউড ফোল্ডার'}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-sky-400 truncate max-w-[150px]">
                        @nasir_digital_hub_vip_support
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleAutoLoadProduct(p.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold text-[11px] transition-all cursor-pointer"
                        >
                          ল্যান্ডিং পেজ বানান
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 4: ORDERS MANAGER & ADVANCED SEARCH */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>অর্ডার তালিকা ও সার্চ ফিল্টার</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  অর্ডার আইডি, ইমেইল, মোবাইল বা ট্রানজ্যাকশন আইডি দিয়ে সার্চ এবং স্ট্যাটাস চেক করুন।
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="অর্ডার ID, নাম, মোবাইল, ইমেইল..."
                  value={orderSearchTerm}
                  onChange={(e) => setOrderSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">ফিল্টার:</span>
              {(['all', 'completed', 'pending', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    orderStatusFilter === st
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st === 'all' ? 'সব অর্ডার' : st === 'completed' ? 'পেইড ও কমপ্লিট' : st === 'pending' ? 'পেন্ডিং' : 'বাতিল'}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">অর্ডার ID</th>
                    <th className="p-3.5">গ্রাহকের নাম ও যোগাযোগ</th>
                    <th className="p-3.5">প্রোডাক্ট</th>
                    <th className="p-3.5">মূল্য</th>
                    <th className="p-3.5">পেমেন্ট স্ট্যাটাস</th>
                    <th className="p-3.5">ইমেইল ডেলিভারি</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-500">
                        কোনো অর্ডার পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const isPaid = ord.paymentStatus === 'paid' || ord.status === 'completed';
                      return (
                        <tr key={ord.id} className="hover:bg-slate-800/40">
                          <td className="p-3.5 font-mono font-bold text-white">#{ord.id}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-white">{ord.customerName}</div>
                            <div className="text-[11px] text-slate-400">{ord.customerPhone}</div>
                            <div className="text-[10px] text-slate-500">{ord.customerEmail || ord.customerAddress}</div>
                          </td>
                          <td className="p-3.5 max-w-[180px] truncate text-slate-200">
                            {ord.items?.[0]?.title || '১০০TB বান্ডেল'}
                          </td>
                          <td className="p-3.5 font-black text-emerald-400">৳{ord.total || 299}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                isPaid
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
                              }`}
                            >
                              {isPaid ? 'PAID' : 'PENDING'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                isPaid
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isPaid ? 'SENT' : 'PENDING'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => setSelectedOrderForModal(ord)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] cursor-pointer"
                            >
                              বিস্তারিত
                            </button>
                            {isPaid && (
                              <button
                                onClick={() => handleResendOrderEmail(ord)}
                                disabled={resendingEmailId === ord.id}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold text-[11px] cursor-pointer disabled:opacity-50"
                              >
                                {resendingEmailId === ord.id ? 'পাঠানো হচ্ছে...' : 'Resend Email'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 5: PAYMENTS (PAYBD VERIFIED) */}
        {/* ========================================================= */}
        {activeTab === 'payments' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>PayBD ভেরিফাইড পেমেন্টস ও ট্রানজ্যাকশন</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  সকল অনলাইন ট্রানজ্যাকশন আইডি ও ভেরিফাইড পেমেন্টের রেকর্ড।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">মোট সংগৃহীত রেভিনিউ</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                  ৳{totalStats.totalRev}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">সফল পেমেন্ট সংখ্যা</div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {totalStats.completedOrders}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">পেমেন্ট মেথডস</div>
                <div className="text-xs text-slate-300 font-bold mt-1">
                  bKash, Nagad, Rocket, Upay, Cards (PayBD Gateway)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 6: EMAIL DELIVERY */}
        {/* ========================================================= */}
        {activeTab === 'email_delivery' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>অটোমেটিক ইমেইল ডেলিভারি ও টেস্ট সেন্টার</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  পেমেন্ট সাকসেস হওয়ার সাথে সাথে Hostinger REST API / SMTP দিয়ে পাঠানো ইমেইলের স্ট্যাটাস।
                </p>
              </div>

              {/* Live Test Email Dispatcher */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={testEmailRecipient}
                  onChange={(e) => setTestEmailRecipient(e.target.value)}
                  placeholder="টেস্ট ইমেইল ঠিকানা"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={async () => {
                    setIsSendingTestEmail(true);
                    try {
                      const res = await fetch('/api/email/test', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ testRecipient: testEmailRecipient })
                      });
                      const data = await res.json();
                      alert(data.message || 'টেস্ট ইমেইল পাঠানো হয়েছে!');
                    } catch (e: any) {
                      alert('Error: ' + e.message);
                    } finally {
                      setIsSendingTestEmail(false);
                    }
                  }}
                  disabled={isSendingTestEmail}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer disabled:opacity-50"
                >
                  {isSendingTestEmail ? 'পাঠানো হচ্ছে...' : 'টেস্ট পাঠান'}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white">ইমেইল কনফিগারেশন স্ট্যাটাস:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">API সার্ভিস:</span>
                  <span className="font-bold text-emerald-400">Hostinger Mail REST API</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">বিজনেস মেইল:</span>
                  <span className="font-mono text-slate-200">nasirdigitalhub@pipilikhost.com</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">ডেলিভারি মেথড:</span>
                  <span className="font-bold text-sky-400">Instant Automated Queue</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">স্ট্যাটাস:</span>
                  <span className="font-bold text-emerald-400">ACTIVE & READY</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 7: CUSTOMERS */}
        {/* ========================================================= */}
        {activeTab === 'customers' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>কাস্টমার ডিরেক্টরি ({customersList.length} জন)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  সকল শিক্ষার্থীর তালিকা, ক্রয়কৃত অর্ডারের সংখ্যা ও সর্বমোট পেমেন্ট।
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">কাস্টমার নাম</th>
                    <th className="p-3.5">WhatsApp / মোবাইল</th>
                    <th className="p-3.5">ইমেইল</th>
                    <th className="p-3.5">অর্ডার সংখ্যা</th>
                    <th className="p-3.5">মোট পরিশোধ</th>
                    <th className="p-3.5">সর্বশেষ অর্ডার</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {customersList.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          {c.name.slice(0, 1)}
                        </div>
                        <span>{c.name}</span>
                      </td>
                      <td className="p-3.5 font-mono">{c.phone}</td>
                      <td className="p-3.5 font-mono text-slate-400">{c.email}</td>
                      <td className="p-3.5 font-bold text-white">{c.orderCount} টি</td>
                      <td className="p-3.5 font-black text-emerald-400">৳{c.totalSpend}</td>
                      <td className="p-3.5 text-slate-400">{c.lastOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 8: ANALYTICS */}
        {/* ========================================================= */}
        {activeTab === 'analytics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>ল্যান্ডিং পেজ সেলস ফানেল অ্যানালিটিক্স</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">১. মোট পেজ ভিউস (Views)</div>
                <div className="text-2xl font-black text-white font-mono mt-1">{totalStats.totalViews}</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">২. CTA ক্লিকস (Clicks)</div>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{totalStats.totalCta}</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">৩. সম্পন্ন পেমেন্ট (Orders)</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{totalStats.completedOrders}</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">৪. কনভার্সন রেট (Conversion)</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">{totalStats.conversionRate}%</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 9: TEMPLATES */}
        {/* ========================================================= */}
        {activeTab === 'templates' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>Google AI Studio হাই-কনভার্টিং A4 ডিজাইন টেমপ্লেট</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  বাংলাভাষী শিক্ষার্থীদের জন্য প্রমাণিত, ক্লিন, প্রিমিয়াম ও সম্পূর্ণ রেসপনসিভ ল্যান্ডিং পেজ আর্কিটেকচার।
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>ডিফল্ট টেমপ্লেটের বৈশিষ্ট্যসমূহ:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">✓ A4-Inspired পেজ লেআউট ও প্রিন্ট সাপোর্ট (@page)</li>
                <li className="flex items-center gap-2">✓ ১০০TB ক্লাউড ড্রাইভ লাইভ স্ক্রিনশট উইজেট</li>
                <li className="flex items-center gap-2">✓ রিয়েল-টাইম এনরোলমেন্ট সোশ্যাল প্রুফ পপআপ</li>
                <li className="flex items-center gap-2">✓ মোবাইল ফ্রেন্ডলি স্টিকি "এখনই অর্ডার করুন" বটম বার</li>
                <li className="flex items-center gap-2">✓ ওয়ান-ক্লিক সরাসরি PayBD পেমেন্ট ও অটোমেটিক অর্ডার</li>
                <li className="flex items-center gap-2">✓ ইনস্ট্যান্ট গুগল ড্রাইভ আনলক ও স্বয়ংক্রিয় মেইল ডেলিভারি</li>
              </ul>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBTAB 10: SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <span>পেমেন্ট গেটওয়ে, মেটা পিক্সেল ও সার্ভার কনফিগারেশন</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                PayBD API Key, Meta Conversions API Access Token ও SMTP ক্রেডেনশিয়াল আপডেট করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PayBD Settings */}
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>PayBD পেমেন্ট গেটওয়ে</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Brand Key / Device Key:</label>
                  <input
                    type="text"
                    value={settingsForm.paybdBrandKey}
                    onChange={(e) => setSettingsForm({ ...settingsForm, paybdBrandKey: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">API Key:</label>
                  <input
                    type="password"
                    value={settingsForm.paybdApiKey}
                    onChange={(e) => setSettingsForm({ ...settingsForm, paybdApiKey: e.target.value })}
                    placeholder="PayBD API Key (Optional in Sandbox)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Secret Key:</label>
                  <input
                    type="password"
                    value={settingsForm.paybdSecretKey}
                    onChange={(e) => setSettingsForm({ ...settingsForm, paybdSecretKey: e.target.value })}
                    placeholder="PayBD Secret Key"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Meta Pixel Settings */}
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Meta Pixel & Conversions API (CAPI)</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Meta Pixel ID:</label>
                  <input
                    type="text"
                    value={settingsForm.metaPixelId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, metaPixelId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CAPI Access Token (EAAT...):</label>
                  <input
                    type="password"
                    value={settingsForm.metaCapiAccessToken}
                    onChange={(e) => setSettingsForm({ ...settingsForm, metaCapiAccessToken: e.target.value })}
                    placeholder="Meta Conversions API Token"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Test Event Code (Optional):</label>
                  <input
                    type="text"
                    value={settingsForm.metaTestEventCode}
                    onChange={(e) => setSettingsForm({ ...settingsForm, metaTestEventCode: e.target.value })}
                    placeholder="TEST12345"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/admin/config', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(settingsForm)
                    });
                    setSuccessMsg('সেটিংস সফলভাবে আপডেট করা হয়েছে!');
                    setTimeout(() => setSuccessMsg(null), 3000);
                  } catch (e: any) {
                    alert('Error: ' + e.message);
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
              >
                সেটিংস সংরক্ষণ করুন
              </button>
            </div>
          </div>
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrderForModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-black text-white">অর্ডার বিবরণী #{selectedOrderForModal.id}</h3>
                <button onClick={() => setSelectedOrderForModal(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">গ্রাহকের নাম:</span>
                  <span className="font-bold text-white">{selectedOrderForModal.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">হোয়াটসঅ্যাপ / ফোন:</span>
                  <span className="font-mono text-white">{selectedOrderForModal.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ইমেইল:</span>
                  <span className="font-mono text-slate-200">{selectedOrderForModal.customerEmail || selectedOrderForModal.customerAddress || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">পেমেন্ট মেথড:</span>
                  <span>{selectedOrderForModal.paymentMethod || 'PayBD Online'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">পরিশোধিত মূল্য:</span>
                  <span className="font-black text-emerald-400 text-sm">৳{selectedOrderForModal.total || 299}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">অর্ডার স্ট্যাটাস:</span>
                  <span className="font-bold uppercase text-emerald-400">{selectedOrderForModal.status || 'COMPLETED'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleResendOrderEmail(selectedOrderForModal)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Resend Delivery Email</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
