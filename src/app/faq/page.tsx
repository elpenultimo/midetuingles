import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | Mide tu inglés',
  description: 'Resuelve tus dudas sobre el test de inglés gratuito por niveles A1–C2 y cómo interpretar tus resultados.'
};

export default function FAQPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 3rem' }}>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="eyebrow">FAQ</div>
        <h1 style={{ marginTop: '0.4rem' }}>Preguntas frecuentes</h1>
        <p>
          Aquí tienes las respuestas rápidas sobre el test, niveles y qué hacer con tu resultado. Todo es gratuito y
          sin registro, pensado para que avances sin fricción.
        </p>
      </div>
      <FAQAccordion showLink={false} />
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Consejo final</h2>
        <p style={{ marginBottom: 0 }}>
          Usa tu resultado como un punto de partida. Define un tema para mejorar (listening, vocabulario o gramática
          específica), practica unos días y vuelve a tomar el test. Ver tu progreso en números motiva.
        </p>
      </div>
    </div>
  );
}
