import type { Metadata } from 'next';
import TestLevelClient from './TestLevelClient';
import { LEVELS, type Level } from '@/lib/testEngine';
import { LEVEL_DETAILS } from '@/lib/levelInfo';

interface PageProps {
  params: { level: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const level = params.level?.toUpperCase();
  const isValidLevel = LEVELS.includes(level as Level);
  const levelLabel = isValidLevel ? level : 'A1';
  const detail = LEVEL_DETAILS[levelLabel as Level];

  const overrides: Partial<Record<Level, Metadata>> = {
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
  return <TestLevelClient level={params.level} />;
}
