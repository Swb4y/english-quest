import { useState } from 'react';
import type { Progress } from '../types';
import { totalWordCount, units } from '../data/units';

type ProfileViewProps = {
  progress: Progress;
  level: number;
  onReset: () => void;
};

type Badge = {
  emoji: string;
  title: string;
  description: string;
  earned: (progress: Progress) => boolean;
};

const badges: Badge[] = [
  { emoji: '🐣', title: 'İlk Adım', description: 'İlk üniteni bitir', earned: (p) => p.completedUnitIds.length >= 1 },
  { emoji: '📚', title: 'Kelime Avcısı', description: '25 kelime öğren', earned: (p) => p.learnedWords.length >= 25 },
  { emoji: '🧠', title: 'Kelime Ustası', description: '50 kelime öğren', earned: (p) => p.learnedWords.length >= 50 },
  { emoji: '🔥', title: 'Ateşli Seri', description: '3 gün üst üste çalış', earned: (p) => p.streak >= 3 },
  { emoji: '⚡', title: 'Enerji Küpü', description: '500 XP topla', earned: (p) => p.xp >= 500 },
  { emoji: '🏆', title: 'Şampiyon', description: 'Tüm üniteleri bitir', earned: (p) => p.completedUnitIds.length >= units.length },
];

export function ProfileView({ progress, level, onReset }: ProfileViewProps) {
  const [confirming, setConfirming] = useState(false);
  const accuracy =
    progress.totalExercises > 0
      ? Math.round((progress.totalCorrect / progress.totalExercises) * 100)
      : 0;
  const earnedCount = badges.filter((badge) => badge.earned(progress)).length;

  return (
    <main className="min-h-screen bg-hero px-5 pb-28 pt-8">
      <section className="mx-auto max-w-md">
        <header className="text-center animate-pop-in">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-quest text-5xl shadow-soft">
            🦉
          </div>
          <h1 className="mt-4 text-2xl font-black text-quest-ink">İngilizce Kaşifi</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Seviye {level} 🏅</p>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          {[
            { emoji: '⚡', label: 'Toplam XP', value: String(progress.xp) },
            { emoji: '🔥', label: 'Günlük Seri', value: `${progress.streak} gün` },
            { emoji: '📖', label: 'Öğrenilen Kelime', value: `${progress.learnedWords.length}/${totalWordCount}` },
            { emoji: '🎯', label: 'Doğruluk Oranı', value: progress.totalExercises > 0 ? `%${accuracy}` : '—' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-card">
              <span className="text-2xl">{stat.emoji}</span>
              <p className="mt-1 text-xl font-black text-quest-ink">{stat.value}</p>
              <p className="text-[11px] font-bold text-slate-400">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-black text-quest-ink">
            🎖️ Rozetlerim ({earnedCount}/{badges.length})
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const earned = badge.earned(progress);
              return (
                <div
                  key={badge.title}
                  className={`rounded-3xl border p-4 text-center shadow-card ${
                    earned ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white/60 opacity-60'
                  }`}
                >
                  <span className={`text-3xl ${earned ? '' : 'grayscale'}`}>{badge.emoji}</span>
                  <p className="mt-1 text-sm font-black text-quest-ink">{badge.title}</p>
                  <p className="text-[11px] font-semibold text-slate-500">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          className="mt-6 rounded-3xl border border-rose-100 bg-rose-50 p-5 shadow-card animate-slide-up"
          style={{ animationDelay: '0.15s' }}
        >
          <h2 className="text-base font-black text-rose-700">⚠️ İlerlemeyi Sıfırla</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-rose-600">
            Tüm XP, rozet ve ders ilerlemen silinir. Bu işlem geri alınamaz.
          </p>
          {confirming ? (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-600 shadow-card transition active:scale-95"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirming(false);
                  onReset();
                }}
                className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-black text-white transition active:scale-95"
              >
                Evet, Sıfırla
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="mt-3 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-rose-600 shadow-card transition active:scale-95"
            >
              Sıfırlamak İstiyorum
            </button>
          )}
        </section>
      </section>
    </main>
  );
}
