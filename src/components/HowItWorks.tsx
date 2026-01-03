import { FC } from 'react';

const steps = [
  {
    title: 'Elige tu nivel',
    description: 'A1, A2, B1 o B2 según tu confianza.',
    icon: '🎯'
  },
  {
    title: 'Responde 10 preguntas',
    description: 'Mezcla de vocab, grammar y reading.',
    icon: '✏️'
  },
  {
    title: 'Recibe tu resultado',
    description: 'Estimación inmediata y recomendaciones.',
    icon: '🚀'
  }
];

const HowItWorks: FC = () => {
  return (
    <section className="section" aria-labelledby="how-it-works-heading">
      <div className="container narrow">
        <header className="section-header">
          <div className="eyebrow" style={{ width: 'fit-content' }}>Proceso</div>
          <h2 id="how-it-works-heading">¿Cómo funciona?</h2>
          <p className="section-subtitle">En 3 pasos y sin registro.</p>
        </header>
        <div className="grid three responsive">
          {steps.map((step) => (
            <div key={step.title} className="card step-card">
              <div className="icon-circle" aria-hidden>
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
