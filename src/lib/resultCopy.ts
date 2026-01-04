import { Level } from './testEngine';

export const LEVEL_RESULT_MESSAGES: Record<Level, string> = {
  A1: 'Estás dando tus primeros pasos en inglés.',
  A2: 'Ya puedes manejarte en situaciones simples y cotidianas.',
  B1: 'Buen nivel intermedio. Puedes desenvolverte en muchas situaciones comunes.',
  B2: 'Nivel intermedio alto. Te comunicas con bastante soltura.',
  C1: 'Nivel avanzado. Manejas el idioma con precisión en contextos complejos.',
  C2: 'Nivel muy avanzado. Comprensión y uso del inglés a nivel experto.'
};

export function getOrientativeNote(level: Level, note?: string): string | null {
  if (level === 'C2' && note?.toLowerCase().includes('estimación')) {
    return 'Resultado orientativo.';
  }
  return null;
}
