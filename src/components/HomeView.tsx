import type { Lesson, Progress } from '../types';
import { StatCard } from './StatCard';
import { TodayMission } from './TodayMission';

type HomeViewProps = {
  progress: Progress;
  appLevel: number;
  completedCount: number;
  totalLessons: number;
  todayLesson: Lesson | undefined;
  onStart: (lesson: Lesson) => void;
};

export function HomeView({
  progress,
  appLevel,
  completedCount,
  totalLessons,
  todayLesson,
  onStart,
}: HomeViewProps) {
  return (
    <main className="mx-auto max-w-md px-4 pb-28 pt-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-quest-blue">English Quest</p>
          <h1 className="mt-1 text-3xl font-black text-quest-ink">Daily Adventure</h1>
        </div>
        <div className="rounded-3xl bg-white px-4 py-3 text-center shadow-soft">
          <span className="block text-xs font-black text-slate-500">Level</span>
          <strong className="text-xl font-black text-quest-blue">{progress.selectedLevel}</strong>
        </div>
      </header>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <StatCard label="XP" value={progress.xp} tone="blue" />
        <StatCard label="Quest Lv." value={appLevel} tone="green" />
        <StatCard label="Streak" value={`${progress.streak} day`} tone="gold" />
        <StatCard label="Done" value={`${completedCount}/${totalLessons}`} tone="rose" />
      </section>

      <div className="mt-5">
        <TodayMission
          lesson={todayLesson}
          completedCount={completedCount}
          totalLessons={totalLessons}
          onStart={onStart}
        />
      </div>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-quest-ink">Story Mode</h2>
          <span className="rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
            Bright City
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Complete practical English missions across the city. Each finished lesson unlocks the next stop on your route.
        </p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-quest-mint"
            style={{ width: `${(completedCount / totalLessons) * 100}%` }}
          />
        </div>
      </section>
    </main>
  );
}
