import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2, Sparkles, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';
import { OrderPackage, PaymentCreateResponse } from '../types/payment';

interface CheckoutFormProps {
  onPaymentSuccess?: (data: any) => void;
}

const defaultPackages: OrderPackage[] = [
  {
    id: 'combo-299',
    name: 'Freelancing Digital Product Business 100TB Bundle',
    price: 299,
    regularPrice: 2499,
    badge: 'সবচেয়ে জনপ্রিয়',
    description: 'নিজের Digital Product তৈরি করুন, সেটআপ করুন এবং অটো সেল শুরু করুন — ১০০TB ডিজিটাল প্রোডাক্ট বান্ডেল সহ মাত্র ২৯৯ টাকায়!',
    isPopular: true
  },
  {
    id: 'combo-video-399',
    name: 'Digital Product Business + Video Editing Combo Pack',
    price: 399,
    regularPrice: 3499,
    badge: 'সেরা অফার',
    description: '🔥 ৩৯৯ টাকায় পাচ্ছেন ২টি হাই-ডিমান্ড স্কিল প্যাকেজ — Digital Product Business Combo Pack + Video Editing Combo Pack',
    isPopular: false
  }
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onPaymentSuccess }) => {
  const [packagesList, setPackagesList] = useState<OrderPackage[]>(defaultPackages);
  const [selectedPkgId, setSelectedPkgId] = useState<string>('combo-299');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/public-landing-config')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.allProducts && data.allProducts.length > 0) {
          const mapped = data.allProducts.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            regularPrice: p.regularPrice || 2499,
            badge: p.badge || (p.isPopular ? 'জনপ্রিয়' : undefined),
            description: p.description || p.tagline || 'ডিজিটাল প্রোডাক্ট বিজনেস বান্ডেল লাইফটাইম এক্সেস',
            isPopular: Boolean(p.isPopular || p.isActive)
          }));
          setPackagesList(mapped);
          if (data.activeProduct && data.activeProduct.id) {
            setSelectedPkgId(data.activeProduct.id);
          }
        }
      })
      .catch((e) => console.log('Loaded default checkout packages'));
  }, []);

  const selectedPackage = packagesList.find((p) => p.id === selectedPkgId) || packagesList[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form Validation
    if (!name.trim()) {
      setErrorMessage('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('অনুগ্রহ করে আপনার WhatsApp নাম্বার লিখুন।');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।');
      return;
    }

    setIsLoading(true);

    // 1. Fire Client-Side Meta Pixel InitiateCheckout Event
    if (typeof (window as any).fbq === 'function') {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: selectedPackage.name,
          content_type: 'product',
          content_ids: [selectedPackage.id],
          value: selectedPackage.price,
          currency: 'BDT',
          num_items: 1
        });
        console.log('✅ Meta Pixel InitiateCheckout Fired on CTA Submit');
      } catch (pixErr) {
        console.error('Meta Pixel client error:', pixErr);
      }
    }

    // Collect current URL params (UTM, fbclid, etc.) to preserve ad tracking
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
        amount: selectedPackage.price,
        price: selectedPackage.price,
        package_id: selectedPackage.id,
        package_name: selectedPackage.name,
        utm_params: utmParams,
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };

      let response: Response | null = null;
      let data: PaymentCreateResponse | any = null;

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
        console.warn('Primary endpoint failed, attempting fallback...', e);
      }

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
          console.warn('Fallback endpoint notice:', e);
        }
      }

      const targetPaymentUrl = data?.paymentUrl || data?.payment_url || data?.url;

      if (data && data.success && targetPaymentUrl) {
        window.location.href = targetPaymentUrl;
        return;
      }

      // Direct client-side PayBD Gateway API fallback
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
            amount: String(selectedPackage.price),
            success_url: `${origin}/order/success?transactionId=${cleanOrderId}&order_id=${cleanOrderId}`,
            cancel_url: `${origin}/?payment=cancel&order_id=${cleanOrderId}`,
            webhook_url: `${origin}/api/payment/callback?api=${encodeURIComponent(brandKey)}&invoice=${encodeURIComponent(cleanOrderId)}`,
            metadata: {
              phone: phone.trim(),
              name: name.trim(),
              email: email.trim(),
              orderId: cleanOrderId,
              package_id: selectedPackage.id,
              package_name: selectedPackage.name
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

      setErrorMessage(data?.message || 'পেমেন্ট গেটওয়েতে সংযোগ করতে সমস্যা হচ্ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
    } catch (err: any) {
      console.error('Payment create error:', err);
      setErrorMessage('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। আপনার ইন্টারনেট কানেকশন চেক করুন।');
    } finally {
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
            <span>১০০% নিরাপদ ও এনক্রিপ্টেড চেকআউট</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            অর্ডার করতে আপনার সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            আপনার তথ্য দিয়ে অর্ডার প্লেস করুন, পেমেন্ট সম্পন্ন হলে সাথে সাথেই কোর্স ও রিসোর্স ড্রাইভ আনলক হবে।
          </p>
        </div>

        {/* Live Ticker Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              👥
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900 font-mono">4,427+</div>
              <div className="text-xs text-slate-500">শিক্ষার্থী অলরেডি এনরোল করেছেন</div>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>📈 গত ২৪ ঘণ্টায় <strong>112+</strong> নতুন এনরোল</span>
          </div>
        </div>

        {/* Main Checkout Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Package Selection Cards */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>আপনার পছন্দের প্যাকেজটি সিলেক্ট করুন:</span>
            </h3>

            <div className="space-y-4">
              {packagesList.map((pkg) => {
                const isSelected = selectedPkgId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 shadow-md shadow-blue-500/10'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute -top-3 right-6 bg-rose-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm">
                        {pkg.badge}
                      </span>
                    )}

                    <div className="flex items-start gap-4 flex-1">
                      <div className="pt-0.5">
                        <input
                          type="radio"
                          name="package_selection"
                          checked={isSelected}
                          onChange={() => setSelectedPkgId(pkg.id)}
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-base">{pkg.name}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pkg.description}</p>
                      </div>
                    </div>

                    <div className="text-right sm:pl-4 shrink-0 self-end sm:self-center">
                      {pkg.regularPrice > pkg.price && (
                        <span className="text-xs text-slate-400 line-through block">
                          ৳{pkg.regularPrice}
                        </span>
                      )}
                      <span className="text-2xl font-black text-blue-600">৳{pkg.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Customer Contact Information */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
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
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="উদাঃ 01875656565"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 outline-none text-sm transition-all font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">জরুরি প্রয়োজনে বা লাইফটাইম সাপোর্টের জন্য ব্যবহৃত হবে।</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="উদাঃ yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 outline-none text-sm transition-all"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">এই ইমেইলে ড্রাইভ ও কোর্স অ্যাক্সেস লিংক পাঠানো হবে।</span>
              </div>
            </div>
          </div>

          {/* Step 3: Order Review & Connected Checkout Gateway */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>অর্ডার সামারি ও পেমেন্ট মেথড:</span>
            </h3>

            {/* Order Review Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase">
                  <tr>
                    <th className="px-5 py-3.5">প্যাকেজ বিবরণ</th>
                    <th className="px-5 py-3.5 text-right">মূল্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-900">{selectedPackage.name}</span>
                      <span className="text-xs text-slate-500 block">১টি লাইফটাইম অ্যাক্সেস লাইসেন্স</span>
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-slate-900 font-mono">
                      ৳{selectedPackage.price}.00
                    </td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="px-5 py-4 text-slate-900 text-base">সর্বমোট পরিশোধযোগ্য:</td>
                    <td className="px-5 py-4 text-right text-xl font-black text-blue-600 font-mono">
                      ৳{selectedPackage.price}.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PayBD Gateway Method Select */}
            <div className="border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="paybd_gateway"
                    name="payment_gateway"
                    checked
                    readOnly
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="paybd_gateway" className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer">
                    PayBD সিকিউর পেমেন্ট গেটওয়ে (PayStation / bKash / Nagad)
                  </label>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-pink-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded">bKash</span>
                  <span className="bg-orange-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded">Nagad</span>
                  <span className="bg-purple-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded">Rocket</span>
                  <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded">Cards</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                বিকাশ, নগদ, রকেট, উপায় বা যেকোনো ডেবিট/ক্রেডিট কার্ড দিয়ে সম্পূর্ণ নিরাপদে ইনস্ট্যান্ট পেমেন্ট সম্পন্ন করুন।
              </p>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>পেমেন্ট চেকআউটে নিয়ে যাওয়া হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>অর্ডার প্লেস করুন — ৳{selectedPackage.price}.00</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center mt-4">
              <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>আপনার তথ্যসমূহ ২৫৬-বিট SSL এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত।</span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
