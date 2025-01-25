export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

declare global {
  interface Window {
    fbq: any
  }
}

export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options)
}

export const purchase = (value: number, currency: string = 'UAH') => {
  window.fbq('track', 'Purchase', { value, currency })
}

export const initiateCheckout = (value: number, currency: string = 'UAH') => {
  window.fbq('track', 'InitiateCheckout', { value, currency })
}

export const viewContent = (contentName: string, contentCategory: string) => {
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
  })
}
