export type Word = {
  /** İngilizce kelime */
  en: string;
  /** Türkçe anlamı */
  tr: string;
  /** Türkçe harflerle yaklaşık okunuş */
  pron: string;
  emoji: string;
  /** İngilizce örnek cümle */
  example: string;
  /** Örnek cümlenin Türkçesi */
  exampleTr: string;
};

export type Pattern = {
  /** İngilizce kalıp cümle */
  en: string;
  /** Türkçe karşılığı */
  tr: string;
};

export type Unit = {
  id: string;
  /** Türkçe ünite adı */
  title: string;
  /** İngilizce ünite adı (öğrenme amaçlı gösterilir) */
  titleEn: string;
  emoji: string;
  /** Ünitenin kısa Türkçe açıklaması */
  description: string;
  color: string;
  words: Word[];
  patterns: Pattern[];
};

export type ExerciseKind = 'meaning' | 'reverse' | 'listening' | 'matching' | 'sentence';

export type ChoiceExercise = {
  kind: 'meaning' | 'reverse' | 'listening';
  word: Word;
  /** Şıklar (meaning için Türkçe, reverse/listening için İngilizce) */
  options: string[];
  answer: string;
};

export type MatchingExercise = {
  kind: 'matching';
  pairs: Word[];
};

export type SentenceExercise = {
  kind: 'sentence';
  pattern: Pattern;
  /** Karıştırılmış kelime parçaları */
  shuffled: string[];
};

export type Exercise = ChoiceExercise | MatchingExercise | SentenceExercise;

export type Progress = {
  started: boolean;
  xp: number;
  streak: number;
  lastVisitDate: string | null;
  completedUnitIds: string[];
  /** Ünite başına en iyi skor (yüzde) */
  unitScores: Record<string, number>;
  /** Öğrenilen kelimeler (en) */
  learnedWords: string[];
  /** Toplam tamamlanan alıştırma sayısı */
  totalExercises: number;
  /** Toplam doğru cevap sayısı */
  totalCorrect: number;
};
