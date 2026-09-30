import React, { useState } from 'react';
import { FileText, Download, Printer, Filter, Calendar, Award } from 'lucide-react';
import { PrintableReportView } from './PrintableReportView';

interface ReportCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyticsData: any;
}

export const ReportCenterModal: React.FC<ReportCenterModalProps> = ({
  isOpen,
  onClose,
  analyticsData
}) => {
  const [selectedReportType, setSelectedReportType] = useState<string>('daily');
  const [showPrintView, setShowPrintView] = useState<boolean>(false);

  if (!isOpen) return null;

  const reportTypes = [
    { id: 'daily', name: 'দৈনিক বিক্রয় রিপোর্ট (Daily Sales Report)', desc: 'আজকের সেলস, পেমেন্ট ও ট্রানজ্যাকশন সারাংশ' },
    { id: 'weekly', name: 'সাপ্তাহিক বিক্রয় রিপোর্ট (Weekly Sales Report)', desc: 'গত ৭ দিনের রেভিনিউ ও অর্ডার গ্রোথ ট্র্যাকিং' },
    { id: 'monthly', name: 'মাসিক সেলস পারফর্মেন্স (Monthly Sales Report)', desc: 'চলতি মাসের মোট আয়, লাভ ও পেমেন্ট সামারি' },
    { id: 'product', name: 'প্রোডাক্ট পারফর্মেন্স রিপোর্ট (Product Performance)', desc: 'প্রতিটি প্রোডাক্টের ভিউ, সেলস ও কনভার্সন রেট' },
    { id: 'traffic', name: 'ট্রাফিক ও সোর্স রিপোর্ট (Traffic Source Report)', desc: 'ফেসবুক এডস, অর্গানিক সার্চ ও সোশ্যাল মিডিয়া ভিজিটর' },
    { id: 'customer', name: 'কাস্টমার ও LTV রিপোর্ট (Customer Analytics)', desc: 'নতুন বনাম রিপিট কাস্টমার ও গড় অর্ডার মূল্য' },
    { id: 'campaign', name: 'ফেসবুক এডস ক্যাম্পেইন রিপোর্ট (Meta Ads Report)', desc: 'মেটা পিক্সেল CAPI ও এডস ফানেল ড্রপ-অফ রিপোর্ট' },
    { id: 'payment', name: 'পেমেন্ট ও অনলাইন গেটওয়ে (PayBD Payment Report)', desc: 'বিকাশ, নগদ ও অনলাইন পেমেন্ট ভেরিফিকেশন' }
  ];

  const currentReportObj = reportTypes.find((r) => r.id === selectedReportType) || reportTypes[0];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-['Hind_Siliguri',sans-serif]">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">
                  রিপোর্ট সেন্টার (Dedicated Business Report Center)
                </h3>
                <p className="text-xs text-slate-400">
                  ব্যবসার গুরুত্বপূর্ণ ফাইন্যান্সিয়াল ও পারফর্মেন্স রিপোর্ট ডাউনলোড ও প্রিন্ট করুন
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Report Type Selection Grid */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              ১. আপনার কাঙ্ক্ষিত রিপোর্ট ক্যাটাগরি বেছে নিন:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {reportTypes.map((rt) => (
                <div
                  key={rt.id}
                  onClick={() => setSelectedReportType(rt.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedReportType === rt.id
                      ? 'bg-blue-600/20 text-white border-blue-500 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-extrabold mb-1">{rt.name}</div>
                  <div className="text-[11px] text-slate-400">{rt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 font-medium">
              নির্বাচিত: <strong className="text-white">{currentReportObj.name}</strong>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={() => setShowPrintView(true)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>রিপোর্ট তৈরি ও ভিউ করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Sheet View */}
      {showPrintView && (
        <PrintableReportView
          reportTitle={currentReportObj.name}
          startDateStr={new Date(analyticsData?.dateBounds?.currentStart || Date.now()).toLocaleDateString('bn-BD')}
          endDateStr={new Date(analyticsData?.dateBounds?.currentEnd || Date.now()).toLocaleDateString('bn-BD')}
          data={analyticsData}
          onClose={() => setShowPrintView(false)}
        />
      )}
    </>
  );
};
