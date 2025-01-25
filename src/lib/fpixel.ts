export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

type FBEventType = 
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent';

interface FBEventProps {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: Array<{
    id: string;
    quantity: number;
  }>;
  num_items?: number;
  predicted_ltv?: number;
  status?: string;
  search_string?: string;
}

export const event = (name: FBEventType, options: FBEventProps = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

export const purchase = (value: number, currency: string = 'UAH') => {
  window.fbq('track', 'Purchase', { value, currency });
};

export const initiateCheckout = (value: number, currency: string = 'UAH') => {
  window.fbq('track', 'InitiateCheckout', { value, currency });
};

export const viewContent = (contentName: string, contentCategory: string) => {
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
  });
};
