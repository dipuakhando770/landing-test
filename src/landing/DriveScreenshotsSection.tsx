import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Folder, X } from 'lucide-react';

const driveScreenshots = [
  {
    folder: 'All Subscription Methods',
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/All-Subscription.webp',
    alt: 'All Subscription Folder Proof'
  },
  {
    folder: '500+ Landing Page Templates',
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/599-Landing-Page.webp',
    alt: '599 Landing Page Folder Proof'
  },
  {
    folder: 'Premium Software Collection',
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/Premium-Software-Collection.webp',
    alt: 'Premium Software Collection Folder Proof'
  },
  {
    folder: 'Digital Product Assets',
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/Digital-Product.webp',
    alt: 'Digital Product Folder Proof'
  },
  {
    folder: 'All Website Source Code',
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/All-Code.webp',
    alt: 'All Code Folder Proof'
  },
  {
    folder: 'Advance Facebook Marketing',
    image: 'https://munafadigital.com/wp-content/uploads/2026/05/Advance-Facebook.webp',
    alt: 'Advance Facebook Folder Proof'
  }
];

export const DriveScreenshotsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + driveScreenshots.length) % driveScreenshots.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % driveScreenshots.length);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>লাইভ গুগল ড্রাইভ ড্যাশবোর্ড প্রুফ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            ড্রাইভের ভেতরে কী কী আছে{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              এক নজরে দেখে নিন!
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            আমাদের ২TB ইনফিনিটি ড্রাইভের ভেতরের অর্গানাইজড ফোল্ডারগুলোর রিয়েল স্ক্রিনশট। স্লাইড করে দেখুন অথবা ছবিতে ক্লিক করে বড় করে দেখুন:
          </p>
        </div>

        {/* Carousel Box */}
        <div className="relative max-w-2xl mx-auto mb-8">
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-all z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-all z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-3 px-1 text-slate-900 font-bold text-sm sm:text-base">
              <Folder className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>{driveScreenshots[currentIndex].folder}</span>
            </div>

            <div
              onClick={() => setLightboxImg(driveScreenshots[currentIndex].image)}
              className="relative w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 cursor-zoom-in group max-h-[400px] flex items-center justify-center"
            >
              <img
                src={driveScreenshots[currentIndex].image}
                alt={driveScreenshots[currentIndex].alt}
                loading="lazy"
                className="w-full max-h-[400px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-3 bg-slate-900/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg group-hover:bg-blue-600 transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>🔍 ক্লিক করে বড় করুন</span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {driveScreenshots.map((_, idx) => (
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
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImg}
            alt="Drive Screenshot Zoomed"
            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
