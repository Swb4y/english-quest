import { useMemo, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { LessonView } from './components/LessonView';
import { LevelSelect } from './components/LevelSelect';
import { MapView } from './components/MapView';
import { SettingsView } from './components/SettingsView';
import { lessons } from './data/lessons';
import { useProgress } from './hooks/useProgress';
import type { Lesson } from './types';

type Tab = 'home' | 'map' | 'settings';

export default function App() {
  const {
    progress,
    currentLevelNumber,
    completedCount,
    unlockedLessonCount,
    selectLevel,
    completeLesson,
    resetProgress,
  } = useProgress(lessons.length);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const todayLesson = useMemo(
    () => lessons.find((lesson) => !progress.completedLessonIds.includes(lesson.id)),
    [progress.completedLessonIds],
  );

  if (!progress.selectedLevel) {
    return <LevelSelect onSelect={selectLevel} />;
  }

  if (activeLesson) {
    return (
      <LessonView
        lesson={activeLesson}
        onBack={() => setActiveLesson(null)}
        onComplete={(score) => completeLesson(activeLesson.id, score)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 text-quest-ink">
      {activeTab === 'home' && (
        <HomeView
          progress={progress}
          appLevel={currentLevelNumber}
          completedCount={completedCount}
          totalLessons={lessons.length}
          todayLesson={todayLesson}
          onStart={setActiveLesson}
        />
      )}
      {activeTab === 'map' && (
        <MapView
          lessons={lessons}
          completedLessonIds={progress.completedLessonIds}
          unlockedLessonCount={unlockedLessonCount}
          onStart={setActiveLesson}
        />
      )}
      {activeTab === 'settings' && (
        <SettingsView progress={progress} onSelectLevel={selectLevel} onReset={resetProgress} />
      )}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
