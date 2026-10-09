import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyNote } from '../../types';
import { X, FileText, Pin, Check } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  initialNote?: StudyNote | null;
  defaultRef?: string;
  defaultContent?: string;
  onClose: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  initialNote,
  defaultRef,
  defaultContent,
  onClose,
}) => {
  const { addNote, updateNote } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scriptureReference, setScriptureReference] = useState('');
  const [tag, setTag] = useState<StudyNote['tag']>('Estudo Pessoal');
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
      setScriptureReference(initialNote.scriptureReference || '');
      setTag(initialNote.tag);
      setIsPinned(Boolean(initialNote.isPinned));
    } else {
      setTitle('');
      setContent(defaultContent || '');
      setScriptureReference(defaultRef || '');
      setTag('Estudo Pessoal');
      setIsPinned(false);
    }
  }, [initialNote, defaultRef, defaultContent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (initialNote) {
      updateNote(initialNote.id, {
        title: title.trim(),
        content: content.trim(),
        scriptureReference: scriptureReference.trim() || undefined,
        tag,
        isPinned,
      });
    } else {
      addNote({
        title: title.trim(),
        content: content.trim(),
        scriptureReference: scriptureReference.trim() || undefined,
        tag,
        isPinned,
      });
    }

    onClose();
  };

  const tags: StudyNote['tag'][] = [
    'Estudo Pessoal',
    'Culto',
    'Devocional',
    'Discipulado',
    'Teologia',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#1A1D1B] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-400">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {initialNote ? 'Editar Anotação' : 'Nova Anotação de Estudo'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5">
              Título da Anotação *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O Significado da Graça em Romanos 8..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5">
                Passagem Bíblica (Opcional)
              </label>
              <input
                type="text"
                value={scriptureReference}
                onChange={(e) => setScriptureReference(e.target.value)}
                placeholder="Ex: Filipenses 4:6-7"
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5">
                Categoria
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as StudyNote['tag'])}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-1.5">
              Conteúdo / Reflexão *
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva seus pensamentos, contexto histórico, pontos do sermão ou orações correspondentes..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500 font-sans leading-relaxed resize-none"
            />
          </div>

          {/* Pin checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-stone-600 dark:text-stone-300">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="rounded border-stone-300 text-sage-600 focus:ring-sage-500"
              />
              <span className="flex items-center gap-1 font-medium">
                <Pin className="w-3.5 h-3.5 text-stone-400" />
                Fixar no topo do caderno
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sage-600 text-white hover:bg-sage-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-sage-600/20"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{initialNote ? 'Salvar Alterações' : 'Criar Anotação'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
