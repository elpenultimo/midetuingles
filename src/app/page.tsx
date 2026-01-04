import Link from 'next/link';
import { LEVELS } from '@/lib/testEngine';
import HowItWorks from '@/components/HowItWorks';
import QuickInstructions from '@/components/QuickInstructions';
import LevelCards from '@/components/LevelCards';
import FAQAccordion from '@/components/FAQAccordion';

const highlights = [
  '⚡ Rápido y directo',
  '📱 Optimizado para móvil',
  '🎯 Niveles A1 a C2'
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
          <p className="hero-subtitle">
            Descubre tu nivel real de inglés en minutos, sin registro y sin estrés.
            Preguntas claras, ritmo ágil y pensado para hacer desde el móvil.
          </p>
        </div>
        <div className="grid" style={{ margin: '1.45rem 0' }}>
          {highlights.map((item) => (
            <div key={item} className="pill" style={{ justifyContent: 'center' }}>
              {item}
            </div>
          ))}
        </div>
        <div className="cta-cluster">
          <Link href="/test" className="button start-cta" aria-label="Empezar test ahora">
            Empezar ahora
          </Link>
          <div className="meta-row" style={{ justifyContent: 'center', marginTop: '0.85rem' }}>
            {LEVELS.map((level) => (
              <Link
                key={level}
                href={`/test/${level.toLowerCase()}`}
                className={`badge level-badge level-${level.toLowerCase()} badge-ghost`}
                aria-label={`Ir al test nivel ${level}`}
              >
                Nivel {level}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <HowItWorks />
      <QuickInstructions />
      <section className="section" aria-labelledby="what-it-evaluates">
        <div className="container narrow info-block">
          <header className="section-header">
            <div className="eyebrow" style={{ width: 'fit-content' }}>Qué evalúa este test</div>
            <h2 id="what-it-evaluates">Tu inglés real, en 3 frentes</h2>
            <p className="section-subtitle">Balance entre comprensión, precisión y vocabulario.</p>
          </header>
          <div className="grid three responsive">
            {[
              { title: 'Grammar', copy: 'Estructura, tiempos y uso correcto.', icon: '🧭' },
              { title: 'Vocabulary', copy: 'Palabras clave y expresiones comunes.', icon: '📚' },
              { title: 'Reading', copy: 'Comprensión rápida de textos cortos.', icon: '👁️' }
            ].map((item) => (
              <div key={item.title} className="card mini-card">
                <div className="icon-circle ghost" aria-hidden>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LevelCards />
      <FAQAccordion />
    </div>
  );
}
