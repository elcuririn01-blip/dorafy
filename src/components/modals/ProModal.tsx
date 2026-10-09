import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Check, Headphones, BookOpen, Cloud, Palette, Shield } from 'lucide-react';

export const ProModal: React.FC = () => {
  const { isProModalOpen, setIsProModalOpen, userProfile, updateUserProfile, showToast, fireConfetti } = useApp();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  if (!isProModalOpen) return null;

  const handleTogglePro = () => {
    const nextState = !userProfile.isPro;
    updateUserProfile({ isPro: nextState });
    if (nextState) {
      fireConfetti();
      showToast('Parabéns! Sua assinatura Dorafy Pro foi ativada! 🎉');
    } else {
      showToast('Assinatura Dorafy Pro cancelada.');
    }
    setIsProModalOpen(false);
  };

  const proFeatures = [
    {
      icon: Headphones,
      title: 'Áudio Bíblico Dramatizado',
      desc: 'Ouça capítulos inteiros narrados com trilha sonora orquestrada para momentos de paz.',
    },
    {
      icon: BookOpen,
      title: 'Comentários Históricos & Teológicos',
      desc: 'Notas de rodapé, concordância hebraica/grega e contexto cultural de cada passagem.',
    },
    {
      icon: Cloud,
      title: 'Sincronização em Nuvem Ilimitada',
      desc: 'Acesse suas anotações, marcações de versículos e orações em qualquer dispositivo.',
    },
    {
      icon: Palette,
      title: 'Temas & Tipografia Exclusiva',
      desc: 'Fontes editoriais premium (Newsreader, Lora, Cinzel) e paletas em tons terrosos relaxantes.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#1A1D1B] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with gradient */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-stone-900 via-stone-800 to-sage-950 text-white overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-48 h-48" />
          </div>

          <button
            onClick={() => setIsProModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            <span>Dorafy Pro Member</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
            Aprofunde sua comunhão com as Escrituras
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
            Tenha acesso ilimitado a todas as ferramentas devocionais, áudio, comentários e planos avançados.
          </p>
        </div>

        {/* Feature List */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {proFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#151816] border border-stone-100 dark:border-stone-800 flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-0.5">
                      {f.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Billing Switcher */}
          <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-[#151816] border border-stone-200/80 dark:border-stone-800 flex flex-col gap-3">
            <div className="flex items-center justify-center p-1 bg-white dark:bg-stone-800 rounded-xl max-w-xs mx-auto border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Anual (Economize 35%)
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Mensal
              </button>
            </div>

            <div className="text-center">
              {billingCycle === 'annual' ? (
                <div>
                  <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                    R$ 9,90
                  </span>
                  <span className="text-xs text-stone-500"> / mês (faturado R$ 118,80/ano)</span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                    R$ 14,90
                  </span>
                  <span className="text-xs text-stone-500"> / mês</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-[#141715] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <Shield className="w-3.5 h-3.5 text-sage-600" />
            <span>Cancele a qualquer momento</span>
          </div>

          <button
            onClick={handleTogglePro}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-2 ${
              userProfile.isPro
                ? 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                : 'bg-sage-600 hover:bg-sage-700 text-white shadow-sage-600/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{userProfile.isPro ? 'Cancelar Assinatura Pro' : 'Assinar Dorafy Pro Agora'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
