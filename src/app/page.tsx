import Link from 'next/link';
import { LEVELS } from '@/lib/testEngine';

const highlights = [
  'Sin registro ni datos personales',
  'Preguntas originales de grammar, vocab y reading',
  'Optimizado para móvil y resultados inmediatos'
];

export default function LandingPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="badge" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
          <span role="img" aria-label="target">🎯</span>
          Evalúa tu nivel de inglés en minutos
        </div>
        <h1>Mide tu inglés</h1>
        <p>
          Responde preguntas por nivel (A1-B2) y recibe tu calificación sin necesidad de crear una cuenta.
          Pensado para ser rápido, claro y SEO-friendly.
        </p>
        <div className="grid" style={{ margin: '1.5rem 0' }}>
          {highlights.map((item) => (
            <div key={item} className="pill" style={{ justifyContent: 'center' }}>
              {item}
            </div>
          ))}
        </div>
        <Link href="/test" className="button" aria-label="Empezar test">
          Empezar
        </Link>
        <div className="meta-row" style={{ justifyContent: 'center', marginTop: '1.25rem' }}>
          {LEVELS.map((level) => (
            <span key={level} className="badge">
              Nivel {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
