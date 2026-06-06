import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { DollarSign, CheckCircle, Info, X } from "lucide-react";
import { ToastMessage } from "../types";

interface FloatingToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function FloatingToast({ toasts, onDismiss }: FloatingToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isEarnings = toast.type === "earnings";
          return (
            <motion.div
              key={toast.id}
              id={`toast-${toast.id}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              layout
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-colors ${
                isEarnings
                  ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100"
                  : "bg-slate-900/90 border-slate-700/50 text-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isEarnings ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {isEarnings ? <DollarSign className="w-5 h-5 animate-pulse" /> : <Info className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight">{toast.message}</p>
                  {isEarnings && toast.amount && (
                    <p className="text-xs font-mono text-emerald-400 font-medium">
                      +${toast.amount.toFixed(2)} added to live balance
                    </p>
                  )}
                </div>
              </div>
              <button
                id={`dismiss-${toast.id}`}
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1 hover:bg-slate-800/50 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
