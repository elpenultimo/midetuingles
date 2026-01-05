import type { Metadata } from 'next';
import TestLevelClient from './TestLevelClient';
import { LEVELS, type Level } from '@/lib/testEngine';
import { LEVEL_DETAILS } from '@/lib/levelInfo';
import { LEVEL_FAQ } from '@/data/levelFaq';

interface PageProps {
  params: { level: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const level = params.level?.toUpperCase();
  const isValidLevel = LEVELS.includes(level as Level);
  const levelLabel = isValidLevel ? level : 'A1';
  const detail = LEVEL_DETAILS[levelLabel as Level];

  const overrides: Partial<Record<Level, Metadata>> = {
    A1: {
      title: 'Test de inglés nivel A1 gratis | Nivel principiante',
      description:
        'Haz este test de inglés nivel A1 y descubre si tienes un nivel principiante. Ideal si estás comenzando desde cero.'
    },
    A2: {
      title: 'Test de inglés nivel A2 gratis | Nivel básico',
      description:
        'Evalúa tu nivel de inglés A2 con este test gratuito. Pensado para situaciones simples y comunicación básica.'
    },
    B1: {
      title: 'Test de inglés nivel B1 gratis | Nivel intermedio',
      description:
        'Haz este test de inglés nivel B1 y descubre si tienes un nivel intermedio. Sin registro y con resultados inmediatos.'
    },
    B2: {
      title: 'Test de inglés nivel B2 gratis | Intermedio alto',
      description:
        'Comprueba si tienes nivel B2 de inglés con este test gratuito. Ideal para quienes ya se comunican con soltura.'
    },
    C1: {
      title: 'Test de inglés nivel C1 gratis | Evalúa tu nivel avanzado',
      description:
        'Haz este test de inglés nivel C1 y evalúa tu dominio avanzado del idioma. Sin registro, rápido y pensado para situaciones reales.'
    },
    C2: {
      title: 'Test de inglés nivel C2 gratis | Nivel experto',
      description:
        'Evalúa si tienes nivel C2 de inglés con este test gratuito. Pensado para usuarios con dominio casi nativo del idioma.'
    }
  };

  return {
    title: overrides[levelLabel as Level]?.title ?? `Nivel ${levelLabel} | Mide tu inglés`,
    description: overrides[levelLabel as Level]?.description ?? detail?.metaDescription
  };
}

export default function LevelTestPage({ params }: PageProps) {
  const levelParam = params.level?.toUpperCase();
  const isValidLevel = LEVELS.includes(levelParam as Level);
  const levelLabel = (isValidLevel ? levelParam : 'A1') as Level;
  const faqItems = LEVEL_FAQ[levelLabel]?.items ?? [];

  const faqJsonLd = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    : null;

  return (
    <>
      <TestLevelClient level={params.level} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </>
  );
}
