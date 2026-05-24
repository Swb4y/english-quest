import type { DialogueTask as DialogueTaskType } from '../types';

type DialogueTaskProps = {
  task: DialogueTaskType;
  answer: string;
  onAnswer: (answer: string) => void;
};

export function DialogueTask({ task, answer, onAnswer }: DialogueTaskProps) {
  return (
    <article className="rounded-3xl bg-white p-4 shadow-soft">
      <p className="text-sm font-black text-slate-500">Dialogue</p>
      <div className="mt-3 space-y-3">
        <p className="rounded-2xl bg-indigo-50 p-3 text-sm font-bold leading-6 text-quest-blue">
          {task.lineBefore}
        </p>
        <div className="grid gap-2">
          {task.options.map((option) => {
            const selected = answer === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onAnswer(option)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-100 bg-slate-50 text-slate-700'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <p className="rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">{task.lineAfter}</p>
      </div>
    </article>
  );
}
