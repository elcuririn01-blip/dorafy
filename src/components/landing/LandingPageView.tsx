import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Sparkles,
  Flame,
  CheckCircle2,
  Headphones,
  FileText,
  HeartHandshake,
  ArrowRight,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Smartphone,
  Zap,
  Check,
  X,
  Play,
  Quote,
  Clock,
  Layers,
  Award,
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { setViewMode, isDarkMode, toggleDarkMode, fireConfetti, setIsProModalOpen } = useApp();

  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [activePreviewTab, setActivePreviewTab] = useState<'reader' | 'plans' | 'notes' | 'prayers'>('reader');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleStartApp = () => {
    fireConfetti();
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPro = () => {
    setViewMode('app');
    setIsProModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'A leitura bíblica é realmente 100% gratuita no Dorafy?',
      a: 'Sim! Nosso compromisso inegociável é que qualquer pessoa possa ler as Sagradas Escrituras em qualquer momento, de forma limpa, sem anúncios intrusivos e sem interrupções.',
    },
    {
      q: 'O Dorafy funciona bem no celular e tablet?',
      a: 'Sim, perfeitamente. O Dorafy foi desenvolvido com uma arquitetura Mobile-First refinada. Você pode instalá-lo como aplicativo web (PWA) no seu iPhone ou Android e terá uma experiência nativa ultrarrápida.',
    },
    {
      q: 'O que está incluído no Dorafy Pro?',
      a: 'O plano Pro desbloqueia áudio dramatizado com trilha sonora orquestrada para toda a Bíblia, comentários teológicos históricos, notas ilimitadas na nuvem, temas editoriais exclusivos e sincronização instantânea em múltiplos dispositivos.',
    },
    {
      q: 'Posso cancelar a assinatura do Dorafy Pro a qualquer momento?',
      a: 'Sim, com apenas um clique e sem nenhuma complicação ou burocracia. Além disso, oferecemos 14 dias de garantia incondicional: se não gostar, devolvemos 100% do seu investimento.',
    },
    {
      q: 'Minhas anotações e pedidos de oração são privados?',
      a: 'Absolutamente. Todas as suas anotações pessoais, reflexões íntimas e motivos de oração são criptografados e visíveis exclusivamente para você.',
    },
  ];

  const testimonials = [
    {
      name: 'Pr. Marcelo Viana',
      role: 'Pastor & Escritor • São Paulo, SP',
      text: 'O Dorafy resgatou o prazer de meditar na Palavra sem aquela poluição de banners e propagandas que os outros apps colocam. É de longe a ferramenta mais elegante que já usei.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
    {
      name: 'Camila Rocha',
      role: 'Designer & Líder de Jovens • Curitiba, PR',
      text: 'A experiência de tipografia serifada com marca-texto em verde sálvia é uma obra de arte. Faço minhas notas de domingo no Dorafy e consigo revisitar tudo com as passagens já linkadas.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
    {
      name: 'Lucas Mendonça',
      role: 'Estudante de Teologia • Belo Horizonte, MG',
      text: 'O mural de orações mudou a minha vida devocional. Ver a lista de orações respondidas e reler os testemunhos me fortalece nos dias difíceis. Indico para toda a minha igreja!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121413] text-stone-800 dark:text-stone-200 font-sans selection:bg-sage-200 selection:text-sage-900 dark:selection:bg-sage-900/60 dark:selection:text-sage-100 transition-colors">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FAF9F6]/85 dark:bg-[#121413]/85 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={handleStartApp}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-sage-600 dark:bg-sage-600 flex items-center justify-center text-white shadow-sm shadow-sage-600/25 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                Dorafy
                <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded-full bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400 border border-sage-200 dark:border-sage-800">
                  Devocional
                </span>
              </span>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-stone-600 dark:text-stone-400">
            <a href="#recursos" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Recursos
            </a>
            <a href="#demonstracao" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Como Funciona
            </a>
            <a href="#comparativo" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Diferenciais
            </a>
            <a href="#depoimentos" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Depoimentos
            </a>
            <a href="#precos" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              Preços (Pro)
            </a>
            <a href="#faq" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              FAQ
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label="Alternar modo escuro"
              className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={handleStartApp}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Acessar App
            </button>

            <button
              onClick={handleStartApp}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-sage-600 text-white hover:bg-sage-700 transition-all flex items-center gap-1.5 shadow-sm shadow-sage-600/25 group"
            >
              <span>Começar Grátis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sage-400/10 dark:bg-sage-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Announcement Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-100/80 dark:bg-sage-950/80 border border-sage-200 dark:border-sage-800/80 text-sage-800 dark:text-sage-300 text-xs font-medium animate-fade-in shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Dorafy 2.0 • A plataforma devocional mais limpa e moderna</span>
            <span className="text-sage-400 dark:text-sage-600">→</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15] max-w-3xl mx-auto">
            A Palavra de Deus no centro da sua rotina, com a{' '}
            <span className="italic text-sage-700 dark:text-sage-400 underline decoration-sage-300 dark:decoration-sage-700/60 decoration-wavy decoration-1 underline-offset-4">
              pureza e calma
            </span>{' '}
            que sua fé merece.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Sem anúncios barulhentos, sem poluição visual e sem cobrança culposa. O Dorafy une um leitor bíblico impecável, planos guiados, caderno de cultos e mural de orações em uma experiência inspirada no Notion e no Spotify.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartApp}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-semibold bg-sage-600 text-white hover:bg-sage-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-sage-600/30 group"
            >
              <Sparkles className="w-4 h-4" />
              <span>Começar Minha Jornada Grátis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#demonstracao"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-[#1A1D1B] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Ver Demonstração Interativa</span>
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-stone-700 dark:text-stone-300">4.9 / 5.0</span>
              <span>em avaliações</span>
            </div>

            <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>

            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
              <span>100% Livre de Anúncios</span>
            </div>

            <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>

            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>+25.000 devocionais diários</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PRODUCT SHOWCASE (LIVE PREVIEW SECTION) */}
      <section id="demonstracao" className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
            Interface Feita para o Foco
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Projetado para respirar paz e profundidade
          </h2>
        </div>

        {/* Browser Mockup Window */}
        <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800/90 bg-white dark:bg-[#1A1D1B] shadow-2xl overflow-hidden">
          {/* Mockup Window Chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-[#141715]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="text-[11px] text-stone-400 font-mono ml-2">dorafy.app</span>
            </div>

            {/* Interactive Preview Tabs */}
            <div className="flex items-center gap-1 bg-white dark:bg-[#1A1D1B] p-1 rounded-xl border border-stone-200/80 dark:border-stone-700/80 text-[11px] font-semibold">
              <button
                onClick={() => setActivePreviewTab('reader')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activePreviewTab === 'reader'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                📖 Leitor Bíblico
              </button>
              <button
                onClick={() => setActivePreviewTab('plans')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activePreviewTab === 'plans'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                🌱 Planos & Trilhas
              </button>
              <button
                onClick={() => setActivePreviewTab('notes')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activePreviewTab === 'notes'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                ✍️ Caderno de Culto
              </button>
              <button
                onClick={() => setActivePreviewTab('prayers')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activePreviewTab === 'prayers'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                🙏 Mural de Oração
              </button>
            </div>

            <button
              onClick={handleStartApp}
              className="text-xs font-semibold text-sage-600 dark:text-sage-400 hover:underline flex items-center gap-1"
            >
              <span>Abrir App</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mockup Canvas Screen */}
          <div className="p-6 sm:p-8 bg-[#FAF9F6] dark:bg-[#121413] min-h-[380px] flex items-center justify-center">
            {/* 1. Reader Preview */}
            {activePreviewTab === 'reader' && (
              <div className="w-full max-w-2xl bg-white dark:bg-[#1A1D1B] p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm animate-fade-in space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      Salmos 23 • Nova Versão Internacional
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                      Marca-texto Ativo
                    </span>
                    <span className="font-mono text-stone-400">19px</span>
                  </div>
                </div>

                <div className="font-serif text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200 space-y-3">
                  <p className="bg-emerald-100/80 dark:bg-emerald-950/60 p-2 rounded-lg text-emerald-950 dark:text-emerald-100">
                    <sup className="font-sans font-bold text-xs text-sage-700 mr-2">1</sup>
                    O Senhor é o meu pastor; de nada terei falta.
                  </p>
                  <p>
                    <sup className="font-sans font-bold text-xs text-sage-700 mr-2">2</sup>
                    Em verdes pastagens me faz repousar e me conduz a águas tranquilas;
                  </p>
                  <p className="bg-amber-100/80 dark:bg-amber-950/60 p-2 rounded-lg text-amber-950 dark:text-amber-100">
                    <sup className="font-sans font-bold text-xs text-sage-700 mr-2">3</sup>
                    restaura-me o vigor. Guia-me pelas veredas da justiça por amor do seu nome.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-400">
                  <span>Toque em qualquer versículo para marcar ou anotar</span>
                  <span className="text-sage-600 font-semibold">Distraction-Free Mode ✓</span>
                </div>
              </div>
            )}

            {/* 2. Plans Preview */}
            {activePreviewTab === 'plans' && (
              <div className="w-full max-w-2xl bg-white dark:bg-[#1A1D1B] p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm animate-fade-in space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-600">
                      Plano em Andamento
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                      Evangelhos em 30 Dias (Dia 12: João 15)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-lg">
                    40% Concluído
                  </span>
                </div>

                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-sage-600 h-full w-2/5 rounded-full" />
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-[#151816] border border-stone-100 dark:border-stone-800 text-xs">
                  <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
                    Reflexão de Hoje: A Videira Verdadeira
                  </span>
                  <p className="text-stone-500 leading-relaxed italic">
                    "Permanecer em Cristo não é um esforço mecânico, mas um descanso diário no amor dAquele que deu a vida por seus amigos."
                  </p>
                </div>

                <button
                  onClick={handleStartApp}
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-sage-600 text-white flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Concluir Leitura do Dia</span>
                </button>
              </div>
            )}

            {/* 3. Notes Preview */}
            {activePreviewTab === 'notes' && (
              <div className="w-full max-w-2xl bg-white dark:bg-[#1A1D1B] p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm animate-fade-in space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    Notas de Culto de Domingo
                  </span>
                  <span className="text-xs font-semibold text-sage-600">Filipenses 4:6-7</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  A Paz que Guarda a Mente como Fortaleza
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  O pastor destacou que a palavra grega para "guardará" (frouresei) é um termo militar da guarda pretoriana: significa colocar uma sentinela de soldados ao redor de uma fortaleza. Quando oramos com ações de graças, a paz de Deus assume a vigília dos nossos pensamentos.
                </p>

                <div className="flex items-center justify-between pt-2 text-[11px] text-stone-400">
                  <span>Criado em 9 de Outubro • Fixado no topo 📌</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Sincronizado na Nuvem</span>
                </div>
              </div>
            )}

            {/* 4. Prayers Preview */}
            {activePreviewTab === 'prayers' && (
              <div className="w-full max-w-2xl bg-white dark:bg-[#1A1D1B] p-6 sm:p-8 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm animate-fade-in space-y-3">
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Oração Respondida! 🙌
                    </span>
                    <span className="text-[11px] text-stone-400">Orou 45 vezes</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Aprovação no concurso e nova direção profissional
                  </h4>
                  <p className="text-xs italic text-stone-600 dark:text-stone-300 mt-1">
                    "Deus abriu uma porta sobrenatural onde não havia saída. A fidelidade dEle não tem fim!"
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151816] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-stone-400 uppercase">Família</span>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Restauração da saúde da minha mãe
                    </h4>
                  </div>
                  <button
                    onClick={handleStartApp}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 flex items-center gap-1"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Orar Hoje</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. BENTO BOX DE RECURSOS (BENEFÍCIOS ÚNICOS) */}
      <section id="recursos" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
            A Experiência Completa
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Cada detalhe pensado para aprofundar seu relacionamento com Deus
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
            Ferramentas modernas que respeitam seu silêncio interior e incentivam a disciplina diária.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento 1: Leitor Editorial (Col 8) */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                Leitor Bíblico Livre de Ruídos
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl">
                Alterne entre fontes serifadas e sem serifa, regule o tamanho exato da tipografia e use marca-texto colorido em 4 tons suaves (Amarelo Sol, Verde Sálvia, Rosa Suave e Azul Céu). Salve e compare versões como NVI, ARA e NVT com 1 clique.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage-600" />
                Zero Anúncios
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage-600" />
                Marcação Colorida
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage-600" />
                Atalhos Rápidos (⌘K)
              </span>
            </div>
          </div>

          {/* Bento 2: Áudio Dramatizado (Col 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-stone-900 text-white shadow-soft flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Headphones className="w-32 h-32" />
            </div>
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-sage-300 flex items-center justify-center mb-4">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Áudio Devocional & Bíblia Narrada
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Comece o dia ouvindo meditações guiadas de 4 minutos ou passagens bíblicas narradas com paisagens sonoras relaxantes.
              </p>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-white" />
                Pastor Lucas Mendonça
              </span>
              <span className="text-stone-400">04:15</span>
            </div>
          </div>

          {/* Bento 3: Caderno de Culto & Estudos (Col 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                Caderno de Estudos Inteligente
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Nunca mais anote sermões em papéis soltos ou blocos desorganizados. Marque categorias (Culto, Estudo Pessoal, Teologia) e acesse suas notas de qualquer lugar.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs text-stone-400">
              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold">
                Tags
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold">
                Fixar no Topo
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold">
                Exportar JSON
              </span>
            </div>
          </div>

          {/* Bento 4: Mural de Orações (Col 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                Mural de Orações & Respostas
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Apresente seus clamores por Família, Saúde e Trabalho. Quando Deus responder, marque o pedido e registre um testemunho para lembrar da fidelidade do Senhor.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Respostas Registradas
              </span>
              <span>Botão "Orar Hoje"</span>
            </div>
          </div>

          {/* Bento 5: Constância & Hábito (Col 4) */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5 fill-amber-500" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                Constância & Streak Sem Culpa
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Mantenha a chama da oração acesa todos os dias. Acompanhe sua frequência semanal e celebre cada dia concluído com alegria e graça.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-600 dark:text-amber-400">🔥 14 Dias Seguidos</span>
              <span className="text-stone-400">Meta: 20 min/dia</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARATIVO (POR QUE O DORAFY É DIFERENTE) */}
      <section id="comparativo" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
            Comparativo Transparente
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Por que o Dorafy é uma experiência superior?
          </h2>
        </div>

        <div className="rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#1A1D1B] shadow-soft overflow-hidden">
          <div className="grid grid-cols-12 p-4 sm:p-6 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-[#141715] font-semibold text-xs text-stone-500">
            <div className="col-span-6 sm:col-span-6">Critério</div>
            <div className="col-span-3 sm:col-span-3 text-center text-stone-400">Apps Comuns</div>
            <div className="col-span-3 sm:col-span-3 text-center text-sage-700 dark:text-sage-400 font-bold">
              Dorafy
            </div>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
            {[
              {
                crit: 'Anúncios, vídeos e banners intrusivos',
                old: '❌ Cheio de popups e anúncios',
                dora: '✅ 100% Zero anúncios',
              },
              {
                crit: 'Design & Visual',
                old: '❌ Datado, poluído e cansativo',
                dora: '✅ Minimalista, Notion/Spotify',
              },
              {
                crit: 'Caderno de estudos integrado',
                old: '❌ Inexistente ou confuso',
                dora: '✅ Completo com tags e versículos',
              },
              {
                crit: 'Mural de orações com testemunhos',
                old: '❌ Sem acompanhamento',
                dora: '✅ Interativo com registro de respostas',
              },
              {
                crit: 'Tipografia com marca-texto colorido',
                old: '❌ Limitado e sem contraste',
                dora: '✅ 4 cores, fontes serifadas e sans',
              },
              {
                crit: 'Áudio narrado com trilha sonora',
                old: '❌ Voz mecânica e robótica',
                dora: '✅ Narração humana e devocional guiado',
              },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-12 p-4 sm:p-5 items-center">
                <div className="col-span-6 sm:col-span-6 font-medium text-stone-800 dark:text-stone-200">
                  {row.crit}
                </div>
                <div className="col-span-3 sm:col-span-3 text-center text-stone-400">{row.old}</div>
                <div className="col-span-3 sm:col-span-3 text-center font-semibold text-sage-700 dark:text-sage-300">
                  {row.dora}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTEMUNHOS & PROVA SOCIAL */}
      <section id="depoimentos" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
            Histórias Reais
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Amado por cristãos, pastores e líderes em todo o país
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{t.name}</h4>
                  <span className="text-[10px] text-stone-400 block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PREÇOS & PLANOS (DORAFY PRO) */}
      <section id="precos" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
            Transparência & Liberdade
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Escolha o plano ideal para a sua caminhada
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
            Comece 100% de graça ou desbloqueie o poder ilimitado do Dorafy Pro.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center p-1 bg-stone-100 dark:bg-[#1A1D1B] rounded-2xl border border-stone-200/80 dark:border-stone-800">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                Anual (Economize 35%) 🔥
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                Mensal
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
          {/* Card 1: Grátis */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-soft flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Plano Essencial
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                Dorafy Gratuito
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Tudo o que você precisa para ler e estudar as Escrituras diariamente.
              </p>

              <div className="my-6">
                <span className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  R$ 0
                </span>
                <span className="text-xs text-stone-400 ml-1.5">para sempre</span>
              </div>

              <ul className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Leitor Bíblico completo (NVI, ARA, NVT)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Marcação de versículos com 4 cores</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Planos de leitura bíblica fundamentais</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Caderno de estudos (até 30 notas)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>Mural de orações básico</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartApp}
              className="w-full mt-8 py-3 rounded-2xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
            >
              Acessar Plano Gratuito
            </button>
          </div>

          {/* Card 2: Dorafy Pro (Destaque) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white via-white to-sage-50/50 dark:from-[#1A1D1B] dark:via-[#1A1D1B] dark:to-sage-950/20 border-2 border-sage-500 shadow-xl flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-sage-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Mais Escolhido • Experiência Completa
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 dark:text-sage-400">
                Membro Pro
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-2">
                Dorafy Pro
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Para quem deseja aprofundar teologia, ouvir narrações e sincronizar na nuvem.
              </p>

              <div className="my-6">
                {billingCycle === 'annual' ? (
                  <div>
                    <span className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                      R$ 9,90
                    </span>
                    <span className="text-xs text-stone-400 ml-1.5">/ mês</span>
                    <p className="text-[11px] text-sage-700 dark:text-sage-400 font-semibold mt-1">
                      Faturado R$ 118,80 anualmente (Economia de R$ 60/ano)
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                      R$ 14,90
                    </span>
                    <span className="text-xs text-stone-400 ml-1.5">/ mês</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0 font-bold" />
                  <span className="font-semibold">Tudo do Plano Gratuito +</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0 font-bold" />
                  <span><strong>Áudio Dramatizado Ilimitado</strong> com trilha musical</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0 font-bold" />
                  <span>Comentários históricos e notas teológicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0 font-bold" />
                  <span>Caderno de estudos e orações <strong>ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0 font-bold" />
                  <span>Sincronização em nuvem e backup automático</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage-600 shrink-0 font-bold" />
                  <span>Fontes editoriais premium e temas exclusivos</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleOpenPro}
              className="w-full mt-8 py-3.5 rounded-2xl text-xs font-semibold bg-sage-600 hover:bg-sage-700 text-white transition-all shadow-md shadow-sage-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Assinar Dorafy Pro (14 Dias Grátis)</span>
            </button>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-8 text-center text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-sage-600" />
          <span>Garantia incondicional de 14 dias • Cancele quando quiser com 1 clique</span>
        </div>
      </section>

      {/* 8. PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-20 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-600 dark:text-sage-400">
            Dúvidas Frequentes
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Tudo o que você precisa saber sobre o Dorafy
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#1A1D1B] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL HEROIC CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-stone-900 via-stone-800 to-sage-950 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Sparkles className="w-64 h-64" />
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>Sua comunhão diária começa agora</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Dê o primeiro passo para uma vida devocional com paz e constância.
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Junte-se a milhares de cristãos que redescobriram o silêncio, o estudo profundo e a oração através do Dorafy.
            </p>

            <button
              onClick={handleStartApp}
              className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-semibold bg-sage-500 hover:bg-sage-400 text-white transition-all shadow-lg shadow-sage-500/30 inline-flex items-center gap-2 group"
            >
              <span>Começar a Usar Gratuitamente</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="border-t border-stone-200/60 dark:border-stone-800/60 bg-stone-50 dark:bg-[#141715] py-12 px-4 sm:px-6 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sage-600 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Dorafy
            </span>
            <span className="text-stone-400 ml-2">© {new Date().getFullYear()} Dorafy Inc.</span>
          </div>

          <p className="font-serif italic text-stone-600 dark:text-stone-400 text-[11px] max-w-sm">
            "Lâmpada para os meus pés é a tua palavra e luz, para o meu caminho." — Salmos 119:105
          </p>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={handleStartApp} className="hover:text-stone-900 dark:hover:text-stone-100">
              Entrar no App
            </button>
            <a href="#precos" className="hover:text-stone-900 dark:hover:text-stone-100">
              Planos Pro
            </a>
            <a href="#faq" className="hover:text-stone-900 dark:hover:text-stone-100">
              Ajuda & FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
