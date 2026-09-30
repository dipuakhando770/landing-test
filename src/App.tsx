/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider, useCart } from './context/CartContext';
import { AdminLayout } from './admin/AdminLayout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { LandingPageView } from './landing/LandingPageView';
import { SuccessPage } from './landing/SuccessPage';
import { PayBdSimulator } from './landing/PayBdSimulator';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { CheckoutModal } from './components/common/CheckoutModal';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { PaymentStatusModal } from './components/common/PaymentStatusModal';
import { UserOrderHistoryModal } from './components/common/UserOrderHistoryModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { LiveSalesNotification } from './components/common/LiveSalesNotification';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { PageLoader } from './components/common/PageLoader';
import { SeoMetaManager } from './components/common/SeoMetaManager';
import { LiveActivityProvider } from './context/LiveActivityContext';
import { Product } from './types';
import { findProductBySlugOrId, getProductPath, getProductSlug } from './utils/slugify';
import { analytics } from './utils/analytics';

function checkIsAdminUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const hash = (window.location.hash || '').toLowerCase();
  const path = (window.location.pathname || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  return hash.includes('admin') || path.includes('admin') || search.includes('admin');
}

function checkIsLandingUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const path = (window.location.pathname || '').toLowerCase();
  const hash = (window.location.hash || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  return (
    path.startsWith('/purchase') ||
    path.startsWith('/landing') ||
    path.startsWith('/combo-pack') ||
    path.startsWith('/combo-video') ||
    hash.includes('purchase') ||
    hash.includes('combo-pack') ||
    search.includes('landing=true')
  );
}

function extractLandingSlug(): string {
  if (typeof window === 'undefined') return '';
  const path = window.location.pathname || '';
  const search = new URLSearchParams(window.location.search);
  const paramSlug = search.get('product') || search.get('slug');
  if (paramSlug && paramSlug !== 'purchase' && paramSlug !== 'landing') return paramSlug;

  if (path.startsWith('/purchase/')) {
    const raw = path.replace('/purchase/', '').split('?')[0].split('/')[0];
    if (raw && raw !== 'purchase') return raw;
  }
  if (path.startsWith('/landing/')) {
    const raw = path.replace('/landing/', '').split('?')[0].split('/')[0];
    if (raw && raw !== 'landing' && raw !== 'purchase') return raw;
  }
  return '';
}

