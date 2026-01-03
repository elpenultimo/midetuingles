'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultSummary from '@/components/ResultSummary';
import { clearFromStorage, loadFromStorage, STORAGE_KEYS } from '@/lib/storage';
import { AttemptState, LEVELS, Level, Question, getFinalLevel, getQuestionsByIds } from '@/lib/testEngine';

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

  const handleRetry = () => {
    clearFromStorage(STORAGE_KEYS.ATTEMPT_STATE);
    setAttempt(null);
    router.replace('/test/a1');
  };

  if (!attempt) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card">Preparando resultados...</div>
      </div>
    );
  }

  const finalLevel = getFinalLevel(attempt.resultsByLevel);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <div className="meta-row">
        <div className="badge">Resultado final</div>
        <div className="badge">Nivel estimado: {finalLevel === 'A1_in_progress' ? 'A1 en progreso' : finalLevel}</div>
      </div>
      <ResultSummary resultsByLevel={attempt.resultsByLevel} onRetry={handleRetry} />

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
