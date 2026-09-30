import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
  Download
} from 'lucide-react';

import { DateRangeSelector, PeriodType } from './DateRangeSelector';
import { KpiCardsSection } from './KpiCardsSection';
import { MainRevenueChart } from './MainRevenueChart';
import { SalesTrendChart } from './SalesTrendChart';
import { ProductPerformanceSection } from './ProductPerformanceSection';
import { TrafficAndMetaAdsSection } from './TrafficAndMetaAdsSection';
import { VisualSalesFunnel } from './VisualSalesFunnel';
import { OrderAndCustomerSection } from './OrderAndCustomerSection';
import { DeviceAndGeoAnalytics } from './DeviceAndGeoAnalytics';
import { RealtimeAndHourlySection } from './RealtimeAndHourlySection';
import { SmartInsightsSection } from './SmartInsightsSection';
import { ReportCenterModal } from './ReportCenterModal';

export const BiAnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<PeriodType>('7d');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [compareMode, setCompareMode] = useState<boolean>(true);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const fetchBiAnalytics = async () => {
    setIsLoading(true);
    try {
      let url = `/api/admin/bi-analytics?period=${period}`;
      if (period === 'custom' && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching BI Analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBiAnalytics();
  }, [period]);

  const handleCustomDatesChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      fetchBiAnalytics();
    }
  };

  return (
    <div className="space-y-6 font-['Hind_Siliguri',sans-serif]">
      {/* Top Section Header & Report Center Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white tracking-tight">
              বিজনেস ইন্টেলিজেন্স ও অ্যানালিটিক্স ড্যাশবোর্ড
            </h2>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              LIVE DATA
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            ওয়েবসাইটের আসল সেলস, ফেসবুক এডস ট্রাফিক, কাস্টমার বিহেভিয়ার ও কনভার্সন ফানেল
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <FileText className="w-4 h-4 text-emerald-300" />
          <span>📊 রিপোর্ট সেন্টার & PDF এক্সপোর্ট</span>
        </button>
      </div>

      {/* 1. Date Range Selector & Comparison Control */}
      <DateRangeSelector
        selectedPeriod={period}
        onPeriodChange={setPeriod}
        startDate={startDate}
        endDate={endDate}
        onCustomDatesChange={handleCustomDatesChange}
        compareMode={compareMode}
        onCompareToggle={setCompareMode}
        onRefresh={fetchBiAnalytics}
        isLoading={isLoading}
      />

      {/* Main Content Loading State */}
      {isLoading && !data ? (
        <div className="p-12 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-xs font-bold">অ্যানালিটিক্স ডাটা ক্যালকুলেশন করা হচ্ছে...</span>
        </div>
      ) : (
        data && (
          <>
            {/* 2. KPI Cards Overview Grid (12 Cards) */}
            <KpiCardsSection kpis={data.kpis} compareMode={compareMode} />

            {/* 3. Main Revenue & Orders Interactive Chart */}
            <MainRevenueChart data={data.timeSeries} />

            {/* 4. Sales Status Comparison Trend Chart */}
            <SalesTrendChart data={data.timeSeries} />

            {/* 5. Product Performance (Table + Horizontal Bar Chart) */}
            <ProductPerformanceSection products={data.productPerformance} />

            {/* 6. Traffic Source Breakdown & Meta Ads Conversion Funnel */}
            <TrafficAndMetaAdsSection
              trafficSources={data.trafficSources}
              metaAdsFunnel={data.metaAdsFunnel}
            />

            {/* 7. Overall Visual Sales Funnel */}
            <VisualSalesFunnel stages={data.salesFunnel} />

            {/* 8. Order Status Donut & Customer Metrics */}
            <OrderAndCustomerSection
              customerAnalytics={data.customerAnalytics}
              orderStatusCounts={{
                paid: data.kpis.paidOrders?.value || 0,
                pending: data.kpis.pendingOrders?.value || 0,
                cancelled: data.kpis.cancelledOrders?.value || 0,
                total: data.kpis.totalOrders?.value || 0
              }}
            />

            {/* 9. Device, Browser & Operating System Analytics */}
            <DeviceAndGeoAnalytics
              deviceBreakdown={data.deviceBreakdown}
              browserBreakdown={data.browserBreakdown}
              osBreakdown={data.osBreakdown}
            />

            {/* 10. Real-time Active Visitors & Hourly Sales Histogram */}
            <RealtimeAndHourlySection
              realtimeActiveCount={data.realtimeActiveCount}
              hourlyData={data.hourlyToday}
              recentOrders={data.recentOrders}
            />

            {/* 11. Smart Insights Section */}
            <SmartInsightsSection insights={data.smartInsights} />
          </>
        )
      )}

      {/* 12. Report Center Modal */}
      <ReportCenterModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        analyticsData={data}
      />
    </div>
  );
};
