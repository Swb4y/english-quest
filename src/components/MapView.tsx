import type { Lesson } from '../types';

type MapViewProps = {
  lessons: Lesson[];
  completedLessonIds: string[];
  unlockedLessonCount: number;
  onStart: (lesson: Lesson) => void;
};

export function MapView({ lessons, completedLessonIds, unlockedLessonCount, onStart }: MapViewProps) {
  return (
    <main className="mx-auto max-w-md px-4 pb-28 pt-5">
      <header>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-quest-blue">Quest Map</p>
        <h1 className="mt-1 text-3xl font-black text-quest-ink">Bright City Route</h1>
      </header>

      <section className="mt-5 space-y-3">
        {lessons.map((lesson, index) => {
          const complete = completedLessonIds.includes(lesson.id);
          const unlocked = index < unlockedLessonCount;

          return (
            <article
              key={lesson.id}
              className={`rounded-3xl border p-4 shadow-soft ${
                complete
                  ? 'border-emerald-200 bg-emerald-50'
                  : unlocked
                    ? 'border-indigo-100 bg-white'
                    : 'border-slate-100 bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-black ${
                    complete
                      ? 'bg-emerald-500 text-white'
                      : unlocked
                        ? 'bg-quest-blue text-white'
                        : 'bg-slate-300 text-slate-500'
                  }`}
                >
                  {complete ? '✓' : index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-black text-quest-ink">{lesson.theme}</h2>
                  <p className="text-sm font-bold text-slate-500">{lesson.cityStop}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{lesson.story}</p>
              <button
                type="button"
                onClick={() => onStart(lesson)}
                disabled={!unlocked}
                className="mt-4 w-full rounded-2xl bg-quest-blue px-4 py-3 text-sm font-black text-white disabled:bg-slate-300"
              >
                {complete ? 'Replay Mission' : unlocked ? 'Start Mission' : 'Locked'}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}
