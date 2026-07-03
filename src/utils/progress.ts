import type { Progress } from '../types';

export const STORAGE_KEY = 'english-quest-progress-v2';

export const defaultProgress: Progress = {
  started: false,
  xp: 0,
  streak: 0,
  lastVisitDate: null,
  completedUnitIds: [],
  unitScores: {},
  learnedWords: [],
  totalExercises: 0,
  totalCorrect: 0,
};

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(previous: string, current: string) {
  const previousDate = new Date(`${previous}T00:00:00`);
  const currentDate = new Date(`${current}T00:00:00`);
  return Math.round((currentDate.getTime() - previousDate.getTime()) / 86_400_000);
}

export function normalizeVisit(progress: Progress): Progress {
  const today = todayKey();

  if (progress.lastVisitDate === today) return progress;
  if (!progress.lastVisitDate) {
    return { ...progress, lastVisitDate: today, streak: 1 };
  }

  const gap = daysBetween(progress.lastVisitDate, today);
  return {
    ...progress,
    lastVisitDate: today,
    streak: gap === 1 ? progress.streak + 1 : 1,
  };
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeVisit(defaultProgress);

    const parsed = JSON.parse(raw) as Partial<Progress>;
    return normalizeVisit({
      ...defaultProgress,
      ...parsed,
      completedUnitIds: parsed.completedUnitIds ?? [],
      unitScores: parsed.unitScores ?? {},
      learnedWords: parsed.learnedWords ?? [],
    });
  } catch {
    return normalizeVisit(defaultProgress);
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
