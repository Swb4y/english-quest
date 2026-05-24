import { useMemo, useState } from 'react';
import type { Lesson } from '../types';
import { DialogueTask } from './DialogueTask';
import { Quiz } from './Quiz';
import { SentenceTask } from './SentenceTask';
import { VocabularyCards } from './VocabularyCards';

type LessonViewProps = {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (score: number) => void;
};

type Step = 'words' | 'quiz' | 'dialogue' | 'sentence' | 'done';

const steps: Step[] = ['words', 'quiz', 'dialogue', 'sentence'];

export function LessonView({ lesson, onBack, onComplete }: LessonViewProps) {
  const [step, setStep] = useState<Step>('words');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [dialogueAnswer, setDialogueAnswer] = useState('');
  const [sentence, setSentence] = useState('');
  const [completed, setCompleted] = useState(false);

  const score = useMemo(
    () =>
      lesson.quiz.reduce(
        (total, question, index) => total + (quizAnswers[index] === question.answer ? 1 : 0),
        0,
      ),
    [lesson.quiz, quizAnswers],
  );

  const currentStepIndex = Math.max(steps.indexOf(step), 0);
  const allQuizAnswered = Object.keys(quizAnswers).length === lesson.quiz.length;
  const canContinue =
    step === 'words' ||
    (step === 'quiz' && allQuizAnswered) ||
    (step === 'dialogue' && dialogueAnswer === lesson.dialogue.answer) ||
    (step === 'sentence' && sentence.trim().length >= 8);

  function nextStep() {
    if (step === 'words') setStep('quiz');
    if (step === 'quiz') setStep('dialogue');
    if (step === 'dialogue') setStep('sentence');
    if (step === 'sentence') {
      if (!completed) {
        onComplete(score);
        setCompleted(true);
      }
      setStep('done');
    }
  }

  return (
    <main className="min-h-screen bg-indigo-50 px-4 pb-8 pt-5">
      <section className="mx-auto max-w-md">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-quest-blue shadow-soft"
        >
          Back
        </button>

        <header className="mt-5 rounded-3xl bg-quest-ink p-5 text-white shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-200">{lesson.cityStop}</p>
          <h1 className="mt-2 text-3xl font-black">{lesson.theme}</h1>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-quest-gold transition-all"
              style={{ width: `${step === 'done' ? 100 : ((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </header>

        <div className="mt-5">
          {step === 'words' && <VocabularyCards words={lesson.words} />}
          {step === 'quiz' && (
            <Quiz
              questions={lesson.quiz}
              answers={quizAnswers}
              onAnswer={(index, answer) => setQuizAnswers((current) => ({ ...current, [index]: answer }))}
            />
          )}
          {step === 'dialogue' && (
            <DialogueTask task={lesson.dialogue} answer={dialogueAnswer} onAnswer={setDialogueAnswer} />
          )}
          {step === 'sentence' && <SentenceTask task={lesson.sentence} value={sentence} onChange={setSentence} />}
          {step === 'done' && (
            <section className="rounded-3xl bg-white p-6 text-center shadow-soft">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-600">Mission Complete</p>
              <h2 className="mt-2 text-3xl font-black text-quest-ink">+{score * 10 + 30} XP earned</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Quiz score: {score}/5. The next city mission is now unlocked.
              </p>
              <button
                type="button"
                onClick={onBack}
                className="mt-5 w-full rounded-2xl bg-quest-blue px-5 py-4 text-base font-black text-white"
              >
                Return Home
              </button>
            </section>
          )}
        </div>

        {step !== 'done' && (
          <div className="sticky bottom-4 mt-5">
            <button
              type="button"
              onClick={nextStep}
              disabled={!canContinue}
              className="w-full rounded-2xl bg-quest-blue px-5 py-4 text-base font-black text-white shadow-soft disabled:bg-slate-300"
            >
              {step === 'sentence' ? 'Complete Mission' : 'Continue'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
