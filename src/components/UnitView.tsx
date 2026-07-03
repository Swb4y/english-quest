import { useMemo, useState } from 'react';
import type { Unit } from '../types';
import { buildExercises } from '../utils/exercises';
import { Confetti } from './Confetti';
import { ExercisePlayer } from './ExercisePlayer';
import { SpeakButton } from './SpeakButton';
import { speak } from '../utils/speech';

type UnitViewProps = {
  unit: Unit;
  onExit: () => void;
  onComplete: (correct: number, total: number) => void;
};

type Phase = 'learn' | 'practice' | 'done';

export function UnitView({ unit, onExit, onComplete }: UnitViewProps) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [wordIndex, setWordIndex] = useState(0);
  const [result, setResult] = useState({ correct: 0, total: 0 });
  const exercises = useMemo(() => buildExercises(unit), [unit]);

  const word = unit.words[wordIndex];
  const lastWord = wordIndex === unit.words.length - 1;

  function finishPractice(correct: number, total: number) {
    setResult({ correct, total });
    onComplete(correct, total);
    setPhase('done');
  }

  return (
    <main className="min-h-screen bg-hero px-5 pb-10 pt-6">
      <section className="mx-auto max-w-md">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg shadow-card transition active:scale-90"
            aria-label="Dersten çık"
          >
            ✖️
          </button>
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">{unit.titleEn}</p>
            <h1 className="text-lg font-black text-quest-ink">
              {unit.emoji} {unit.title}
            </h1>
          </div>
          <div className="w-11" />
        </header>

        {phase === 'learn' && (
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-indigo-100">
                <div
                  className="h-full rounded-full bg-gradient-quest transition-all duration-500"
                  style={{ width: `${((wordIndex + 1) / unit.words.length) * 100}%` }}
                />
              </div>
              <p className="text-xs font-black text-slate-400">
                {wordIndex + 1}/{unit.words.length}
              </p>
            </div>

            <section
              key={word.en}
              className="mt-5 rounded-[2rem] border border-indigo-100 bg-white p-7 text-center shadow-soft animate-pop-in"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-quest-blue">Yeni Kelime</p>
              <div className="mt-4 text-7xl animate-bounce-soft">{word.emoji}</div>
              <div className="mt-4 flex items-center justify-center gap-3">
                <h2 className="text-4xl font-black text-quest-ink">{word.en}</h2>
                <SpeakButton text={word.en} size="lg" />
              </div>
              <p className="mt-1 text-sm font-bold text-slate-400">okunuşu: “{word.pron}”</p>
              <p className="mt-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-lg font-extrabold text-quest-blue">
                {word.tr}
              </p>

              <button
                type="button"
                onClick={() => speak(word.example)}
                className="mt-5 w-full rounded-2xl bg-slate-50 p-4 text-left transition active:scale-[0.98]"
              >
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Örnek Cümle • dinlemek için dokun 🔊
                </p>
                <p className="mt-1 text-base font-extrabold text-quest-ink">{word.example}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-500">{word.exampleTr}</p>
              </button>
            </section>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={wordIndex === 0}
                onClick={() => setWordIndex(wordIndex - 1)}
                className="rounded-2xl bg-white px-5 py-4 text-base font-black text-quest-blue shadow-card transition active:scale-95 disabled:opacity-40"
              >
                ⬅️ Önceki
              </button>
              <button
                type="button"
                onClick={() => (lastWord ? setPhase('practice') : setWordIndex(wordIndex + 1))}
                className="rounded-2xl bg-gradient-quest px-5 py-4 text-base font-black text-white shadow-card transition active:scale-95"
              >
                {lastWord ? 'Alıştırmalara Geç 🎯' : 'Sonraki ➡️'}
              </button>
            </div>
          </div>
        )}

        {phase === 'practice' && (
          <div className="mt-6">
            <ExercisePlayer exercises={exercises} onFinish={finishPractice} />
          </div>
        )}

        {phase === 'done' && (
          <div className="mt-10">
            <Confetti />
            <section className="rounded-[2rem] border border-indigo-100 bg-white p-8 text-center shadow-soft animate-pop-in">
              <div className="text-7xl">🏆</div>
              <p className="mt-4 text-sm font-black uppercase tracking-wider text-emerald-500">
                Ünite Tamamlandı!
              </p>
              <h2 className="mt-2 text-3xl font-black text-quest-ink">Bravo! 🎉</h2>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-500">
                {result.total} sorudan {result.correct} tanesini doğru yaptın ve{' '}
                <span className="font-black text-quest-blue">+{result.correct * 10 + 40} XP</span> kazandın.{' '}
                {unit.words.length} yeni kelime artık kelime defterinde!
              </p>
              <button
                type="button"
                onClick={onExit}
                className="mt-6 w-full rounded-2xl bg-gradient-quest px-5 py-4 text-base font-black text-white transition active:scale-95"
              >
                Devam Et 🚀
              </button>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
