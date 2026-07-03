import { useMemo, useState } from 'react';
import type { ChoiceExercise, Exercise, MatchingExercise, SentenceExercise } from '../types';
import { shuffle } from '../utils/exercises';
import { speak } from '../utils/speech';
import { SpeakButton } from './SpeakButton';

type ExercisePlayerProps = {
  exercises: Exercise[];
  onFinish: (correct: number, total: number) => void;
};

type Phase = 'answering' | 'correct' | 'wrong';

const praise = ['Harikasın! 🎉', 'Süpersin! 🌟', 'Çok iyi! 👏', 'Aynen böyle! 💪', 'Mükemmel! 🥳'];

export function ExercisePlayer({ exercises, onFinish }: ExercisePlayerProps) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');

  const exercise = exercises[index];
  const total = exercises.length;

  function answer(isCorrect: boolean) {
    setPhase(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setCorrectCount((count) => count + 1);
  }

  function next() {
    if (index + 1 >= total) {
      onFinish(correctCount, total);
      return;
    }
    setIndex(index + 1);
    setPhase('answering');
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-indigo-100">
          <div
            className="h-full rounded-full bg-gradient-quest transition-all duration-500"
            style={{ width: `${((index + (phase === 'answering' ? 0 : 1)) / total) * 100}%` }}
          />
        </div>
        <p className="text-xs font-black text-slate-400">
          {index + 1}/{total}
        </p>
      </div>

      <div className="mt-5" key={index}>
        {(exercise.kind === 'meaning' || exercise.kind === 'reverse' || exercise.kind === 'listening') && (
          <ChoiceCard exercise={exercise} phase={phase} onAnswer={answer} />
        )}
        {exercise.kind === 'matching' && (
          <MatchingCard exercise={exercise} phase={phase} onDone={answer} />
        )}
        {exercise.kind === 'sentence' && (
          <SentenceCard exercise={exercise} phase={phase} onAnswer={answer} />
        )}
      </div>

      {phase !== 'answering' && (
        <div
          className={`mt-4 rounded-3xl p-4 text-center animate-pop-in ${
            phase === 'correct' ? 'bg-emerald-100' : 'bg-amber-100'
          }`}
        >
          <p className={`text-base font-black ${phase === 'correct' ? 'text-emerald-700' : 'text-amber-800'}`}>
            {phase === 'correct' ? praise[index % praise.length] : 'Olsun, öğreniyorsun! 💛'}
          </p>
          {phase === 'wrong' && (
            <p className="mt-1 text-sm font-bold text-amber-700">
              Doğru cevap: {correctAnswerText(exercise)}
            </p>
          )}
          <button
            type="button"
            onClick={next}
            className={`mt-3 w-full rounded-2xl px-5 py-3.5 text-base font-black text-white transition active:scale-95 ${
              phase === 'correct' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          >
            {index + 1 >= total ? 'Bitir 🏁' : 'Devam Et ➡️'}
          </button>
        </div>
      )}
    </div>
  );
}

function correctAnswerText(exercise: Exercise) {
  if (exercise.kind === 'matching') return 'eşleştirmeleri yukarıda görebilirsin';
  if (exercise.kind === 'sentence') return `"${exercise.pattern.en}"`;
  return `"${exercise.answer}"`;
}

function ChoiceCard({
  exercise,
  phase,
  onAnswer,
}: {
  exercise: ChoiceExercise;
  phase: Phase;
  onAnswer: (isCorrect: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const { word } = exercise;

  const heading =
    exercise.kind === 'meaning'
      ? 'Bu kelime ne demek?'
      : exercise.kind === 'reverse'
        ? 'Bunun İngilizcesi hangisi?'
        : 'Dinle! Hangi kelimeyi duydun?';

  function choose(option: string) {
    if (phase !== 'answering') return;
    setSelected(option);
    const isCorrect = option === exercise.answer;
    if (exercise.kind !== 'meaning') speak(exercise.answer);
    onAnswer(isCorrect);
  }

  return (
    <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-card animate-pop-in">
      <p className="text-center text-sm font-black uppercase tracking-wider text-quest-blue">{heading}</p>

      <div className="mt-4 text-center">
        {exercise.kind === 'meaning' && (
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{word.emoji}</span>
            <h2 className="text-3xl font-black text-quest-ink">{word.en}</h2>
            <SpeakButton text={word.en} />
          </div>
        )}
        {exercise.kind === 'reverse' && (
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{word.emoji}</span>
            <h2 className="text-3xl font-black text-quest-ink">{word.tr}</h2>
          </div>
        )}
        {exercise.kind === 'listening' && (
          <button
            type="button"
            onClick={() => speak(word.en)}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-quest text-5xl text-white shadow-soft transition active:scale-90"
            aria-label="Kelimeyi dinle"
          >
            🔊
          </button>
        )}
        {exercise.kind === 'listening' && (
          <p className="mt-3 text-xs font-bold text-slate-400">Tekrar dinlemek için butona bas</p>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        {exercise.options.map((option) => {
          const isAnswer = option === exercise.answer;
          const isSelected = option === selected;
          let style = 'border-slate-200 bg-slate-50 text-quest-ink hover:border-quest-blue/40';
          if (phase !== 'answering') {
            if (isAnswer) style = 'border-emerald-400 bg-emerald-50 text-emerald-700';
            else if (isSelected) style = 'border-rose-300 bg-rose-50 text-rose-600 animate-shake';
            else style = 'border-slate-200 bg-slate-50 text-slate-400';
          }
          return (
            <button
              key={option}
              type="button"
              disabled={phase !== 'answering'}
              onClick={() => choose(option)}
              className={`rounded-2xl border-2 px-4 py-3.5 text-left text-base font-extrabold transition active:scale-[0.98] ${style}`}
            >
              {option}
              {phase !== 'answering' && isAnswer && ' ✅'}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MatchingCard({
  exercise,
  phase,
  onDone,
}: {
  exercise: MatchingExercise;
  phase: Phase;
  onDone: (isCorrect: boolean) => void;
}) {
  const left = exercise.pairs;
  const right = useMemo(() => shuffle(exercise.pairs), [exercise.pairs]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [wrongTr, setWrongTr] = useState<string | null>(null);

  function pickEn(en: string) {
    if (phase !== 'answering' || matched.includes(en)) return;
    speak(en);
    setSelectedEn(en);
  }

  function pickTr(pairEn: string, tr: string) {
    if (phase !== 'answering' || !selectedEn || matched.includes(pairEn)) return;
    if (pairEn === selectedEn) {
      const nowMatched = [...matched, pairEn];
      setMatched(nowMatched);
      setSelectedEn(null);
      if (nowMatched.length === left.length) {
        onDone(mistakes === 0);
      }
    } else {
      setMistakes((count) => count + 1);
      setWrongTr(tr);
      window.setTimeout(() => setWrongTr(null), 400);
    }
  }

  return (
    <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-card animate-pop-in">
      <p className="text-center text-sm font-black uppercase tracking-wider text-quest-blue">
        Eşleştir! Önce İngilizce, sonra Türkçesi
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="grid content-start gap-3">
          {left.map((pair) => {
            const done = matched.includes(pair.en);
            const active = selectedEn === pair.en;
            return (
              <button
                key={pair.en}
                type="button"
                disabled={done}
                onClick={() => pickEn(pair.en)}
                className={`rounded-2xl border-2 px-3 py-3 text-sm font-extrabold transition active:scale-95 ${
                  done
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-600'
                    : active
                      ? 'border-quest-blue bg-quest-blue/10 text-quest-blue shadow-glow'
                      : 'border-slate-200 bg-slate-50 text-quest-ink'
                }`}
              >
                {pair.emoji} {pair.en}
              </button>
            );
          })}
        </div>
        <div className="grid content-start gap-3">
          {right.map((pair) => {
            const done = matched.includes(pair.en);
            const isWrong = wrongTr === pair.tr;
            return (
              <button
                key={pair.tr}
                type="button"
                disabled={done}
                onClick={() => pickTr(pair.en, pair.tr)}
                className={`rounded-2xl border-2 px-3 py-3 text-sm font-extrabold transition active:scale-95 ${
                  done
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-600'
                    : isWrong
                      ? 'border-rose-300 bg-rose-50 text-rose-600 animate-shake'
                      : 'border-slate-200 bg-slate-50 text-quest-ink'
                }`}
              >
                {pair.tr}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 text-center text-xs font-bold text-slate-400">
        {selectedEn ? 'Şimdi Türkçe karşılığına dokun 👉' : 'Önce soldan bir İngilizce kelime seç 👈'}
      </p>
    </section>
  );
}

function SentenceCard({
  exercise,
  phase,
  onAnswer,
}: {
  exercise: SentenceExercise;
  phase: Phase;
  onAnswer: (isCorrect: boolean) => void;
}) {
  const [picked, setPicked] = useState<number[]>([]);
  const tokens = exercise.shuffled;
  const sentence = picked.map((i) => tokens[i]).join(' ');
  const complete = picked.length === tokens.length;

  function toggle(index: number) {
    if (phase !== 'answering') return;
    setPicked((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
    );
  }

  function check() {
    const isCorrect = sentence === exercise.pattern.en;
    if (isCorrect) speak(exercise.pattern.en);
    onAnswer(isCorrect);
  }

  return (
    <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-card animate-pop-in">
      <p className="text-center text-sm font-black uppercase tracking-wider text-quest-blue">
        Cümleyi kur!
      </p>
      <p className="mt-3 rounded-2xl bg-indigo-50 p-3 text-center text-base font-extrabold text-quest-ink">
        🇹🇷 {exercise.pattern.tr}
      </p>

      <div className="mt-4 min-h-[64px] rounded-2xl border-2 border-dashed border-indigo-200 bg-slate-50 p-3 text-lg font-extrabold text-quest-ink">
        {sentence || <span className="text-sm font-bold text-slate-400">Kelimelere sırayla dokun…</span>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tokens.map((token, index) => {
          const used = picked.includes(index);
          return (
            <button
              key={`${token}-${index}`}
              type="button"
              disabled={phase !== 'answering'}
              onClick={() => toggle(index)}
              className={`rounded-2xl border-2 px-4 py-2.5 text-base font-extrabold transition active:scale-95 ${
                used
                  ? 'border-quest-blue bg-quest-blue text-white'
                  : 'border-slate-200 bg-slate-50 text-quest-ink'
              }`}
            >
              {token}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-xs font-bold text-slate-400">
        Seçtiğin kelimeye tekrar dokunursan geri alınır
      </p>

      {phase === 'answering' && (
        <button
          type="button"
          disabled={!complete}
          onClick={check}
          className="mt-4 w-full rounded-2xl bg-gradient-quest px-5 py-3.5 text-base font-black text-white transition active:scale-95 disabled:opacity-40"
        >
          Kontrol Et ✔️
        </button>
      )}
    </section>
  );
}
