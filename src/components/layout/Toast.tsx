import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-900/95 dark:bg-stone-100/95 text-stone-100 dark:text-stone-900 shadow-xl backdrop-blur-md border border-stone-800 dark:border-stone-200 text-sm font-medium">
        <Sparkles className="w-4 h-4 text-sage-400 dark:text-sage-600 shrink-0" />
        <span>{toastMessage}</span>
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0 ml-1" />
      </div>
    </div>
  );
};
