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
import { LiveSalesNotification } from '../components/common/LiveSalesNotification';
import { FloatingWhatsApp } from '../components/common/FloatingWhatsApp';
import { Product } from '../types';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface LandingPageViewProps {
  product?: Product | null;
  onBackToStore?: () => void;
  onOpenAdmin?: () => void;
}

const defaultLandingProduct: Product = {
  id: 'combo-299',
  title: '1TB+ Mega All-In-One Digital Bundle',
  slug: 'bundle',
  price: 299,
  oldPrice: 2499,
  description: 'নিজের Digital Product তৈরি করুন, সেটআপ করুন এবং অটো সেল শুরু করুন — ১০০TB ডিজিটাল প্রোডাক্ট বান্ডেল সহ মাত্র ২৯৯ টাকায়!',
  shortDescription: 'সম্পূর্ণ অটোমেটেড ডিজিটাল প্রোডাক্ট বিজনেস ও ১০০TB ক্লাউড ড্রাইভ রিসোর্স। লাইফটাইম অ্যাক্সেস ও ২৪/৭ ভিআইপি সাপোর্ট সহ।',
  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  available: true,
  featured: true,
  rating: 5.0,
  reviewCount: 340,
  type: 'digital',
  categoryId: 'all-in-one',
  downloadUrl: 'https://drive.google.com',
  createdAt: Date.now()
};

export const LandingPageView: React.FC<LandingPageViewProps> = ({ product, onBackToStore, onOpenAdmin }) => {
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const activeProduct = product || defaultLandingProduct;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeProduct.id]);

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
        <HeroSection product={activeProduct} />

        {/* 2. Main System Video Walkthrough */}
        <VideoOverview />

        {/* 3. Live Sales & BDT Proof */}
        <SalesProofSection />

        {/* 4. Real-time Live Order Alerts */}
        <RealtimeProofSection />

        {/* 5. Student & Customer Video Reviews */}
        <StudentReviewsSection product={activeProduct} />

        {/* 6. VIP Community Proof */}
        <CommunityProofSection />

        {/* 7. Cloud Resource Drive Showcase (with Video) */}
        <InfinityBundleSection />

        {/* 8. Specific Product Ecosystem & Features */}
        <ProductEcosystemSection product={activeProduct} />

        {/* 9. Real Google Drive Folder Screenshots */}
        <DriveScreenshotsSection />

        {/* 10. Automated Funnel Delivery Process */}
        <FunnelProcessSection />

        {/* 11. Step-by-Step Curriculum / Roadmap */}
        <CurriculumSection />

        {/* 12. Problem vs Solution */}
        <WhyAndSolutionSection product={activeProduct} />

        {/* 13. Mobile Flow & Video Guide */}
        <MobileFlowSection />

        {/* 14. Product Pricing Card & Countdown */}
        <PricingSection product={activeProduct} />

        {/* 15. PayBD Checkout Form */}
        <CheckoutForm product={activeProduct} />

        {/* 16. Mentor & 24/7 VIP Support */}
        <MentorAndSupportSection />

        {/* 17. Product FAQ */}
        <FaqSection product={activeProduct} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />

      {/* Sticky Bottom Direct Order Bar */}
      <StickyOrderBar product={activeProduct} />

      {/* Conversion & Live Proof Widgets inside Landing Page */}
      <LiveSalesNotification />
      <FloatingWhatsApp />

      {/* Gateway Security Modal */}
      <GatewaySettingsModal
        isOpen={isGatewayModalOpen}
        onClose={() => setIsGatewayModalOpen(false)}
      />
    </div>
  );
};
