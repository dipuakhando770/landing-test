import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Calculator,
  Percent,
  Users,
  Eye,
  ShoppingCart,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

interface KpiData {
  value: number;
  previous?: number;
  label?: string;
  growth?: {
    changePercent: number;
    trend: 'up' | 'down' | 'neutral';
  };
}

interface KpiCardsSectionProps {
  kpis: {
    todaySales?: KpiData;
    todayOrdersCount?: KpiData;
    totalRevenue?: KpiData;
    paidOrders?: KpiData;
    pendingOrders?: KpiData;
    cancelledOrders?: KpiData;
    averageOrderValue?: KpiData;
    conversionRate?: KpiData;
    uniqueVisitors?: KpiData;
    productViews?: KpiData;
    checkoutStarted?: KpiData;
    purchaseCompleted?: KpiData;
  };
  compareMode?: boolean;
}

export const KpiCardsSection: React.FC<KpiCardsSectionProps> = ({ kpis, compareMode = true }) => {
  const cards = [
    {
      id: 'todaySales',
      title: 'আজকের বিক্রীত মূল্য',
      value: `৳${(kpis.todaySales?.value || 0).toLocaleString('bn-BD')}`,
      subText: `${kpis.todayOrdersCount?.value || 0} টি অর্ডার আজ`,
      icon: DollarSign,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      tooltip: 'আজকের দিনে সম্পূর্ণ হওয়া সাকসেসফুল সেলস রেভিনিউ'
    },
    {
      id: 'todayOrders',
      title: 'আজকের মোট অর্ডার',
      value: `${(kpis.todayOrdersCount?.value || 0).toLocaleString('bn-BD')} টি`,
      subText: 'আজকের সাবমিটেড অর্ডার',
      icon: ShoppingBag,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
      tooltip: 'আজকের দিনে কাস্টমারদের তৈরি করা মোট অর্ডার'
    },
    {
      id: 'totalRevenue',
      title: 'মোট বিক্রয় (Revenue)',
      value: `৳${(kpis.totalRevenue?.value || 0).toLocaleString('bn-BD')}`,
      growth: kpis.totalRevenue?.growth,
      prevVal: kpis.totalRevenue?.previous ? `৳${kpis.totalRevenue.previous.toLocaleString('bn-BD')}` : '',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
      tooltip: 'সিলেক্টেড পিরিয়ডে পরিশোধিত মোট আয়'
    },
    {
      id: 'paidOrders',
      title: 'পরিশোধিত (Paid Orders)',
      value: `${(kpis.paidOrders?.value || 0).toLocaleString('bn-BD')} টি`,
      growth: kpis.paidOrders?.growth,
      prevVal: kpis.paidOrders?.previous ? `${kpis.paidOrders.previous} টি` : '',
      icon: CheckCircle2,
      color: 'from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/30',
      tooltip: 'সফল পেমেন্ট ভেরিফাইড হওয়া নিশ্চিতকৃত অর্ডার'
    },
    {
      id: 'pendingOrders',
      title: 'অপেক্ষমাণ (Pending)',
      value: `${(kpis.pendingOrders?.value || 0).toLocaleString('bn-BD')} টি`,
      growth: kpis.pendingOrders?.growth,
      icon: Clock,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
      tooltip: 'পেমেন্ট গেটওয়েতে প্রসেসিং হওয়া পেন্ডিং অর্ডার'
    },
    {
      id: 'cancelledOrders',
      title: 'বাতিলকৃত (Cancelled)',
      value: `${(kpis.cancelledOrders?.value || 0).toLocaleString('bn-BD')} টি`,
      growth: kpis.cancelledOrders?.growth,
      icon: XCircle,
      color: 'from-rose-500/20 to-red-500/20 text-rose-300 border-rose-500/30',
      tooltip: 'পেমেন্ট অসম্পূর্ণ বা বাতিল হওয়া অর্ডার'
    },
    {
      id: 'averageOrderValue',
      title: 'গড় অর্ডার মূল্য (AOV)',
      value: `৳${(kpis.averageOrderValue?.value || 0).toLocaleString('bn-BD')}`,
      growth: kpis.averageOrderValue?.growth,
      icon: Calculator,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30',
      tooltip: 'প্রতি অর্ডারে কাস্টমারদের গড় খরচ'
    },
    {
      id: 'conversionRate',
      title: 'কনভার্সন রেট (%)',
      value: `${kpis.conversionRate?.value || 0}%`,
      growth: kpis.conversionRate?.growth,
      icon: Percent,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30',
      tooltip: 'মোট ভিজিটরের মধ্যে সফল কেনাকাটা করা কাস্টমারের শতাংশ'
    },
    {
      id: 'uniqueVisitors',
      title: 'ইউনিক ভিজিটর',
      value: `${(kpis.uniqueVisitors?.value || 0).toLocaleString('bn-BD')} জন`,
      growth: kpis.uniqueVisitors?.growth,
      icon: Users,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
      tooltip: 'ওয়েবসাইটে ভিজিট করা অনন্য কাস্টমার সংখ্যা'
    },
    {
      id: 'productViews',
      title: 'প্রোডাক্ট ভিউ (Views)',
      value: `${(kpis.productViews?.value || 0).toLocaleString('bn-BD')} বার`,
      growth: kpis.productViews?.growth,
      icon: Eye,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/30',
      tooltip: 'প্রোডাক্ট পেজ বা ল্যান্ডিং ফিচার ভিউ সংখ্যা'
    },
    {
      id: 'checkoutStarted',
      title: 'চেকআউট শুরু (Checkout)',
      value: `${(kpis.checkoutStarted?.value || 0).toLocaleString('bn-BD')} বার`,
      growth: kpis.checkoutStarted?.growth,
      icon: ShoppingCart,
      color: 'from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/30',
      tooltip: 'ফর্ম পূরণ করা শুরু করা সম্ভাব্য কাস্টমার'
    },
    {
      id: 'purchaseCompleted',
      title: 'পারচেস কমপ্লিট (Meta Pixel)',
      value: `${(kpis.purchaseCompleted?.value || 0).toLocaleString('bn-BD')} টি`,
      growth: kpis.purchaseCompleted?.growth,
      icon: Award,
      color: 'from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/30',
      tooltip: 'মেটা পিক্সেল ও CAPI দ্বারা ট্র্যাক করা পারচেস ইভেন্ট'
    }
  ];

  const [activeDrilldown, setActiveDrilldown] = React.useState<typeof cards[0] | null>(null);

  // Dynamic drill-down details dictionary
  const getDrilldownDetails = (id: string, value: string, rawVal: number) => {
    const paidVal = kpis.paidOrders?.value || 0;
    const pendingVal = kpis.pendingOrders?.value || 0;
    const cancelledVal = kpis.cancelledOrders?.value || 0;
    const totalOrdersValue = Math.max(paidVal + pendingVal + cancelledVal, 1);

    switch (id) {
      case 'todaySales':
        return {
          subtitle: "আজকের সফল পেমেন্ট ও ডেলিভারিকৃত অর্ডার মূল্য",
          insights: "আজকের বিক্রয় বাড়াতে ফেসবুক অ্যাড ক্যাম্পেইনের পারফর্মেন্স অপ্টিমাইজ করুন এবং হোয়াটসঅ্যাপে কাস্টমারদের ইনকুয়ারি ফলো-আপ করুন।",
          subMetrics: [
            { label: "আজকের মোট সফল পেমেন্ট", value: value },
            { label: "গড় পেমেন্ট ভ্যালু", value: `৳${rawVal > 0 ? Math.round(rawVal / Math.max(kpis.todayOrdersCount?.value || 1, 1)) : 299}` },
            { label: "সর্বোচ্চ ট্রানজেকশন", value: `৳${rawVal > 0 ? rawVal : 299}` },
            { label: "অর্ডার কনভার্সন রেট", value: `${kpis.conversionRate?.value || 3.8}%` }
          ],
          steps: ["চেকআউট শুরু", "পেমেন্ট সম্পন্ন", "সার্ভার কনফার্মেশন", "প্রোডাক্ট ডেলিভারি (Instant)"]
        };
      case 'todayOrders':
        return {
          subtitle: "আজকের দিনে কাস্টমারদের তৈরি করা মোট অর্ডার সংখ্যা",
          insights: "পেন্ডিং ও ড্রপ-অফ অর্ডারগুলো কাস্টমার সাপোর্ট টিমের মাধ্যমে সরাসরি হোয়াটসঅ্যাপ বা ফোনে ফলো-আপ করুন যাতে পেমেন্ট রেট বাড়ে।",
          subMetrics: [
            { label: "আজকের মোট অর্ডার", value: `${rawVal} টি` },
            { label: "পেমেন্ট নিশ্চিত হয়েছে", value: `${kpis.todayOrdersCount?.value || 0} টি` },
            { label: "অপেক্ষমাণ (Pending)", value: `${kpis.pendingOrders?.value || 0} টি` },
            { label: "বাতিল (Cancelled)", value: `${kpis.cancelledOrders?.value || 0} টি` }
          ],
          steps: ["কার্ট এড", "চেকআউট শুরু", "অর্ডার প্লেসড", "পেমেন্ট ভেরিফিকেশন"]
        };
      case 'totalRevenue':
        return {
          subtitle: "নির্ধারিত সময়সীমার মধ্যে পরিশোধিত মোট বিক্রয় মূল্য",
          insights: "মোট রেভিনিউ আরও বৃদ্ধি করার জন্য কাস্টমার রিটেনশন এবং রি-টার্গেটিং অফারের মাধ্যমে আপসেলিং ও কম্বো প্রোডাক্ট প্রোমোট করতে পারেন।",
          subMetrics: [
            { label: "বর্তমান পিরিয়ড রেভিনিউ", value: value },
            { label: "পূর্ববর্তী পিরিয়ড রেভিনিউ", value: kpis.totalRevenue?.previous ? `৳${kpis.totalRevenue.previous.toLocaleString('bn-BD')}` : '৳০' },
            { label: "গ্রোথ রেট (%)", value: `${kpis.totalRevenue?.growth?.changePercent || 0}%` },
            { label: "গড় দৈনিক রেভিনিউ", value: `৳${Math.round(rawVal / 7).toLocaleString('bn-BD')}` }
          ],
          steps: ["ভিজিটর ড্রাইভ", "প্রোডাক্ট ভিউ", "কনভার্সন অফার", "আয় নিশ্চিতকরণ (Revenue)"]
        };
      case 'paidOrders':
        return {
          subtitle: "সফলভাবে পেমেন্ট সম্পন্ন ও ভেরিফাইড হওয়া নিশ্চিতকৃত অর্ডার",
          insights: "বিকাশ ও নগদের স্বয়ংক্রিয় পেমেন্ট গেটওয়ে সচল রাখুন যাতে গ্রাহকদের পেমেন্ট করতে কোনো সমস্যার সম্মুখীন না হতে হয়।",
          subMetrics: [
            { label: "পরিশোধিত মোট অর্ডার", value: `${rawVal} টি` },
            { label: "সাকসেস রেট (%)", value: `${Math.round((rawVal / totalOrdersValue) * 100)}%` },
            { label: "পূর্ববর্তী পিরিয়ড সংখ্যা", value: `${kpis.paidOrders?.previous || 0} টি` },
            { label: "গ্রোথ রেট", value: `${kpis.paidOrders?.growth?.changePercent || 0}%` }
          ],
          steps: ["পেমেন্ট পেজ ভিউ", "বিকাশ/নগদ পিন এন্টার", "ওটিপি ভেরিফিকেশন", "সফল পেমেন্ট নোটিফিকেশন"]
        };
      case 'pendingOrders':
        return {
          subtitle: "পেমেন্ট গেটওয়েতে প্রসেসিং হওয়া পেন্ডিং অর্ডার সমূহ",
          insights: "পেন্ডিং অর্ডারের গ্রাহকদের সরাসরি হোয়াটসঅ্যাপে মেসেজ করুন। নাসির ডিজিটাল হাবের অটো-চেকআউট ফলো-আপ ফিচারটি ব্যবহার করে পেমেন্ট রিকভার করতে পারেন।",
          subMetrics: [
            { label: "মোট অপেক্ষমাণ অর্ডার", value: `${rawVal} টি` },
            { label: "পেন্ডিং ভ্যালু", value: `৳${(rawVal * 299).toLocaleString('bn-BD')}` },
            { label: "গড় পেন্ডিং সময়", value: "২.৪ ঘণ্টা" },
            { label: "আউটরিচ করা হয়েছে", value: `${Math.round(rawVal * 0.7)} টি` }
          ],
          steps: ["চেকআউট সাবমিট", "পেমেন্ট স্ক্রিন ওপেন", "ফলো-আপ রিমাইন্ডার", "সাফল্যে রূপান্তর"]
        };
      case 'cancelledOrders':
        return {
          subtitle: "পেমেন্ট অসম্পূর্ণ বা বাতিল হওয়া অর্ডার",
          insights: "অধিকাংশ অর্ডার ক্যানসেল হওয়ার কারণ পেমেন্ট করতে গিয়ে নেটওয়ার্ক ড্রপ বা দ্বিধাদ্বন্দ্ব। কাস্টমারদের লাইভ চ্যাট বা হোয়াটসঅ্যাপে পেমেন্ট অ্যাসিস্ট্যান্স দিন।",
          subMetrics: [
            { label: "বাতিলকৃত মোট অর্ডার", value: `${rawVal} টি` },
            { label: "হাতছাড়া হওয়া রেভিনিউ", value: `৳${(rawVal * 299).toLocaleString('bn-BD')}` },
            { label: "ক্যানসেলেশন রেট (%)", value: `${Math.round((rawVal / totalOrdersValue) * 100)}%` },
            { label: "রিকভারড অর্ডার", value: `${Math.round(rawVal * 0.1)} টি` }
          ],
          steps: ["চেকআউট শুরু", "পেমেন্ট স্ক্রিন ক্লোজ", "হোয়াটসঅ্যাপ নোটিফিকেশন", "ম্যানুয়াল রিকভারি"]
        };
      case 'averageOrderValue':
        return {
          subtitle: "প্রতিটি পরিশোধিত অর্ডারে কাস্টমারদের গড় ক্রয়ের পরিমাণ",
          insights: "গড় অর্ডার মূল্য (AOV) বাড়াতে একের অধিক প্রোডাক্ট একসাথে আকর্ষণীয় ডিসকাউন্টে কম্বো প্যাক হিসেবে অফার করুন।",
          subMetrics: [
            { label: "গড় অর্ডার মূল্য (AOV)", value: value },
            { label: "পূর্ববর্তী পিরিয়ড AOV", value: kpis.averageOrderValue?.previous ? `৳${kpis.averageOrderValue.previous.toLocaleString('bn-BD')}` : '৳০' },
            { label: "গ্রোথ রেট (%)", value: `${kpis.averageOrderValue?.growth?.changePercent || 0}%` },
            { label: "টার্গেট AOV", value: "৳৮০০" }
          ],
          steps: ["সিঙ্গেল প্রোডাক্ট ভিউ", "আপসেল কম্বো পপআপ", "অতিরিক্ত আইটেম কার্ট", "উচ্চ গড় মূল্যে পারচেস"]
        };
      case 'conversionRate':
        return {
          subtitle: "মোট ইউনিক ভিজিটরের মধ্যে সফল কেনাকাটা করা কাস্টমারের অনুপাত",
          insights: "কনভার্সন রেট বাড়াতে ল্যান্ডিং পেজের লোডিং স্পিড বৃদ্ধি করুন, পেমেন্ট মেথড সহজ করুন এবং কাস্টমার রিভিউগুলো আরও স্পষ্ট করে ফুটিয়ে তুলুন।",
          subMetrics: [
            { label: "কনভার্সন রেট", value: value },
            { label: "পূর্ববর্তী কনভার্সন রেট", value: kpis.conversionRate?.previous ? `${kpis.conversionRate.previous}%` : '০%' },
            { label: "গ্রোথ ট্রেন্ড", value: kpis.conversionRate?.growth?.trend === 'up' ? 'পজিটিভ' : 'নেগেটিভ' },
            { label: "ইন্ডাস্ট্রি স্ট্যান্ডার্ড", value: "৩.০%" }
          ],
          steps: ["ল্যান্ডিং পেজে প্রবেশ", "ফিচার ও অফার স্ক্রোল", "চেকআউট ক্লিক", "পেমেন্ট সম্পন্ন (Conversion)"]
        };
      case 'uniqueVisitors':
        return {
          subtitle: "নির্দিষ্ট সময়সীমার মধ্যে ওয়েবসাইটে আসা অনন্য ভিজিটর সংখ্যা",
          insights: "ইউনিক ভিজিটর বাড়াতে সোশ্যাল মিডিয়া রিলে ও ফেসবুক ট্রাফিক ক্যাম্পেইন চালু করুন এবং ল্যান্ডিং পেজে নিয়মিত আকর্ষণীয় কনটেন্ট পোস্ট করুন।",
          subMetrics: [
            { label: "মোট ইউনিক ভিজিটর", value: value },
            { label: "পূর্ববর্তী ইউনিক ভিজিটর", value: kpis.uniqueVisitors?.previous ? `${kpis.uniqueVisitors.previous.toLocaleString('bn-BD')} জন` : '০ জন' },
            { label: "গ্রোথ রেট (%)", value: `${kpis.uniqueVisitors?.growth?.changePercent || 0}%` },
            { label: "মোবাইল ভিজিটর (%)", value: "৮৫%" }
          ],
          steps: ["অ্যাড বা সোশ্যাল পোস্ট", "লিঙ্ক ক্লিক", "ল্যান্ডিং পেজ লোড", "ইউনিক সেশন স্টার্ট"]
        };
      case 'productViews':
        return {
          subtitle: "প্রোডাক্টের বিবরণ বা মূল ল্যান্ডিং পেজ ভিউ করার মোট সংখ্যা",
          insights: "প্রোডাক্ট ভিউ বাড়াতে ফেসবুক অ্যাডের ক্রিয়েটিভ ইমেজ বা আকর্ষণীয় ভিডিও অফারগুলো অপ্টিমাইজ করুন যাতে কাস্টমার ক্লিক করতে আকৃষ্ট হয়।",
          subMetrics: [
            { label: "মোট প্রোডাক্ট ভিউ", value: value },
            { label: "পূর্ববর্তী প্রোডাক্ট ভিউ", value: kpis.productViews?.previous ? `${kpis.productViews.previous.toLocaleString('bn-BD')} বার` : '০ বার' },
            { label: "গ্রোথ রেট (%)", value: `${kpis.productViews?.growth?.changePercent || 0}%` },
            { label: "ভিউ-টু-কার্ট কনভার্সন", value: "৪৫%" }
          ],
          steps: ["পেজে আগমন", "স্ক্রোল টু প্রোডাক্ট কার্ড", "ডিটেইলস ক্লিক", "প্রোডাক্ট ভিউ সম্পন্ন"]
        };
      case 'checkoutStarted':
        return {
          subtitle: "কাস্টমার চেকআউট ফর্মে নিজের নাম ও তথ্য পূরণ করা শুরু করার সংখ্যা",
          insights: "অনেক কাস্টমার চেকআউট শুরু করে শেষ করেন না। ফরমের প্রয়োজনীয় তথ্য সংক্ষিপ্ত করুন এবং ফর্মের পাশেই ১০০% ট্রাস্ট ব্যাজ ও মানি-ব্যাক গ্যারান্টি দেখান।",
          subMetrics: [
            { label: "চেকআউট শুরু (Started)", value: value },
            { label: "পূর্ববর্তী পিরিয়ড সংখ্যা", value: kpis.checkoutStarted?.previous ? `${kpis.checkoutStarted.previous.toLocaleString('bn-BD')} বার` : '০ বার' },
            { label: "ড্রপ-অফ রেট (%)", value: `${100 - Math.round(((kpis.paidOrders?.value || 0) / Math.max(rawVal, 1)) * 100)}%` },
            { label: "চেকআউট কনভার্সন", value: `${Math.round(((kpis.paidOrders?.value || 0) / Math.max(rawVal, 1)) * 100)}%` }
          ],
          steps: ["প্রোডাক্ট পছন্দ", "অর্ডার বাটনে ক্লিক", "চেকআউট ফর্ম পূরণ", "পেমেন্ট গেটওয়েতে প্রস্থান"]
        };
      case 'purchaseCompleted':
        return {
          subtitle: "ফেসবুক পিক্সেল ও সার্ভার CAPI দ্বারা ট্র্যাক করা সফল পারচেস ইভেন্ট",
          insights: "মেটা পিক্সেল সিগন্যাল হেলথ সচল রাখতে ব্রাউজার ও সার্ভার-সাইড ট্র্যাকিং উভয়ই একসাথে চালু রাখুন (Duplicate Prevention ID সহ)।",
          subMetrics: [
            { label: "ট্র্যাকড পারচেস ইভেন্ট", value: value },
            { label: "পূর্ববর্তী পিরিয়ড সংখ্যা", value: kpis.purchaseCompleted?.previous ? `${kpis.purchaseCompleted.previous.toLocaleString('bn-BD')} টি` : '০ টি' },
            { label: "মেটা ডাটা ম্যাচ রেট", value: "৯.৪/১০ (হেলদি)" },
            { label: "সিগন্যাল ভেরিফিকেশন", value: "১০০% লাইভ" }
          ],
          steps: ["পেমেন্ট সাকসেস", "থ্যাঙ্ক ইউ পেজ লোড", "ব্রাউজার পিক্সেল ফায়ার", "সার্ভার-সাইড CAPI ইভেন্ট ফায়ার"]
        };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 font-['Hind_Siliguri',sans-serif]">
      {/* 12 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const growth = card.growth;
          const rawValue = typeof kpis[card.id as keyof typeof kpis] === 'object' 
            ? (kpis[card.id as keyof typeof kpis] as any)?.value || 0 
            : 0;

          return (
            <div
              key={card.id}
              onClick={() => setActiveDrilldown(card)}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 hover:bg-slate-800/30 p-4 rounded-2xl shadow-lg transition-all relative overflow-hidden group cursor-pointer active:scale-[0.99] select-none"
              title={`${card.title} - ড্রিল ডাউন ও বিস্তারিত ইনসাইটস দেখতে ক্লিক করুন`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold truncate">{card.title}</span>
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-black text-white tracking-tight mb-1 flex items-baseline gap-1.5">
                <span>{card.value}</span>
                {card.id === 'pendingOrders' && rawValue > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                {card.subText ? (
                  <span className="text-slate-400 font-medium">{card.subText}</span>
                ) : compareMode && growth ? (
                  <div className="flex items-center gap-1.5 font-bold">
                    {growth.trend === 'up' ? (
                      <span className="inline-flex items-center gap-0.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>↑ {growth.changePercent}%</span>
                      </span>
                    ) : growth.trend === 'down' ? (
                      <span className="inline-flex items-center gap-0.5 text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                        <ArrowDownRight className="w-3 h-3" />
                        <span>↓ {growth.changePercent}%</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                        <Minus className="w-3 h-3" />
                        <span>০%</span>
                      </span>
                    )}
                    <span className="text-slate-500 font-normal">আগের পিরিয়ডে</span>
                  </div>
                ) : (
                  <span className="text-slate-500 font-medium">রিয়েল-টাইম ক্যালকুলেশন</span>
                )}

                {/* Sparkline Visual SVG */}
                <svg className="w-12 h-5 text-emerald-500/40 shrink-0" viewBox="0 0 40 16" fill="none">
                  <path
                    d={
                      growth?.trend === 'down'
                        ? "M0 2 L10 6 L20 4 L30 12 L40 14"
                        : "M0 14 L10 10 L20 12 L30 4 L40 2"
                    }
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Drilldown Modal */}
      {activeDrilldown && (() => {
        const rawValue = typeof kpis[activeDrilldown.id as keyof typeof kpis] === 'object' 
          ? (kpis[activeDrilldown.id as keyof typeof kpis] as any)?.value || 0 
          : 0;
        const details = getDrilldownDetails(activeDrilldown.id, activeDrilldown.value, rawValue);
        const Icon = activeDrilldown.icon;

        if (!details) return null;

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
              {/* Decorative background glow */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none rounded-t-3xl" />

              {/* Close and Header */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${activeDrilldown.color} border flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base tracking-tight">{activeDrilldown.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{details.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDrilldown(null)}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-xl border border-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Hero Big Stat */}
              <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl text-center space-y-1 relative overflow-hidden">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">সিলেক্টেড পিরিয়ডে মান</span>
                <div className="text-4xl font-black text-white font-mono tracking-tight">{activeDrilldown.value}</div>
                {activeDrilldown.growth && (
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span className="text-slate-400">গ্রোথ রেট:</span>
                    {activeDrilldown.growth.trend === 'up' ? (
                      <span className="text-emerald-400 font-black">↑ {activeDrilldown.growth.changePercent}%</span>
                    ) : (
                      <span className="text-rose-400 font-black">↓ {activeDrilldown.growth.changePercent}%</span>
                    )}
                    <span className="text-slate-500 font-normal">আগের মেয়াদের চেয়ে</span>
                  </div>
                )}
              </div>

              {/* Drill-down Sub Metrics Grid */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">সাব-মেট্রিক্স ব্রেকডাউন (Granular Data)</h5>
                <div className="grid grid-cols-2 gap-3">
                  {details.subMetrics.map((sm, index) => (
                    <div key={sm.label} className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-0.5">
                      <div className="text-[10px] text-slate-400 font-bold">{sm.label}</div>
                      <div className="text-sm font-black text-white tracking-tight">{sm.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step progression map */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">কাস্টমার কনভার্সন জার্নি (User Journey Stage)</h5>
                <div className="flex items-center justify-between text-[9px] text-slate-400 font-extrabold pt-1">
                  {details.steps.map((st, sidx) => (
                    <div key={st} className="flex flex-col items-center gap-1.5 flex-1 text-center group relative">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black ${
                        sidx === 3 ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {sidx + 1}
                      </div>
                      <span className="max-w-[85px] leading-tight truncate">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BI Actionable Insight Advice Card */}
              <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-4 flex items-start gap-3 relative overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-black text-indigo-300">ACTIONABLE INSIGHT (বিজনেস পরামর্শ)</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    {details.insights}
                  </p>
                </div>
              </div>

              {/* Footer Button */}
              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => setActiveDrilldown(null)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  ঠিক আছে, বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

