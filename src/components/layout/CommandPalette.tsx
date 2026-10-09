import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BIBLE_BOOKS } from '../../data/mockBible';
import {
  Search,
  BookOpen,
  FileText,
  HeartHandshake,
  Milestone,
  Home,
  User,
  X,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';
import { TabType } from '../../types';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveTab,
    setReadingLocation,
    notes,
    prayers,
    plans,
    isDarkMode,
    toggleDarkMode,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  // Filter items
  const filteredBooks = useMemo(() => {
    if (!query.trim()) return BIBLE_BOOKS.slice(0, 5);
    return BIBLE_BOOKS.filter((b) =>
      b.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  const filteredNotes = useMemo(() => {
    if (!query.trim()) return notes.slice(0, 3);
    return notes.filter((n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 4);
  }, [query, notes]);

  const filteredPrayers = useMemo(() => {
    if (!query.trim()) return prayers.slice(0, 2);
    return prayers.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3);
  }, [query, prayers]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (tab: TabType) => {
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
  };

  const navigateToChapter = (bookId: string, chapter: number) => {
    setReadingLocation(bookId, chapter);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#1A1D1B] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden text-stone-800 dark:text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-100 dark:border-stone-800/80 gap-3">
          <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar livros da Bíblia, anotações, orações ou ações..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-stone-400 dark:placeholder:text-stone-500 font-sans"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Navigation Pages */}
          {!query && (
            <div>
              <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Navegação Rápida
              </p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <button
                  onClick={() => navigateTo('home')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <Home className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                  <span>Início (Hoje)</span>
                </button>
                <button
                  onClick={() => navigateTo('bible')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Bíblia (Leitor)</span>
                </button>
                <button
                  onClick={() => navigateTo('plans')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <Milestone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Planos de Leitura</span>
                </button>
                <button
                  onClick={() => navigateTo('notebook')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Caderno & Orações</span>
                </button>
              </div>
            </div>
          )}

          {/* Books */}
          {filteredBooks.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Livros da Bíblia
              </p>
              <div className="space-y-0.5 mt-1">
                {filteredBooks.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => navigateToChapter(book.id, 1)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                      <span className="font-medium">{book.name}</span>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                        {book.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 flex items-center gap-1">
                      Ler capítulo 1 <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {filteredNotes.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Anotações do Caderno
              </p>
              <div className="space-y-0.5 mt-1">
                {filteredNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => navigateTo('notebook')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-medium truncate">{note.title}</span>
                      {note.scriptureReference && (
                        <span className="text-[10px] text-sage-600 dark:text-sage-400 shrink-0">
                          {note.scriptureReference}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400 shrink-0">{note.createdAt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prayers */}
          {filteredPrayers.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Pedidos de Oração
              </p>
              <div className="space-y-0.5 mt-1">
                {filteredPrayers.map((prayer) => (
                  <button
                    key={prayer.id}
                    onClick={() => navigateTo('notebook')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
                      <span className="font-medium truncate">{prayer.title}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 shrink-0">{prayer.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Preferências
            </p>
            <button
              onClick={() => {
                toggleDarkMode();
                setIsCommandPaletteOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-stone-600" />
                )}
                <span>Alternar para {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
              </div>
              <span className="text-[11px] text-stone-400">Tema</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#141715] border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 dark:text-stone-500 flex items-center justify-between">
          <span>Dica: Use as setas para navegar e Esc para fechar</span>
          <span className="text-[10px] font-mono bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>
      </div>
    </div>
  );
};
