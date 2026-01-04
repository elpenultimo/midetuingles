import { Level } from './testEngine';

export const LEVEL_DETAILS: Record<Level, {
  title: string;
  shortDescription: string;
  summary: string;
  metaDescription: string;
  note?: string;
}> = {
  A1: {
    title: 'Básico',
    shortDescription: 'Frases frecuentes y presentaciones sencillas.',
    summary: 'Puedes presentarte, hablar de rutinas simples y entender indicaciones muy básicas.',
    metaDescription: 'Test de inglés nivel A1 (básico). Responde 10 preguntas rápidas y obtén tu estimación al instante.'
  },
  A2: {
    title: 'Pre-intermedio',
    shortDescription: 'Rutinas diarias, compras y mensajes cortos.',
    summary: 'Te comunicas en situaciones cotidianas como compras, transporte y mensajes breves.',
    metaDescription: 'Test de inglés nivel A2 (pre-intermedio). 10 preguntas breves para validar tu progreso sin registro.'
  },
  B1: {
    title: 'Intermedio',
    shortDescription: 'Temas cotidianos y contexto laboral básico.',
    summary: 'Conversas sobre experiencias, planes y temas conocidos con suficiente claridad.',
    metaDescription: 'Test de inglés nivel B1 (intermedio). Comprueba tu comprensión y gramática con 10 preguntas.'
  },
  B2: {
    title: 'Intermedio alto',
    shortDescription: 'Debates, textos medios y fluidez razonable.',
    summary: 'Entiendes ideas principales de textos complejos y participas en debates con fluidez.',
    metaDescription: 'Test de inglés nivel B2 (intermedio alto). Evalúa tu fluidez y vocabulario con un quiz rápido.'
  },
  C1: {
    title: 'Avanzado',
    shortDescription: 'Precisión, matices y textos extensos.',
    summary: 'Te expresas con naturalidad y manejas textos largos, académicos o profesionales.',
    metaDescription: 'Test de inglés nivel C1 (avanzado). Descubre tu dominio del idioma con preguntas ágiles.'
  },
  C2: {
    title: 'Maestría',
    shortDescription: 'Comprensión total y adaptación de registro.',
    summary: 'Entiendes prácticamente todo lo que lees u oyes y adaptas tu estilo según el contexto.',
    metaDescription: 'Test de inglés nivel C2 (maestría). Estimación avanzada con 10 preguntas rápidas.',
    note: 'Nivel C2 — estimación avanzada'
  }
};

export function getNextLevel(level: Level): Level | null {
  const order: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const idx = order.indexOf(level);
  if (idx >= 0 && idx < order.length - 1) {
    return order[idx + 1];
  }
  return null;
}

