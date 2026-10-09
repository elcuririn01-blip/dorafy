import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  TabType,
  BibleVersion,
  HighlightedVerse,
  HighlightColor,
  ReadingPlan,
  StudyNote,
  PrayerRequest,
  UserProfile,
} from '../types';
import { INITIAL_PLANS } from '../data/mockPlans';
import { INITIAL_NOTES } from '../data/mockNotes';
import { INITIAL_PRAYERS } from '../data/mockPrayers';

interface AppContextType {
  // Navigation & Mode
  viewMode: 'landing' | 'app';
  setViewMode: (mode: 'landing' | 'app') => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;

  // Bible Reader
  currentBookId: string;
  currentChapter: number;
  currentVersion: BibleVersion;
  setCurrentVersion: (v: BibleVersion) => void;
  setReadingLocation: (bookId: string, chapter: number) => void;
  readerFontSize: number;
  setReaderFontSize: (size: number | ((prev: number) => number)) => void;
  readerFontFamily: 'serif' | 'sans';
  setReaderFontFamily: (font: 'serif' | 'sans') => void;
  highlightedVerses: HighlightedVerse[];
  setHighlight: (bookId: string, bookName: string, chapter: number, verseNumber: number, color: HighlightColor) => void;

  // Reading Plans
  plans: ReadingPlan[];
  toggleDayCompletion: (planId: string, dayNumber: number) => void;
  startPlan: (planId: string) => void;

  // Notes
  notes: StudyNote[];
  addNote: (note: Omit<StudyNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<StudyNote>) => void;
  deleteNote: (id: string) => void;

  // Prayers
  prayers: PrayerRequest[];
  addPrayer: (prayer: Omit<PrayerRequest, 'id' | 'createdAt' | 'timesPrayed'>) => void;
  prayFor: (id: string) => void;
  markPrayerAnswered: (id: string, testimony?: string) => void;
  deletePrayer: (id: string) => void;

  // Profile & Metas
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // UI Utilities
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isProModalOpen: boolean;
  setIsProModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  fireConfetti: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Mode state (starts on Landing Page)
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Dark Mode state (defaulting to system or dark for luxury feel)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dorafy_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dorafy_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dorafy_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Bible Reader state
  const [currentBookId, setCurrentBookId] = useState<string>('sl'); // Salmos
  const [currentChapter, setCurrentChapter] = useState<number>(23); // 23
  const [currentVersion, setCurrentVersion] = useState<BibleVersion>('NVI');
  const [readerFontSize, setReaderFontSize] = useState<number>(19);
  const [readerFontFamily, setReaderFontFamily] = useState<'serif' | 'sans'>('serif');

  const [highlightedVerses, setHighlightedVerses] = useState<HighlightedVerse[]>([
    {
      id: 'sl-23-1',
      bookId: 'sl',
      bookName: 'Salmos',
      chapter: 23,
      verseNumber: 1,
      color: 'green',
      date: '2026-10-08',
    },
    {
      id: 'fp-4-6',
      bookId: 'fp',
      bookName: 'Filipenses',
      chapter: 4,
      verseNumber: 6,
      color: 'yellow',
      date: '2026-10-07',
    },
    {
      id: 'rm-8-28',
      bookId: 'rm',
      bookName: 'Romanos',
      chapter: 8,
      verseNumber: 28,
      color: 'blue',
      date: '2026-10-05',
    },
  ]);

