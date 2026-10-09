export type TabType = 'home' | 'bible' | 'plans' | 'notebook' | 'profile';

export type BibleVersion = 'NVI' | 'ARA' | 'NVT' | 'NAA';

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  bookId: string;
  bookName: string;
  chapter: number;
  totalChapters: number;
  testament: 'AT' | 'NT';
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'AT' | 'NT';
  category: 'Pentateuco' | 'Históricos' | 'Poéticos' | 'Profetas Maiores' | 'Profetas Menores' | 'Evangelhos' | 'Cartas Paulinas' | 'Cartas Gerais' | 'Revelação';
  chaptersCount: number;
}

export type HighlightColor = 'yellow' | 'green' | 'rose' | 'blue' | 'none';

export interface HighlightedVerse {
  id: string; // `${bookId}-${chapter}-${verseNumber}`
  bookId: string;
  bookName: string;
  chapter: number;
  verseNumber: number;
  color: HighlightColor;
  date: string;
  note?: string;
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  passage: string;
  bookId: string;
  chapter: number;
  devotionalText: string;
  completed: boolean;
}

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  category: 'Evangelhos' | 'Ansiedade & Paz' | 'Sabedoria' | 'Fundamentos' | 'Novo Testamento' | 'Família';
  durationDays: number;
  daysCompleted: number;
  isActive: boolean;
  coverGradient: string;
  iconName: string;
  description: string;
  author: string;
  days: ReadingPlanDay[];
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  scriptureReference?: string;
  bookId?: string;
  chapter?: number;
  tag: 'Culto' | 'Estudo Pessoal' | 'Devocional' | 'Discipulado' | 'Teologia';
  createdAt: string;
  updatedAt: string;
  isPinned?: boolean;
}

export type PrayerCategory = 'Família' | 'Saúde' | 'Espiritual' | 'Trabalho' | 'Gratidão' | 'Amigos';

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: PrayerCategory;
  createdAt: string;
  isAnswered: boolean;
  answeredDate?: string;
  testimony?: string;
  timesPrayed: number;
  lastPrayedAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  streakDays: number;
  totalChaptersRead: number;
  versesHighlighted: number;
  dailyGoalMinutes: number;
  todayMinutesSpent: number;
  isPro: boolean;
  proRenewalDate: string;
  preferredVersion: BibleVersion;
}
