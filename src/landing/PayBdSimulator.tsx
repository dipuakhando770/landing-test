import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Loader2, AlertCircle } from 'lucide-react';

export const PayBdSimulator: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId') || 'ORD-DEMO-1001';
  const amount = urlParams.get('amount') || '299';
  const name = urlParams.get('name') || 'নাসির হোসেন';
  const email = urlParams.get('email') || 'customer@gmail.com';
  const phone = urlParams.get('phone') || '01875656565';
  const txnId = urlParams.get('txn') || `TXN-PAYBD-${Date.now().toString(36).toUpperCase()}`;
  const returnUrl = urlParams.get('returnUrl') || '/success';

  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [walletNumber, setWalletNumber] = useState(phone);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Build PayBD Success Return URL with all required documentation parameters:
      // transactionId, paymentMethod, paymentAmount, paymentFee, status
      const targetSuccessUrl = new URL(returnUrl, window.location.origin);
      targetSuccessUrl.searchParams.set('transactionId', txnId);
      targetSuccessUrl.searchParams.set('paymentMethod', selectedMethod.toUpperCase());
      targetSuccessUrl.searchParams.set('paymentAmount', amount);
      targetSuccessUrl.searchParams.set('paymentFee', '0');
      targetSuccessUrl.searchParams.set('status', 'COMPLETED');
      targetSuccessUrl.searchParams.set('orderId', orderId);

      window.location.href = targetSuccessUrl.toString();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Hind_Siliguri',sans-serif] py-10 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-slate-700 pb-5">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-400 border border-blue-400/30 px-3 py-0.5 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>PayBD Payment Gateway Sandbox</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            PayStation / PayBD Checkout
          </h1>
          <p className="text-xs text-slate-400">
            মার্চেন্ট: Nasir Digital Hub • অর্ডার: {orderId}
          </p>
        </div>

        {/* Amount Box */}
        <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">পরিশোধযোগ্য টাকার পরিমাণ:</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">৳{amount}.00 BDT</span>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            পেমেন্ট মেথড নির্বাচন করুন:
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedMethod('bkash')}
              className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedMethod === 'bkash'
                  ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-pink-600 text-white text-[9px] flex items-center justify-center font-bold">b</span>
              <span>bKash</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('nagad')}
              className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedMethod === 'nagad'
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">N</span>
              <span>Nagad</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('rocket')}
              className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedMethod === 'rocket'
                  ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] flex items-center justify-center font-bold">R</span>
              <span>Rocket</span>
            </button>
          </div>
        </div>

        {/* Mobile Number Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {selectedMethod.toUpperCase()} অ্যাকাউন্ট নাম্বার:
          </label>
          <input
            type="tel"
            value={walletNumber}
            onChange={(e) => setWalletNumber(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>পেমেন্ট প্রসেস হচ্ছে...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Pay ৳{amount}.00</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Security Note */}
        <p className="text-[11px] text-slate-400 text-center">
          🔒 PayBD Secured 256-bit SSL Payment Gateway Simulator
        </p>
      </div>
    </div>
  );
};
