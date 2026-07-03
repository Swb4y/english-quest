import type { Progress, Unit } from '../types';
import { totalWordCount } from '../data/units';

type HomeViewProps = {
  progress: Progress;
  level: number;
  levelPercent: number;
  completedCount: number;
  totalUnits: number;
  nextUnit: Unit | undefined;
  onStart: (unit: Unit) => void;
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 6) return 'İyi geceler';
  if (hour < 12) return 'Günaydın';
  if (hour < 18) return 'İyi günler';
  return 'İyi akşamlar';
}

export function HomeView({
  progress,
  level,
  levelPercent,
  completedCount,
  totalUnits,
  nextUnit,
  onStart,
}: HomeViewProps) {
  const allDone = !nextUnit;
  const learnedCount = progress.learnedWords.length;

  return (
    <main className="min-h-screen bg-hero px-5 pb-28 pt-8">
      <section className="mx-auto max-w-md">
        <header className="flex items-center justify-between animate-pop-in">
          <div>
            <p className="text-sm font-bold text-slate-500">{greeting()} 👋</p>
            <h1 className="mt-1 text-3xl font-black text-quest-ink">English Quest</h1>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-quest text-3xl shadow-card">
            🦉
          </div>
        </header>

        <section className="mt-6 grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <div className="rounded-3xl border border-orange-100 bg-white p-4 text-center shadow-card">
            <span className="text-2xl">🔥</span>
            <p className="mt-1 text-xl font-black text-quest-ink">{progress.streak}</p>
            <p className="text-[11px] font-bold text-slate-400">Günlük Seri</p>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-white p-4 text-center shadow-card">
            <span className="text-2xl">⚡</span>
            <p className="mt-1 text-xl font-black text-quest-ink">{progress.xp}</p>
            <p className="text-[11px] font-bold text-slate-400">Puan (XP)</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-4 text-center shadow-card">
            <span className="text-2xl">📖</span>
            <p className="mt-1 text-xl font-black text-quest-ink">
              {learnedCount}
              <span className="text-xs font-bold text-slate-400">/{totalWordCount}</span>
            </p>
            <p className="text-[11px] font-bold text-slate-400">Kelime</p>
          </div>
        </section>

        <section
          className="mt-4 rounded-3xl border border-indigo-100 bg-white p-5 shadow-card animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-quest-ink">Seviye {level} 🏅</p>
            <p className="text-xs font-bold text-slate-400">Sonraki seviyeye %{levelPercent}</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-indigo-100">
            <div
              className="h-full rounded-full bg-gradient-quest transition-all duration-700"
              style={{ width: `${Math.max(levelPercent, 4)}%` }}
            />
          </div>
        </section>

        {allDone ? (
          <section
            className="mt-4 rounded-3xl bg-gradient-mint p-6 text-white shadow-soft animate-slide-up"
            style={{ animationDelay: '0.15s' }}
          >
            <p className="text-sm font-black uppercase tracking-wider text-emerald-100">Tebrikler! 🎉</p>
            <h2 className="mt-2 text-2xl font-black">Tüm üniteleri bitirdin!</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-50">
              Harika iş çıkardın. Öğrendiklerini unutmamak için Tekrar bölümünden pratik yapmaya devam et.
            </p>
          </section>
        ) : (
          <section
            className="mt-4 rounded-3xl bg-gradient-quest p-6 text-white shadow-soft animate-slide-up"
            style={{ animationDelay: '0.15s' }}
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-indigo-200">
              Sıradaki Dersin • {completedCount + 1}/{totalUnits}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl">
                {nextUnit.emoji}
              </span>
              <div>
                <h2 className="text-2xl font-black">{nextUnit.title}</h2>
                <p className="text-sm font-semibold text-indigo-100">{nextUnit.titleEn}</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-indigo-100">{nextUnit.description}</p>
            <button
              type="button"
              onClick={() => onStart(nextUnit)}
              className="mt-5 w-full rounded-2xl bg-white px-5 py-4 text-base font-black text-quest-blue shadow-card transition active:scale-95"
            >
              Derse Başla 🚀
            </button>
          </section>
        )}

        <section
          className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-5 shadow-card animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-sm font-black text-amber-800">Günün İpucu</h3>
              <p className="mt-1 text-sm font-semibold leading-6 text-amber-700">
                Kelime kartlarındaki 🔊 butonuna basarak telaffuzu dinle ve yüksek sesle tekrar et.
                Her gün 10 dakika, kocaman bir fark yaratır!
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
