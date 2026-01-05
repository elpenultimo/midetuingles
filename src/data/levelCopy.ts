import { Level } from '@/lib/testEngine';

const LEVEL_SHORT_COPY: Record<Level, string> = {
  A1: 'Ideal si estás empezando: frases simples y vocabulario básico.',
  A2: 'Ideal si ya entiendes frases comunes y quieres medir tu progreso.',
  B1: 'Buen salto: situaciones cotidianas, trabajo y viajes.',
  B2: 'Para cuando ya te defiendes bien y buscas más precisión.',
  C1: 'Avanzado: matices, estructuras complejas y vocabulario amplio.',
  C2: 'Casi nativo: comprensión fina y uso muy natural del idioma.'
};

export function getLevelShortCopy(level: Level): string {
  return LEVEL_SHORT_COPY[level];
}
