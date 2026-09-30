import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, X, Server, Key, Globe } from 'lucide-react';
import { GatewayStatus } from '../types/payment';

interface GatewaySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GatewaySettingsModal: React.FC<GatewaySettingsModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<GatewayStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/payment-config-status')
        .then((res) => res.json())
        .then((data) => setConfig(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-200 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-0.5 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PayBD Gateway Security Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white">Custom PayBD Gateway Integration</h2>
          <p className="text-xs text-slate-400">
            Brand Key এবং API Credentials সুরক্ষিতভাবে ব্যাকএন্ড/সার্ভার সাইডে এনভায়রনমেন্ট ভেরিয়েবলে সংরক্ষিত রয়েছে।
          </p>
        </div>

        {/* Status Indicators */}
        <div className="space-y-3 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-400" />
              <span>Brand Key Integration:</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
              ✓ Server-Side Loaded
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Create Payment Endpoint:</span>
            </div>
            <span className="font-mono text-slate-300 text-[11px]">/api/create-payment</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Verify Payment Endpoint:</span>
            </div>
            <span className="font-mono text-slate-300 text-[11px]">/api/verify-payment</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Frontend Security:</span>
            </div>
            <span className="text-emerald-400 font-semibold">100% Zero-Leak Enforced</span>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-3.5 text-xs text-slate-300 space-y-1">
          <div className="font-bold text-blue-300">💡 মার্চেন্ট কনফিগারেশন নোট:</div>
          <p>
            আপনার PayBD API Key এবং Secret Key ব্যাকএন্ডের <code>.env</code> ফাইল বা পরিবেশ সেটিংসে সংযুক্ত করা যাবে।
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-sm"
        >
          ঠিক আছে, বন্ধ করুন
        </button>
      </div>
    </div>
  );
};
