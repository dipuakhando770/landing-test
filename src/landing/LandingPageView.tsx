import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { VideoOverview } from './VideoOverview';
import { SalesProofSection } from './SalesProofSection';
import { RealtimeProofSection } from './RealtimeProofSection';
import { StudentReviewsSection } from './StudentReviewsSection';
import { CommunityProofSection } from './CommunityProofSection';
import { InfinityBundleSection } from './InfinityBundleSection';
import { ProductEcosystemSection } from './ProductEcosystemSection';
import { DriveScreenshotsSection } from './DriveScreenshotsSection';
import { FunnelProcessSection } from './FunnelProcessSection';
import { CurriculumSection } from './CurriculumSection';
import { WhyAndSolutionSection } from './WhyAndSolutionSection';
import { MobileFlowSection } from './MobileFlowSection';
import { PricingSection } from './PricingSection';
import { CheckoutForm } from './CheckoutForm';
import { MentorAndSupportSection } from './MentorAndSupportSection';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { StickyOrderBar } from './StickyOrderBar';
import { GatewaySettingsModal } from './GatewaySettingsModal';
import { Product } from '../types';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface LandingPageViewProps {
  product?: Product | null;
  onBackToStore?: () => void;
  onOpenAdmin?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ product, onBackToStore, onOpenAdmin }) => {
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-['Hind_Siliguri',sans-serif]">
        <div className="max-w-md space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">প্রোডাক্টটি খুঁজে পাওয়া যায়নি</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            অনুগ্রহ করে স্টোর থেকে আপনার কাঙ্ক্ষিত প্রোডাক্ট বেছে নিন এবং তার ডেডিকেটেড ল্যান্ডিং পেজে যান।
          </p>
          <button
            type="button"
            onClick={onBackToStore}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 mx-auto cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল প্রোডাক্ট দেখুন</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-500 selection:text-white font-['Hind_Siliguri',sans-serif]">
      {/* Top Clean Header */}
      <Header
        onOpenGatewayInfo={() => setIsGatewayModalOpen(true)}
        onOpenAdmin={onOpenAdmin}
      />

      {/* Main High-Conversion Sections with full video sources, proofs, and product details */}
      <main>
        {/* 1. Dynamic Product Hero */}
        <HeroSection product={product} />

        {/* 2. Main System Video Walkthrough */}
        <VideoOverview />

        {/* 3. Live Sales & BDT Proof */}
        <SalesProofSection />

        {/* 4. Real-time Live Order Alerts */}
        <RealtimeProofSection />

        {/* 5. Student & Customer Video Reviews */}
        <StudentReviewsSection product={product} />

        {/* 6. VIP Community Proof */}
        <CommunityProofSection />

        {/* 7. Cloud Resource Drive Showcase (with Video) */}
        <InfinityBundleSection />

        {/* 8. Specific Product Ecosystem & Features */}
        <ProductEcosystemSection product={product} />

        {/* 9. Real Google Drive Folder Screenshots */}
        <DriveScreenshotsSection />

        {/* 10. Automated Funnel Delivery Process */}
        <FunnelProcessSection />

        {/* 11. Step-by-Step Curriculum / Roadmap */}
        <CurriculumSection />

        {/* 12. Problem vs Solution */}
        <WhyAndSolutionSection product={product} />

        {/* 13. Mobile Flow & Video Guide */}
        <MobileFlowSection />

        {/* 14. Product Pricing Card & Countdown */}
        <PricingSection product={product} />

        {/* 15. PayBD Checkout Form */}
        <CheckoutForm product={product} />

        {/* 16. Mentor & 24/7 VIP Support */}
        <MentorAndSupportSection />

        {/* 17. Product FAQ */}
        <FaqSection product={product} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />

      {/* Sticky Bottom Direct Order Bar */}
      <StickyOrderBar product={product} />

      {/* Gateway Security Modal */}
      <GatewaySettingsModal
        isOpen={isGatewayModalOpen}
        onClose={() => setIsGatewayModalOpen(false)}
      />
    </div>
  );
};
