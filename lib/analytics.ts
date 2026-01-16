export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

export const trackEvent = ({ name, properties }: AnalyticsEvent) => {
  if (typeof window === "undefined") return;
  const payload = { event: name, ...properties };
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(payload);
};
