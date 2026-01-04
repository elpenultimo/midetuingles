import Link from 'next/link';
import { FC } from 'react';
import { LEVEL_DETAILS } from '@/lib/levelInfo';

interface LevelCardsProps {
  showLink?: boolean;
}

const LevelCards: FC<LevelCardsProps> = ({ showLink = true }) => {
  return (
    <section className="section" aria-labelledby="levels-heading">
      <div className="container narrow" id="niveles">
        <header className="section-header">
          <div className="eyebrow" style={{ width: 'fit-content' }}>Niveles</div>
          <h2 id="levels-heading">¿Qué significan los niveles?</h2>
          <p className="section-subtitle">Basado en el MCER (Marco Común Europeo de Referencia).</p>
        </header>
        <div className="grid two level-grid">
          {Object.entries(LEVEL_DETAILS).map(([level, detail]) => (
            <Link
              key={level}
              href={`/test/${level.toLowerCase()}`}
              className={`card level-card clickable level-${level.toLowerCase()}`}
              aria-labelledby={`level-${level}`}
            >
              <div className="meta-row" style={{ marginBottom: '0.35rem', justifyContent: 'space-between' }}>
                <span className={`badge level-badge level-${level.toLowerCase()}`}>Nivel {level}</span>
                <strong className="level-label">{detail.title}</strong>
              </div>
              <h3 id={`level-${level}`} style={{ marginBottom: '0.35rem' }}>
                {detail.shortDescription}
              </h3>
              <p style={{ marginBottom: 0 }}>
                {detail.summary}
                {detail.note && <span style={{ display: 'block', marginTop: '0.35rem' }}>{detail.note}</span>}
              </p>
            </Link>
          ))}
        </div>
        {showLink && (
          <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
            <Link href="/niveles" className="button secondary">
              Ver explicación completa de niveles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LevelCards;
