'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  items?: FAQItem[];
  showLink?: boolean;
  id?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: '¿Es gratis el test?',
    answer: 'Sí. Todo el test es gratuito y no solicitamos tarjeta ni datos de pago.'
  },
  {
    question: '¿Cuánto tiempo toma?',
    answer: 'Entre 3 y 7 minutos por nivel. Son 10 preguntas rápidas con feedback inmediato.'
  },
  {
    question: '¿Necesito registrarme?',
    answer: 'No. Usamos solo tu navegador para guardar el avance y puedas retomarlo cuando quieras.'
  },
  {
    question: '¿Qué tan preciso es el resultado?',
    answer: 'Es una estimación orientativa basada en el MCER. Útil para ubicarte y medir progreso.'
  },
  {
    question: '¿Puedo repetirlo?',
    answer: 'Claro. No hay penalización por repetir; incluso es recomendable para seguir avanzando.'
  }
];

const FAQAccordion: FC<FAQAccordionProps> = ({ title = 'Preguntas frecuentes', items, showLink = true, id }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = items?.length ? items : defaultFaqs;
  const sectionId = id ?? 'faq';

  return (
    <section className="section" aria-labelledby="faq-heading" id={sectionId}>
      <div className="container narrow">
        <header className="section-header">
          <div className="eyebrow" style={{ width: 'fit-content' }}>FAQ</div>
          <h2 id="faq-heading">{title}</h2>
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
