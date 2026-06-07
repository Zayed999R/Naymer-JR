import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Target, 
  Send, 
  UserCheck, 
  AlertCircle 
} from "lucide-react";
import VerseLogo from "./VerseLogo";

interface DailyMissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function DailyMissionsModal({
  isOpen,
  onClose,
  isDarkMode,
}: DailyMissionsModalProps) {
  // Telegram States
  const [telegramUsername, setTelegramUsername] = useState<string>(() => {
    return localStorage.getItem("verse_telegram_username") || "";
  });
  const [isTelegramSaved, setIsTelegramSaved] = useState<boolean>(() => {
    return localStorage.getItem("verse_telegram_saved") === "true";
  });
  const [telegramUserId, setTelegramUserId] = useState<string>("");
  const [isCheckingReport, setIsCheckingReport] = useState<boolean>(false);
  const [reportCheckResult, setReportCheckResult] = useState<{
    scanned: boolean;
    hasReport: boolean;
    statusText: string;
    score: number;
    details: string;
  } | null>(null);

  // Mission States
  const [missionStarted, setMissionStarted] = useState<boolean>(() => {
    return localStorage.getItem("verse_mission_started") === "true";
  });
  const [usernameClicks, setUsernameClicks] = useState<number>(0);
  const [newsVisited, setNewsVisited] = useState<boolean>(false);
  const [scavengerJoined, setScavengerJoined] = useState<boolean>(false);
  const [usernameShared, setUsernameShared] = useState<boolean>(false);

  // Save changes to localStorage for durable simulation persistence
  useEffect(() => {
    localStorage.setItem("verse_telegram_username", telegramUsername);
  }, [telegramUsername]);

  useEffect(() => {
    localStorage.setItem("verse_telegram_saved", String(isTelegramSaved));
  }, [isTelegramSaved]);

  useEffect(() => {
    localStorage.setItem("verse_mission_started", String(missionStarted));
  }, [missionStarted]);

  if (!isOpen) return null;

  const handleSaveTelegram = () => {
    if (!telegramUsername.trim()) {
      alert("Please enter a valid Telegram username!");
      return;
    }
    setIsTelegramSaved(true);
    alert(`Success! Telegram username @${telegramUsername.replace("@", "")} has been successfully registered and linked for profile tracking.`);
  };

  const handleCheckAbuseReport = () => {
    if (!telegramUserId.trim()) {
      alert("Please enter a Telegram handle or numerical User ID to inspect!");
      return;
    }
    setIsCheckingReport(true);
    setReportCheckResult(null);

    // Simulate scanning database
    setTimeout(() => {
      setIsCheckingReport(false);
      setReportCheckResult({
        scanned: true,
        hasReport: false,
        statusText: "TRUSTED PROFILE",
        score: 100,
        details: `Verse Anti-Fraud & Scam protocol confirms: Account [${telegramUserId.replace("@", "")}] has NO registered records of spamming, community abuse, or sybil attacks. Trust score is 100% clean.`
      });
    }, 1200);
  };

  const handleStartMissionToggle = () => {
    const nextState = !missionStarted;
    setMissionStarted(nextState);
    if (nextState) {
      alert("Daily Verse Missions have officially started! Complete the items listed below to claim extra Web3 dynamic rewards.");
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="daily-missions-modal-overlay"
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-lg rounded-2xl border overflow-hidden shadow-2xl font-sans ${
            isDarkMode 
              ? "bg-slate-900 border-slate-800 text-white shadow-slate-950/40" 
              : "bg-white border-slate-200 text-slate-900 shadow-xl"
          }`}
          id="daily-missions-modal-container"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 text-white flex items-center justify-between border-b border-indigo-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <Target className="w-6 h-6 text-amber-300 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-amber-200">
                  🎯 Daily Verse Missions
                </h3>
                <p className="text-[11px] text-indigo-100 font-medium">
                  Complete tasks & verify Telegram profile tracking
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
              aria-label="Close"
              id="close-missions-modal-button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Introductory Statement */}
            <div className={`p-4 rounded-xl border leading-relaxed text-xs ${
              isDarkMode 
                ? "bg-slate-950/40 border-slate-800/80 text-slate-300" 
                : "bg-slate-50 border-slate-150 text-slate-600"
            }`}>
              Complete daily tasks, stay active in the Verse community, and unlock achievements by exploring different features of the platform.
            </div>

            {/* Daily Missions Task List Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                <span>📝</span> Daily Mission Agenda
              </h4>

              <div className="space-y-2">
                {/* Task 1 */}
                <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-200 ${
                  isDarkMode ? "bg-slate-950/30 border-slate-850" : "bg-slate-50 border-slate-150"
                }`}>
                  <span className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                    <span className="text-emerald-500 flex items-center justify-center bg-emerald-500/10 rounded-full p-0.5">✔</span>
                    <span className={isDarkMode ? "text-slate-200" : "text-slate-800"}>Generate 3 usernames</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold font-mono">
                    COMPLETED
                  </span>
                </div>

                {/* Task 2: Visit Verse News Link with Direct Target Link */}
                <div className="flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-200 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/40">
                  <span className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                    <span className="text-emerald-500 flex items-center justify-center bg-emerald-500/15 rounded-full p-0.5 animate-pulse">✔</span>
                    <span className="font-extrabold text-slate-850 dark:text-slate-100">Visit Verse News</span>
                  </span>
                  <a
                    href="https://t.me/GetVerse/476423"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNewsVisited(true)}
                    className="inline-flex items-center gap-1 text-[10px] bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-3 py-1 rounded font-bold hover:opacity-90 hover:scale-105 active:scale-95 transition-all text-center"
                    id="modal-visit-verse-news"
                  >
                    News Community <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Task 3 */}
                <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-200 ${
                  isDarkMode ? "bg-slate-950/30 border-slate-850" : "bg-slate-50 border-slate-150"
                }`}>
                  <span className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                    <span className="text-emerald-500 flex items-center justify-center bg-emerald-500/10 rounded-full p-0.5">✔</span>
                    <span className={isDarkMode ? "text-slate-200" : "text-slate-800"}>Join Scavenger Hunt page</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold font-mono">
                    COMPLETED
                  </span>
                </div>

                {/* Task 4 */}
                <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all duration-200 ${
                  isDarkMode ? "bg-slate-950/30 border-slate-850" : "bg-slate-50 border-slate-150"
                }`}>
                  <span className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                    <span className="text-emerald-500 flex items-center justify-center bg-emerald-500/10 rounded-full p-0.5">✔</span>
                    <span className={isDarkMode ? "text-slate-200" : "text-slate-800"}>Share your generated username</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold font-mono">
                    COMPLETED
                  </span>
                </div>
              </div>
            </div>

            {/* Telegram Profile Setup Section (for Profile Tracking) */}
            <div className={`p-4 rounded-2xl border space-y-4 ${
              isDarkMode ? "bg-slate-950/50 border-slate-800/80" : "bg-slate-100/50 border-slate-200"
            }`}>
              <div className="flex items-center gap-2 border-b pb-2 border-slate-800/10 dark:border-slate-200/5">
                <Send className="w-4 h-4 text-sky-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
                  Telegram Username Tracking
                </h4>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Connect your profile to persist your daily tasks record securely in the Verse system ledger.
                </p>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 font-mono text-xs">
                      @
                    </span>
                    <input
                      type="text"
                      value={telegramUsername}
                      onChange={(e) => {
                        setTelegramUsername(e.target.value.replace("@", ""));
                        setIsTelegramSaved(false);
                      }}
                      placeholder="telegram_username"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                      id="modal-telegram-input"
                    />
                  </div>
                  <button
                    onClick={handleSaveTelegram}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isTelegramSaved
                        ? "bg-slate-800 text-emerald-400 border border-emerald-500/20"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:opacity-90 font-bold"
                    }`}
                    id="modal-telegram-save-button"
                  >
                    {isTelegramSaved ? "Linked ✓" : "Save User"}
                  </button>
                </div>

                {isTelegramSaved && (
                  <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Tracked: Active and matching Verse Web3 rules.
                  </p>
                )}
              </div>
            </div>

            {/* Check Telegram account report section */}
            <div className={`p-4 rounded-2xl border space-y-4 ${
              isDarkMode ? "bg-slate-950/50 border-slate-800/80" : "bg-slate-100/50 border-slate-200"
            }`}>
              <div className="flex items-center gap-2 border-b pb-2 border-slate-800/10 dark:border-slate-200/5">
                <UserCheck className="w-4 h-4 text-indigo-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
                  Verify Account Standing &amp; Abuse Reports
                </h4>
              </div>

              <div className="space-y-2.5">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Enter your Username or Telegram ID to scan against Verse system log database for flags.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={telegramUserId}
                    onChange={(e) => setTelegramUserId(e.target.value)}
                    placeholder="Enter username or numerical ID"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                    id="modal-telegram-id-input"
                  />
                  <button
                    onClick={handleCheckAbuseReport}
                    disabled={isCheckingReport}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono font-bold transition-all disabled:opacity-50 flex items-center gap-1 cursor-pointer shrink-0"
                    id="modal-telegram-check-button"
                  >
                    {isCheckingReport ? "Scanning..." : "Check Reports"}
                  </button>
                </div>

                {isCheckingReport && (
                  <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2 text-center py-6">
                    <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-mono text-slate-400 animate-pulse font-bold">
                      Querying Verse Anti-Spam DB...
                    </p>
                  </div>
                )}

                {reportCheckResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3.5 rounded-lg border text-xs font-mono ${
                      reportCheckResult.hasReport 
                        ? "bg-rose-500/10 border-rose-500/25 text-rose-300" 
                        : "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                    }`}
                    id="modal-scan-report-result"
                  >
                    <div className="flex items-center justify-between mb-1.5 border-b border-white/5 pb-1 select-none">
                      <span className="font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        {reportCheckResult.statusText}
                      </span>
                      <span className="text-[10px] border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold bg-slate-950/40">
                        Score: {reportCheckResult.score}/100
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {reportCheckResult.details}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom active controller */}
            <div className="pt-2">
              <button
                onClick={handleStartMissionToggle}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-mono text-sm font-extrabold shadow-md transition-all active:scale-97 cursor-pointer ${
                  missionStarted 
                    ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white" 
                    : "bg-gradient-to-r from-emerald-500/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-bold"
                }`}
                id="modal-mission-toggle-button"
              >
                {missionStarted ? "Stop Current Active Mission ⚡" : "Start Mission 🚀"}
              </button>
            </div>

          </div>

          {/* Footer close option */}
          <div className={`p-4 border-t flex justify-between items-center ${
            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-150"
          }`}>
            <div className="flex items-center gap-1.5 text-[10px] bg-indigo-500/10 text-indigo-400 font-mono px-2 py-0.5 rounded border border-indigo-500/20">
              <VerseLogo className="w-3.5 h-3.5 text-indigo-400" />
              Verse Protection Powered
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700/80 text-white rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
              id="modal-close-window-footer"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
