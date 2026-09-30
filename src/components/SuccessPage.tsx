import React, { useEffect, useState } from 'react';
import { CheckCircle, ShieldCheck, Download, ExternalLink, ArrowLeft, Loader2, AlertCircle, Copy, Check, Sparkles } from 'lucide-react';
import { PaymentVerifyResponse } from '../types/payment';

interface SuccessPageProps {
  onBackToHome?: () => void;
}

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onBackToHome }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState<PaymentVerifyResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Parse query params from PayBD return URL
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('transactionId') || urlParams.get('transaction_id') || urlParams.get('txn') || 'TXN-PAYBD-DEMO';
    const paymentMethod = urlParams.get('paymentMethod') || urlParams.get('method') || 'bKash / Nagad (PayBD)';
    const paymentAmount = Number(urlParams.get('paymentAmount')) || Number(urlParams.get('amount')) || 299;
    const paymentFee = Number(urlParams.get('paymentFee')) || 0;
    const incomingStatus = (urlParams.get('status') || 'COMPLETED').toUpperCase();

    const verifyTransaction = async () => {
      try {
        setIsVerifying(true);
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_id: transactionId,
            paymentMethod,
            paymentAmount,
            paymentFee,
            status: incomingStatus
          })
        });

        const data: PaymentVerifyResponse = await response.json();

        if (data.success && data.status === 'COMPLETED') {
          setVerificationResult(data);

          // =========================================================================
          // META PIXEL PURCHASE EVENT TRIGGER RULE:
          // "Purchase event কখনো শুধু button click-এর সময় fire করবে না।
          //  সঠিক flow: CTA Click -> Create Payment -> PayBD -> Verification -> status = COMPLETED -> Purchase Event"
          // =========================================================================
          if (typeof window.fbq === 'function') {
            window.fbq('track', 'Purchase', {
              content_name: 'Digital Product Business Combo Pack',
              content_type: 'product',
              value: data.amount || 299,
              currency: 'BDT',
              transaction_id: data.transaction_id || transactionId
            });
            console.log('✅ Meta Pixel Purchase Event Fired Successfully after verification COMPLETED');
          }

          // Optional GA4 Event
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'purchase', {
              transaction_id: data.transaction_id || transactionId,
              value: data.amount || 299,
              currency: 'BDT',
              items: [{ item_name: 'Digital Product Business Combo Pack', price: 299, quantity: 1 }]
            });
          }
        } else {
          setErrorMsg(data.message || 'পেমেন্ট ভেরিফিকেশন ব্যর্থ হয়েছে। অনুগ্রহ করে সাপোর্টে যোগাযোগ করুন।');
        }
      } catch (err: any) {
        console.error('Verification network error:', err);
        setErrorMsg('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyTransaction();
  }, []);

  const copyTxn = () => {
    if (verificationResult?.transaction_id) {
      navigator.clipboard.writeText(verificationResult.transaction_id);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Hind_Siliguri',sans-serif] py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-800 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {isVerifying ? (
          <div className="text-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-white">PayBD পেমেন্ট ভেরিফাই করা হচ্ছে...</h2>
            <p className="text-sm text-slate-400">
              অনুগ্রহ করে অপেক্ষা করুন, আপনার ট্রানজ্যাকশন আইডি ও স্ট্যাটাস যাচাই করা হচ্ছে।
            </p>
          </div>
        ) : errorMsg ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-2xl">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">পেমেন্ট ভেরিফিকেশন সম্পন্ন হয়নি</h2>
              <p className="text-sm text-rose-300 max-w-md mx-auto">{errorMsg}</p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>মূল পেজে ফিরে যান</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Success Animation */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-3 py-0.5 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PAYBD VERIFIED • COMPLETED</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                অভিনন্দন! আপনার অর্ডার সফল হয়েছে
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                আপনার পেমেন্ট সফলভাবে রিসিভ করা হয়েছে। নিচের বাটনগুলো দিয়ে আপনার ২TB ড্রাইভ রিসোর্স এবং ভিআইপি সাপোর্ট গ্রুপে যুক্ত হোন।
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-slate-400">ট্রানজ্যাকশন আইডি (TxnID):</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white">{verificationResult?.transaction_id}</span>
                  <button
                    onClick={copyTxn}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Transaction ID"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-slate-400">পেমেন্ট মেথড:</span>
                <span className="font-semibold text-white">{verificationResult?.payment_method || 'bKash / Nagad'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-slate-400">পরিশোধিত মূল্য:</span>
                <span className="font-black text-emerald-400 text-base">৳{verificationResult?.amount || 299}.00 BDT</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">স্ট্যাটাস:</span>
                <span className="bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full text-xs">
                  ✓ {verificationResult?.status}
                </span>
              </div>
            </div>

            {/* Direct Product Access Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={verificationResult?.resources?.drive_url || 'https://drive.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-center"
              >
                <span>⚡ ২TB গুগল ড্রাইভ রিসোর্স আনলক করুন</span>
                <ExternalLink className="w-5 h-5" />
              </a>

              <a
                href={verificationResult?.resources?.vip_telegram || 'https://t.me'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>👥 সিক্রেট ভিআইপি সাপোর্ট গ্রুপে যুক্ত হোন</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Quickstart Tutorial & Support Notice */}
            <div className="bg-blue-950/40 border border-blue-800/60 rounded-2xl p-4 text-xs text-slate-300 space-y-1.5">
              <div className="font-bold text-blue-300 flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>পরবর্তী করণীয় নির্দেশিকা:</span>
              </div>
              <p>
                ১. উপরের বাটনে ক্লিক করে ২TB ড্রাইভ ফোল্ডারটি আপনার গুগল ড্রাইভের <strong>Shared with me</strong>-তে সেভ করে রাখুন।
              </p>
              <p>
                ২. যেকোনো সহায়তায় আপনার ট্রানজ্যাকশন আইডি সহ আমাদের সাপোর্ট নম্বরে বা ভিআইপি গ্রুপে মেসেজ দিন।
              </p>
            </div>

            {/* Footer Back Button */}
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ল্যান্ডিং পেজে ফিরে যান</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
