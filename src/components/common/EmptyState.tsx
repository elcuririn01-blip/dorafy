import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-sm mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center text-stone-400 dark:text-stone-500 mb-4 border border-stone-200/60 dark:border-stone-700/60">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        {title}
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-5">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-sage-600 text-white hover:bg-sage-700 dark:bg-sage-600 dark:hover:bg-sage-500 transition-colors shadow-sm shadow-sage-600/20"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
