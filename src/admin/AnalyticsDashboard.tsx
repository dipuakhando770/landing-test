import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Eye,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  RefreshCw,
  TrendingUp,
  Filter,
  Search,
  ArrowUpRight,
  MessageCircle,
  Download,
  Smartphone,
  Monitor,
  Copy,
  Check,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Zap,
  PhoneCall,
  User,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { ActivityLog, ActivityType } from '../types';
import { subscribeToActivityLogs, clearOldActivityLogs } from '../firebase/services';
import { formatPrice, sanitizeWhatsAppNumber } from '../utils/formatters';
import { useStore } from '../context/StoreContext';

export const AnalyticsDashboard: React.FC = () => {
  const { settings } = useStore();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const prevLogsCountRef = useRef<number>(0);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const [rtdbRes, apiRes] = await Promise.allSettled([
        fetch('https://nasirdigitalhub-d859f-default-rtdb.firebaseio.com/activity_logs.json'),
        fetch('/api/activities')
      ]);

      const map = new Map<string, ActivityLog>();
      // Keep existing
      logs.forEach(l => map.set(l.id, l));

      if (rtdbRes.status === 'fulfilled' && rtdbRes.value.ok) {
        const data = await rtdbRes.value.json();
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
            const item = data[key];
            if (item && item.timestamp) {
              map.set(key, { id: key, ...item });
            }
          });
        }
      }

      if (apiRes.status === 'fulfilled' && apiRes.value.ok) {
        const apiData = await apiRes.value.json();
        const list = Array.isArray(apiData) ? apiData : apiData?.activities || [];
        if (Array.isArray(list)) {
          list.forEach((item: any) => {
            if (item && item.id) {
              map.set(item.id, item);
            }
          });
        }
      }

      const merged = Array.from(map.values()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setLogs(merged);
    } catch {
      // Non-fatal
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    const unsub = subscribeToActivityLogs(
      (newLogs) => {
        // If new log arrives and sound is enabled, play a subtle chime
        if (
          soundEnabled &&
          prevLogsCountRef.current > 0 &&
          newLogs.length > prevLogsCountRef.current
        ) {
          try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.25);
          } catch {
            // Ignore audio context autoplay restriction
          }
        }
        prevLogsCountRef.current = newLogs.length;
        setLogs(newLogs);
        setLoading(false);
      },
      (err) => {
        console.error('Activity logs error:', err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [soundEnabled]);

  // Filtered logs
  const filteredLogs = logs.filter((log) => {
    // Type filter
    if (filterType === 'page' && log.type !== 'page_view' && log.type !== 'product_view') return false;
    if (filterType === 'cart' && log.type !== 'add_to_cart' && log.type !== 'remove_from_cart') return false;
    if (filterType === 'order' && log.type !== 'order_placed' && log.type !== 'order_cancelled' && log.type !== 'checkout_start') return false;
    if (filterType === 'whatsapp' && log.type !== 'whatsapp_click') return false;

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = log.title?.toLowerCase().includes(q);
      const matchCustomer = log.customerName?.toLowerCase().includes(q) || log.customerPhone?.includes(q);
      const matchProduct = log.productTitle?.toLowerCase().includes(q);
      const matchPath = log.path?.toLowerCase().includes(q);
      const matchOrderId = log.orderId?.toLowerCase().includes(q);
      return matchTitle || matchCustomer || matchProduct || matchPath || matchOrderId;
    }
    return true;
  });

  // Calculate stats
  const totalPageViews = logs.filter((l) => l.type === 'page_view' || l.type === 'product_view').length;
  const totalCartAdds = logs.filter((l) => l.type === 'add_to_cart').length;
  const totalCartRemoves = logs.filter((l) => l.type === 'remove_from_cart').length;
  const totalOrdersPlaced = logs.filter((l) => l.type === 'order_placed').length;
  const totalOrdersCancelled = logs.filter((l) => l.type === 'order_cancelled').length;
  const totalWhatsAppClicks = logs.filter((l) => l.type === 'whatsapp_click').length;

  const totalOrderValue = logs
    .filter((l) => l.type === 'order_placed' && typeof l.amount === 'number')
    .reduce((sum, l) => sum + (l.amount || 0), 0);

  const cartConversionRate =
    totalCartAdds > 0 ? Math.round((totalOrdersPlaced / totalCartAdds) * 100) : 0;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearLogs = async () => {
    if (window.confirm('আপনি কি পূর্ববর্তী অ্যাক্টিভিটি হিস্ট্রি ডাটাবেজ থেকে মুছে ফেলতে চান?')) {
      setIsClearing(true);
      try {
        await clearOldActivityLogs();
        setLogs([]);
      } catch (err) {
        console.error('Clear logs error:', err);
      } finally {
        setIsClearing(false);
      }
    }
  };

  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = ['Type', 'Title', 'Customer Name', 'Phone', 'Amount (BDT)', 'Order ID', 'Path', 'Device', 'Time'];
    const rows = logs.map((l) => [
      l.type,
      `"${(l.title || '').replace(/"/g, '""')}"`,
      `"${(l.customerName || '').replace(/"/g, '""')}"`,
      `"${(l.customerPhone || '').replace(/"/g, '""')}"`,
      l.amount || 0,
      l.orderId || '',
      `"${(l.path || '').replace(/"/g, '""')}"`,
      l.device || 'Web',
      new Date(l.timestamp).toLocaleString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `activity_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActivityBadge = (type: ActivityType) => {
    switch (type) {
      case 'order_placed':
        return {
          label: 'নতুন অর্ডার',
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'order_cancelled':
        return {
          label: 'অর্ডার বাতিল',
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          icon: <XCircle className="w-3.5 h-3.5 text-rose-400" />,
        };
      case 'add_to_cart':
        return {
          label: 'কার্টে যোগ',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />,
        };
      case 'remove_from_cart':
        return {
          label: 'কার্ট রিমুভ',
          bg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          icon: <Trash2 className="w-3.5 h-3.5 text-orange-400" />,
        };
      case 'checkout_start':
        return {
          label: 'চেকআউট শুরু',
          bg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
          icon: <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />,
        };
      case 'product_view':
        return {
          label: 'পণ্য ভিউ',
          bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          icon: <Eye className="w-3.5 h-3.5 text-blue-400" />,
        };
      case 'whatsapp_click':
        return {
          label: 'হোয়াটসঅ্যাপ',
          bg: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
          icon: <MessageCircle className="w-3.5 h-3.5 text-teal-400" />,
        };
      case 'direct_download':
        return {
          label: 'ফ্রি ডাউনলোড',
          bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          icon: <Download className="w-3.5 h-3.5 text-purple-400" />,
        };
      default:
        return {
          label: 'পেজ ভিজিট',
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          icon: <Activity className="w-3.5 h-3.5 text-slate-400" />,
        };
    }
  };

  const formatTimestamp = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString('bn-BD', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getRelativeTime = (ts: number) => {
    const diff = Date.now() - ts;
    const secs = Math.floor(diff / 1000);
    if (secs < 5) return 'এইমাত্র';
    if (secs < 60) return `${secs} সেকেন্ড আগে`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins} মিনিট আগে`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} ঘণ্টা আগে`;
    return formatTimestamp(ts);
  };

  const getWhatsAppDirectUrl = (log: ActivityLog) => {
    const phone = log.customerPhone ? sanitizeWhatsAppNumber(log.customerPhone) : '';
    if (!phone) return null;
    const name = log.customerName || 'সম্মানিত কাস্টমার';
    const text = encodeURIComponent(
      `👋 আসসালামু আলাইকুম ${name}!\n` +
      `আমরা ${settings.websiteName || 'Nasir Digital Hub'} থেকে যোগাযোগ করছি।\n` +
      (log.orderId ? `আপনার অর্ডার #${log.orderId} সম্পর্কিত কোনো সহায়তার প্রয়োজন আছে কি?\n` : '') +
      (log.productTitle ? `আপনি "${log.productTitle}" পণ্যটি দেখেছিলেন। এ বিষয়ে কোনো তথ্য জানতে চান?\n` : '') +
      `আমরা আপনাকে সম্পূর্ণ সহযোগিতা করতে প্রস্তুত!`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Banner Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-black text-emerald-400 tracking-wider uppercase">
                রিয়েল-টাইম লাইভ ট্র্যাকিং সক্রিয়
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">অ্যানালিটিক্স ড্যাশবোর্ড</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-lg">
              ইউজারদের লাইভ অ্যাক্টিভিটি, কনভার্সন এবং ট্রাফিক সোর্স মনিটর করার প্রফেশনাল হাব।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
              title="লাইভ ডাটা রিলোড করুন"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'সিঙ্ক হচ্ছে...' : 'রিফ্রেশ'}</span>
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                soundEnabled
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? 'সাউন্ড অন' : 'মিউট'}
            </button>
            <button
              onClick={handleExportCSV}
              disabled={logs.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              এক্সপোর্ট
            </button>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'মোট পেজ ভিউ', val: totalPageViews, color: 'text-blue-400', icon: Eye },
            { label: 'কার্টে যোগ', val: totalCartAdds, color: 'text-amber-400', icon: ShoppingCart },
            { label: 'অর্ডার সম্পন্ন', val: totalOrdersPlaced, color: 'text-emerald-400', icon: CheckCircle2 },
            { label: 'মোট ভ্যালু (BDT)', val: `৳${totalOrderValue.toLocaleString()}`, color: 'text-indigo-400', icon: DollarSign },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-black text-white">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Live Timeline & Sidebar */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              লাইভ অ্যাক্টিভিটি টাইমলাইন
            </h3>
            <div className="space-y-4">
              {filteredLogs.slice(0, 15).map((log) => {
                const badge = getActivityBadge(log.type);
                const waUrl = getWhatsAppDirectUrl(log);
                const relativeTime = getRelativeTime(log.timestamp);
                return (
                  <div key={log.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start gap-4 hover:border-slate-600 transition-colors">
                    <div className={`p-2 rounded-lg ${badge.bg.split(' ')[0]}`}>{badge.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white">{log.title}</h4>
                        <span className="text-[10px] text-slate-500">{relativeTime}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{log.customerName || 'Anonymous'} - {log.device}</p>
                      {waUrl && (
                        <a href={waUrl} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 font-bold mt-2 inline-block">WhatsApp Chat</a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-black text-white mb-6">অ্যাক্টিভিটি সামারি</h3>
              <div className="space-y-4">
                {[
                  { label: 'অর্ডার প্লেসড', val: totalOrdersPlaced, bg: 'bg-emerald-500' },
                  { label: 'অর্ডার বাতিল', val: totalOrdersCancelled, bg: 'bg-rose-500' },
                  { label: 'কার্ট অ্যাড', val: totalCartAdds, bg: 'bg-amber-500' },
                  { label: 'হোয়াটসঅ্যাপ চ্যাট', val: totalWhatsAppClicks, bg: 'bg-teal-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{item.label}</span>
                      <span className="font-bold text-white">{item.val}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.bg}`} style={{ width: `${logs.length > 0 ? (item.val / logs.length) * 100 : 0}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
