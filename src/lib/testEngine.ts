import questionsData from '@/data/questions.en.cefr.json';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type QuestionType = 'grammar' | 'vocab' | 'reading';

export interface Question {
  id: string;
  level: Level;
  type: QuestionType;
  prompt?: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  passage?: string;
}

export interface LevelResult {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
}

export interface AttemptState {
  currentLevel: Level;
  questionIdsByLevel: Partial<Record<Level, string[]>>;
  answersByLevel: Partial<Record<Level, number[]>>;
  resultsByLevel: Partial<Record<Level, LevelResult>>;
  startedAt: number;
  questionsByLevel?: Partial<Record<Level, Question[]>>;
}

export const PASS_MARK = 70;
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const QUESTIONS_PER_LEVEL = 10; // ready to scale to 20

function fisherYatesShuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestionOptions(question: Question): Question {
  const indices = question.options.map((_, idx) => idx);
  const shuffledIndices = fisherYatesShuffle(indices);
  const newOptions = shuffledIndices.map((idx) => question.options[idx]);
  const newAnswerIndex = shuffledIndices.indexOf(question.answerIndex);
  return { ...question, options: newOptions, answerIndex: newAnswerIndex };
}

export function selectQuestions(level: Level, count: number, types?: QuestionType[]): Question[] {
  const all = (questionsData.questions as Question[]).filter((q) => q.level === level && (!types || types.includes(q.type)));
  const shuffled = fisherYatesShuffle(all);
  const picked = shuffled.slice(0, Math.min(count, shuffled.length));
  return picked.map(shuffleQuestionOptions);
}

export function gradeLevel(answers: Array<number | null>, questions: Question[]): LevelResult {
  const total = questions.length;
  let correct = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === q.answerIndex) correct += 1;
  });
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  const passed = score >= PASS_MARK;
  return { correct, total, score, passed };
}

export function getFinalLevel(resultsByLevel: Partial<Record<Level, LevelResult>>): Level | 'A1_in_progress' {
  const passedLevels = LEVELS.filter((lvl) => resultsByLevel[lvl]?.passed);
  if (passedLevels.length === 0) {
    return 'A1_in_progress';
  }
  return passedLevels[passedLevels.length - 1];
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map((questionsData.questions as Question[]).map((q) => [q.id, q]));
  return ids.map((id) => map.get(id)).filter(Boolean) as Question[];
}

export function makeEmptyAttempt(startingLevel: Level = 'A1'): AttemptState {
  return {
    currentLevel: startingLevel,
    questionIdsByLevel: {},
    answersByLevel: {},
    resultsByLevel: {},
    startedAt: Date.now(),
    questionsByLevel: {}
  };
}
