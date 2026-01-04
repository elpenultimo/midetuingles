'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import { clearFromStorage, loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import {
  AttemptState,
  Level,
  LEVELS,
  QUESTIONS_PER_LEVEL,
  gradeLevel,
  makeEmptyAttempt,
  selectQuestions
} from '@/lib/testEngine';
import { LEVEL_DETAILS } from '@/lib/levelInfo';

interface TestLevelClientProps {
  level: string;
}

function isValidLevel(level: string): level is Level {
  return LEVELS.includes(level as Level);
}

function ensureLevelQuestions(state: AttemptState, level: Level): AttemptState {
  if (state.questionsByLevel?.[level]) return state;
  const questions = selectQuestions(level, QUESTIONS_PER_LEVEL);
  state.questionsByLevel = { ...state.questionsByLevel, [level]: questions };
  state.questionIdsByLevel = { ...state.questionIdsByLevel, [level]: questions.map((q) => q.id) };
  state.answersByLevel = { ...state.answersByLevel, [level]: Array(questions.length).fill(null) };
  return state;
}

export default function TestLevelClient({ level }: TestLevelClientProps) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<AttemptState | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const levelParam = level?.toUpperCase() as Level;
  const levelDetail = LEVEL_DETAILS[levelParam];

  useEffect(() => {
    if (!isValidLevel(levelParam)) {
      router.replace('/test/a1');
      return;
    }

    const stored = loadFromStorage<AttemptState>(STORAGE_KEYS.ATTEMPT_STATE);
    let working = stored ?? makeEmptyAttempt();
    working.currentLevel = working.currentLevel || 'A1';

    if (working.currentLevel !== levelParam) {
      // guard against skipping ahead
      router.replace(`/test/${working.currentLevel.toLowerCase()}`);
      return;
    }

    working = ensureLevelQuestions(working, levelParam);
    saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, working);
    setAttempt(working);

    const answers = working.answersByLevel?.[levelParam] ?? [];
    const nextUnanswered = answers.findIndex((ans) => ans === null || typeof ans === 'undefined');
    setCurrentIndex(nextUnanswered >= 0 ? nextUnanswered : 0);
    setLoading(false);
  }, [levelParam, router]);

  const questions = useMemo(() => {
    if (!attempt || !isValidLevel(levelParam)) return [];
    return attempt.questionsByLevel?.[levelParam] ?? [];
  }, [attempt, levelParam]);

  if (!isValidLevel(levelParam)) {
    return null;
  }

  if (loading || !attempt) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card">Cargando preguntas...</div>
      </div>
    );
  }

  const answersForLevel = attempt.answersByLevel?.[levelParam] ?? [];
  const selectedAnswer = answersForLevel[currentIndex] ?? null;
  const hasProgress =
    currentIndex > 0 || answersForLevel.some((ans) => ans !== null && typeof ans !== 'undefined');

  const handleSelect = (idx: number) => {
    const newAnswers = [...answersForLevel];
    newAnswers[currentIndex] = idx;
    const updatedAttempt: AttemptState = {
      ...attempt,
      answersByLevel: { ...attempt.answersByLevel, [levelParam]: newAnswers }
    };
    setAttempt(updatedAttempt);
    saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, updatedAttempt);
  };

  const updateHistoryScores = (level: Level, resultScore: number, passed: boolean) => {
    const bestLevel = loadFromStorage<Level>(STORAGE_KEYS.BEST_LEVEL);
    const bestScores = loadFromStorage<Record<string, number>>(STORAGE_KEYS.BEST_SCORES) || {};
    if (passed) {
      const newBestLevel = LEVELS[Math.max(LEVELS.indexOf(bestLevel ?? 'A1'), LEVELS.indexOf(level))];
      saveToStorage(STORAGE_KEYS.BEST_LEVEL, newBestLevel);
    }
    if (!bestScores[level] || resultScore > bestScores[level]) {
      bestScores[level] = resultScore;
      saveToStorage(STORAGE_KEYS.BEST_SCORES, bestScores);
    }
    saveToStorage(STORAGE_KEYS.LAST_ATTEMPT, Date.now());
  };

  const goToResults = (state: AttemptState) => {
    saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, state);
    router.push('/resultado');
  };

  const handleNext = () => {
    if (selectedAnswer === null || typeof selectedAnswer === 'undefined') return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      return;
    }

    // grade level
    const result = gradeLevel(answersForLevel, questions);
    updateHistoryScores(levelParam, result.score, result.passed);

    const updatedResults: AttemptState = {
      ...attempt,
      resultsByLevel: { ...attempt.resultsByLevel, [levelParam]: result }
    };

    if (result.passed) {
      const currentIdx = LEVELS.indexOf(levelParam);
      if (currentIdx < LEVELS.length - 1) {
        const nextLevel = LEVELS[currentIdx + 1];
        const withNext = ensureLevelQuestions({ ...updatedResults, currentLevel: nextLevel }, nextLevel);
        setAttempt(withNext);
        saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, withNext);
        router.push(`/test/${nextLevel.toLowerCase()}`);
        return;
      }
    }

    const finished = { ...updatedResults };
    finished.currentLevel = levelParam;
    saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, finished);
    goToResults(finished);
  };

  const handleReset = () => {
    clearFromStorage(STORAGE_KEYS.ATTEMPT_STATE);
    const fresh = ensureLevelQuestions(makeEmptyAttempt(), 'A1');
    fresh.currentLevel = 'A1';
    saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, fresh);
    router.replace('/test/a1');
  };

  const handleExitRequest = () => {
    if (!hasProgress) {
      clearFromStorage(STORAGE_KEYS.ATTEMPT_STATE);
      router.push('/');
      return;
    }

    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    clearFromStorage(STORAGE_KEYS.ATTEMPT_STATE);
    setShowExitConfirm(false);
    router.push('/');
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <button type="button" className="back-link" onClick={handleExitRequest}>
          <span aria-hidden="true">←</span>
          Inicio
        </button>
      </div>
      <div className="level-banner">
        <div className={`badge level-badge level-${levelParam.toLowerCase()}`}>
          Nivel {levelParam} · {levelDetail?.title}
        </div>
        {levelDetail?.note && (
          <small className="subtle" style={{ marginTop: '0.35rem', display: 'block' }}>
            {levelDetail.note}
          </small>
        )}
      </div>
      <div className="meta-row">
        <div className="badge">Nivel {levelParam}</div>
        <div className="badge">Mínimo para aprobar: 70%</div>
      </div>
      <div className="sticky-progress">
        <ProgressBar current={currentIndex} total={questions.length} level={levelParam} />
        <div className="calm-copy">
          <small>No hay penalización por equivocarse · Puedes reiniciar el test cuando quieras</small>
        </div>
      </div>
      <QuestionCard
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        selected={selectedAnswer}
        onSelect={handleSelect}
      />
      <div className="meta-row" style={{ justifyContent: 'space-between', marginTop: '1rem' }}>
        <button className="button secondary" type="button" onClick={handleReset}>
          Reiniciar intento
        </button>
        <button
          className="button"
          type="button"
          disabled={selectedAnswer === null || typeof selectedAnswer === 'undefined'}
          onClick={handleNext}
        >
          {currentIndex === questions.length - 1 ? 'Terminar nivel' : 'Siguiente'}
        </button>
      </div>
      {showExitConfirm && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="exit-confirm-title">
          <div className="modal">
            <h3 id="exit-confirm-title">¿Salir del test?</h3>
            <p>Perderás tu progreso actual.</p>
            <div className="modal-actions">
              <button className="button secondary" type="button" onClick={handleCancelExit}>
                Cancelar
              </button>
              <button className="button" type="button" onClick={handleConfirmExit}>
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
