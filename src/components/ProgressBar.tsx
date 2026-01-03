interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const percent = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);
  const showMilestone = current === 0 || current === total - 1 || current === Math.floor(total / 2);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div className="progress-shell">
        <div className="progress-fill" style={{ width: `${percent}%` }} aria-label={`Progreso ${percent}%`} />
      </div>
      {showMilestone && total > 0 && (
        <small className="subtle">{percent}% completado</small>
      )}
    </div>
  );
}

export default ProgressBar;
