import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tag, Sparkles, TrendingUp } from "lucide-react";
import { AdConfig } from "../types";

interface AdBannerProps {
  ad: AdConfig;
  onAdClick: (ad: AdConfig) => void;
  isDarkMode: boolean;
  key?: string;
}

export default function AdBanner({ ad, onAdClick, isDarkMode }: AdBannerProps) {
  const [clickBursts, setClickBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [burstCounter, setBurstCounter] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent accidental nested actions if any
    e.stopPropagation();
    
    // Create floating "+$0.05" effect based on raw click position relative to the element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new burst particle
    const newBurstId = burstCounter;
    setBurstCounter((prev) => prev + 1);
    setClickBursts((prev) => [...prev, { id: newBurstId, x, y }]);
    
    // Call parent handler to update tracking states
    onAdClick(ad);
    
    // Automatically filter bursts
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => b.id !== newBurstId));
    }, 1200);
  };

  // Setup layouts based on ad placement types
  const isTop = ad.type === "top-banner";
  const isFooter = ad.type === "footer";
  const isSidebar = ad.type === "sidebar";
  const isInline = ad.type === "in-article";

  return (
    <div
      id={`ad-${ad.id}`}
      onClick={handleClick}
      className={`relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 border hover:shadow-lg ${
        isDarkMode
          ? "bg-slate-900 border-slate-800 hover:border-slate-700"
          : "bg-white border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Background Gradient Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${ad.accentColors}`} />

      {/* Ad Label */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold bg-slate-900/10 text-slate-800 dark:bg-slate-100/10 dark:text-slate-200 uppercase z-10">
        <Tag className="w-3 h-3" />
        Sponsored
      </div>

      {/* Click Visual Burst Portals */}
      <AnimatePresence>
        {clickBursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ left: burst.x, top: burst.y }}
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-emerald-500 text-white font-mono font-bold text-sm px-2.5 py-1 rounded-full shadow-lg z-30 whitespace-nowrap"
          >
            <Sparkles className="w-4.5 h-4.5" />
            +$0.05
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Layout variants with beautiful spacing & flex columns */}
      {isTop && (
        <div className="p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 space-y-1 text-center md:text-left pr-12">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r ${ad.accentColors} text-white`}>
                {ad.sponsor}
              </span>
            </div>
            <h4 className="text-base md:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              {ad.headline}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {ad.description}
            </p>
          </div>
          <div className="w-full md:w-auto">
            {ad.destinationUrl ? (
              <a
                id={`btn-ad-${ad.id}`}
                href={ad.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdClick(ad);
                }}
                className={`inline-block w-full md:w-auto text-xs font-bold px-5 py-2.5 rounded-lg text-white text-center font-mono bg-gradient-to-r ${ad.accentColors} shadow-md hover:scale-102 hover:brightness-110 active:scale-98 transition-all`}
              >
                {ad.actionText}
              </a>
            ) : (
              <button
                id={`btn-ad-${ad.id}`}
                className={`w-full md:w-auto text-xs font-bold px-5 py-2.5 rounded-lg text-white font-mono bg-gradient-to-r ${ad.accentColors} shadow-md group-hover:scale-103 active:scale-97 transition-all`}
              >
                {ad.actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {isSidebar && (
        <div className="p-4 flex flex-col justify-between h-full gap-4">
          <div className="space-y-2 pr-12">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r ${ad.accentColors} text-white`}>
                {ad.sponsor}
              </span>
            </div>
            <h4 className="text-sm font-bold font-display leading-tight text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              {ad.headline}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              {ad.description}
            </p>
          </div>
          <div>
            {ad.destinationUrl ? (
              <a
                id={`btn-ad-${ad.id}`}
                href={ad.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdClick(ad);
                }}
                className={`inline-block w-full text-xs font-bold py-2 rounded-lg text-white text-center font-mono bg-gradient-to-r ${ad.accentColors} shadow-sm hover:brightness-110 active:scale-98 transition-all`}
              >
                {ad.actionText}
              </a>
            ) : (
              <button
                id={`btn-ad-${ad.id}`}
                className={`w-full text-xs font-bold py-2 rounded-lg text-white font-mono bg-gradient-to-r ${ad.accentColors} shadow-sm group-hover:brightness-110 active:scale-98 transition-all`}
              >
                {ad.actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {isInline && (
        <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4 my-2 border-l-4 border-l-cyan-500 bg-slate-50 dark:bg-slate-950/60 rounded-r-lg">
          <div className="flex-1 space-y-1 pr-12">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-cyan-400" />
                Featured Offer &bull; {ad.sponsor}
              </span>
            </div>
            <h4 className="text-sm md:text-base font-bold font-display text-slate-800 dark:text-slate-200">
              {ad.headline}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {ad.description}
            </p>
          </div>
          <div className="w-full md:w-auto shrink-0">
            {ad.destinationUrl ? (
              <a
                id={`btn-ad-${ad.id}`}
                href={ad.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdClick(ad);
                }}
                className={`inline-block w-full md:w-auto text-xs font-bold px-4 py-2 rounded-lg text-white text-center font-mono bg-gradient-to-r ${ad.accentColors} transition-transform active:scale-95`}
              >
                {ad.actionText}
              </a>
            ) : (
              <button
                id={`btn-ad-${ad.id}`}
                className={`w-full md:w-auto text-xs font-bold px-4 py-2 rounded-lg text-white font-mono bg-gradient-to-r ${ad.accentColors} transition-transform active:scale-95`}
              >
                {ad.actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {isFooter && (
        <div className="p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="space-y-1 pr-0 md:pr-12">
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              RESERVED NETWORK SPONSOR &bull; {ad.sponsor}
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white font-display">
              {ad.headline} — <span className="font-normal text-xs text-slate-600 dark:text-slate-400">{ad.description}</span>
            </p>
          </div>
          {ad.destinationUrl ? (
            <a
              id={`btn-ad-${ad.id}`}
              href={ad.destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                onAdClick(ad);
              }}
              className={`inline-block text-xs font-bold px-4 py-1.5 rounded-md text-white font-mono bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-white active:scale-98 transition-all shrink-0`}
            >
              {ad.actionText}
            </a>
          ) : (
            <button
              id={`btn-ad-${ad.id}`}
              className={`text-xs font-bold px-4 py-1.5 rounded-md text-white font-mono bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-white active:scale-98 transition-all shrink-0`}
            >
              {ad.actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
