import Link from 'next/link';
import { FC } from 'react';

interface LevelCardsProps {
  showLink?: boolean;
}

const levels = [
  {
    level: 'A1',
    label: 'Básico',
    description: 'Entiendes frases muy comunes y te presentas en situaciones simples.'
  },
  {
    level: 'A2',
    label: 'Pre-intermedio',
    description: 'Te defiendes en rutinas: compras, direcciones, mensajes cortos.'
  },
  {
    level: 'B1',
    label: 'Intermedio',
    description: 'Conversas de temas cotidianos y entiendes lo esencial en trabajo/estudio.'
  },
  {
    level: 'B2',
    label: 'Intermedio alto',
    description: 'Te comunicas con fluidez razonable y entiendes textos más complejos.'
  },
  {
    level: 'C1',
    label: 'Avanzado',
    description: 'Te expresas con precisión, matizas ideas y manejas textos largos y especializados.'
  },
  {
    level: 'C2',
    label: 'Maestría',
    description: 'Comprendes prácticamente todo y adaptas el registro según el contexto sin esfuerzo.'
  }
];

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
          {levels.map((item) => (
            <div key={item.level} className="card level-card" aria-labelledby={`level-${item.level}`}>
              <div className="meta-row" style={{ marginBottom: '0.35rem' }}>
                <span className="badge">{item.level}</span>
                <strong className="level-label">{item.label}</strong>
              </div>
              <h3 id={`level-${item.level}`} style={{ marginBottom: '0.35rem' }}>
                Nivel {item.level}
              </h3>
              <p style={{ marginBottom: 0 }}>{item.description}</p>
            </div>
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
