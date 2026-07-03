import type { Progress, Unit } from '../types';

type MapViewProps = {
  units: Unit[];
  progress: Progress;
  unlockedUnitCount: number;
  onStart: (unit: Unit) => void;
};

export function MapView({ units, progress, unlockedUnitCount, onStart }: MapViewProps) {
  return (
    <main className="min-h-screen bg-hero px-5 pb-28 pt-8">
      <section className="mx-auto max-w-md">
        <header className="animate-pop-in">
          <p className="text-sm font-bold text-slate-500">Öğrenme Yolculuğun 🧭</p>
          <h1 className="mt-1 text-3xl font-black text-quest-ink">Ünite Haritası</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            Her üniteyi bitirdiğinde bir sonraki açılır. Bitirdiğin ünitelere istediğin zaman geri dönebilirsin.
          </p>
        </header>

        <div className="relative mt-8">
          <div className="absolute bottom-8 left-1/2 top-4 w-1 -translate-x-1/2 rounded-full bg-indigo-200/70" />
          <div className="grid gap-5">
            {units.map((unit, index) => {
              const done = progress.completedUnitIds.includes(unit.id);
              const unlocked = index < unlockedUnitCount;
              const isNext = unlocked && !done;
              const side = index % 2 === 0 ? 'justify-self-start' : 'justify-self-end';
              const score = progress.unitScores[unit.id];

              return (
                <button
                  key={unit.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => onStart(unit)}
                  className={`relative w-[86%] rounded-3xl border p-4 text-left shadow-card transition animate-slide-up ${side} ${
                    done
                      ? 'border-emerald-200 bg-white active:scale-95'
                      : isNext
                        ? 'border-transparent bg-gradient-quest text-white shadow-soft active:scale-95'
                        : 'border-slate-200 bg-white/60 opacity-70'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ${
                        done ? 'bg-emerald-100' : isNext ? 'bg-white/20 animate-bounce-soft' : 'bg-slate-100 grayscale'
                      }`}
                    >
                      {unlocked ? unit.emoji : '🔒'}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[11px] font-black uppercase tracking-wider ${
                          done ? 'text-emerald-500' : isNext ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        Ünite {index + 1} • {unit.titleEn}
                      </p>
                      <h2 className={`truncate text-lg font-black ${isNext ? 'text-white' : 'text-quest-ink'}`}>
                        {unit.title}
                      </h2>
                      <p
                        className={`text-xs font-bold ${
                          done ? 'text-emerald-600' : isNext ? 'text-indigo-100' : 'text-slate-400'
                        }`}
                      >
                        {done
                          ? `✅ Tamamlandı${typeof score === 'number' ? ` • Başarı %${score}` : ''}`
                          : isNext
                            ? '▶️ Sıradaki ders — hadi başla!'
                            : 'Önceki üniteyi bitirince açılır'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
