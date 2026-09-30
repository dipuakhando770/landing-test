export interface OrderPackage {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  badge?: string;
  description: string;
  isPopular?: boolean;
}

export interface LandingProduct {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  badge?: string;
  tagline?: string;
  description?: string;
  features?: string[];
  driveAccessUrl?: string;
  vipTelegramUrl?: string;
  mainProductUrl?: string;
  isPopular?: boolean;
  isActive?: boolean;
}

export interface LandingPageConfig {
  pageTitle: string;
  pageSlug: string;
  activeProductId: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  countdownMinutes: number;
  stockLeft: number;
  discountPercent: number;
}

export interface PaymentCreateRequest {
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  amount: number;
  package_id: string;
  package_name: string;
  utm_params?: Record<string, string>;
}

export interface PaymentCreateResponse {
  success: boolean;
  order_id?: string;
  payment_url?: string;
  redirect_url?: string;
  message?: string;
  mode?: 'main_store_redirect' | 'live' | 'test_simulation';
  error_details?: any;
}

export interface PaymentVerifyRequest {
  transaction_id: string;
  paymentMethod?: string;
  paymentAmount?: number;
  paymentFee?: number;
  status?: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  verified: boolean;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  transaction_id?: string;
  customer_name?: string;
  customer_email?: string;
  amount?: number;
  payment_method?: string;
  verified_at?: string;
  message?: string;
  mode?: string;
  resources?: {
    drive_url: string;
    vip_telegram: string;
    starter_guide_pdf: string;
  };
}

export interface GatewayStatus {
  status: string;
  gateway: string;
  isConfigured: boolean;
  hasApiKey: boolean;
  hasSecretKey: boolean;
  hasBrandKey: boolean;
  mainProductUrl: string;
  checkoutMode: 'main_store_redirect' | 'paybd_direct_api';
  metaPixelId: string;
  hasCapiToken: boolean;
  productName: string;
  productPrice: number;
  activeProduct?: LandingProduct;
}
