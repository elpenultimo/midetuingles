import Link from 'next/link';
import { LEVELS, Level, LevelResult, getFinalLevel } from '@/lib/testEngine';
import { LEVEL_DETAILS, getNextLevel } from '@/lib/levelInfo';

interface Props {
  resultsByLevel: Partial<Record<Level, LevelResult>>;
  onRetry: () => void;
  onTryNext?: (level: Level) => void;
}

export function ResultSummary({ resultsByLevel, onRetry, onTryNext }: Props) {
  const finalLevel = getFinalLevel(resultsByLevel);
  const finalKey = finalLevel === 'A1_in_progress' ? 'A1' : finalLevel;
  const nextLevel = finalLevel === 'A1_in_progress' ? null : getNextLevel(finalLevel);
  const detail = LEVEL_DETAILS[finalKey];
  const accentClass = `level-${finalKey.toLowerCase()}`;
  const humanNotes: Partial<Record<Level, string>> = {
    A1: 'Bases iniciales: puedes saludar y compartir datos simples.',
    A2: 'Nivel básico cómodo: entiendes frases habituales y te haces entender.',
    B1: 'Buen nivel intermedio: ya puedes desenvolverte en situaciones comunes.',
    B2: 'Sólido intermedio alto: sostienes conversaciones fluidas y precisas.',
    C1: 'Nivel avanzado: manejas matices y vocabulario amplio sin esfuerzo.',
    C2: 'Dominio casi nativo: te mueves con soltura en cualquier contexto.'
  };

  return (
    <div className={`card result-card ${accentClass}`}>
      <div className="level-accent" aria-hidden />
      <div className="meta-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ marginBottom: '0.35rem', color: 'var(--muted)' }}>Nivel estimado</p>
          <div className="meta-row" style={{ marginBottom: '0.25rem' }}>
            <span className={`badge level-badge level-${finalKey.toLowerCase()}`}>
              {finalLevel === 'A1_in_progress' ? 'A1 en progreso' : `Nivel ${finalLevel}`}
            </span>
            <strong className="level-label">{detail?.title}</strong>
          </div>
          <p style={{ marginBottom: 0, color: 'var(--text-soft)' }}>{detail?.summary}</p>
          {detail?.note && (
            <small className="subtle" style={{ display: 'block', marginTop: '0.35rem' }}>
              {detail.note}
            </small>
          )}
          {humanNotes[finalKey as Level] && (
            <p className="result-human" style={{ marginTop: '0.55rem' }}>
              {humanNotes[finalKey as Level]}
            </p>
          )}
        </div>
        <div className="cta-stack">
          <button className="button" type="button" onClick={onRetry}>
            Repetir test
          </button>
          {nextLevel && onTryNext && (
            <button className="button secondary" type="button" onClick={() => onTryNext(nextLevel)}>
              Probar nivel superior ({nextLevel})
            </button>
          )}
        </div>
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
