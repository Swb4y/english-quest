import { useMemo, useState } from 'react';
import type { Progress, Word } from '../types';
import { units } from '../data/units';
import { buildReview } from '../utils/exercises';
import { Confetti } from './Confetti';
import { ExercisePlayer } from './ExercisePlayer';
import { SpeakButton } from './SpeakButton';

type ReviewViewProps = {
  progress: Progress;
  onFinish: (correct: number, total: number) => void;
};

type Phase = 'idle' | 'quiz' | 'done';

export function ReviewView({ progress, onFinish }: ReviewViewProps) {
  const learnedWords = useMemo(() => {
    const all: Word[] = units.flatMap((unit) => unit.words);
    return all.filter((word) => progress.learnedWords.includes(word.en));
  }, [progress.learnedWords]);

  const [phase, setPhase] = useState<Phase>('idle');
  const [quizId, setQuizId] = useState(0);
  const [result, setResult] = useState({ correct: 0, total: 0 });
  const exercises = useMemo(() => buildReview(learnedWords), [learnedWords, quizId]);

  const canReview = learnedWords.length >= 3;

  function finish(correct: number, total: number) {
    setResult({ correct, total });
    onFinish(correct, total);
    setPhase('done');
  }

  if (phase === 'quiz') {
    return (
      <main className="min-h-screen bg-hero px-5 pb-28 pt-8">
        <section className="mx-auto max-w-md">
          <header className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPhase('idle')}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg shadow-card transition active:scale-90"
              aria-label="Tekrardan çık"
            >
              ✖️
            </button>
            <h1 className="text-lg font-black text-quest-ink">🔁 Hızlı Tekrar</h1>
            <div className="w-11" />
          </header>
          <ExercisePlayer exercises={exercises} onFinish={finish} />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hero px-5 pb-28 pt-8">
      <section className="mx-auto max-w-md">
        <header className="animate-pop-in">
          <p className="text-sm font-bold text-slate-500">Öğrendiklerini pekiştir 💪</p>
          <h1 className="mt-1 text-3xl font-black text-quest-ink">Tekrar</h1>
        </header>

        {phase === 'done' && (
          <>
            <Confetti />
            <section className="mt-5 rounded-3xl bg-gradient-mint p-6 text-center text-white shadow-soft animate-pop-in">
              <p className="text-4xl">🎯</p>
              <h2 className="mt-2 text-2xl font-black">
                {result.correct}/{result.total} doğru!
              </h2>
              <p className="mt-1 text-sm font-bold text-emerald-50">+{result.correct * 5} XP kazandın</p>
            </section>
          </>
        )}

        <section
          className="mt-5 rounded-3xl bg-gradient-sunset p-6 text-white shadow-soft animate-slide-up"
          style={{ animationDelay: '0.05s' }}
        >
          <h2 className="text-xl font-black">Hızlı Tekrar Turu 🔁</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-orange-50">
            {canReview
              ? `Öğrendiğin ${learnedWords.length} kelimeden 10 soruluk karışık bir tur hazırlayalım. Her doğru cevap +5 XP!`
              : 'Tekrar turu için önce en az bir ünite bitirmelisin. Haydi ilk dersine başla!'}
          </p>
          {canReview && (
            <button
              type="button"
              onClick={() => {
                setQuizId((id) => id + 1);
                setPhase('quiz');
              }}
              className="mt-4 w-full rounded-2xl bg-white px-5 py-4 text-base font-black text-orange-500 shadow-card transition active:scale-95"
            >
              Tekrara Başla 🎯
            </button>
          )}
        </section>

        <section className="mt-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-black text-quest-ink">📖 Kelime Defterim ({learnedWords.length})</h2>
          {learnedWords.length === 0 ? (
            <p className="mt-3 rounded-3xl border border-indigo-100 bg-white p-5 text-sm font-semibold leading-6 text-slate-500 shadow-card">
              Henüz kelime öğrenmedin. İlk üniteyi bitirdiğinde öğrendiğin tüm kelimeler burada birikecek. 🐣
            </p>
          ) : (
            <div className="mt-3 grid gap-2.5">
              {learnedWords.map((word) => (
                <div
                  key={word.en}
                  className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white p-3 shadow-card"
                >
                  <span className="text-2xl">{word.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-black text-quest-ink">{word.en}</p>
                    <p className="truncate text-sm font-semibold text-slate-500">
                      {word.tr} • “{word.pron}”
                    </p>
                  </div>
                  <SpeakButton text={word.en} />
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
