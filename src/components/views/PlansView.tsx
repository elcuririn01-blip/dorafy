import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReadingPlan } from '../../types';
import {
  Milestone,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Flame,
  Search,
  Filter,
} from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

export const PlansView: React.FC = () => {
  const { plans, toggleDayCompletion, startPlan, setReadingLocation, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<ReadingPlan | null>(null);

  const categories = ['Todos', 'Evangelhos', 'Ansiedade & Paz', 'Sabedoria', 'Fundamentos'];

  const filteredPlans = plans.filter((p) => {
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activePlans = filteredPlans.filter((p) => p.isActive);
  const catalogPlans = filteredPlans.filter((p) => !p.isActive);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* 1. Header & Search Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-sage-600 dark:text-sage-400">
            Crescimento Espiritual
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-0.5">
            Planos & Trilhas Devocionais
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Escolha uma jornada temática guiada por passagens bíblicas e reflexões diárias.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar planos de leitura..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1D1B] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-sage-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#1A1D1B] border border-stone-200/90 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. Active Plans (Em Andamento) */}
      {activePlans.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Planos Ativos na Trilha ({activePlans.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activePlans.map((plan) => {
              const percent = Math.round((plan.daysCompleted / plan.durationDays) * 100);
              const nextDay = plan.days.find((d) => !d.completed) || plan.days[0];

              return (
                <div
                  key={plan.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sage-50 dark:bg-sage-950/60 text-sage-700 dark:text-sage-400 border border-sage-200/60 dark:border-sage-800/60">
                        {plan.category}
                      </span>
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {percent}% concluído
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
                      {plan.subtitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-4">
                      <div
                        className="bg-sage-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Today's Reading Box */}
                    {nextDay && (
                      <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#151816] border border-stone-100 dark:border-stone-800 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400 flex items-center justify-center font-bold text-xs shrink-0">
                            {nextDay.day}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                              {nextDay.title}
                            </h4>
                            <span className="text-[11px] text-sage-700 dark:text-sage-400 font-medium">
                              {nextDay.passage}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleDayCompletion(plan.id, nextDay.day)}
                            className={`p-2 rounded-xl transition-all ${
                              nextDay.completed
                                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                                : 'text-stone-400 hover:text-emerald-600 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                            }`}
                            title={nextDay.completed ? 'Marcar como não lido' : 'Concluir leitura'}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800/80">
                    <span className="text-xs text-stone-400">
                      Dia {plan.daysCompleted} de {plan.durationDays}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPlanDetail(plan)}
                        className="px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
                      >
                        Ver Cronograma
                      </button>

                      {nextDay && (
                        <button
                          onClick={() => setReadingLocation(nextDay.bookId, nextDay.chapter)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sage-600 text-white hover:bg-sage-700 transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Ler Agora</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Catalog / Explore Plans */}
      <section className="space-y-4 pt-2">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Descubra Novos Planos
        </h2>

        {catalogPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {catalogPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 overflow-hidden shadow-soft flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-all group"
              >
                {/* Visual Banner */}
                <div
                  className={`h-24 bg-gradient-to-r ${plan.coverGradient} p-4 flex flex-col justify-between text-white`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md w-max">
                    {plan.durationDays} Dias
                  </span>
                  <Milestone className="w-6 h-6 text-white/80" />
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-sage-600 dark:text-sage-400 uppercase tracking-wider">
                      {plan.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5 mb-1.5 group-hover:text-sage-600 transition-colors">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed mb-4">
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">{plan.author}</span>
                    <button
                      onClick={() => startPlan(plan.id)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 transition-opacity"
                    >
                      Iniciar Trilha
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activePlans.length === 0 ? (
          <EmptyState
            icon={Milestone}
            title="Nenhum plano encontrado"
            description="Não encontramos planos de leitura correspondentes aos seus filtros de busca."
            actionText="Limpar filtros"
            onAction={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
            }}
          />
        ) : null}
      </section>

      {/* Plan Timeline Modal */}
      {selectedPlanDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white dark:bg-[#1A1D1B] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-[#151816]">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
                  Cronograma da Trilha
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {selectedPlanDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanDetail(null)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Timeline list */}
            <div className="p-6 overflow-y-auto space-y-3">
              {selectedPlanDetail.days.map((day) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    day.completed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-stone-50 dark:bg-[#151816] border-stone-100 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleDayCompletion(selectedPlanDetail.id, day.day)}
                      className={`mt-0.5 transition-colors ${
                        day.completed ? 'text-emerald-600' : 'text-stone-300 hover:text-emerald-600'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          Dia {day.day}: {day.title}
                        </span>
                        <span className="text-[11px] font-semibold text-sage-600 dark:text-sage-400">
                          {day.passage}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                        {day.devotionalText}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setReadingLocation(day.bookId, day.chapter);
                      setSelectedPlanDetail(null);
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-700 dark:text-stone-200 transition-colors"
                  >
                    Ler
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
