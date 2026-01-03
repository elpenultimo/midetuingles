interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const percent = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <div className="progress-shell">
        <div className="progress-fill" style={{ width: `${percent}%` }} aria-label={`Progreso ${percent}%`} />
      </div>
      <small style={{ color: 'var(--muted)' }}>{percent}% completado</small>
    </div>
  );
}

export default ProgressBar;
