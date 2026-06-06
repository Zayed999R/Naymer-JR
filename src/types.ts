export interface AdConfig {
  id: string;
  type: "top-banner" | "in-article" | "sidebar" | "footer";
  sponsor: string;
  headline: string;
  description: string;
  accentColors: string; // Tailwind class string for gradient
  actionText: string;
  destinationUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  snippet: string;
  content: string;
  hasAdInbetween?: boolean;
}

export interface MonetizationStats {
  visitors: number;
  clicks: number;
  earnings: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  amount?: number;
  type: "earnings" | "info";
}
