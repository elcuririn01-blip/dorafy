import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  BookOpen,
  ArrowRight,
  Share2,
  Copy,
  PenSquare,
  Sparkles,
  Play,
  Pause,
  Milestone,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ChevronRight,
} from 'lucide-react';
import { NoteModal } from '../modals/NoteModal';
import { PrayerModal } from '../modals/PrayerModal';

export const HomeView: React.FC = () => {
  const {
    userProfile,
    setActiveTab,
    setReadingLocation,
    plans,
    toggleDayCompletion,
    notes,
    showToast,
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  // Active plan for hero spotlight
  const activePlan = plans.find((p) => p.isActive) || plans[0];
  const activeDay = activePlan?.days.find((d) => !d.completed) || activePlan?.days[activePlan?.days.length - 1];

  const handleCopyDailyVerse = () => {
    const text = '"Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus." — Filipenses 4:6-7';
    navigator.clipboard?.writeText(text);
    showToast('Versículo do dia copiado! 📋');
  };

  const handleShareDailyVerse = () => {
    showToast('Link do versículo do dia pronto para compartilhar!');
  };

  const currentPercent = activePlan
    ? Math.round((activePlan.daysCompleted / activePlan.durationDays) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* 1. Header & Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-wider uppercase text-sage-600 dark:text-sage-400">
              Devocional Diário
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-xs text-stone-400">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            A paz do Senhor, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Reserve alguns minutos para descansar o coração na presença do Pai hoje.
          </p>
        </div>

        {/* Streak highlight badge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/90 dark:border-stone-800/90 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Flame className="w-5 h-5 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                {userProfile.streakDays} Dias
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                🔥 Fogo Aceso
              </span>
            </div>
            <p className="text-[11px] text-stone-400">Meta: 15 / {userProfile.dailyGoalMinutes} min hoje</p>
          </div>
        </div>
      </div>

      {/* 2. Hero Card: Versículo do Dia */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f8f6f0] via-white to-[#f4f7f4] dark:from-[#1A1E1B] dark:via-[#161816] dark:to-[#121413] border border-stone-200/80 dark:border-stone-800/80 shadow-soft p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-sage-500/5 dark:bg-sage-400/5 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-950/80 text-sage-800 dark:text-sage-300 text-xs font-semibold border border-sage-200 dark:border-sage-800/80">
            <Sparkles className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Versículo do Dia</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyDailyVerse}
              title="Copiar versículo"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareDailyVerse}
              title="Compartilhar"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <blockquote className="my-4">
          <p className="font-serif text-lg sm:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed italic">
            "Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus."
          </p>
        </blockquote>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
          <div>
            <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              Filipenses 4:6-7
            </span>
            <span className="text-xs text-stone-400 ml-2">Nova Versão Internacional</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsNoteModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <PenSquare className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
              <span>Anotar Reflexão</span>
            </button>

            <button
              onClick={() => setReadingLocation('fp', 4)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sage-600 hover:bg-sage-700 transition-all flex items-center gap-1.5 shadow-sm shadow-sage-600/25"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ler Capítulo 4</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Grid: Active Plan Progress + Daily Audio Devotional */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Active Reading Plan (col-span-7) */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
                Plano em Andamento
              </span>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {currentPercent}% Concluído
              </span>
            </div>

            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
              {activePlan?.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
              {activePlan?.subtitle}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-5">
              <div
                className="bg-sage-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentPercent}%` }}
              />
            </div>

            {/* Next Reading Capsule */}
            {activeDay && (
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#151816] border border-stone-100 dark:border-stone-800 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400 flex items-center justify-center font-bold text-xs">
                    {activeDay.day}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      {activeDay.title}
                    </h4>
                    <span className="text-[11px] text-sage-700 dark:text-sage-400 font-medium">
                      {activeDay.passage}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleDayCompletion(activePlan.id, activeDay.day)}
                  className={`p-2 rounded-xl transition-all ${
                    activeDay.completed
                      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                      : 'text-stone-400 hover:text-emerald-600 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                  title={activeDay.completed ? 'Marcar como não lido' : 'Concluir leitura de hoje'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80">
            <span className="text-xs text-stone-400">
              Dia {activePlan?.daysCompleted} de {activePlan?.durationDays}
            </span>
            <button
              onClick={() => {
                if (activeDay) {
                  setReadingLocation(activeDay.bookId, activeDay.chapter);
                } else {
                  setActiveTab('plans');
                }
              }}
              className="text-xs font-semibold text-sage-600 dark:text-sage-400 hover:text-sage-700 flex items-center gap-1 group"
            >
              <span>Continuar Leitura</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Daily Audio Devotional (col-span-5) */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-stone-900 text-stone-100 shadow-soft flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Flame className="w-36 h-36" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Áudio Devocional do Dia
              </span>
            </div>

            <h3 className="text-lg font-serif font-bold text-white mb-1">
              O Bom Pastor e o Cuidado Invisível
            </h3>
            <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed mb-4">
              Uma meditação em áudio guiada de 4 minutos sobre como confiar no direcionamento de Deus quando o vale parece incerto.
            </p>
          </div>

          {/* Spotify-style audio player widget */}
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsPlayingAudio(!isPlayingAudio);
                    showToast(isPlayingAudio ? 'Áudio pausado' : 'Reproduzindo devocional em áudio...');
                  }}
                  className="w-10 h-10 rounded-full bg-sage-500 hover:bg-sage-400 text-white flex items-center justify-center transition-all shadow-md group"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Voz: Pastor Lucas</span>
                  <span className="text-[10px] text-stone-300">Produzido por Dorafy Áudio</span>
                </div>
              </div>

              <span className="text-xs font-mono text-stone-300">
                {isPlayingAudio ? '01:42 / 04:15' : '04:15'}
              </span>
            </div>

            {/* Fake scrubber bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div
                className={`bg-sage-400 h-full rounded-full transition-all ${
                  isPlayingAudio ? 'w-2/5 animate-pulse' : 'w-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setIsNoteModalOpen(true)}
          className="p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 hover:border-sage-500/50 hover:shadow-sm text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <PenSquare className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">Nova Anotação</h4>
          <p className="text-[11px] text-stone-400">Registre estudos e cultos</p>
        </button>

        <button
          onClick={() => setIsPrayerModalOpen(true)}
          className="p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 hover:border-rose-500/50 hover:shadow-sm text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">Novo Pedido</h4>
          <p className="text-[11px] text-stone-400">Mural de orações e clamores</p>
        </button>

        <button
          onClick={() => setReadingLocation('sl', 23)}
          className="p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 hover:border-amber-500/50 hover:shadow-sm text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">Leitor Bíblico</h4>
          <p className="text-[11px] text-stone-400">Salmos 23 (Recente)</p>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className="p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 hover:border-emerald-500/50 hover:shadow-sm text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Milestone className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">Explorar Planos</h4>
          <p className="text-[11px] text-stone-400">Trilhas de leitura bíblica</p>
        </button>
      </div>

      {/* 5. Recent Study Notes Spotlight */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Anotações Recentes do Caderno
            </h3>
            <p className="text-xs text-stone-400">Seus últimos insights e anotações devocionais</p>
          </div>
          <button
            onClick={() => setActiveTab('notebook')}
            className="text-xs font-semibold text-sage-600 dark:text-sage-400 hover:text-sage-700 flex items-center gap-1"
          >
            <span>Ver todas ({notes.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.slice(0, 2).map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveTab('notebook')}
              className="p-5 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {note.tag}
                  </span>
                  {note.scriptureReference && (
                    <span className="text-xs font-medium text-sage-600 dark:text-sage-400">
                      {note.scriptureReference}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
                  {note.title}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 dark:border-stone-800/80 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {note.createdAt}
                </span>
                <span className="text-sage-600 dark:text-sage-400 font-medium">Abrir anotação →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <NoteModal isOpen={isNoteModalOpen} onClose={() => setIsNoteModalOpen(false)} />
      <PrayerModal isOpen={isPrayerModalOpen} onClose={() => setIsPrayerModalOpen(false)} />
    </div>
  );
};
