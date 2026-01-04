import { Level } from '@/lib/testEngine';

interface Props {
  current: number;
  total: number;
  level?: Level;
}

export function ProgressBar({ current, total, level }: Props) {
  const percent = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);
  const showMilestone = current === 0 || current === total - 1 || current === Math.floor(total / 2);
  const levelClass = level ? ` level-${level.toLowerCase()}` : '';
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div className={`progress-shell progress-bar${levelClass}`}>
        <div className="progress-fill" style={{ width: `${percent}%` }} aria-label={`Progreso ${percent}%`} />
      </div>
      {showMilestone && total > 0 && (
        <small className="subtle">{percent}% completado</small>
      )}
    </div>
  );
}

export default ProgressBar;
