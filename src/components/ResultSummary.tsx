import Link from 'next/link';
import { LEVELS, Level, LevelResult, getFinalLevel } from '@/lib/testEngine';

interface Props {
  resultsByLevel: Partial<Record<Level, LevelResult>>;
  onRetry: () => void;
}

export function ResultSummary({ resultsByLevel, onRetry }: Props) {
  const finalLevel = getFinalLevel(resultsByLevel);

  return (
    <div className="card">
      <div className="meta-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ marginBottom: '0.25rem', color: 'var(--muted)' }}>Nivel estimado</p>
          <h2 style={{ marginBottom: '0.35rem' }}>{finalLevel === 'A1_in_progress' ? 'A1 en progreso' : finalLevel}</h2>
          <p style={{ marginBottom: 0, color: 'var(--text-soft)' }}>
            ¡Bien hecho! Mantén el ritmo y vuelve a intentarlo para seguir subiendo.
          </p>
        </div>
        <button className="button" type="button" onClick={onRetry}>
          Repetir test
        </button>
      </div>
      <table className="table" aria-label="Resumen de resultados">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>Correctas / Total</th>
            <th>Score</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {LEVELS.map((level) => {
            const result = resultsByLevel[level];
            if (!result) return null;
            return (
              <tr key={level}>
                <td>{level}</td>
                <td>
                  {result.correct}/{result.total}
                </td>
                <td>{result.score}%</td>
                <td style={{ color: result.passed ? 'var(--success)' : 'var(--danger)' }}>
                  {result.passed ? 'Aprobado' : 'Reprobado'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link href="/test/a1" className="button secondary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ResultSummary;
