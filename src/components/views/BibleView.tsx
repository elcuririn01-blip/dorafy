import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getChapterData } from '../../data/mockBible';
import { BibleVerse, BibleVersion, HighlightColor } from '../../types';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Type,
  Headphones,
  Settings2,
  Bookmark,
  Share2,
  Copy,
  PenSquare,
  Sparkles,
  Volume2,
  Pause,
  Play,
} from 'lucide-react';
import { BookChapterModal } from '../modals/BookChapterModal';
import { VerseActionModal } from '../modals/VerseActionModal';
import { NoteModal } from '../modals/NoteModal';

export const BibleView: React.FC = () => {
  const {
    currentBookId,
    currentChapter,
    setReadingLocation,
    currentVersion,
    setCurrentVersion,
    readerFontSize,
    setReaderFontSize,
    readerFontFamily,
    setReaderFontFamily,
    highlightedVerses,
    showToast,
  } = useApp();

  // Modals state
  const [isBookPickerOpen, setIsBookPickerOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteDefaultRef, setNoteDefaultRef] = useState('');
  const [noteDefaultContent, setNoteDefaultContent] = useState('');

  // Reader Audio Narration bar
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  const chapterData = getChapterData(currentBookId, currentChapter);

  const versions: BibleVersion[] = ['NVI', 'ARA', 'NVT', 'NAA'];

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setReadingLocation(currentBookId, currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < chapterData.totalChapters) {
      setReadingLocation(currentBookId, currentChapter + 1);
    }
  };

  const handleOpenNoteForVerse = (ref: string, content: string) => {
    setNoteDefaultRef(ref);
    setNoteDefaultContent(content);
    setIsNoteModalOpen(true);
  };

  // Get color for verse
  const getVerseHighlight = (verseNum: number): HighlightColor => {
    const id = `${currentBookId}-${currentChapter}-${verseNum}`;
    const found = highlightedVerses.find((item) => item.id === id);
    return found ? found.color : 'none';
  };

  const highlightClasses: Record<HighlightColor, string> = {
    yellow: 'bg-amber-100/80 dark:bg-amber-950/50 rounded px-1 -mx-1 text-stone-900 dark:text-amber-100',
    green: 'bg-emerald-100/80 dark:bg-emerald-950/50 rounded px-1 -mx-1 text-stone-900 dark:text-emerald-100',
    rose: 'bg-rose-100/80 dark:bg-rose-950/50 rounded px-1 -mx-1 text-stone-900 dark:text-rose-100',
    blue: 'bg-sky-100/80 dark:bg-sky-950/50 rounded px-1 -mx-1 text-stone-900 dark:text-sky-100',
    none: '',
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
      {/* 1. Reader Navigation & Controls Bar */}
      <div className="sticky top-16 z-10 bg-[#FAF9F6]/95 dark:bg-[#121413]/95 backdrop-blur-md py-3 border-b border-stone-200/60 dark:border-stone-800/60 mb-6 flex items-center justify-between gap-2">
        {/* Book & Chapter selector */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsBookPickerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1D1B] border border-stone-200/90 dark:border-stone-800/90 hover:border-stone-300 dark:hover:border-stone-700 shadow-xs transition-all group"
          >
            <BookOpen className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400 group-hover:scale-105 transition-transform" />
            <span className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              {chapterData.bookName} {chapterData.chapter}
            </span>
            <span className="text-[10px] text-stone-400">▼</span>
          </button>

          {/* Stepper buttons */}
          <div className="flex items-center rounded-xl border border-stone-200/90 dark:border-stone-800/90 bg-white dark:bg-[#1A1D1B] p-0.5 shadow-xs">
            <button
              onClick={handlePrevChapter}
              disabled={currentChapter <= 1}
              title="Capítulo anterior"
              className="p-1 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextChapter}
              disabled={currentChapter >= chapterData.totalChapters}
              title="Próximo capítulo"
              className="p-1 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Translation and Reader Controls */}
        <div className="flex items-center gap-1.5">
          {/* Translation selector */}
          <select
            value={currentVersion}
            onChange={(e) => setCurrentVersion(e.target.value as BibleVersion)}
            className="px-2 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#1A1D1B] border border-stone-200/90 dark:border-stone-800/90 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-sage-500"
          >
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          {/* Audio narration trigger */}
          <button
            onClick={() => {
              setIsPlayingAudio(!isPlayingAudio);
              showToast(isPlayingAudio ? 'Áudio pausado' : `Reproduzindo narração de ${chapterData.bookName} ${chapterData.chapter}...`);
            }}
            title={isPlayingAudio ? 'Pausar áudio' : 'Ouvir áudio do capítulo'}
            className={`p-2 rounded-xl border transition-all ${
              isPlayingAudio
                ? 'bg-sage-600 text-white border-sage-600'
                : 'bg-white dark:bg-[#1A1D1B] border-stone-200/90 dark:border-stone-800/90 text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            <Headphones className="w-4 h-4" />
          </button>

          {/* Settings Drawer (Font Size & Serif/Sans) */}
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            title="Ajustar tipografia e tamanho"
            className={`p-2 rounded-xl border transition-all ${
              showSettingsDrawer
                ? 'bg-stone-200 dark:bg-stone-800 border-stone-300 text-stone-900 dark:text-stone-100'
                : 'bg-white dark:bg-[#1A1D1B] border-stone-200/90 dark:border-stone-800/90 text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Floating Reader Typography Panel */}
      {showSettingsDrawer && (
        <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-[#1A1D1B] border border-stone-200 dark:border-stone-800 shadow-md flex flex-wrap items-center justify-between gap-4 animate-fade-in">
          {/* Font Family: Serif vs Sans */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Fonte:</span>
            <div className="flex bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl">
              <button
                onClick={() => setReaderFontFamily('serif')}
                className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                  readerFontFamily === 'serif'
                    ? 'bg-white dark:bg-[#232724] text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                    : 'text-stone-500'
                }`}
              >
                Serifada (Livro)
              </button>
              <button
                onClick={() => setReaderFontFamily('sans')}
                className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                  readerFontFamily === 'sans'
                    ? 'bg-white dark:bg-[#232724] text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                    : 'text-stone-500'
                }`}
              >
                Sem Serifa (Moderna)
              </button>
            </div>
          </div>

          {/* Font Size Steppers */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Tamanho:</span>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl">
              <button
                onClick={() => setReaderFontSize((prev) => Math.max(15, prev - 1))}
                className="px-2.5 py-1 text-xs font-bold hover:bg-white dark:hover:bg-[#232724] rounded-lg text-stone-700 dark:text-stone-300"
              >
                A-
              </button>
              <span className="px-2 text-xs font-mono font-semibold text-stone-800 dark:text-stone-200">
                {readerFontSize}px
              </span>
              <button
                onClick={() => setReaderFontSize((prev) => Math.min(26, prev + 1))}
                className="px-2.5 py-1 text-xs font-bold hover:bg-white dark:hover:bg-[#232724] rounded-lg text-stone-700 dark:text-stone-300"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Audio Narration Active Bar */}
      {isPlayingAudio && (
        <div className="mb-6 p-3.5 rounded-2xl bg-stone-900 text-white flex items-center justify-between shadow-lg animate-slide-up">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center text-white"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <div>
              <div className="text-xs font-semibold flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-sage-400" />
                <span>Narrando {chapterData.bookName} {chapterData.chapter}</span>
              </div>
              <span className="text-[10px] text-stone-400">Voz humana brasileira • Versão {currentVersion}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-stone-300">02:14 / 05:40</span>
            <button
              onClick={() => setIsPlayingAudio(false)}
              className="text-xs text-stone-400 hover:text-white"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* 4. Scripture Content Area */}
      <article className="px-2 sm:px-4">
        {/* Chapter Title & Subtitle */}
        <header className="text-center py-6 border-b border-stone-200/40 dark:border-stone-800/40 mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-sage-600 dark:text-sage-400">
            {chapterData.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1 mb-2 tracking-tight">
            {chapterData.bookName}
          </h2>
          <p className="text-xs text-stone-400 font-sans">
            Capítulo {chapterData.chapter} • {chapterData.verses.length} Versículos • {currentVersion}
          </p>
        </header>

        {/* Verses Container */}
        <div
          className={`space-y-4 leading-loose transition-all selection:bg-sage-200 dark:selection:bg-sage-800 ${
            readerFontFamily === 'serif' ? 'reader-serif' : 'font-sans'
          }`}
          style={{ fontSize: `${readerFontSize}px` }}
        >
          {chapterData.verses.map((verse) => {
            const highlightColor = getVerseHighlight(verse.number);
            const isHighlighted = highlightColor !== 'none';

            return (
              <p
                key={verse.number}
                onClick={() => setSelectedVerse(verse)}
                className={`group relative cursor-pointer py-1 px-2 rounded-xl transition-all duration-150 ${
                  highlightClasses[highlightColor]
                } hover:bg-stone-100/70 dark:hover:bg-stone-800/40`}
              >
                <sup className="text-[11px] font-sans font-bold text-sage-700 dark:text-sage-400 mr-2 select-none">
                  {verse.number}
                </sup>
                <span className="text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-stone-100">
                  {verse.text}
                </span>

                {/* Inline subtle hover indicator */}
                <span className="opacity-0 group-hover:opacity-100 ml-2 inline-flex items-center text-[10px] text-stone-400 font-sans select-none transition-opacity">
                  <Sparkles className="w-3 h-3 text-sage-500 inline mr-0.5" />
                  Marcar
                </span>
              </p>
            );
          })}
        </div>

        {/* Chapter Bottom Navigation */}
        <footer className="mt-12 pt-8 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between">
          <button
            onClick={handlePrevChapter}
            disabled={currentChapter <= 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Capítulo Anterior</span>
          </button>

          <span className="text-xs text-stone-400">
            {chapterData.bookName} {chapterData.chapter} de {chapterData.totalChapters}
          </span>

          <button
            onClick={handleNextChapter}
            disabled={currentChapter >= chapterData.totalChapters}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <span>Próximo Capítulo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </article>

      {/* Modals */}
      <BookChapterModal
        isOpen={isBookPickerOpen}
        onClose={() => setIsBookPickerOpen(false)}
      />

      <VerseActionModal
        verse={selectedVerse}
        bookName={chapterData.bookName}
        bookId={chapterData.bookId}
        chapter={chapterData.chapter}
        currentColor={selectedVerse ? getVerseHighlight(selectedVerse.number) : 'none'}
        onClose={() => setSelectedVerse(null)}
        onOpenNoteWithVerse={handleOpenNoteForVerse}
      />

      <NoteModal
        isOpen={isNoteModalOpen}
        defaultRef={noteDefaultRef}
        defaultContent={noteDefaultContent}
        onClose={() => setIsNoteModalOpen(false)}
      />
    </div>
  );
};
