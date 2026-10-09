import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BibleVersion } from '../../types';
import {
  User,
  Sparkles,
  Flame,
  BookOpen,
  Bookmark,
  Clock,
  CheckCircle2,
  Bell,
  Download,
  Moon,
  Sun,
  Shield,
  CreditCard,
  Sliders,
  Check,
} from 'lucide-react';
import { ProModal } from '../modals/ProModal';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    isDarkMode,
    toggleDarkMode,
    setIsProModalOpen,
    notes,
    prayers,
    highlightedVerses,
    showToast,
  } = useApp();

  const [dailyGoal, setDailyGoal] = useState(userProfile.dailyGoalMinutes);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const handleSaveGoal = () => {
    updateUserProfile({ dailyGoalMinutes: dailyGoal });
    showToast(`Meta diária atualizada para ${dailyGoal} minutos!`);
  };

  const handleExportData = () => {
    const backup = {
      user: userProfile,
      notes,
      prayers,
      highlights: highlightedVerses,
      exportDate: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `dorafy-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exportação concluída com sucesso! 📦');
  };

  const versions: BibleVersion[] = ['NVI', 'ARA', 'NVT', 'NAA'];

  // Days habit activity grid (last 28 days mock)
  const habitDays = Array.from({ length: 28 }, (_, i) => {
    const isCompleted = i % 7 !== 5; // most days active
    return { day: i + 1, active: isCompleted };
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* 1. Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-stone-100 dark:ring-stone-800"
          />
          <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-amber-400 text-stone-900 border-2 border-white dark:border-[#1A1D1B]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {userProfile.name}
                </h1>
                {userProfile.isPro && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-500 border border-amber-400/30">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{userProfile.email}</p>
            </div>

            <button
              onClick={() => setIsProModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 transition-opacity self-center sm:self-start"
            >
              {userProfile.isPro ? 'Gerenciar Pro' : 'Assinar Dorafy Pro'}
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                {userProfile.streakDays} dias
              </span>
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500" />
                Ofensiva
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <span className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                {userProfile.totalChaptersRead}
              </span>
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-sage-600" />
                Capítulos Lidos
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <span className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                {userProfile.versesHighlighted}
              </span>
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-rose-500" />
                Versículos Marcados
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dorafy Pro Subscription Status Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-40 h-40" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>{userProfile.isPro ? 'Plano Ativo: Dorafy Pro Anual' : 'Dorafy Gratuito'}</span>
            </div>

            <h3 className="text-lg font-serif font-bold text-white mb-1">
              {userProfile.isPro
                ? 'Todos os recursos avançados desbloqueados'
                : 'Experimente a experiência completa do Dorafy'}
            </h3>
            <p className="text-xs text-stone-300 max-w-lg leading-relaxed">
              {userProfile.isPro
                ? `Sua assinatura anual renova automaticamente em ${userProfile.proRenewalDate}. Inclui áudio da Bíblia dramatizado, traduções ilimitadas e nuvem segura.`
                : 'Acesse comentários bíblicos, narrações em áudio com trilha orquestrada e backup ilimitado.'}
            </p>
          </div>

          <button
            onClick={() => setIsProModalOpen(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white text-stone-900 hover:bg-stone-100 transition-colors shrink-0 shadow-md"
          >
            {userProfile.isPro ? 'Detalhes do Plano' : 'Fazer Upgrade'}
          </button>
        </div>
      </div>

      {/* 3. Reading Goals & Daily Habit Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft space-y-6">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
            Metas de Leitura & Constância
          </h3>
          <p className="text-xs text-stone-400">
            Acompanhe o tempo diário dedicado à meditação e estudo da Palavra.
          </p>
        </div>

        {/* Goal Slider */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#151816] border border-stone-100 dark:border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Tempo diário desejado:
            </span>
            <span className="font-mono font-bold text-sage-600 dark:text-sage-400 text-sm">
              {dailyGoal} minutos / dia
            </span>
          </div>

          <input
            type="range"
            min={5}
            max={60}
            step={5}
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            className="w-full accent-sage-600 cursor-pointer"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-stone-400">Progresso de hoje: 15 / {dailyGoal} min</span>
            {dailyGoal !== userProfile.dailyGoalMinutes && (
              <button
                onClick={handleSaveGoal}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-sage-600 text-white hover:bg-sage-700 transition-colors"
              >
                Salvar Meta
              </button>
            )}
          </div>
        </div>

        {/* Monthly Activity Grid (Heatmap like Spotify/GitHub) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Frequência das últimas 4 semanas
            </span>
            <span className="text-[11px] text-stone-400">24 de 28 dias ativos</span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
            {habitDays.map((h) => (
              <div
                key={h.day}
                title={`Dia ${h.day}: ${h.active ? 'Leitura concluída' : 'Sem registro'}`}
                className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-mono transition-all ${
                  h.active
                    ? 'bg-sage-600 text-white font-bold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                }`}
              >
                {h.day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. App Preferences & Backup */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft space-y-5">
        <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
          Preferências do Aplicativo
        </h3>

        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {/* Theme setting */}
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                Tema de Exibição
              </h4>
              <p className="text-[11px] text-stone-400">
                Alterne entre fundo pergaminho suave ou cinza escuro relaxante
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Modo Escuro' : 'Modo Claro'}</span>
            </button>
          </div>

          {/* Translation setting */}
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                Versão Padrão da Bíblia
              </h4>
              <p className="text-[11px] text-stone-400">
                Tradução carregada inicialmente ao abrir capítulos
              </p>
            </div>
            <select
              value={userProfile.preferredVersion}
              onChange={(e) => updateUserProfile({ preferredVersion: e.target.value as BibleVersion })}
              className="px-3 py-1.5 text-xs font-medium rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              {versions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Daily Reminders toggle */}
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                Lembretes Matinais de Oração
              </h4>
              <p className="text-[11px] text-stone-400">
                Notificação suave todos os dias às 07:00
              </p>
            </div>
            <input
              type="checkbox"
              checked={remindersEnabled}
              onChange={(e) => {
                setRemindersEnabled(e.target.checked);
                showToast(e.target.checked ? 'Lembretes ativados' : 'Lembretes desativados');
              }}
              className="w-4 h-4 rounded text-sage-600 focus:ring-sage-500 accent-sage-600 cursor-pointer"
            />
          </div>

          {/* Export Data */}
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                Backup & Exportação de Dados
              </h4>
              <p className="text-[11px] text-stone-400">
                Baixe todas as suas anotações, pedidos e destaques em formato JSON/Markdown
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-sage-600" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <ProModal />
    </div>
  );
};
