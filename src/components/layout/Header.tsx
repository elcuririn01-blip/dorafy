import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Search, Sun, Moon, BookOpen, Sparkles, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    userProfile,
    isDarkMode,
    toggleDarkMode,
    setIsCommandPaletteOpen,
    setIsProModalOpen,
    setActiveTab,
    setViewMode,
  } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Início';
      case 'bible':
        return 'Bíblia Sagrada';
      case 'plans':
        return 'Planos de Leitura';
      case 'notebook':
        return 'Caderno & Orações';
      case 'profile':
        return 'Meu Perfil & Metas';
      default:
        return 'Dorafy';
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-[#FAF9F6]/80 dark:bg-[#121413]/80 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Mobile Logo / Desktop Page Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('home')}
            className="md:hidden flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-sage-600 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 tracking-tight">
              Dorafy
            </span>
          </div>

          <div className="hidden md:flex flex-col">
            <h1 className="text-base font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
              {getTabTitle()}
            </h1>
            <span className="text-[11px] text-stone-400 dark:text-stone-500">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Button to view Landing / Sales page */}
          <button
            onClick={() => setViewMode('landing')}
            title="Ver Página Inicial / Vendas"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-semibold transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span className="hidden sm:inline">Página Inicial</span>
          </button>

          {/* Streak Counter Pill */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 cursor-pointer text-xs font-semibold transition-colors"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{userProfile.streakDays} dias</span>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            aria-label="Buscar"
            className="flex items-center gap-1.5 p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-xs text-stone-400">Buscar</span>
          </button>

          {/* Pro Badge */}
          {userProfile.isPro ? (
            <button
              onClick={() => setIsProModalOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-100 dark:bg-sage-950/80 text-sage-800 dark:text-sage-300 text-xs font-medium border border-sage-200 dark:border-sage-800 hover:border-sage-300 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-sage-600 dark:text-sage-400" />
              <span>Pro</span>
            </button>
          ) : (
            <button
              onClick={() => setIsProModalOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>Seja Pro</span>
            </button>
          )}

          {/* Theme switcher */}
          <button
            onClick={toggleDarkMode}
            aria-label="Alternar modo escuro"
            className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Avatar */}
          <div
            onClick={() => setActiveTab('profile')}
            className="cursor-pointer ml-1 ring-2 ring-stone-200 dark:ring-stone-800 hover:ring-sage-500 dark:hover:ring-sage-500 rounded-full transition-all"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
