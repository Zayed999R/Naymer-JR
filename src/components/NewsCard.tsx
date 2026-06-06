import React, { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { NewsArticle, AdConfig } from "../types";
import AdBanner from "./AdBanner";

interface NewsCardProps {
  article: NewsArticle;
  inArticleAd: AdConfig;
  onAdClick: (ad: AdConfig) => void;
  isDarkMode: boolean;
  key?: string;
}

export default function NewsCard({ article, inArticleAd, onAdClick, isDarkMode }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color schemes per categories for high-fidelity aesthetics
  const getCategoryBadge = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "community":
        return "bg-indigo-500/15 text-indigo-400 border-indigo-500/20";
      case "contest":
        return "bg-amber-500/15 text-amber-500 border-amber-500/20";
      case "guide":
        return "bg-cyan-500/15 text-cyan-400 border-cyan-500/20";
      default:
        return "bg-slate-500/15 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div
      id={`article-card-${article.id}`}
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-900 border-slate-800 hover:border-slate-700/80 hover:shadow-lg"
          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(article.category)}`}>
          {article.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5" />
          {article.date}
        </div>
      </div>

      <h3 className="text-xl font-bold tracking-tight font-display text-slate-900 dark:text-white mb-2 leading-tight">
        {article.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        {article.snippet}
      </p>

      {/* Expandable Body Content */}
      {isExpanded && (
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3 pb-4 pt-2 border-t border-slate-800/20 dark:border-slate-200/5 animate-fadeIn">
          <p>{article.content}</p>
        </div>
      )}

      {/* Embedded in-article Ad placement exactly as requested */}
      {article.hasAdInbetween && (
        <div className="my-4 pt-1 pb-1">
          <AdBanner ad={inArticleAd} onAdClick={onAdClick} isDarkMode={isDarkMode} />
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          id={`toggle-expand-${article.id}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-mono font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors cursor-pointer py-1"
        >
          {isExpanded ? (
            <>
              Collapse Article <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read Full Update <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
