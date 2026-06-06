import React, { useState, useEffect } from "react";
import { Timer, Fuel, Bell, ShieldQuestion, ChevronDown, ChevronUp, MessageSquare, ExternalLink, BookOpen } from "lucide-react";

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function VerseExtensions({ isDarkMode }: { isDarkMode: boolean }) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextFriday = new Date();
      
      // Set to next Friday at 06:00 UTC
      nextFriday.setUTCHours(6, 0, 0, 0);
      nextFriday.setUTCDate(now.getUTCDate() + (5 - now.getUTCDay() + 7) % 7);
      
      if (now >= nextFriday) {
        nextFriday.setUTCDate(nextFriday.getUTCDate() + 7);
      }
      
      const diff = nextFriday.getTime() - now.getTime();
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0")
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Why is my Verse transaction pending or failed?",
      a: "This usually happens due to a sudden spike in network traffic or low gas limits. Try checking network parameters, increasing your gas tolerance in your Verse or Bitcoin.com wallet, or re-submitting after a few minutes."
    },
    {
      q: "How can I verify my tasks for reward tokens?",
      a: "Make sure your community tier verification matches your profile. Connect with our dedicated tracking system or sync your account updates directly via the active simulation panel."
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. LIVE EVENT & REWARDS TRACKER CARD */}
      <div
        id="verse-rewards-countdown-card"
        className={`p-6 rounded-2xl border transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900 border-slate-800 shadow-xl"
            : "bg-white border-slate-200 shadow-md"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full uppercase flex items-center gap-1.5 animate-pulse">
            <Timer className="w-3.5 h-3.5" />
            Live Countdown
          </span>
          <span className="text-emerald-500 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" /> Gas: Low (15 Gwei)
          </span>
        </div>

        <h3 className="text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white mb-1">
          verse community Scavenger Hunt time count down start
        </h3>
        <p className="text-xs font-mono font-bold text-violet-500 dark:text-violet-400 mb-2.5">
          Scavenger Hunt time every Friday 6:00 UTC
        </p>
        
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
          Participate in our Friday community event to solve Web3 puzzles and claim rewards directly into your Verse Wallet.
        </p>

        {/* Timer UI Display */}
        <div className="flex gap-2.5 mb-5">
          <div className={`flex-1 py-2.5 rounded-lg text-center ${isDarkMode ? "bg-slate-950" : "bg-slate-50 border border-slate-100"}`}>
            <span id="days" className="block text-2xl font-bold font-mono text-cyan-500 dark:text-cyan-400 leading-none mb-1">
              {countdown.days}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              Days
            </span>
          </div>

          <div className={`flex-1 py-2.5 rounded-lg text-center ${isDarkMode ? "bg-slate-950" : "bg-slate-50 border border-slate-100"}`}>
            <span id="hours" className="block text-2xl font-bold font-mono text-cyan-500 dark:text-cyan-400 leading-none mb-1">
              {countdown.hours}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              Hrs
            </span>
          </div>

          <div className={`flex-1 py-2.5 rounded-lg text-center ${isDarkMode ? "bg-slate-950" : "bg-slate-50 border border-slate-100"}`}>
            <span id="minutes" className="block text-2xl font-bold font-mono text-cyan-500 dark:text-cyan-400 leading-none mb-1">
              {countdown.minutes}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              Min
            </span>
          </div>

          <div className={`flex-1 py-2.5 rounded-lg text-center ${isDarkMode ? "bg-slate-950" : "bg-slate-50 border border-slate-100"}`}>
            <span className="block text-2xl font-bold font-mono text-violet-500 dark:text-violet-400 leading-none mb-1">
              {countdown.seconds}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              Sec
            </span>
          </div>
        </div>

        {/* Action button triggers matching exact specs */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 px-3 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1.5 border leading-none transition-all ${
              isDarkMode
                ? "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-850"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Set Reminder
          </a>
          <a
            href="https://hub.vgdh.io"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1.5 text-white leading-none bg-gradient-to-r from-violet-600 to-pink-500 hover:scale-[1.02] shadow-md transition-all shrink-0"
          >
            Join Live Hub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. QUICK TROUBLESHOOTING & HELP DESK (ACCORDION) */}
      <div
        id="verse-troubleshooting-accordion"
        className={`p-6 rounded-2xl border transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900 border-slate-800 shadow-xl"
            : "bg-white border-slate-200 shadow-md"
        }`}
      >
        <h3 className="text-md font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2 mb-4 border-b border-slate-800/10 dark:border-slate-200/5 pb-2.5">
          <ShieldQuestion className="w-5 h-5 text-indigo-400" />
          Quick Troubleshooting Desk
        </h3>

        <div className="space-y-1.5">
          {faqData.map((faq, index) => {
            const isExpanded = activeFaq === index;
            return (
              <div 
                key={index} 
                className={`border-b transition-colors ${
                  isDarkMode ? "border-slate-805/50" : "border-slate-100"
                } pb-3 last:border-0 last:pb-0`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-2 flex items-center justify-between gap-3 text-slate-850 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 font-medium text-xs md:text-sm transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram redirection support action */}
        <div className="mt-5 pt-3 border-t border-slate-800/10 dark:border-slate-200/5 text-center space-y-2">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Asked verse community support lead @Naymerjr2005 ( cheak admin tag )
          </p>
          <a
            href="https://t.me/GetVerse/177601"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-97 text-white text-xs font-bold px-4 py-2 rounded-lg font-mono transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Community link 👇
          </a>
        </div>
      </div>

      {/* 3. VERSE COMMUNITY LEARN & EARN CARD */}
      <div
        id="verse-learn-earn-card"
        className={`p-6 rounded-2xl border transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900 border-slate-800 shadow-xl animate-fadeIn"
            : "bg-white border-slate-200 shadow-md animate-fadeIn"
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Learn & Earn
          </span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold px-2 py-0.5 rounded font-mono uppercase">
            Active
          </span>
        </div>

        <h3 className="text-md font-semibold font-display tracking-tight text-slate-900 dark:text-white mb-2">
          verse community learn and earn 👇👇
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Gain deep blockchain knowledge and earn valuable digital assets through interactive quests.
        </p>

        <a
          href="https://t.me/GetVerse/355506"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 active:scale-97 text-white text-xs font-bold px-4 py-2.5 rounded-lg font-mono shadow-md transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Join Channel
        </a>
      </div>

    </div>
  );
}
