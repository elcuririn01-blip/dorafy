import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIBLE_BOOKS } from '../../data/mockBible';
import { BibleBook } from '../../types';
import { X, Search, ChevronRight, BookOpen } from 'lucide-react';

interface BookChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookChapterModal: React.FC<BookChapterModalProps> = ({ isOpen, onClose }) => {
  const { currentBookId, setReadingLocation } = useApp();

  const [selectedBook, setSelectedBook] = useState<BibleBook>(() => {
    return BIBLE_BOOKS.find((b) => b.id === currentBookId) || BIBLE_BOOKS[0];
  });
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredBooks = BIBLE_BOOKS.filter((book) => {
    const matchesFilter = testamentFilter === 'ALL' || book.testament === testamentFilter;
    const matchesQuery = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleSelectChapter = (ch: number) => {
    setReadingLocation(selectedBook.id, ch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#1A1D1B] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Selecionar Livro e Capítulo
              </h2>
              <p className="text-xs text-stone-400">
                Livro atual: <strong className="text-stone-700 dark:text-stone-300">{selectedBook.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Testament filters */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar livro (ex: Salmos, Romanos, João)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl shrink-0">
            {(['ALL', 'AT', 'NT'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTestamentFilter(mode)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  testamentFilter === mode
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
              >
                {mode === 'ALL' ? 'Todos' : mode === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Column: Books list on Left, Chapter Grid on Right */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-stone-100 dark:divide-stone-800">
          {/* Books List (col-span-5) */}
          <div className="md:col-span-5 max-h-56 md:max-h-full overflow-y-auto p-2 space-y-1">
            {filteredBooks.map((book) => {
              const isSelected = selectedBook.id === book.id;
              return (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-sage-600 text-white font-medium shadow-xs'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{book.name}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-sage-100' : 'text-stone-400 dark:text-stone-500'
                      }`}
                    >
                      {book.category} • {book.chaptersCount} cap.
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isSelected ? 'text-white' : 'text-stone-300 dark:text-stone-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Chapters Grid (col-span-7) */}
          <div className="md:col-span-7 flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Capítulos de {selectedBook.name}
              </span>
              <span className="text-[11px] text-stone-400">
                {selectedBook.chaptersCount} disponíveis
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2">
              {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map((ch) => (
                <button
                  key={ch}
                  onClick={() => handleSelectChapter(ch)}
                  className="h-10 rounded-xl flex items-center justify-center text-xs font-semibold border border-stone-200 dark:border-stone-700/80 hover:border-sage-500 hover:bg-sage-50 hover:text-sage-700 dark:hover:bg-sage-950/60 dark:hover:text-sage-300 transition-all text-stone-700 dark:text-stone-300"
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
