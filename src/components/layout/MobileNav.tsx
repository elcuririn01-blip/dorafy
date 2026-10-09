import React from 'react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';
import { Compass, BookOpen, Milestone, FileText, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Hoje', icon: Compass },
    { id: 'bible', label: 'Bíblia', icon: BookOpen },
    { id: 'plans', label: 'Planos', icon: Milestone },
    { id: 'notebook', label: 'Caderno', icon: FileText },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 dark:bg-[#151816]/95 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800/80 px-2 py-1.5 safe-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-sage-700 dark:text-sage-400 font-semibold'
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110 bg-sage-50 dark:bg-sage-950/60' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-1 h-1 rounded-full bg-sage-600 dark:bg-sage-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
