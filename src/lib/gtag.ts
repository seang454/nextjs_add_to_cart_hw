declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Pageview tracking
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// General event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

//
// Additional prebuilt helpers
//

// Click tracking
export const trackClick = (label: string) => {
  event({
    action: "click",
    category: "interaction",
    label,
    value: 1,
  });
};

// Form submit
export const trackFormSubmit = (formName: string) => {
  event({
    action: "submit_form",
    category: "form",
    label: formName,
    value: 1,
  });
};

// Outbound link click
export const trackOutboundLink = (url: string) => {
  event({
    action: "click_outbound",
    category: "navigation",
    label: url,
    value: 1,
  });
};

// Signup complete
export const trackSignup = (method: string) => {
  event({
    action: "sign_up",
    category: "engagement",
    label: method,
    value: 1,
  });
};

// Login
export const trackLogin = (method: string) => {
  event({
    action: "login",
    category: "engagement",
    label: method,
    value: 1,
  });
};

// Add to cart
export const trackAddToCart = (productName: string, value: number) => {
  event({
    action: "add_to_cart",
    category: "ecommerce",
    label: productName,
    value,
  });
};

// Purchase complete
export const trackPurchase = (orderId: string, value: number) => {
  event({
    action: "purchase",
    category: "ecommerce",
    label: orderId,
    value,
  });
};
