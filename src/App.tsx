import React, { useState, useEffect } from "react";
import { Moon, Sun, RefreshCw, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { MonetizationStats, ToastMessage, AdConfig } from "./types";
import { INITIAL_ARTICLES, MOCK_ADS } from "./data";
import NewsCard from "./components/NewsCard";
import AdBanner from "./components/AdBanner";
import StatsCounter from "./components/StatsCounter";
import FloatingToast from "./components/FloatingToast";
import VerseLogo from "./components/VerseLogo";
import VerseExtensions from "./components/VerseExtensions";

export default function App() {
  const [stats, setStats] = useState<MonetizationStats>({
    visitors: 0,
    clicks: 0,
    earnings: 0.0
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferDark = savedTheme ? savedTheme === "dark" : true;
    setIsDarkMode(preferDark);
    if (preferDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Initialize visitors and click stats on load
  useEffect(() => {
    // Increment unique visitor count once per session / load
    const savedVisitorsVal = localStorage.getItem("v") || localStorage.getItem("visitors") || "0";
    const savedVisitors = parseInt(savedVisitorsVal, 10);
    const newVisitors = savedVisitors + 1;
    localStorage.setItem("visitors", newVisitors.toString());
    localStorage.setItem("v", newVisitors.toString());

    const savedClicksVal = localStorage.getItem("c") || localStorage.getItem("clicks") || "0";
    const savedClicks = parseInt(savedClicksVal, 10);
    const initialEarnings = savedClicks * 0.05;

    setStats({
      visitors: newVisitors,
      clicks: savedClicks,
      earnings: initialEarnings
    });

    // Push initial status toast welcoming the builder
    pushToast("Verse News Hub loaded! Visitors incremented.", "info");
  }, []);

  // Set theme handler
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  // Helper to append self-dismissing toasts
  const pushToast = (message: string, type: "earnings" | "info", amount?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type, amount }]);
    
    // Automatically dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset simulation numbers
  const handleResetStats = () => {
    localStorage.setItem("clicks", "0");
    localStorage.setItem("c", "0");
    localStorage.setItem("visitors", "1");
    localStorage.setItem("v", "1");
    setStats({
      visitors: 1,
      clicks: 0,
      earnings: 0.00
    });
    pushToast("Simulation statistics reset!", "info");
  };

  // Process advert click counts & earnings increment
  const handleAdClick = (ad: AdConfig) => {
    const updatedClicks = stats.clicks + 1;
    const updatedEarnings = updatedClicks * 0.05;

    localStorage.setItem("clicks", updatedClicks.toString());
    localStorage.setItem("c", updatedClicks.toString());
    setStats((prev) => ({
      ...prev,
      clicks: updatedClicks,
      earnings: updatedEarnings
    }));

    // Trigger toast notification
    pushToast(
      `Clicked Ad by "${ad.sponsor}"!`,
      "earnings",
      0.05
    );
  };

  // Destructure specialized placements from our mock campaigns
  const topAd = MOCK_ADS.find((a) => a.type === "top-banner") || MOCK_ADS[0];
  const articleAd = MOCK_ADS.find((a) => a.type === "in-article") || MOCK_ADS[2];
  const footerAd = MOCK_ADS.find((a) => a.type === "footer") || MOCK_ADS[4];
  const sidebarAds = MOCK_ADS.filter((a) => a.type === "sidebar");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* HEADER BAR */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VerseLogo className="w-10 h-10 hover:rotate-12 transition-transform duration-300" />
            <div>
              <h1 className="text-lg md:text-xl font-bold font-display tracking-tight flex items-center gap-1.5 leading-none">
                Verse News Hub
              </h1>
              <p className="text-[10px] sm:text-xs font-mono text-slate-400">
                Monetization & Ads Sandbox
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              title="Toggle Light/Dark Mode"
              className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              <span className="sr-only">Toggle Theme</span>
            </button>
          </div>
        </div>
      </header>

      {/* BODY WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* TOP AD PLACEMENT */}
        <section id="top-ad-placement" className="w-full">
          <AdBanner ad={topAd} onAdClick={handleAdClick} isDarkMode={isDarkMode} />
        </section>

        {/* METRICS & STATISTICS ROW */}
        <section id="simulation-stats-panel" className="w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400">
              Live Campaign Analytics
            </h2>
            <button
              id="reset-stats-btn"
              onClick={handleResetStats}
              title="Reset Clicks and Earnings"
              className="flex items-center gap-1 text-xs font-mono text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Simulation
            </button>
          </div>
          <StatsCounter stats={stats} isDarkMode={isDarkMode} />
        </section>

        {/* FEED & SERVICES GRID AREA */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* ARTICLES AREA (Col 1-2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-1 px-1 border-b pb-2 border-slate-800/10 dark:border-slate-200/5">
              <span className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400">
                Editorial Feed
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="flex flex-col gap-6">
              {INITIAL_ARTICLES.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  inArticleAd={articleAd}
                  onAdClick={handleAdClick}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>

          {/* WEB3 EXTENSIONS AREA (Col 3) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-1 px-1 border-b pb-2 border-slate-800/10 dark:border-slate-200/5">
              <span className="text-sm font-semibold uppercase tracking-wider font-mono text-slate-400">
                Verse Web3 Rewards
              </span>
            </div>
            <VerseExtensions isDarkMode={isDarkMode} />
          </div>

        </div>

        {/* FOOTER AD PLACEMENT */}
        <section id="footer-ad-placement" className="w-full">
          <div className="text-center mb-2.5">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Bottom Native Segment
            </span>
          </div>
          <AdBanner ad={footerAd} onAdClick={handleAdClick} isDarkMode={isDarkMode} />
        </section>

      </main>

      {/* FOOTER METRICS INFO */}
      <footer
        className={`mt-12 py-8 border-t text-center text-xs text-slate-500 transition-colors ${
          isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-100 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Verse News Hub Platform Monetization Simulator &bull; Sandbox v2.4
          </div>
          <p className="max-w-lg mx-auto leading-relaxed text-slate-400">
            Ad displays, click ratios, and payout dynamics are calculated on mock values for testing and auditing monetization architectures. No real financial credentials are required or processed.
          </p>
          <div className="text-[10px] text-slate-500">
            &copy; 100% Mock Ad Network Simulation Systems &bull; Built in AI Studio Preview
          </div>
        </div>
      </footer>

      {/* TOAST SYSTEM LISTENER */}
      <FloatingToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
