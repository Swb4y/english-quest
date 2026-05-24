import type { QuizQuestion } from '../types';

type QuizProps = {
  questions: QuizQuestion[];
  answers: Record<number, string>;
  onAnswer: (index: number, answer: string) => void;
};

export function Quiz({ questions, answers, onAnswer }: QuizProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <article key={question.prompt} className="rounded-3xl bg-white p-4 shadow-soft">
          <p className="text-sm font-black text-slate-500">Question {index + 1}</p>
          <h3 className="mt-2 text-lg font-black leading-7 text-quest-ink">{question.prompt}</h3>
          <div className="mt-4 grid gap-2">
            {question.options.map((option) => {
              const selected = answers[index] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onAnswer(index, option)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                    selected
                      ? 'border-quest-blue bg-indigo-50 text-quest-blue'
                      : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-indigo-200'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
