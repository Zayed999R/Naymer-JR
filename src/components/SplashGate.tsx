import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Coins, Award } from "lucide-react";
import VerseLogo from "./VerseLogo";

interface SplashGateProps {
  onEnter: () => void;
  isDarkMode: boolean;
}

export default function SplashGate({ onEnter, isDarkMode }: SplashGateProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-slate-950 font-sans select-none"
      id="verse-splash-gate-fullscreen"
    >
      {/* Dynamic Cosmic Glow Effects in the background matching the logo's sky-blue/purple/magenta scheme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[12000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay for tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative flex flex-col items-center text-center max-w-xl px-6 space-y-8 z-10">
        
        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] sm:text-xs font-mono font-bold text-sky-400 uppercase tracking-widest leading-none"
          id="splash-web3-pill"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin duration-3000" />
          Verse Web3 Earn Protocol Active
        </motion.div>

        {/* Massive Pulsing Verse Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 70,
            damping: 15,
            delay: 0.1 
          }}
          className="relative group cursor-pointer"
          onClick={onEnter}
          id="splash-logo-interactive"
        >
          {/* Radial Outer Aura glow matching logo gradient */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-700 animate-pulse" />
          
          {/* Main big logo */}
          <VerseLogo className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105 active:scale-95 hover:rotate-6" />
        </motion.div>

        {/* Title */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-200"
            id="splash-title"
          >
            Verse Network
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xs sm:text-sm text-slate-400 font-sans tracking-wide leading-relaxed max-w-sm mx-auto"
            id="splash-caption"
          >
            Unlock the ultimate news-sharing rewards ledger. Crate, curate, and monetize your content with verified user profiles.
          </motion.p>
        </div>

        {/* BIG START EARN CALL-TO-ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full pt-4"
          id="splash-start-action-container"
        >
          <button
            onClick={onEnter}
            className="group w-full max-w-xs relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 rounded-2xl text-slate-950 font-bold text-lg md:text-xl shadow-2xl shadow-purple-500/20 active:scale-95 hover:scale-103 transition-all cursor-pointer select-none font-sans font-extrabold"
            id="start-earn-main-btn"
          >
            {/* Soft internal gradient background for premium look */}
            <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative z-10 flex items-center gap-2">
              Start Earn 🚀
            </span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>

        {/* Feature Icons Grid as secondary confidence indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="grid grid-cols-3 gap-6 pt-8 w-full border-t border-slate-900 text-slate-500"
          id="splash-features-grid"
        >
          <div className="flex flex-col items-center space-y-1">
            <Coins className="w-5 h-5 text-sky-400/80" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              Curation Earn
            </span>
          </div>
          <div className="flex flex-col items-center space-y-1 border-x border-slate-900">
            <ShieldCheck className="w-5 h-5 text-purple-400/80" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              Secured dApp
            </span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Award className="w-5 h-5 text-pink-400/80" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              Daily Missions
            </span>
          </div>
        </motion.div>

      </div>

      {/* Decorative credit overlay footer */}
      <div className="absolute bottom-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest select-none pointer-events-none">
        Powered by Verse Blockchain Protocol
      </div>
    </div>
  );
}
