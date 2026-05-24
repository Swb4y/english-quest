import type { Level } from '../types';

type LevelSelectProps = {
  onSelect: (level: Level) => void;
};

const levels: Array<{ id: Level; title: string; description: string }> = [
  { id: 'A1', title: 'A1 Starter', description: 'Simple words, short answers, everyday survival English.' },
  { id: 'A2', title: 'A2 Explorer', description: 'More phrases, practical questions, city tasks.' },
  { id: 'B1', title: 'B1 Adventurer', description: 'Longer answers, work and travel confidence.' },
];

export function LevelSelect({ onSelect }: LevelSelectProps) {
  return (
    <main className="min-h-screen bg-indigo-50 px-5 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-quest-blue">English Quest</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-quest-ink">
          Choose your first city mission.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Pick a level and start a short daily quest. Your XP, streak, and unlocked missions stay on this device.
        </p>

        <div className="mt-8 space-y-3">
          {levels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelect(level.id)}
              className="w-full rounded-3xl border border-indigo-100 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-indigo-300"
            >
              <span className="inline-flex rounded-2xl bg-indigo-100 px-3 py-1 text-sm font-black text-quest-blue">
                {level.id}
              </span>
              <strong className="mt-3 block text-xl text-quest-ink">{level.title}</strong>
              <span className="mt-1 block text-sm leading-6 text-slate-600">{level.description}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
