import React, { useState } from 'react';
import { Package, Search, ArrowUpDown, Award, ShoppingBag, Eye, DollarSign, Percent } from 'lucide-react';

interface ProductPerfData {
  id: string;
  name: string;
  price: number;
  views: number;
  carts: number;
  checkouts: number;
  orders: number;
  paidOrders: number;
  revenue: number;
  conversionRate: number;
}

interface ProductPerformanceSectionProps {
  products: ProductPerfData[];
}

export const ProductPerformanceSection: React.FC<ProductPerformanceSectionProps> = ({ products = [] }) => {
  const [filterLimit, setFilterLimit] = useState<'top5' | 'top10' | 'all'>('top5');
  const [sortBy, setSortBy] = useState<'revenue' | 'orders' | 'views' | 'conversion'>('revenue');
  const [searchQuery, setSearchQuery] = useState('');

  if (!products || products.length === 0) return null;

  // Filter & Search
  let filtered = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'orders') return b.paidOrders - a.paidOrders;
    if (sortBy === 'views') return b.views - a.views;
    if (sortBy === 'conversion') return b.conversionRate - a.conversionRate;
    return 0;
  });

  // Limit
  const limitCount = filterLimit === 'top5' ? 5 : filterLimit === 'top10' ? 10 : filtered.length;
  const displayProducts = filtered.slice(0, limitCount);

  const maxRevenue = Math.max(...displayProducts.map((p) => p.revenue), 1);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl font-['Hind_Siliguri',sans-serif] space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <span>প্রোডাক্ট পারফর্মেন্স ও রেভিনিউ অ্যানালিটিক্স (Top Products)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            প্রতিটি প্রোডাক্টের ভিউ, ক্লিকে রূপান্তর, অর্ডারের সংখ্যা ও আয়
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="প্রোডাক্ট খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 w-36 sm:w-48"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 border-none focus:outline-none font-semibold cursor-pointer"
            >
              <option value="revenue" className="bg-slate-900">রেভিনিউ অনুযায়ী</option>
              <option value="orders" className="bg-slate-900">অর্ডার অনুযায়ী</option>
              <option value="views" className="bg-slate-900">ভিউ অনুযায়ী</option>
              <option value="conversion" className="bg-slate-900">কনভার্সন অনুযায়ী</option>
            </select>
          </div>

          {/* Limit Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setFilterLimit('top5')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterLimit === 'top5' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Top 5
            </button>
            <button
              type="button"
              onClick={() => setFilterLimit('top10')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterLimit === 'top10' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Top 10
            </button>
            <button
              type="button"
              onClick={() => setFilterLimit('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterLimit === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              সকল
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Revenue Bar Chart (If > 1 products) */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3">
        <div className="text-xs font-extrabold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>রেভিনিউ তুলনা (Horizontal Bar Chart)</span>
        </div>

        {displayProducts.map((p) => {
          const barWidth = Math.max(5, (p.revenue / maxRevenue) * 100);

          return (
            <div key={p.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="truncate max-w-xs">{p.name}</span>
                <span className="text-emerald-400 font-black font-mono">
                  ৳{p.revenue.toLocaleString('bn-BD')}
                </span>
              </div>
              <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  style={{ width: `${barWidth}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Responsive Performance Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="p-3">প্রোডাক্ট নাম</th>
              <th className="p-3 text-center">ভিউ (Views)</th>
              <th className="p-3 text-center">চেকআউট</th>
              <th className="p-3 text-center">পরিশোধিত অর্ডার</th>
              <th className="p-3 text-right">মোট রেভিনিউ</th>
              <th className="p-3 text-right">কনভার্সন %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {displayProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3">
                  <div className="font-bold text-white max-w-xs truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">ID: {p.id} • ৳{p.price}</div>
                </td>
                <td className="p-3 text-center font-bold text-blue-400">{p.views} বার</td>
                <td className="p-3 text-center font-bold text-amber-400">{p.checkouts} টি</td>
                <td className="p-3 text-center font-extrabold text-emerald-400">{p.paidOrders} টি</td>
                <td className="p-3 text-right font-black text-emerald-400 font-mono">
                  ৳{p.revenue.toLocaleString('bn-BD')}
                </td>
                <td className="p-3 text-right">
                  <span className="bg-purple-500/20 text-purple-300 font-extrabold px-2 py-0.5 rounded-full border border-purple-500/30">
                    {p.conversionRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
