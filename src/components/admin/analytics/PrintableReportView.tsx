import React from 'react';
import { ShieldCheck, Download, Printer } from 'lucide-react';

interface PrintableReportViewProps {
  reportTitle: string;
  startDateStr: string;
  endDateStr: string;
  data: any;
  onClose?: () => void;
}

export const PrintableReportView: React.FC<PrintableReportViewProps> = ({
  reportTitle,
  startDateStr,
  endDateStr,
  data,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    if (!data || !data.kpis) return;
    const csvContent = [
      ['Metric', 'Value', 'Previous Period', 'Growth %'],
      ['Total Revenue (BDT)', data.kpis.totalRevenue?.value || 0, data.kpis.totalRevenue?.previous || 0, `${data.kpis.totalRevenue?.growth?.changePercent || 0}%`],
      ['Paid Orders', data.kpis.paidOrders?.value || 0, data.kpis.paidOrders?.previous || 0, `${data.kpis.paidOrders?.growth?.changePercent || 0}%`],
      ['Pending Orders', data.kpis.pendingOrders?.value || 0, data.kpis.pendingOrders?.previous || 0, ''],
      ['Average Order Value (AOV)', data.kpis.averageOrderValue?.value || 0, data.kpis.averageOrderValue?.previous || 0, ''],
      ['Conversion Rate (%)', `${data.kpis.conversionRate?.value || 0}%`, '', ''],
      ['Unique Visitors', data.kpis.uniqueVisitors?.value || 0, data.kpis.uniqueVisitors?.previous || 0, '']
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${reportTitle.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 overflow-y-auto font-['Hind_Siliguri',sans-serif]">
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 shadow-2xl print:hidden">
        <div>
          <h3 className="font-extrabold text-base text-white">{reportTitle}</h3>
          <p className="text-xs text-slate-400">প্রিন্ট বা পিডিএফে সেভ করার জন্য রিপোর্ট ভিউ</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>CSV এক্সপোর্ট</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট / PDF ডাউনলােড</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="bg-slate-800 text-slate-400 hover:text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
            >
              ✕ বন্ধ
            </button>
          )}
        </div>
      </div>

      {/* Official Business Report Paper (Printable Sheet) */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8 border border-slate-200 print:shadow-none print:border-none print:m-0 print:p-0">
        {/* Report Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Nasir Digital Hub
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Official Executive Analytics & Performance Report
            </p>
            <div className="text-xs text-slate-600 mt-2">
              <strong>রিপোর্ট নাম:</strong> {reportTitle}
            </div>
            <div className="text-xs text-slate-600">
              <strong>সময়সীমা:</strong> {startDateStr} থেকে {endDateStr}
            </div>
          </div>

          <div className="text-right space-y-1 text-xs text-slate-500 font-mono">
            <div><strong>তৈরি তারিখ:</strong> {new Date().toLocaleDateString('bn-BD')}</div>
            <div><strong>সময়:</strong> {new Date().toLocaleTimeString('bn-BD')}</div>
            <div className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 mt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Audit Report</span>
            </div>
          </div>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <div className="text-slate-500 font-medium">মোট রেভিনিউ</div>
            <div className="text-lg font-black text-emerald-600 font-mono">
              ৳{(data?.kpis?.totalRevenue?.value || 0).toLocaleString('bn-BD')}
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">পরিশোধিত অর্ডার</div>
            <div className="text-lg font-black text-slate-900">
              {data?.kpis?.paidOrders?.value || 0} টি
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">গড় অর্ডার মূল্য (AOV)</div>
            <div className="text-lg font-black text-slate-900 font-mono">
              ৳{(data?.kpis?.averageOrderValue?.value || 0).toLocaleString('bn-BD')}
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">কনভার্সন রেট</div>
            <div className="text-lg font-black text-purple-600">
              {data?.kpis?.conversionRate?.value || 0}%
            </div>
          </div>
        </div>

        {/* Product Performance Table */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2">
            ১. প্রোডাক্ট পারফর্মেন্স ব্রেকডাউন (Product Performance)
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <th className="p-2.5">প্রোডাক্ট নাম</th>
                <th className="p-2.5 text-center">ভিউ</th>
                <th className="p-2.5 text-center">পরিশোধিত অর্ডার</th>
                <th className="p-2.5 text-right">মোট রেভিনিউ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data?.productPerformance?.map((p: any) => (
                <tr key={p.id}>
                  <td className="p-2.5 font-bold text-slate-800">{p.name}</td>
                  <td className="p-2.5 text-center">{p.views}</td>
                  <td className="p-2.5 text-center font-bold text-emerald-600">{p.paidOrders}</td>
                  <td className="p-2.5 text-right font-black font-mono">৳{p.revenue.toLocaleString('bn-BD')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Traffic Summary */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2">
            ২. ট্রাফিক সোর্স সামারি (Traffic Channel Breakdown)
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {data?.trafficSources?.map((s: any) => (
              <div key={s.channel} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="font-semibold text-slate-700">{s.channel}</span>
                <span className="font-extrabold text-slate-900 font-mono">{s.visits} জন ({s.percent}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Audit Stamp */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div>Report generated automatically by Nasir Digital Hub BI Engine.</div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
};
