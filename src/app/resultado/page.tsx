'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ResultSummary from '@/components/ResultSummary';
import { clearFromStorage, loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import {
  AttemptState,
  LEVELS,
  Level,
  Question,
  getFinalLevel,
  getQuestionsByIds,
  makeEmptyAttempt,
  selectQuestions,
  QUESTIONS_PER_LEVEL
} from '@/lib/testEngine';
import { LEVEL_DETAILS, getNextLevel } from '@/lib/levelInfo';
import { LEVEL_RESULT_MESSAGES, getOrientativeNote } from '@/lib/resultCopy';

export default function ResultadoPage() {
  const router = useRouter();
  const [attempt, setAttempt] = useState<AttemptState | null>(null);

  useEffect(() => {
    const stored = loadFromStorage<AttemptState>(STORAGE_KEYS.ATTEMPT_STATE);
    if (!stored || !stored.resultsByLevel) {
      router.replace('/test/a1');
      return;
    }
    setAttempt(stored);
  }, [router]);

  const questionsByLevel = useMemo(() => {
    if (!attempt) return {} as Record<Level, Question[]>;
    const result: Partial<Record<Level, Question[]>> = {};
    LEVELS.forEach((lvl) => {
      const saved = attempt.questionsByLevel?.[lvl];
      if (saved) {
        result[lvl] = saved;
      } else if (attempt.questionIdsByLevel?.[lvl]) {
        result[lvl] = getQuestionsByIds(attempt.questionIdsByLevel[lvl] as string[]);
      }
    });
    return result as Record<Level, Question[]>;
  }, [attempt]);

  const seedAttempt = (targetLevel: Level) => {
    const fresh = makeEmptyAttempt();
    const questions = selectQuestions(targetLevel, QUESTIONS_PER_LEVEL);
    fresh.questionsByLevel = { [targetLevel]: questions };
    fresh.questionIdsByLevel = { [targetLevel]: questions.map((q) => q.id) };
    fresh.answersByLevel = { [targetLevel]: Array(questions.length).fill(null) };
    fresh.currentLevel = targetLevel;
    saveToStorage(STORAGE_KEYS.ATTEMPT_STATE, fresh);
    setAttempt(fresh);
    router.replace(`/test/${targetLevel.toLowerCase()}`);
  };

  const handleRetry = () => {
    clearFromStorage(STORAGE_KEYS.ATTEMPT_STATE);
    seedAttempt('A1');
  };

  const handleTryNext = (current: Level) => {
    const next = getNextLevel(current);
    if (next) {
      clearFromStorage(STORAGE_KEYS.ATTEMPT_STATE);
      seedAttempt(next);
    }
  };

  if (!attempt) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card">Preparando resultados...</div>
      </div>
    );
  }

  const finalLevel = getFinalLevel(attempt.resultsByLevel);
  const finalKey = finalLevel === 'A1_in_progress' ? 'A1' : finalLevel;
  const levelDetail = LEVEL_DETAILS[finalKey];
  const humanResultLine = LEVEL_RESULT_MESSAGES[finalKey as Level];
  const orientativeNote = getOrientativeNote(finalKey as Level, levelDetail?.note);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <div className={`card result-card level-${finalKey.toLowerCase()}`} style={{ marginBottom: '1rem' }}>
        <div className="level-accent" aria-hidden />
        <div className="meta-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--muted)', marginBottom: '0.35rem' }}>Resumen final</p>
            <div className="meta-row" style={{ marginBottom: '0.2rem' }}>
              <span className={`badge level-badge level-${finalKey.toLowerCase()}`}>
                {finalLevel === 'A1_in_progress' ? 'A1 en progreso' : `Nivel ${finalLevel}`}
              </span>
              <strong className="level-label">{levelDetail?.title}</strong>
            </div>
            {humanResultLine && (
              <p className="result-human" style={{ margin: '0.35rem 0' }}>
                {humanResultLine}
              </p>
            )}
            <p style={{ marginBottom: 0, color: 'var(--text-soft)' }}>{levelDetail?.summary}</p>
            {orientativeNote && (
              <small className="subtle" style={{ display: 'block', marginTop: '0.35rem' }}>
                {orientativeNote}
              </small>
            )}
            {levelDetail?.note && (
              <small className="subtle" style={{ marginTop: '0.35rem', display: 'block' }}>
                {levelDetail.note}
              </small>
            )}
          </div>
          <div className="cta-stack">
            <button className="button" type="button" onClick={handleRetry}>
              Repetir test
            </button>
            {finalLevel !== 'A1_in_progress' && finalLevel !== 'C2' && (
              <button className="button secondary" type="button" onClick={() => handleTryNext(finalLevel as Level)}>
                Probar nivel superior
              </button>
            )}
            <Link href="/" className="button secondary" style={{ justifyContent: 'center' }}>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
      <ResultSummary resultsByLevel={attempt.resultsByLevel} onRetry={handleRetry} onTryNext={(lvl) => handleTryNext(lvl)} />

      {LEVELS.map((level) => {
        const questions = questionsByLevel[level];
        const answers = attempt.answersByLevel?.[level];
        const result = attempt.resultsByLevel?.[level];
        if (!questions || !answers || !result) return null;
        return (
          <div key={level} className="card" style={{ marginTop: '1rem' }}>
            <div className="meta-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ marginBottom: 0 }}>Detalle nivel {level}</h3>
              <span className="badge" style={{ color: result.passed ? 'var(--success)' : 'var(--danger)' }}>
                {result.passed ? 'Aprobado' : 'Reprobado'} ({result.score}%)
              </span>
            </div>
            <div className="grid">
              {questions.map((q, idx) => {
                const chosen = answers[idx];
                return (
                  <div key={q.id} className="alert">
                    <p style={{ color: 'var(--muted)', marginBottom: '0.35rem' }}>
                      {q.type.toUpperCase()} · Pregunta {idx + 1}
                    </p>
                    {q.passage && <div style={{ marginBottom: '0.5rem' }}>{q.passage}</div>}
                    <strong>{q.question}</strong>
                    <div style={{ marginTop: '0.35rem', color: 'var(--muted)' }}>
                      Tu respuesta: {typeof chosen === 'number' ? q.options[chosen] : 'Sin responder'}
                    </div>
                    <div style={{ marginTop: '0.25rem', color: 'var(--success)' }}>
                      Respuesta correcta: {q.options[q.answerIndex]}
                    </div>
                    {q.explanation && (
                      <div style={{ marginTop: '0.35rem', color: 'var(--muted)' }}>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
