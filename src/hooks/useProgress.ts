import { useEffect, useMemo, useState } from 'react';
import type { Progress } from '../types';
import { defaultProgress, loadProgress, normalizeVisit, saveProgress, STORAGE_KEY } from '../utils/progress';

export type UnitResult = {
  unitId: string;
  correct: number;
  total: number;
  wordEns: string[];
};

export function useProgress(totalUnits: number) {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const level = useMemo(() => Math.floor(progress.xp / 150) + 1, [progress.xp]);
  const levelPercent = useMemo(() => Math.round(((progress.xp % 150) / 150) * 100), [progress.xp]);
  const completedCount = progress.completedUnitIds.length;
  const unlockedUnitCount = Math.min(totalUnits, completedCount + 1);

  function start() {
    setProgress((current) => ({ ...current, started: true }));
  }

  function completeUnit({ unitId, correct, total, wordEns }: UnitResult) {
    setProgress((current) => {
      const alreadyCompleted = current.completedUnitIds.includes(unitId);
      const score = total > 0 ? Math.round((correct / total) * 100) : 0;
      const earned = correct * 10 + (alreadyCompleted ? 0 : 40);
      const learnedWords = Array.from(new Set([...current.learnedWords, ...wordEns]));

      return {
        ...current,
        xp: current.xp + earned,
        completedUnitIds: alreadyCompleted
          ? current.completedUnitIds
          : [...current.completedUnitIds, unitId],
        unitScores: {
          ...current.unitScores,
          [unitId]: Math.max(current.unitScores[unitId] ?? 0, score),
        },
        learnedWords,
        totalExercises: current.totalExercises + total,
        totalCorrect: current.totalCorrect + correct,
      };
    });
  }

  function recordReview(correct: number, total: number) {
    setProgress((current) => ({
      ...current,
      xp: current.xp + correct * 5,
      totalExercises: current.totalExercises + total,
      totalCorrect: current.totalCorrect + correct,
    }));
  }

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(normalizeVisit(defaultProgress));
  }

  return {
    progress,
    level,
    levelPercent,
    completedCount,
    unlockedUnitCount,
    start,
    completeUnit,
    recordReview,
    resetProgress,
  };
}
