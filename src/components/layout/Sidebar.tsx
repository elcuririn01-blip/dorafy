import React from 'react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';
import {
  Compass,
  BookOpen,
  Milestone,
  FileText,
  User,
  Search,
  Flame,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookmarkCheck,
  Globe,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isDarkMode,
    toggleDarkMode,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    userProfile,
    setIsCommandPaletteOpen,
    setIsProModalOpen,
    setViewMode,
  } = useApp();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Início (Hoje)', icon: Compass },
    { id: 'bible', label: 'Bíblia (Leitor)', icon: BookOpen },
    { id: 'plans', label: 'Planos & Trilha', icon: Milestone },
    { id: 'notebook', label: 'Caderno & Orações', icon: FileText },
    { id: 'profile', label: 'Perfil / Conta', icon: User },
  ];

  const daysOfWeek = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const completedDays = [true, true, true, true, false, false, false]; // Mon to Sun mock

  return (
    <aside
      className={`hidden md:flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r transition-all duration-300 ease-in-out z-30 select-none ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      } bg-[#FAF9F6] dark:bg-[#151816] border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300`}
    >
      {/* Top Section */}
      <div className="flex flex-col p-4 gap-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-sage-600/90 dark:bg-sage-600 flex items-center justify-center text-white shadow-sm shadow-sage-600/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1.5 font-serif">
                  Dorafy
                  <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded-full bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400 border border-sage-200 dark:border-sage-800/60">
                    SaaS
                  </span>
                </span>
                <span className="text-[11px] text-stone-400 dark:text-stone-500 font-sans -mt-0.5">
                  Estudos & Devoção
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            title={isSidebarCollapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Search Button (Command Palette Trigger) */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium border border-stone-200/90 dark:border-stone-800/90 bg-white/70 dark:bg-[#1A1E1C]/80 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700 hover:text-stone-800 dark:hover:text-stone-200 transition-all shadow-sm ${
            isSidebarCollapsed ? 'justify-center px-2' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-stone-400" />
            {!isSidebarCollapsed && <span>Buscar ou ir para...</span>}
          </div>
          {!isSidebarCollapsed && (
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 border border-stone-200/60 dark:border-stone-700/60">
              ⌘K
            </kbd>
          )}
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-sage-600 text-white shadow-sm shadow-sage-600/25 dark:bg-sage-600 dark:text-white'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-100'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                {isActive && !isSidebarCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/90" />
                )}
              </button>
            );
          })}

          {/* Landing / Sales Page Switcher */}
          <button
            onClick={() => setViewMode('landing')}
            title={isSidebarCollapsed ? 'Ver Página Inicial / Vendas' : undefined}
            className={`flex items-center gap-3 px-3 py-2 mt-1 rounded-xl text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-all ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <Globe className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            {!isSidebarCollapsed && <span>Página Inicial (Site)</span>}
          </button>
        </nav>
      </div>

      {/* Bottom Section: Streak, Pro Banner & Theme Toggle */}
      <div className="flex flex-col p-4 gap-3 border-t border-stone-200/60 dark:border-stone-800/60">
        {/* Streak Mini Widget */}
        {!isSidebarCollapsed ? (
          <div className="p-3 rounded-2xl bg-white/80 dark:bg-[#1A1E1C] border border-stone-200/80 dark:border-stone-800/80 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                {userProfile.streakDays} dias seguidos
              </span>
              <span className="text-[10px] text-stone-400 font-medium">Meta diária</span>
            </div>

            {/* Week days progress dots */}
            <div className="flex justify-between items-center pt-1 px-1">
              {daysOfWeek.map((day, idx) => {
                const isDone = completedDays[idx];
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-stone-400">{day}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] transition-all ${
                        isDone
                          ? 'bg-sage-600 text-white font-bold'
                          : 'bg-stone-200 dark:bg-stone-800 text-transparent'
                      }`}
                    >
                      {isDone ? '✓' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            title={`${userProfile.streakDays} dias seguidos`}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 cursor-pointer"
            onClick={() => setActiveTab('profile')}
          >
            <Flame className="w-5 h-5 fill-amber-500" />
            <span className="text-[10px] font-bold mt-0.5">{userProfile.streakDays}d</span>
          </div>
        )}

        {/* Dorafy Pro Showcase / Status */}
        {!isSidebarCollapsed ? (
          <div
            onClick={() => setIsProModalOpen(true)}
            className="p-3 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 dark:from-stone-900 dark:to-[#171a18] text-white shadow-sm cursor-pointer hover:shadow-md transition-all group border border-stone-800 dark:border-stone-700/60"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 font-medium text-amber-300">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                {userProfile.isPro ? 'Dorafy Pro Ativo' : 'Seja Dorafy Pro'}
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-semibold">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-stone-300 group-hover:text-white transition-colors leading-tight">
              {userProfile.isPro
                ? 'Áudio bíblico & versões ilimitadas'
                : 'Desbloqueie áudio, comentários e sincronização'}
            </p>
          </div>
        ) : (
          <button
            onClick={() => setIsProModalOpen(true)}
            title="Dorafy Pro"
            className="w-full flex items-center justify-center p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 transition-colors"
          >
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
          </button>
        )}

        {/* Footer controls: Theme toggle & User Info */}
        <div
          className={`flex items-center justify-between pt-1 ${
            isSidebarCollapsed ? 'flex-col gap-2' : ''
          }`}
        >
          {/* User mini profile */}
          <div
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2.5 cursor-pointer rounded-xl p-1 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-7 h-7 rounded-full object-cover border border-stone-300 dark:border-stone-700"
            />
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-left">
                <span className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate max-w-[100px]">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-stone-400 truncate">Configurações</span>
              </div>
            )}
          </div>

          {/* Theme switcher button */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
