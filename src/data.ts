import { NewsArticle, AdConfig } from "./types";

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: "art-1",
    title: "Verse Community Update",
    category: "Community",
    date: "Every Friday at 06:00 UTC",
    snippet: "Join the weekly scavenger hunt across the Verse networks! Discover hidden artifacts and collaborate with developers.",
    content: "The weekly Friday Scavenger Hunt has officially become the cornerstone of our community! Starting at exactly 06:00 UTC, players and builders from around the globe join the server to decipher clues, find hidden digital artifacts, and win exclusive platform benefits. This week features three brand-new challenges in the Sandbox sector. Gather your squad, warm up your terminal, and make sure your coordinates are calibrated!",
    hasAdInbetween: true
  }
];

export const MOCK_ADS: AdConfig[] = [
  {
    id: "ad-top",
    type: "top-banner",
    sponsor: "VERSE COMMUNITY",
    headline: "Join our Verse Community 👇",
    description: "Connect with thousands of active players, creators, and open source developers on our live chat networks.",
    accentColors: "from-violet-600 to-indigo-600",
    actionText: "Join Telegram",
    destinationUrl: "https://t.me/GetVerse/177601"
  },
  {
    id: "ad-sidebar-1",
    type: "sidebar",
    sponsor: "VERSE PORTAL NODE",
    headline: "Connect With Creators Globally",
    description: "The official sandbox hub for content builders and developers.",
    accentColors: "from-cyan-500 to-blue-600",
    actionText: "Launch Node Map"
  },
  {
    id: "ad-sidebar-2",
    type: "sidebar",
    sponsor: "THEVERSE PLATFORM",
    headline: "Active Friday Challenges",
    description: "Decipher scavenger hunt coordinates live on server sectors.",
    accentColors: "from-emerald-500 to-teal-600",
    actionText: "Calibrate Portal"
  },
  {
    id: "ad-sidebar-3",
    type: "sidebar",
    sponsor: "GEMINI DEVELOPER HUB",
    headline: "Power Up Your Applets",
    description: "Build customized server-side proxy environments without token limits.",
    accentColors: "from-amber-500 to-rose-600",
    actionText: "Explore SDK Docs"
  },
  {
    id: "ad-article",
    type: "in-article",
    sponsor: "VERSE EARN CONTEST",
    headline: "Registration & Earn 👇",
    description: "Complete missions, test monetization widgets, and earn live platform points.",
    accentColors: "from-purple-500 to-cyan-500",
    actionText: "hub.vgdh.io",
    destinationUrl: "http://hub.vgdh.io"
  },
  {
    id: "ad-footer",
    type: "footer",
    sponsor: "REWARDS INFRASTRUCTURE",
    headline: "Don't forget rewards wallet 👇",
    description: "Secure your unique referral code benefits and sync assets directly with the node net.",
    accentColors: "from-fuchsia-600 to-pink-600",
    actionText: "Add Wallet",
    destinationUrl: "https://hub.vgdh.io/?ref=2b571392"
  }
];
