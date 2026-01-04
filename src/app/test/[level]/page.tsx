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

  return {
    title: `Nivel ${levelLabel} | Mide tu inglés`,
    description: detail?.metaDescription
  };
}

export default function LevelTestPage({ params }: PageProps) {
  return <TestLevelClient level={params.level} />;
}
