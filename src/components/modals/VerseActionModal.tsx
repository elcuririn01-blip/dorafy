import React from 'react';
import { useApp } from '../../context/AppContext';
import { BibleVerse, HighlightColor } from '../../types';
import {
  X,
  Copy,
  PenSquare,
  Share2,
  Trash2,
  Check,
  Bookmark,
} from 'lucide-react';

interface VerseActionModalProps {
  verse: BibleVerse | null;
  bookName: string;
  bookId: string;
  chapter: number;
  currentColor: HighlightColor;
  onClose: () => void;
  onOpenNoteWithVerse: (scriptureRef: string, defaultContent: string) => void;
}

export const VerseActionModal: React.FC<VerseActionModalProps> = ({
  verse,
  bookName,
  bookId,
  chapter,
  currentColor,
  onClose,
  onOpenNoteWithVerse,
}) => {
  const { setHighlight, showToast, fireConfetti } = useApp();

  if (!verse) return null;

  const verseRef = `${bookName} ${chapter}:${verse.number}`;

  const colors: { id: HighlightColor; name: string; bgClass: string; dotClass: string }[] = [
    { id: 'yellow', name: 'Amarelo Sol', bgClass: 'bg-amber-100 hover:bg-amber-200 border-amber-300', dotClass: 'bg-amber-400' },
    { id: 'green', name: 'Verde Sálvia', bgClass: 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300', dotClass: 'bg-emerald-500' },
    { id: 'rose', name: 'Rosa Suave', bgClass: 'bg-rose-100 hover:bg-rose-200 border-rose-300', dotClass: 'bg-rose-400' },
    { id: 'blue', name: 'Azul Céu', bgClass: 'bg-sky-100 hover:bg-sky-200 border-sky-300', dotClass: 'bg-sky-400' },
  ];

  const handleCopy = () => {
    const text = `"${verse.text}" — ${verseRef} (Dorafy)`;
    navigator.clipboard?.writeText(text);
    showToast('Versículo copiado com sucesso! 📋');
    onClose();
  };

  const handleShare = () => {
    showToast(`Link de compartilhamento para ${verseRef} gerado!`);
    onClose();
  };

  const handleCreateNote = () => {
    onClose();
    onOpenNoteWithVerse(verseRef, `Reflexão sobre ${verseRef}:\n"${verse.text}"\n\nMinhas anotações: `);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-stone-900/50 dark:bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1A1D1B] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage-500" />
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              {verseRef}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verse preview quote */}
        <div className="my-4 p-3.5 rounded-xl bg-stone-50 dark:bg-[#141715] border border-stone-100 dark:border-stone-800/80">
          <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
            "{verse.text}"
          </p>
        </div>

        {/* Color Highlighter selector */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-2">
            Marcar com cor (Marca-texto)
          </label>
          <div className="flex items-center gap-2">
            {colors.map((c) => {
              const isSelected = currentColor === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setHighlight(bookId, bookName, chapter, verse.number, c.id);
                    onClose();
                  }}
                  className={`flex-1 py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium border transition-all ${c.bgClass} ${
                    isSelected ? 'ring-2 ring-stone-900 dark:ring-stone-100' : ''
                  }`}
                  title={c.name}
                >
                  <span className={`w-3 h-3 rounded-full ${c.dotClass}`} />
                  {isSelected && <Check className="w-3 h-3 text-stone-800" />}
                </button>
              );
            })}

            {currentColor !== 'none' && (
              <button
                onClick={() => {
                  setHighlight(bookId, bookName, chapter, verse.number, 'none');
                  onClose();
                }}
                title="Remover marcação"
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handleCreateNote}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium transition-colors gap-1"
          >
            <PenSquare className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            <span>Anotar</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium transition-colors gap-1"
          >
            <Copy className="w-4 h-4 text-stone-500" />
            <span>Copiar</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium transition-colors gap-1"
          >
            <Share2 className="w-4 h-4 text-stone-500" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
