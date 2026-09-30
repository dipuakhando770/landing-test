export interface Product {
  id: string;
  title: string;
  slug: string;
  regularPrice: number;
  salePrice: number;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  galleryImages?: string[];
  driveUrl?: string;
  telegramVipUrl?: string;
  fileSize?: string;
  rating?: number;
  totalSales?: number;
  badge?: string;
  features?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  createdAt?: string;
}

export interface LandingPageSettings {
  selectedProductId: string;
  pageTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  discountBadge: string;
  regularPrice: number;
  salePrice: number;
  bundleBonusText: string;
  systemOverviewVideoUrl: string;
  proofVideoUrl: string;
  realtimeDashboardVideoUrl: string;
  studentReviewVideo1: string;
  studentReviewVideo2: string;
  infinityDriveVideoUrl: string;
  metaPixelId: string;
  metaCapiToken: string;
  metaTestCode?: string;
  checkoutMode: 'paybd_direct' | 'main_store_redirect';
  mainStoreProductUrl: string;
  driveAccessUrl: string;
  telegramGroupUrl: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  paymentMethod: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  transactionId?: string;
  createdAt: string;
  driveUrl?: string;
  telegramVipUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
