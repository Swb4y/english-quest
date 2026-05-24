import type { Lesson } from '../types';

type TodayMissionProps = {
  lesson: Lesson | undefined;
  completedCount: number;
  totalLessons: number;
  onStart: (lesson: Lesson) => void;
};

export function TodayMission({ lesson, completedCount, totalLessons, onStart }: TodayMissionProps) {
  if (!lesson) {
    return (
      <section className="rounded-3xl bg-quest-ink p-5 text-white shadow-soft">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-200">Today&apos;s Mission</p>
        <h2 className="mt-2 text-2xl font-black">City story complete</h2>
        <p className="mt-2 text-sm leading-6 text-indigo-100">
          You finished every mission in this first version. Reset progress anytime to replay.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-quest-blue p-5 text-white shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-100">Today&apos;s Mission</p>
          <h2 className="mt-2 text-2xl font-black">{lesson.theme}</h2>
          <p className="mt-1 text-sm font-bold text-indigo-100">{lesson.cityStop}</p>
        </div>
        <span className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-black">
          {completedCount + 1}/{totalLessons}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-indigo-50">{lesson.story}</p>
      <button
        type="button"
        onClick={() => onStart(lesson)}
        className="mt-5 w-full rounded-2xl bg-white px-5 py-4 text-base font-black text-quest-blue shadow-lg shadow-indigo-900/20"
      >
        Start Mission
      </button>
    </section>
  );
}
