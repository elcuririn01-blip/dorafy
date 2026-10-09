import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyNote, PrayerRequest, PrayerCategory } from '../../types';
import {
  FileText,
  HeartHandshake,
  Plus,
  Search,
  Pin,
  Clock,
  Trash2,
  Edit2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Filter,
  Check,
} from 'lucide-react';
import { NoteModal } from '../modals/NoteModal';
import { PrayerModal } from '../modals/PrayerModal';
import { EmptyState } from '../common/EmptyState';

export const NotebookView: React.FC = () => {
  const {
    notes,
    deleteNote,
    prayers,
    prayFor,
    markPrayerAnswered,
    deletePrayer,
    setReadingLocation,
    showToast,
  } = useApp();

  // Sub-tabs: 'notes' vs 'prayers'
  const [activeSubTab, setActiveSubTab] = useState<'notes' | 'prayers'>('notes');

  // Search & Filter state for Notes
  const [noteSearch, setNoteSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // Search & Filter state for Prayers
  const [prayerSearch, setPrayerSearch] = useState('');
  const [selectedPrayerCategory, setSelectedPrayerCategory] = useState<string>('Todos');
  const [prayerFilterStatus, setPrayerFilterStatus] = useState<'all' | 'active' | 'answered'>('all');
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  // Answering prayer dialog state
  const [answeringPrayer, setAnsweringPrayer] = useState<PrayerRequest | null>(null);
  const [testimonyInput, setTestimonyInput] = useState('');

  const noteTags = ['Todos', 'Culto', 'Estudo Pessoal', 'Devocional', 'Discipulado', 'Teologia'];
  const prayerCategories: (string | 'Todos')[] = [
    'Todos',
    'Família',
    'Saúde',
    'Espiritual',
    'Trabalho',
    'Gratidão',
    'Amigos',
  ];

  // Filter Notes
  const filteredNotes = notes.filter((note) => {
    const matchesTag = selectedTag === 'Todos' || note.tag === selectedTag;
    const matchesSearch =
      note.title.toLowerCase().includes(noteSearch.toLowerCase()) ||
      note.content.toLowerCase().includes(noteSearch.toLowerCase()) ||
      (note.scriptureReference && note.scriptureReference.toLowerCase().includes(noteSearch.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  // Sort pinned notes first
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Filter Prayers
  const filteredPrayers = prayers.filter((prayer) => {
    const matchesCat = selectedPrayerCategory === 'Todos' || prayer.category === selectedPrayerCategory;
    const matchesSearch =
      prayer.title.toLowerCase().includes(prayerSearch.toLowerCase()) ||
      prayer.description.toLowerCase().includes(prayerSearch.toLowerCase());
    const matchesStatus =
      prayerFilterStatus === 'all' ||
      (prayerFilterStatus === 'active' && !prayer.isAnswered) ||
      (prayerFilterStatus === 'answered' && prayer.isAnswered);
    return matchesCat && matchesSearch && matchesStatus;
  });

  const activePrayersCount = prayers.filter((p) => !p.isAnswered).length;
  const answeredPrayersCount = prayers.filter((p) => p.isAnswered).length;

  const handleConfirmAnswered = () => {
    if (!answeringPrayer) return;
    markPrayerAnswered(answeringPrayer.id, testimonyInput.trim() || undefined);
    setAnsweringPrayer(null);
    setTestimonyInput('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* 1. Header & Section Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-sage-600 dark:text-sage-400">
            Registro Pessoal & Clamor
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-0.5">
            Caderno de Estudos & Mural de Orações
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Guarde suas anotações teológicas, insights de cultos e interceda em oração.
          </p>
        </div>

        {/* Primary Sub-Tab Switcher */}
        <div className="flex items-center p-1 bg-stone-100 dark:bg-[#1A1D1B] rounded-2xl border border-stone-200/90 dark:border-stone-800/90 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'notes'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Caderno ({notes.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('prayers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'prayers'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
            <span>Mural de Orações ({prayers.length})</span>
          </button>
        </div>
      </div>

      {/* 2. TAB 1: CADERNO DE ESTUDOS */}
      {activeSubTab === 'notes' && (
        <div className="space-y-6">
          {/* Controls Bar: Search, Tags & New Note Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={noteSearch}
                  onChange={(e) => setNoteSearch(e.target.value)}
                  placeholder="Pesquisar anotações, versículos..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1D1B] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
                />
              </div>

              {/* Tag select filter */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1D1B] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none"
              >
                {noteTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setEditingNote(null);
                setIsNoteModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-sage-600 text-white hover:bg-sage-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-sage-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Anotação</span>
            </button>
          </div>

          {/* Notes Grid */}
          {sortedNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 transition-all shadow-soft flex flex-col justify-between group"
                >
                  <div>
                    {/* Top tags and pin */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        {note.tag}
                      </span>
                      {note.isPinned && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                          <Pin className="w-3 h-3 fill-amber-500" />
                          Fixada
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mb-1.5 leading-snug">
                      {note.title}
                    </h3>

                    {note.scriptureReference && (
                      <button
                        onClick={() => {
                          if (note.bookId && note.chapter) {
                            setReadingLocation(note.bookId, note.chapter);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sage-600 dark:text-sage-400 mb-2.5 hover:underline"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{note.scriptureReference}</span>
                      </button>
                    )}

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line line-clamp-5">
                      {note.content}
                    </p>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/80 text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.createdAt}
                    </span>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingNote(note);
                          setIsNoteModalOpen(true);
                        }}
                        title="Editar anotação"
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        title="Excluir anotação"
                        className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title="Nenhuma anotação encontrada"
              description="Você ainda não registrou anotações com esses critérios. Comece criando um novo resumo bíblico."
              actionText="Criar primeira anotação"
              onAction={() => {
                setEditingNote(null);
                setIsNoteModalOpen(true);
              }}
            />
          )}
        </div>
      )}

      {/* 3. TAB 2: MURAL DE ORAÇÕES */}
      {activeSubTab === 'prayers' && (
        <div className="space-y-6">
          {/* Status summary banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {activePrayersCount}
                </span>
                <p className="text-[11px] text-stone-400">Em Oração Ativa</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200/80 dark:border-stone-800/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {answeredPrayersCount}
                </span>
                <p className="text-[11px] text-stone-400">Orações Respondidas! 🙌</p>
              </div>
            </div>

            <button
              onClick={() => setIsPrayerModalOpen(true)}
              className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white shadow-sm shadow-sage-600/20 flex items-center justify-center gap-2 font-semibold text-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Pedido de Oração</span>
            </button>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={prayerSearch}
                  onChange={(e) => setPrayerSearch(e.target.value)}
                  placeholder="Pesquisar pedidos de oração..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1D1B] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
                />
              </div>

              {/* Status filter: All / Active / Answered */}
              <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-medium">
                <button
                  onClick={() => setPrayerFilterStatus('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    prayerFilterStatus === 'all'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-500'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setPrayerFilterStatus('active')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    prayerFilterStatus === 'active'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-500'
                  }`}
                >
                  Ativas
                </button>
                <button
                  onClick={() => setPrayerFilterStatus('answered')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    prayerFilterStatus === 'answered'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-500'
                  }`}
                >
                  Respondidas
                </button>
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {prayerCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedPrayerCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedPrayerCategory === c
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#1A1D1B] border border-stone-200/90 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Prayers List */}
          {filteredPrayers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPrayers.map((prayer) => (
                <div
                  key={prayer.id}
                  className={`p-5 rounded-3xl border transition-all shadow-soft flex flex-col justify-between ${
                    prayer.isAnswered
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/15 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-white dark:bg-[#1A1D1B] border-stone-200/80 dark:border-stone-800/80'
                  }`}
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        {prayer.category}
                      </span>

                      {prayer.isAnswered ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                          <Check className="w-3 h-3" />
                          Respondida!
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-400">
                          Orou {prayer.timesPrayed} {prayer.timesPrayed === 1 ? 'vez' : 'vezes'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mb-1.5">
                      {prayer.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                      {prayer.description}
                    </p>

                    {/* Testimony card if answered */}
                    {prayer.isAnswered && prayer.testimony && (
                      <div className="p-3 rounded-2xl bg-white/80 dark:bg-[#151816] border border-emerald-200/80 dark:border-emerald-800/60 my-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                          Testemunho de Resposta
                        </span>
                        <p className="text-xs italic text-stone-700 dark:text-stone-300">
                          "{prayer.testimony}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 dark:border-stone-800/80">
                    <span className="text-[11px] text-stone-400">
                      Criado em {prayer.createdAt}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {!prayer.isAnswered && (
                        <>
                          <button
                            onClick={() => prayFor(prayer.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors flex items-center gap-1"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>Orar Hoje</span>
                          </button>

                          <button
                            onClick={() => {
                              setAnsweringPrayer(prayer);
                              setTestimonyInput('');
                            }}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                          >
                            Marcar Respondida
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => deletePrayer(prayer.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Remover pedido"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={HeartHandshake}
              title="Nenhum pedido de oração encontrado"
              description="Não encontramos orações cadastradas com esses filtros. Apresente seus motivos diante do Senhor."
              actionText="Novo pedido de oração"
              onAction={() => setIsPrayerModalOpen(true)}
            />
          )}
        </div>
      )}

      {/* Modals */}
      <NoteModal
        isOpen={isNoteModalOpen}
        initialNote={editingNote}
        onClose={() => {
          setIsNoteModalOpen(false);
          setEditingNote(null);
        }}
      />

      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />

      {/* Answer Prayer Testimony Prompt Dialog */}
      {answeringPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md bg-white dark:bg-[#1A1D1B] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  Oração Respondida!
                </h3>
                <p className="text-xs text-stone-400">
                  Gostaria de registrar um testemunho sobre como Deus agiu?
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
              "{answeringPrayer.title}"
            </p>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1">
                Seu Testemunho (Opcional)
              </label>
              <textarea
                rows={3}
                value={testimonyInput}
                onChange={(e) => setTestimonyInput(e.target.value)}
                placeholder="Ex: Deus abriu uma porta e trouxe paz..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setAnsweringPrayer(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAnswered}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Salvar Resposta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
