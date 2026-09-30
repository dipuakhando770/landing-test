import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, CheckCircle2, ArrowRight, X, Users } from 'lucide-react';

const communitySlides = [
  {
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/xzf6hjq5vfoewxxkl8ai.webp',
    title: 'দৈনিক সেলস ও পেআউট কনফার্মেশন প্রুফ',
    alt: 'Student Earning Proof 1',
    user: 'VIP Community Member'
  },
  {
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/qctmqvuetqgqlkctcb4c.webp',
    title: 'স্টুডেন্ট ড্যাশবোর্ড ও কাস্টমার রেসপন্স',
    alt: 'Student Earning Proof 2',
    user: 'VIP Community Member'
  }
];

export const CommunityProofSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + communitySlides.length) % communitySlides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % communitySlides.length);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>সিক্রেট ফেসবুক ভিআইপি কমিউনিটি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            আমাদের সিক্রেট গ্রুপে প্রতিদিনের{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              স্টুডেন্ট সেলস ও সাফল্য গল্প!
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            কোর্সে যুক্ত হওয়ার পর আমাদের প্রাইভেট সাপোর্ট গ্রুপে শিক্ষার্থীরা প্রতিদিন তাদের অর্জিত সেলস ও সাকসেস স্ক্রিনশট শেয়ার করছেন। ছবিতে ক্লিক করে বড় করে দেখুন:
          </p>
        </div>

        {/* Slider Box */}
        <div className="relative max-w-2xl mx-auto mb-10">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-all z-10 cursor-pointer"
            aria-label="Previous proof"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-all z-10 cursor-pointer"
            aria-label="Next proof"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Current Slide Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm text-left">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  f
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{communitySlides[currentIndex].user}</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                ✓ Verified Student
              </span>
            </div>

            {/* Image Container with Zoom Trigger */}
            <div
              onClick={() => setLightboxImage(communitySlides[currentIndex].image)}
              className="relative w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 cursor-zoom-in group max-h-[420px] flex items-center justify-center"
            >
              <img
                src={communitySlides[currentIndex].image}
                alt={communitySlides[currentIndex].alt}
                loading="lazy"
                className="w-full max-h-[420px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-3 bg-slate-900/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg group-hover:bg-blue-600 transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>🔍 ক্লিক করে বড় করে দেখুন</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{communitySlides[currentIndex].title}</span>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {communitySlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? 'w-6 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* VIP Group CTA Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-2xl shrink-0">
              👥
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                আপনিও কি আমাদের লাইফটাইম প্রাইভেট কমিউনিটিতে যুক্ত হতে চান?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                কোর্সে এনরোল করার সাথে সাথেই পাবেন আমাদের মেম্বার-অনলি ভিআইপি সাপোর্ট গ্রুপে লাইফটাইম এক্সেস!
              </p>
            </div>
          </div>
          <a
            href="#order-now"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-500/25"
          >
            <span>আজই এনরোল করুন ৳২৯৯ এ</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Zoomed Student Proof"
            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
