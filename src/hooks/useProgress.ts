import { useEffect, useMemo, useState } from 'react';
import type { Level, Progress } from '../types';
import { defaultProgress, loadProgress, normalizeVisit, saveProgress, STORAGE_KEY } from '../utils/progress';

export function useProgress(totalLessons: number) {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const currentLevelNumber = useMemo(() => Math.floor(progress.xp / 120) + 1, [progress.xp]);
  const completedCount = progress.completedLessonIds.length;
  const unlockedLessonCount = Math.min(totalLessons, completedCount + 1);

  function selectLevel(level: Level) {
    setProgress((current) => ({ ...current, selectedLevel: level }));
  }

  function completeLesson(lessonId: string, quizScore: number) {
    setProgress((current) => {
      const alreadyCompleted = current.completedLessonIds.includes(lessonId);
      const quizXp = quizScore * 10;
      const completionBonus = alreadyCompleted ? 0 : 30;

      return {
        ...current,
        xp: current.xp + quizXp + completionBonus,
        completedLessonIds: alreadyCompleted
          ? current.completedLessonIds
          : [...current.completedLessonIds, lessonId],
        quizScores: {
          ...current.quizScores,
          [lessonId]: Math.max(current.quizScores[lessonId] ?? 0, quizScore),
        },
      };
    });
  }

  function resetProgress() {
    setProgress(normalizeVisit(defaultProgress));
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    progress,
    currentLevelNumber,
    completedCount,
    unlockedLessonCount,
    selectLevel,
    completeLesson,
    resetProgress,
  };
}
