import { FC } from 'react';

const QuickInstructions: FC = () => {
  const tips = [
    'Responde sin apurarte, pero sin quedarte pegado.',
    'Si dudas entre dos, elige la que suena más natural.',
    'No pasa nada si te equivocas: esto es para medir, no para juzgar.',
    'Ideal hacerlo con audífonos si estás en la calle (opcional).',
    'Puedes repetir el test para comparar tu progreso.'
  ];

  return (
    <section className="section" aria-labelledby="quick-instructions-heading">
      <div className="container narrow">
        <header className="section-header">
          <div className="eyebrow" style={{ width: 'fit-content' }}>Guía express</div>
          <h2 id="quick-instructions-heading">Instrucciones rápidas</h2>
        </header>
        <div className="card">
          <ol className="instruction-list">
            {tips.map((tip, index) => (
              <li key={tip} className="instruction-item">
                <span className="instruction-number" aria-hidden>
                  {index + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default QuickInstructions;
