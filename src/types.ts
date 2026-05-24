export type Level = 'A1' | 'A2' | 'B1';

export type LessonTheme =
  | 'At the Airport'
  | 'At a Café'
  | 'Meeting New People'
  | 'Shopping'
  | 'Hotel Check-in'
  | 'Job Interview'
  | 'Asking for Directions'
  | 'Doctor Visit';

export type WordCard = {
  word: string;
  meaning: string;
  example: string;
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
};

export type DialogueTask = {
  lineBefore: string;
  options: string[];
  answer: string;
  lineAfter: string;
};

export type SentenceTask = {
  prompt: string;
  sampleAnswer: string;
};

export type Lesson = {
  id: string;
  theme: LessonTheme;
  cityStop: string;
  story: string;
  words: WordCard[];
  quiz: QuizQuestion[];
  dialogue: DialogueTask;
  sentence: SentenceTask;
};

export type Progress = {
  selectedLevel: Level | null;
  xp: number;
  streak: number;
  lastVisitDate: string | null;
  completedLessonIds: string[];
  quizScores: Record<string, number>;
};
