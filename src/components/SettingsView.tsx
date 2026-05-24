import type { Level, Progress } from '../types';

type SettingsViewProps = {
  progress: Progress;
  onSelectLevel: (level: Level) => void;
  onReset: () => void;
};

const levels: Level[] = ['A1', 'A2', 'B1'];

export function SettingsView({ progress, onSelectLevel, onReset }: SettingsViewProps) {
  return (
    <main className="mx-auto max-w-md px-4 pb-28 pt-5">
      <header>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-quest-blue">Settings</p>
        <h1 className="mt-1 text-3xl font-black text-quest-ink">Your Quest</h1>
      </header>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black text-quest-ink">Learning Level</h2>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {levels.map((level) => {
            const active = progress.selectedLevel === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => onSelectLevel(level)}
                className={`rounded-2xl px-4 py-4 text-base font-black ${
                  active ? 'bg-quest-blue text-white' : 'bg-indigo-50 text-quest-blue'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black text-quest-ink">Progress</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <dt className="font-bold text-slate-500">Total XP</dt>
            <dd className="mt-1 text-xl font-black text-quest-ink">{progress.xp}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <dt className="font-bold text-slate-500">Streak</dt>
            <dd className="mt-1 text-xl font-black text-quest-ink">{progress.streak}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-5 rounded-3xl bg-rose-50 p-5">
        <h2 className="text-xl font-black text-rose-900">Reset Progress</h2>
        <p className="mt-2 text-sm leading-6 text-rose-700">
          This clears XP, streak, quiz scores, and unlocked missions from LocalStorage.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 w-full rounded-2xl bg-rose-600 px-5 py-4 text-base font-black text-white"
        >
          Reset Progress
        </button>
      </section>
    </main>
  );
}
