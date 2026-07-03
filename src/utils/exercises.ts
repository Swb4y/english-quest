import type { Exercise, Unit, Word } from '../types';

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickOthers(words: Word[], exclude: Word, count: number) {
  return shuffle(words.filter((word) => word.en !== exclude.en)).slice(0, count);
}

export function sentenceTokens(sentence: string) {
  return sentence.split(' ');
}

/** Bir ünite için karışık alıştırma seti üretir. */
export function buildExercises(unit: Unit): Exercise[] {
  const exercises: Exercise[] = [];
  const words = shuffle(unit.words);

  words.slice(0, 3).forEach((word) => {
    exercises.push({
      kind: 'meaning',
      word,
      options: shuffle([word.tr, ...pickOthers(unit.words, word, 2).map((other) => other.tr)]),
      answer: word.tr,
    });
  });

  words.slice(3, 6).forEach((word) => {
    exercises.push({
      kind: 'reverse',
      word,
      options: shuffle([word.en, ...pickOthers(unit.words, word, 2).map((other) => other.en)]),
      answer: word.en,
    });
  });

  words.slice(6, 8).forEach((word) => {
    exercises.push({
      kind: 'listening',
      word,
      options: shuffle([word.en, ...pickOthers(unit.words, word, 2).map((other) => other.en)]),
      answer: word.en,
    });
  });

  exercises.push({ kind: 'matching', pairs: shuffle(unit.words).slice(0, 4) });

  shuffle(unit.patterns)
    .slice(0, 2)
    .forEach((pattern) => {
      const tokens = sentenceTokens(pattern.en);
      let shuffled = shuffle(tokens);
      // Tek kelimelik olmayan cümlelerde karışık sıranın orijinalle aynı olmamasını sağla
      if (tokens.length > 1) {
        let guard = 0;
        while (shuffled.join(' ') === tokens.join(' ') && guard < 10) {
          shuffled = shuffle(tokens);
          guard++;
        }
      }
      exercises.push({ kind: 'sentence', pattern, shuffled });
    });

  return shuffle(exercises);
}

/** Öğrenilen kelimelerden hızlı tekrar seti üretir. */
export function buildReview(learned: Word[], questionCount = 10): Exercise[] {
  if (learned.length < 3) return [];

  const selection = shuffle(learned).slice(0, questionCount);
  return selection.map((word, index) => {
    const others = shuffle(learned.filter((other) => other.en !== word.en)).slice(0, 2);
    const kinds = ['meaning', 'reverse', 'listening'] as const;
    const kind = kinds[index % kinds.length];

    if (kind === 'meaning') {
      return {
        kind,
        word,
        options: shuffle([word.tr, ...others.map((other) => other.tr)]),
        answer: word.tr,
      };
    }
    return {
      kind,
      word,
      options: shuffle([word.en, ...others.map((other) => other.en)]),
      answer: word.en,
    };
  });
}
