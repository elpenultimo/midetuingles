'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

interface FAQAccordionProps {
  showLink?: boolean;
}

const faqs = [
  {
    question: '¿El test es gratis?',
    answer: 'Sí. No pedimos registro y puedes repetirlo cuando quieras.'
  },
  {
    question: '¿Cuánto demora?',
    answer: 'Normalmente 3–7 minutos por nivel (10 preguntas).'
  },
  {
    question: '¿Qué evalúa?',
    answer: 'Vocabulario, gramática y lectura rápida con preguntas claras.'
  },
  {
    question: '¿Es un certificado oficial?',
    answer: 'No. Es una estimación orientativa para ubicarte por nivel.'
  },
  {
    question: '¿Puedo saltar niveles?',
    answer: 'Sí. Puedes empezar en A2 o B1 si ya tienes base.'
  },
  {
    question: '¿Por qué me salió un nivel más bajo/alto de lo esperado?',
    answer:
      'Influye el tipo de preguntas, nervios y vocab específico. Lo ideal es repetir en otro momento.'
  },
  {
    question: '¿Qué hago después de conocer mi nivel?',
    answer:
      'Te recomendamos enfocarte en lo que más fallas y repetir el test en 2–3 semanas para medir progreso.'
  }
];

const FAQAccordion: FC<FAQAccordionProps> = ({ showLink = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section" aria-labelledby="faq-heading" id="faq">
      <div className="container narrow">
        <header className="section-header">
          <div className="eyebrow" style={{ width: 'fit-content' }}>FAQ</div>
          <h2 id="faq-heading">Preguntas frecuentes</h2>
        </header>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="faq-item">
                <button
                  className="faq-button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span aria-hidden>{isOpen ? '−' : '+'}</span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-heading-${index}`}
                  className={`faq-panel ${isOpen ? 'open' : ''}`}
                >
                  <p id={`faq-heading-${index}`} style={{ marginBottom: 0 }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {showLink && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/faq" className="button secondary">
              Ver todas las preguntas frecuentes
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
