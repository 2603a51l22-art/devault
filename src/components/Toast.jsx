import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const TOAST_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const IconComponent = TOAST_ICONS[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl bg-obsidian-950/95 text-white border border-white/10 shadow-2xl backdrop-blur-xl animate-fade-in"
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-xl ${
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                toast.type === 'error' ? 'bg-rose-500/20 text-rose-400' :
                'bg-indigo-500/20 text-indigo-400'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold">{toast.message}</p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
