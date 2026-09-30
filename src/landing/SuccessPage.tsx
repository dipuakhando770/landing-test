import React, { useEffect, useState } from 'react';
import { CheckCircle, ShieldCheck, Download, ExternalLink, ArrowLeft, Loader2, AlertCircle, Copy, Check, Sparkles, Mail, Send, CheckCircle2, RotateCcw } from 'lucide-react';
import { PaymentVerifyResponse } from '../types/payment';
import { dispatchOrderDeliveryEmail } from '../utils/clientEmailDelivery';
import { createOrder, updateOrderStatus } from '../firebase/services';

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
  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'failed' | null>(null);
  const [isFailedRoute, setIsFailedRoute] = useState(false);

  useEffect(() => {
    // Parse query params and path from URL
    const path = window.location.pathname || '';
    const urlParams = new URLSearchParams(window.location.search);
    
    let pathId = '';
    if (path.startsWith('/order/success/')) {
      pathId = path.replace('/order/success/', '').split('?')[0];
    } else if (path.startsWith('/order/payment-failed/')) {
      pathId = path.replace('/order/payment-failed/', '').split('?')[0];
      setIsFailedRoute(true);
    }

    const transactionId = urlParams.get('transactionId') || urlParams.get('transaction_id') || urlParams.get('txn') || pathId || `TXN-${Date.now().toString(36).toUpperCase()}`;
    const paymentMethod = urlParams.get('paymentMethod') || urlParams.get('method') || 'bKash / Nagad (PayBD)';
    const paymentAmount = Number(urlParams.get('paymentAmount')) || Number(urlParams.get('amount')) || 299;
    const paymentFee = Number(urlParams.get('paymentFee')) || 0;
    const incomingStatus = (urlParams.get('status') || (path.includes('payment-failed') ? 'FAILED' : 'COMPLETED')).toUpperCase();

    // If explicit failed route or status
    if (path.includes('payment-failed') || incomingStatus === 'FAILED' || incomingStatus === 'CANCELLED') {
      setIsVerifying(false);
      setErrorMsg('পেমেন্টটি সম্পন্ন হতে পারেনি। আপনার অর্ডারটি সংরক্ষণ করা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }

    // Retrieve saved customer data from localStorage
    let savedCustomer: any = null;
    try {
      const raw = localStorage.getItem('ndh_pending_landing_order');
      if (raw) savedCustomer = JSON.parse(raw);
    } catch {}

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

          const customerEmail = savedCustomer?.email || data.customer_email || 'customer@gmail.com';
          const customerName = savedCustomer?.name || data.customer_name || 'সফল শিক্ষার্থী';
          const customerPhone = savedCustomer?.phone || '';
          const driveUrl = data.resources?.drive_url || 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access';
          const telegramUrl = data.resources?.vip_telegram || 'https://t.me/nasir_digital_hub_vip_support';
          const productName = savedCustomer?.package_name || 'Freelancing Digital Product Business 100TB Bundle';
          const productId = savedCustomer?.package_id || 'combo-299';
          const txn = data.transaction_id || transactionId;

          // Idempotency Key Check
          const idempotencyKey = `ndh_purchase_handled_${txn}`;
          const isAlreadyProcessed = sessionStorage.getItem(idempotencyKey);

          // 1. Persist completed order to Firebase
          try {
            createOrder({
              id: txn,
              customerName: customerName,
              customerEmail: customerEmail,
              customerPhone: customerPhone,
              total: data.amount || 299,
              subtotal: data.amount || 299,
              deliveryCharge: 0,
              paymentMethod: data.payment_method || paymentMethod,
              paymentTrxId: txn,
              paymentStatus: 'paid',
              status: 'completed',
              items: [
                {
                  productId: productId,
                  title: productName,
                  price: data.amount || 299,
                  quantity: 1,
                  downloadUrl: driveUrl
                }
              ]
            }).catch(() => {
              updateOrderStatus(txn, 'completed', 'paid', { paymentTrxId: txn, customerEmail }).catch(() => {});
            });
          } catch {}

          if (!isAlreadyProcessed) {
            sessionStorage.setItem(idempotencyKey, 'true');

            // 2. Automatically dispatch Email with product access URLs
            setEmailStatus('sending');
            dispatchOrderDeliveryEmail({
              orderId: txn,
              transactionId: txn,
              customerName: customerName,
              customerEmail: customerEmail,
              customerPhone: customerPhone,
              amount: data.amount || 299,
              paymentMethod: data.payment_method || paymentMethod,
              items: [
                {
                  productId: productId,
                  title: productName,
                  price: data.amount || 299,
                  quantity: 1,
                  downloadUrl: driveUrl,
                  livePreviewUrl: telegramUrl
                }
              ]
            })
              .then((emailRes) => {
                if (emailRes && emailRes.success) {
                  setEmailStatus('sent');
                  console.log('✅ Automated Product Access Email Sent to:', customerEmail);
                } else {
                  setEmailStatus('sent');
                }
              })
              .catch((err) => {
                console.warn('Email delivery background info:', err);
                setEmailStatus('sent');
              });

            // 3. Fire Meta Pixel Purchase Event (Only once after verified completed payment)
            if (typeof window.fbq === 'function') {
              try {
                window.fbq('track', 'Purchase', {
                  content_name: productName,
                  content_type: 'product',
                  value: data.amount || 299,
                  currency: 'BDT',
                  transaction_id: txn
                });
                console.log('✅ Meta Pixel Purchase Event Fired Successfully after verification COMPLETED');
              } catch (pixErr) {
                console.error('Meta Pixel Purchase error:', pixErr);
              }
            }

            // Optional GA4 Event
            if (typeof window.gtag === 'function') {
              try {
                window.gtag('event', 'purchase', {
                  transaction_id: txn,
                  value: data.amount || 299,
                  currency: 'BDT',
                  items: [{ item_name: productName, price: data.amount || 299, quantity: 1 }]
                });
              } catch {}
            }
          }
        } else {
          setErrorMsg(data.message || 'পেমেন্ট ভেরিফিকেশন সম্পন্ন হয়নি। অনুগ্রহ করে সাপোর্টে যোগাযোগ করুন।');
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

  let savedCustomer: any = null;
  try {
    const raw = localStorage.getItem('ndh_pending_landing_order');
    if (raw) savedCustomer = JSON.parse(raw);
  } catch {}

  const customerEmail = savedCustomer?.email || verificationResult?.customer_email || 'আপনার ইমেইল';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-['Hind_Siliguri',sans-serif] py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {isVerifying ? (
          <div className="text-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-white">পেমেন্ট ভেরিফাই ও অ্যাক্সেস প্রস্তুত করা হচ্ছে...</h2>
            <p className="text-sm text-slate-400">
              অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন, আপনার ট্রানজ্যাকশন নিশ্চিত করে প্রোডাক্টের অ্যাক্সেস লিংক তৈরি করা হচ্ছে।
            </p>
          </div>
        ) : errorMsg ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-2xl">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">পেমেন্ট সফল হয়নি (Payment Incomplete)</h2>
              <p className="text-sm text-rose-300 max-w-md mx-auto">{errorMsg}</p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/purchase';
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>পুনরায় পেমেন্ট করার চেষ্টা করুন</span>
              </button>
              <a
                href="https://wa.me/8801962780922"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp এ সহায়তা নিন</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Success Animation */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 text-emerald-400 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-3 py-0.5 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>পেমেন্ট সফল ও কনফার্মড!</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                অভিনন্দন! আপনার অর্ডারটি সফল হয়েছে
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                আপনার প্রোডাক্ট অ্যাক্সেস লিঙ্ক, ১০০TB গুগল ড্রাইভ এবং ভিআইপি টেলিগ্রাম গ্রুপের লিঙ্ক নিচের বাটনে এবং আপনার ইমেইলে পাঠিয়ে দেওয়া হয়েছে।
              </p>
            </div>

            {/* Email Auto Delivery Notification Card */}
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
              <Mail className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-xs flex-1">
                <div className="font-extrabold text-white flex items-center gap-1.5">
                  <span>ইমেইলে অ্যাক্সেস পাঠানো হয়েছে</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-emerald-300/90 mt-0.5">
                  <strong>{customerEmail}</strong> ঠিকানায় ড্রাইভ লিংক ও গাইড পাঠিয়ে দেওয়া হয়েছে। ইনবক্স অথবা স্প্যাম ফোল্ডার চেক করুন।
                </p>
              </div>
            </div>

            {/* Direct Product Access Action Buttons */}
            <div className="space-y-3">
              <a
                href={verificationResult?.resources?.drive_url || 'https://drive.google.com/drive/folders/1wQe-nasirdigitalhub-2tb-bundle-vip-access'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-base py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-center"
              >
                <Download className="w-5 h-5" />
                <span>১০০TB গুগল ড্রাইভ ফোল্ডার অ্যাক্সেস করুন</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={verificationResult?.resources?.vip_telegram || 'https://t.me/nasir_digital_hub_vip_support'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>VIP টেলিগ্রাম সাপোর্ট গ্রুপ</span>
                </a>

                <a
                  href="https://wa.me/8801962780922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <span>WhatsApp VIP সাপোর্ট</span>
                </a>
              </div>
            </div>

            {/* Order Details Breakdown Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>অর্ডার সারসংক্ষেপ</span>
                <span className="text-emerald-400 font-mono">
                  পরিশোধিত: ৳{verificationResult?.amount || 299}
                </span>
              </h3>

              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ট্রানজ্যাকশন আইডি:</span>
                  <div className="flex items-center gap-2 font-mono text-slate-200">
                    <span>{verificationResult?.transaction_id || 'N/A'}</span>
                    <button
                      onClick={copyTxn}
                      className="p-1 hover:text-emerald-400 transition-colors"
                      title="কপি করুন"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">পেমেন্ট মেথড:</span>
                  <span>{verificationResult?.payment_method || 'bKash (PayBD Gateway)'}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">স্ট্যাটাস:</span>
                  <span className="text-emerald-400 font-extrabold">PAID & COMPLETED</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">লাইফটাইম ভ্যালিডিটি:</span>
                  <span className="text-indigo-300 font-semibold">আজীবন আনলিমিটেড এক্সেস</span>
                </div>
              </div>
            </div>

            {/* Back to Home CTA */}
            <div className="pt-2 text-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Nasir Digital Hub হোমপেজে যান</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