  const setReadingLocation = (bookId: string, chapter: number) => {
    setCurrentBookId(bookId);
    setCurrentChapter(chapter);
    setActiveTab('bible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setHighlight = (
    bookId: string,
    bookName: string,
    chapter: number,
    verseNumber: number,
    color: HighlightColor
  ) => {
    const id = `${bookId}-${chapter}-${verseNumber}`;
    setHighlightedVerses((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (color === 'none') {
        showToast('Destaque removido');
        return filtered;
      }
      showToast(`Versículo marcado em ${color === 'yellow' ? 'amarelo' : color === 'green' ? 'verde sálvia' : color === 'rose' ? 'rosa' : 'azul'}`);
      return [
        ...filtered,
        {
          id,
          bookId,
          bookName,
          chapter,
          verseNumber,
          color,
          date: new Date().toISOString().split('T')[0],
        },
      ];
    });
  };

  // Reading Plans
  const [plans, setPlans] = useState<ReadingPlan[]>(INITIAL_PLANS);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#5f8763', '#a8bea8', '#c5a882', '#e2d5c4'],
      });
    } catch {
      // Fallback
    }
  };

  const toggleDayCompletion = (planId: string, dayNumber: number) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id !== planId) return plan;
        let newlyCompleted = false;
        const updatedDays = plan.days.map((d) => {
          if (d.day === dayNumber) {
            newlyCompleted = !d.completed;
            return { ...d, completed: newlyCompleted };
          }
          return d;
        });
        const completedCount = updatedDays.filter((d) => d.completed).length;

        if (newlyCompleted) {
          showToast(`Dia ${dayNumber} concluído com sucesso! 🙌`);
          fireConfetti();
        }

        return {
          ...plan,
          days: updatedDays,
          daysCompleted: completedCount,
          isActive: true,
        };
      })
    );
  };

  const startPlan = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isActive: true } : p))
    );
    showToast('Plano ativado na sua trilha!');
  };

  // Notes
  const [notes, setNotes] = useState<StudyNote[]>(INITIAL_NOTES);

  const addNote = (newNoteData: Omit<StudyNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newNote: StudyNote = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setNotes((prev) => [newNote, ...prev]);
    showToast('Anotação salva no caderno!');
  };

  const updateNote = (id: string, changes: Partial<StudyNote>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes, updatedAt: new Date().toISOString().split('T')[0] } : n))
    );
    showToast('Anotação atualizada');
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast('Anotação removida');
  };

  // Prayers
  const [prayers, setPrayers] = useState<PrayerRequest[]>(INITIAL_PRAYERS);

  const addPrayer = (prayerData: Omit<PrayerRequest, 'id' | 'createdAt' | 'timesPrayed'>) => {
    const newPrayer: PrayerRequest = {
      ...prayerData,
      id: `prayer-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      timesPrayed: 1,
      lastPrayedAt: 'Hoje',
    };
    setPrayers((prev) => [newPrayer, ...prev]);
    showToast('Pedido de oração adicionado ao mural!');
  };

  const prayFor = (id: string) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            timesPrayed: p.timesPrayed + 1,
            lastPrayedAt: 'Hoje',
          };
        }
        return p;
      })
    );
    showToast('Você orou por este pedido hoje. Deus ouve! 🙏');
  };

  const markPrayerAnswered = (id: string, testimony?: string) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            isAnswered: true,
            answeredDate: new Date().toISOString().split('T')[0],
            testimony: testimony || 'Oração respondida com graça e fidelidade pelo Senhor!',
          };
        }
        return p;
      })
    );
    fireConfetti();
    showToast('Glória a Deus! Oração marcada como respondida! 🎉');
  };

  const deletePrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
    showToast('Pedido de oração removido');
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Gabriel Sforza',
    email: 'gabriel.sforza@dorafy.app',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    streakDays: 14,
    totalChaptersRead: 142,
    versesHighlighted: 38,
    dailyGoalMinutes: 20,
    todayMinutesSpent: 15,
    isPro: true,
    proRenewalDate: '12 de Dezembro de 2026',
    preferredVersion: 'NVI',
  });

  const updateUserProfile = (changes: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...changes }));
    showToast('Perfil atualizado com sucesso');
  };

  // Modals & Toast State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        currentBookId,
        currentChapter,
        currentVersion,
        setCurrentVersion,
        setReadingLocation,
        readerFontSize,
        setReaderFontSize,
        readerFontFamily,
        setReaderFontFamily,
        highlightedVerses,
        setHighlight,
        plans,
        toggleDayCompletion,
        startPlan,
        notes,
        addNote,
        updateNote,
        deleteNote,
        prayers,
        addPrayer,
        prayFor,
        markPrayerAnswered,
        deletePrayer,
        userProfile,
        updateUserProfile,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isProModalOpen,
        setIsProModalOpen,
        toastMessage,
        showToast,
        fireConfetti,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