function MainApp() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'admin' | 'product' | 'landing' | 'success' | 'simulator'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname || '';
      const search = window.location.search || '';
      if (checkIsAdminUrl()) return 'admin';
      if (path.startsWith('/order/success') || path === '/success' || path === '/payment-success' || search.includes('transactionId') || search.includes('transaction_id')) return 'success';
      if (path === '/paybd-simulator') return 'simulator';
      if (checkIsLandingUrl()) return 'landing';
      if (path.startsWith('/product/') || path.startsWith('/shop')) {
        return path.startsWith('/shop') ? 'shop' : 'product';
      }
    }
    return 'home';
  });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [landingProduct, setLandingProduct] = useState<Product | null>(null);
  const [minReloadTimeElapsed, setMinReloadTimeElapsed] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const { products, loading: storeLoading, setSelectedCategory } = useStore();
  const { selectedProductForModal, setSelectedProductForModal } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinReloadTimeElapsed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const showPageLoader = storeLoading && !minReloadTimeElapsed;

  // Sync products for Landing and Product Views whenever products change
  useEffect(() => {
    if (products.length === 0) return;

    if (checkIsLandingUrl()) {
      const landingSlug = extractLandingSlug();
      let matched: Product | undefined;
      if (landingSlug) {
        matched = findProductBySlugOrId(products, landingSlug);
      }
      const finalProduct = matched || products.find((p) => p.featured) || products[0];
      setLandingProduct(finalProduct);

      // Clean up legacy or invalid /purchase/purchase URL from browser history
      if (typeof window !== 'undefined') {
        const path = window.location.pathname || '';
        if (path === '/purchase/purchase' || path === '/purchase/' || path === '/landing/purchase' || path === '/landing/landing') {
          window.history.replaceState(null, '', `/purchase/${getProductSlug(finalProduct)}`);
        }
      }
    } else if (currentView === 'product') {
      const path = window.location.pathname || '';
      const candidateSlugOrId = path.replace('/product/', '').split('?')[0];
      if (candidateSlugOrId) {
        const found = findProductBySlugOrId(products, candidateSlugOrId);
        if (found) {
          setActiveProduct(found);
        }
      }
    }
  }, [products, currentView]);

  // Track page visits in analytics
  useEffect(() => {
    if (currentView === 'home') {
      analytics.trackPageView('/', 'হোম পেজ ভিজিট');
    } else if (currentView === 'shop') {
      analytics.trackPageView('/shop', 'শপ পেজ ভিজিট');
    } else if (currentView === 'landing') {
      analytics.trackPageView(
        landingProduct ? `/purchase/${getProductSlug(landingProduct)}` : '/purchase',
        `ল্যান্ডিং পেজ (${landingProduct?.title || 'Combo Pack'})`
      );
    } else if (currentView === 'product' && activeProduct) {
      analytics.trackProductView(activeProduct);
    }
  }, [currentView, activeProduct?.id, landingProduct?.id]);

  // URL Change and routing listener
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname || '';
      const hash = window.location.hash || '';
      const search = window.location.search || '';

      if (checkIsAdminUrl()) {
        setCurrentView('admin');
        return;
      }

      if (path.startsWith('/order/success') || path === '/success' || path === '/payment-success' || search.includes('transactionId') || search.includes('transaction_id')) {
        setCurrentView('success');
        return;
      }

      if (path === '/paybd-simulator') {
        setCurrentView('simulator');
        return;
      }

      if (checkIsLandingUrl()) {
        const landingSlug = extractLandingSlug();
        if (products.length > 0) {
          let matched: Product | undefined;
          if (landingSlug) {
            matched = findProductBySlugOrId(products, landingSlug);
          }
          const target = matched || products.find((p) => p.featured) || products[0];
          setLandingProduct(target);
          if (path === '/purchase/purchase' || path === '/landing/purchase' || path === '/landing/landing') {
            window.history.replaceState(null, '', `/purchase/${getProductSlug(target)}`);
          }
        }
        setCurrentView('landing');
        return;
      }

      let candidateSlugOrId = '';
      if (path.startsWith('/product/')) {
        candidateSlugOrId = path.replace('/product/', '');
      } else if (hash.startsWith('#/product/')) {
        candidateSlugOrId = hash.replace('#/product/', '');
      } else if (hash.startsWith('#product/')) {
        candidateSlugOrId = hash.replace('#product/', '');
      } else if (hash.startsWith('#') && hash.length > 1 && !['#admin', '#shop', '#faq', '#purchase'].includes(hash.toLowerCase())) {
        candidateSlugOrId = hash.replace('#', '');
      }

      if (candidateSlugOrId) {
        const cleanCandidate = candidateSlugOrId.split('?')[0].split('&')[0];
        const found = findProductBySlugOrId(products, cleanCandidate);
        if (found) {
          setActiveProduct(found);
          setCurrentView('product');
          if (hash) {
            window.history.replaceState(null, '', getProductPath(found));
          }
          return;
        }
      }

      if (path === '/shop' || hash === '#shop') {
        setCurrentView('shop');
        if (hash === '#shop') {
          window.history.replaceState(null, '', '/shop');
        }
        return;
      }

      if (path === '/' || hash === '' || hash === '#') {
        setCurrentView('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [products]);

  const handleOpenProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product');
    window.history.pushState(null, '', getProductPath(product));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToShop = (categoryId?: string) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setCurrentView('shop');
    window.history.pushState(null, '', '/shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLanding = (product?: Product) => {
    if (product) {
      setLandingProduct(product);
      window.history.pushState(null, '', `/purchase/${product.slug}`);
    } else {
      window.history.pushState(null, '', '/purchase');
    }
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    window.history.replaceState(null, '', '/');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Render for Admin View
  if (currentView === 'admin') {
    return (
      <>
        <SeoMetaManager currentView="admin" />
        <AdminLayout onBackToStore={handleBackToStore} />
      </>
    );
  }

  // Dedicated Render for PayBD Simulator
  if (currentView === 'simulator') {
    return (
      <>
        <SeoMetaManager currentView="simulator" />
        <PayBdSimulator />
      </>
    );
  }

  // Dedicated Render for Payment Success / Confirmation
  if (currentView === 'success') {
    return (
      <>
        <SeoMetaManager currentView="success" />
        <SuccessPage onBackToHome={handleBackToStore} />
      </>
    );
  }

  // Dedicated Render for Landing Page (/purchase or /purchase/:slug)
  if (currentView === 'landing') {
    return (
      <>
        <SeoMetaManager currentView="landing" activeProduct={landingProduct} />
        <LandingPageView
          product={landingProduct}
          onBackToStore={handleBackToStore}
          onOpenAdmin={handleNavigateToAdmin}
        />
      </>
    );
  }

  // Main E-commerce Store Frontend
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white font-['Hind_Siliguri',sans-serif]">
      {/* Dynamic Google SEO, Meta Description & Social Graph */}
      <SeoMetaManager currentView={currentView} activeProduct={activeProduct} />

      {/* Page Loader */}
      <PageLoader isVisible={showPageLoader} />

      {!storeLoading && (
        <>
          {/* Main Store Header */}
          <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            onSelectCategory={handleNavigateToShop}
            onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
          />

          {/* Main Store Views */}
          <main className="flex-1">
            {currentView === 'home' && (
              <HomePage
                onNavigateToShop={handleNavigateToShop}
                onNavigateToAdmin={handleNavigateToAdmin}
                onSelectProduct={handleOpenProduct}
              />
            )}
            {currentView === 'shop' && (
              <ShopPage onSelectProduct={handleOpenProduct} />
            )}
            {currentView === 'product' && activeProduct && (
              <ProductPage
                product={activeProduct}
                onNavigateToHome={handleNavigateToHome}
                onNavigateToShop={handleNavigateToShop}
                onSelectProduct={handleOpenProduct}
              />
            )}
          </main>

          {/* Main Store Footer */}
          <Footer setCurrentView={setCurrentView} />

          {/* Conversion Widgets */}
          <FloatingWhatsApp />
          <LiveSalesNotification />
          <MobileBottomBar
            currentView={currentView === 'product' ? 'shop' : currentView}
            setCurrentView={setCurrentView}
            onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
          />
        </>
      )}

      {/* Global Store Modals */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
      <CartDrawer />
      <CheckoutModal />
      <PaymentStatusModal />
      <UserOrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        onNavigateToShop={() => {
          setIsOrderHistoryOpen(false);
          handleNavigateToShop();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <LiveActivityProvider>
            <MainApp />
          </LiveActivityProvider>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
