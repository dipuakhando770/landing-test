import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2, Sparkles, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';
import { OrderPackage, PaymentCreateResponse } from '../types/payment';
import { Product } from '../types';
import { createOrder } from '../firebase/services';

interface CheckoutFormProps {
  product?: Product | null;
  onPaymentSuccess?: (data: any) => void;
}

const defaultPackage: OrderPackage = {
  id: 'combo-299',
  name: 'Freelancing Digital Product Business 100TB Bundle',
  price: 299,
  regularPrice: 2499,
  badge: 'সবচেয়ে জনপ্রিয়',
  description: 'নিজের Digital Product তৈরি করুন, সেটআপ করুন এবং অটো সেল শুরু করুন — ১০০TB ডিজিটাল প্রোডাক্ট বান্ডেল সহ মাত্র ২৯৯ টাকায়!',
  isPopular: true
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ product, onPaymentSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [activePackage, setActivePackage] = useState<OrderPackage>(() => {
    if (product) {
      return {
        id: product.id,
        name: product.title,
        price: product.price,
        regularPrice: product.oldPrice || (product.price > 400 ? product.price * 5 : 2499),
        badge: 'সবচেয়ে জনপ্রিয়',
        description: product.shortDescription || product.description?.slice(0, 120) || 'ডিজিটাল প্রোডাক্ট বিজনেস বান্ডেল লাইফটাইম অ্যাক্সেস',
        isPopular: true
      };
    }
    return defaultPackage;
  });

  useEffect(() => {
    if (product) {
      setActivePackage({
        id: product.id,
        name: product.title,
        price: product.price,
        regularPrice: product.oldPrice || (product.price > 400 ? product.price * 5 : 2499),
        badge: 'সবচেয়ে জনপ্রিয়',
        description: product.shortDescription || product.description?.slice(0, 120) || 'ডিজিটাল প্রোডাক্ট বিজনেস বান্ডেল লাইফটাইম অ্যাক্সেস',
        isPopular: true
      });
      return;
    }

    fetch('/api/public-landing-config')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.activeProduct) {
          setActivePackage({
            id: data.activeProduct.id || 'combo-299',
            name: data.activeProduct.name || 'Freelancing Digital Product Business 100TB Bundle',
            price: Number(data.activeProduct.price) || 299,
            regularPrice: Number(data.activeProduct.regularPrice) || 2499,
            badge: data.activeProduct.badge || 'সবচেয়ে জনপ্রিয়',
            description: data.activeProduct.description || data.activeProduct.tagline || 'ডিজিটাল প্রোডাক্ট বিজনেস শুরু করার ১০০% কমপ্লিট সল্যুশন ও ১০০TB রিসোর্স',
            isPopular: true
          });
        }
      })
      .catch((e) => console.log('Loaded default package'));
  }, [product?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form Validation
    if (!name.trim()) {
      setErrorMessage('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMessage('অনুগ্রহ করে আপনার সঠিক WhatsApp / মোবাইল নাম্বার লিখুন।');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।');
      return;
    }

    setIsLoading(true);

    // 1. Save customer order information in localStorage for immediate access email delivery on callback
    const pendingOrderData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      package_id: activePackage.id,
      package_name: activePackage.name,
      amount: activePackage.price,
      drive_url: product?.downloadUrl || undefined,
      created_at: new Date().toISOString()
    };
    try {
      localStorage.setItem('ndh_pending_landing_order', JSON.stringify(pendingOrderData));
    } catch {}

    // Asynchronously create order in Firebase database
    try {
      createOrder({
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        total: activePackage.price,
        subtotal: activePackage.price,
        deliveryCharge: 0,
        paymentMethod: 'PayBD Gateway',
        paymentStatus: 'pending',
        status: 'pending',
        items: [
          {
            productId: activePackage.id,
            title: activePackage.name,
            price: activePackage.price,
            quantity: 1,
            downloadUrl: product?.downloadUrl || undefined
          }
        ]
      }).catch((e) => console.log('Firebase order sync notice:', e));
    } catch {}

    // 2. Fire Client-Side Meta Pixel InitiateCheckout Event
    if (typeof (window as any).fbq === 'function') {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: activePackage.name,
          content_type: 'product',
          content_ids: [activePackage.id],
          value: activePackage.price,
          currency: 'BDT',
          num_items: 1
        });
        console.log(`✅ Meta Pixel InitiateCheckout Fired for ${activePackage.name} (৳${activePackage.price})`);
      } catch (pixErr) {
        console.error('Meta Pixel client error:', pixErr);
      }
    }

    // Preserve UTM tracking parameters
    const currentUrlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    currentUrlParams.forEach((val, key) => {
      utmParams[key] = val;
    });

    try {
      const orderPayload = {
        cus_name: name.trim(),
        cus_email: email.trim(),
        cus_phone: phone.trim(),
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        amount: activePackage.price,
        price: activePackage.price,
        package_id: activePackage.id,
        package_name: activePackage.name,
        utm_params: utmParams,
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };

      let response: Response | null = null;
      let data: PaymentCreateResponse | any = null;

      // 1. Try primary endpoint /api/payment/create (works on Vercel, Netlify, and Local server)
      try {
        response = await fetch('/api/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        if (response.ok) {
          data = await response.json();
        }
      } catch (e) {
        console.warn('Primary endpoint /api/payment/create failed, attempting fallback...', e);
      }

      // 2. Fallback to /api/create-payment if primary didn't return success
      if (!data || !data.success || !data.paymentUrl && !data.payment_url) {
        try {
          const fallbackRes = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
          });
          if (fallbackRes.ok) {
            data = await fallbackRes.json();
          }
        } catch (e) {
          console.warn('Fallback endpoint /api/create-payment notice:', e);
        }
      }

      const targetPaymentUrl = data?.paymentUrl || data?.payment_url || data?.url;

      if (data && data.success && targetPaymentUrl) {
        // Direct redirection to the secure payment URL
        window.location.href = targetPaymentUrl;
        return;
      }

      // 3. Fallback to direct client-side PayBD Gateway API if server is not available (e.g. pure static SPA)
      try {
        const brandKey = 'r5d1y7Ye6bZzblEzvuhjO4OtWjyAjcfcePMKXZiqlK7wU8HrWJ';
        const deviceKey = 'fVSARTobNKvglddV9QhKlPFTsFcLUD884mmh1wjg';
        const cleanOrderId = orderPayload.orderId;
        const origin = window.location.origin;

        const directPaybdRes = await fetch('https://app-paybd.pipilikhost.com/api/payment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'API-KEY': brandKey,
            'BRAND-KEY': brandKey,
            'DEVICE-KEY': deviceKey,
            'SECRET-KEY': deviceKey
          },
          body: JSON.stringify({
            cus_name: name.trim(),
            cus_email: email.trim(),
            cus_phone: phone.trim(),
            amount: String(activePackage.price),
            success_url: `${origin}/order/success?transactionId=${cleanOrderId}&order_id=${cleanOrderId}`,
            cancel_url: `${origin}/?payment=cancel&order_id=${cleanOrderId}`,
            webhook_url: `${origin}/api/payment/callback?api=${encodeURIComponent(brandKey)}&invoice=${encodeURIComponent(cleanOrderId)}`,
            metadata: {
              phone: phone.trim(),
              name: name.trim(),
              email: email.trim(),
              orderId: cleanOrderId,
              package_id: activePackage.id,
              package_name: activePackage.name
            }
          })
        });

        const directData = await directPaybdRes.json();
        const directUrl = directData.payment_url || directData.paymentUrl || directData.url || directData.data?.payment_url;
        if (directUrl) {
          window.location.href = directUrl;
          return;
        }
      } catch (directErr) {
        console.warn('Direct PayBD client fallback notice:', directErr);
      }

      setErrorMessage(
        data?.message ||
        'পেমেন্ট গেটওয়েতে সংযোগ করতে সমস্যা হচ্ছে। অনুগ্রহ করে আপনার তথ্য পুনরায় চেক করুন অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।'
      );
      setIsLoading(false);
    } catch (err: any) {
      console.error('Payment create error:', err);
      setErrorMessage('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। অনুগ্রহ করে ইন্টারনেট চেক করে আবার চেষ্টা করুন।');
      setIsLoading(false);
    }
  };

  return (
    <section id="order-now" className="py-16 md:py-24 bg-slate-100/80 border-t border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-1 rounded-full text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% নিরাপদ ও এনক্রিপ্টেড পেমেন্ট গেটওয়ে</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            অর্ডার করতে আপনার সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            আপনার নাম, হোয়াটসঅ্যাপ নম্বর ও ইমেইল দিয়ে অর্ডার প্লেস করুন। পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই ইমেইলে এবং স্ক্রিনে ইনস্ট্যান্ট কোর্স ও ১০০TB ড্রাইভ এক্সেস পেয়ে যাবেন।
          </p>
        </div>

        {/* Live Enrollment Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              👥
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">4,427+</div>
              <div className="text-xs text-slate-500">শিক্ষার্থী অলরেডি সফলভাবে এনরোল করেছেন</div>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>📈 গত ২৪ ঘণ্টায় <strong>112+</strong> জন অ্যাক্সেস নিয়েছেন</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Selected Product Overview */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>আপনার সিলেক্টেড প্যাকেজ:</span>
            </h3>

            <div className="relative rounded-2xl p-5 border-2 border-emerald-500 bg-emerald-50/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm">
                {activePackage.badge || 'স্পেশাল অফার'}
              </span>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-extrabold text-slate-900 text-base md:text-lg">
                    {activePackage.name}
                  </h4>
                  <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded">
                    লাইফটাইম এক্সেস
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activePackage.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-emerald-700 font-semibold pt-1">
                  <span>✓ ১০০TB+ ড্রাইভ এক্সেস</span>
                  <span>✓ VIP টেলিগ্রাম গ্রুপ</span>
                  <span>✓ ২৪/৭ সাপোর্ট</span>
                </div>
              </div>

              <div className="text-right sm:pl-4 shrink-0 self-end sm:self-center">
                {activePackage.regularPrice > activePackage.price && (
                  <span className="text-xs text-slate-400 line-through block font-mono">
                    ৳{activePackage.regularPrice}
                  </span>
                )}
                <span className="text-3xl font-black text-emerald-600 font-mono">৳{activePackage.price}</span>
              </div>
            </div>
          </div>

          {/* Step 2: Customer Contact Information */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>আপনার সঠিক তথ্য দিন:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="উদাঃ মোঃ নাসির হোসেন"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  WhatsApp / মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="উদাঃ 01875656565"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 outline-none text-sm transition-all font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">ভিআইপি সাপোর্ট এবং গুরুত্বপূর্ণ আপডেটের জন্য ব্যবহৃত হবে।</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  ইমেইল অ্যাড্রেস <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="উদাঃ yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 outline-none text-sm transition-all"
                />
                <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                  ⚡ পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই এই ইমেইলে প্রোডাক্ট ও ড্রাইভের লিংক পাঠানো হবে।
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Section Direct Trigger */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>পেমেন্ট মেথড ও অর্ডার কনফার্মেশন:</span>
            </h3>

            {/* PayBD Gateway Method */}
            <div className="border-2 border-emerald-500 bg-emerald-50/40 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    নিরাপদ পেমেন্ট গেটওয়ে (PayBD / PayStation)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#df146e] text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-xs">bKash</span>
                  <span className="bg-[#f7941d] text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-xs">Nagad</span>
                  <span className="bg-[#8c3494] text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-xs">Rocket</span>
                  <span className="bg-[#1a1f71] text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-xs">Cards</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                বিকাশ, নগদ, রকেট বা যেকোনো কার্ড দিয়ে সরাসরি পে করুন। পেমেন্ট কনফার্ম হওয়ার সাথে সাথেই স্বয়ংক্রিয়ভাবে অ্যাক্সেস পেয়ে যাবেন।
              </p>
            </div>

            {/* Total Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">সর্বমোট পরিশোধযোগ্য:</span>
                <span className="text-base font-extrabold text-slate-900">{activePackage.name}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                ৳{activePackage.price}.00
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong>সতর্কতা:</strong> {errorMessage}
                </div>
              </div>
            )}

            {/* Place Order & Go to Payment Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-lg sm:text-xl py-4 px-8 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>পেমেন্ট সেকশনে নিয়ে যাওয়া হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>অর্ডার প্লেস করুন — ৳{activePackage.price}.00</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center mt-4">
              <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>আপনার তথ্যসমূহ ২৫৬-বিট এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত।</span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
