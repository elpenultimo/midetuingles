import Link from 'next/link';
import { LEVELS } from '@/lib/testEngine';
import HowItWorks from '@/components/HowItWorks';
import QuickInstructions from '@/components/QuickInstructions';
import LevelCards from '@/components/LevelCards';
import FAQAccordion from '@/components/FAQAccordion';

const highlights = [
  '⚡ Rápido y directo',
  '📱 Optimizado para móvil',
  '🎯 Niveles A1 a B2'
];

export default function LandingPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
          <span role="img" aria-label="spark">✨</span>
          Aprende en modo express
        </div>
        <div className="hero">
          <h1>Mide tu inglés</h1>
          <p>
            Descubre tu nivel real de inglés en minutos, sin registro y sin estrés.
            Preguntas claras, ritmo ágil y pensado para hacer desde el móvil.
          </p>
        </div>
        <div className="grid" style={{ margin: '1.25rem 0' }}>
          {highlights.map((item) => (
            <div key={item} className="pill" style={{ justifyContent: 'center' }}>
              {item}
            </div>
          ))}
        </div>
        <Link href="/test" className="button start-cta" aria-label="Empezar test ahora">
          Empezar ahora
        </Link>
        <div className="meta-row" style={{ justifyContent: 'center', marginTop: '1.25rem' }}>
          {LEVELS.map((level) => (
            <Link
              key={level}
              href={`/test/${level.toLowerCase()}`}
              className="badge"
              aria-label={`Ir al test nivel ${level}`}
            >
              Nivel {level}
            </Link>
          ))}
        </div>
      </div>
      <HowItWorks />
      <QuickInstructions />
      <LevelCards />
      <FAQAccordion />
    </div>
  );
}
