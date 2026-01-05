import { Level } from '@/lib/testEngine';
import type { FAQItem } from '@/components/FAQAccordion';

export const LEVEL_FAQ: Record<Level, { items: FAQItem[] }> = {
  A1: {
    items: [
      {
        question: '¿Para quién es este test de inglés A1?',
        answer: 'Para quienes están comenzando y quieren medir fundamentos básicos como vocabulario simple y frases comunes.'
      },
      {
        question: '¿Cuánto se demora el test A1?',
        answer: 'Normalmente toma pocos minutos. Depende de tu ritmo, pero está pensado para hacerlo rápido.'
      },
      {
        question: '¿Qué significa sacar nivel A1?',
        answer: 'Significa que manejas expresiones básicas y puedes comprender frases simples en contextos cotidianos.'
      },
      {
        question: '¿Este resultado es oficial?',
        answer: 'No. Es una estimación orientativa para guiar tu aprendizaje.'
      }
    ]
  },
  A2: {
    items: [
      {
        question: '¿Para quién es este test de inglés A2?',
        answer: 'Para personas con base básica que ya entienden frases comunes y quieren medir su progreso.'
      },
      {
        question: '¿Qué evalúa el nivel A2?',
        answer: 'Gramática y vocabulario frecuente, comprensión de situaciones cotidianas y estructuras sencillas.'
      },
      {
        question: '¿Qué significa obtener A2?',
        answer: 'Que puedes comunicarte de forma simple y resolver tareas habituales en inglés.'
      },
      {
        question: '¿Puedo repetir el test?',
        answer: 'Sí, las veces que quieras. Repetirlo te ayuda a comparar avances.'
      }
    ]
  },
  B1: {
    items: [
      {
        question: '¿Para quién es este test de inglés B1?',
        answer: 'Para quienes ya se defienden en inglés y quieren saber si están en un nivel intermedio.'
      },
      {
        question: '¿Qué significa nivel B1?',
        answer: 'Que puedes desenvolverte en situaciones comunes, entender ideas principales y comunicarte con cierta autonomía.'
      },
      {
        question: '¿Qué tipo de preguntas incluye?',
        answer: 'Preguntas de gramática, vocabulario y comprensión similares a las que aparecen en contextos reales.'
      },
      {
        question: '¿El resultado es exacto?',
        answer: 'Es orientativo. Sirve como referencia rápida, no como certificación oficial.'
      },
      {
        question: '¿Qué hago si quedo cerca del corte?',
        answer: 'Considera practicar tus puntos débiles y volver a intentarlo en unos días.'
      }
    ]
  },
  B2: {
    items: [
      {
        question: '¿Para quién es este test de inglés B2?',
        answer: 'Para quienes ya hablan con soltura y quieren medir si tienen un nivel intermedio alto.'
      },
      {
        question: '¿Qué significa tener B2?',
        answer: 'Que puedes comprender textos y conversaciones con más profundidad y expresarte con bastante naturalidad.'
      },
      {
        question: '¿Este test incluye listening o audio?',
        answer: 'No por ahora. Evalúa principalmente lectura, vocabulario y gramática.'
      },
      {
        question: '¿Este resultado sirve para trabajo o estudio?',
        answer: 'Como referencia personal sí, pero para trámites normalmente piden exámenes oficiales.'
      },
      {
        question: '¿Cómo subo de B2 a C1?',
        answer: 'Aumentando exposición a contenido real y practicando escritura y habla con feedback.'
      }
    ]
  },
  C1: {
    items: [
      {
        question: '¿Para quién es este test de inglés C1?',
        answer: 'Para quienes ya usan inglés de forma avanzada y quieren validar si están cerca de un nivel profesional.'
      },
      {
        question: '¿Qué significa obtener C1?',
        answer: 'Que entiendes matices, usas estructuras complejas y te expresas con precisión en muchos contextos.'
      },
      {
        question: '¿Este test es oficial?',
        answer: 'No. Es una evaluación orientativa para estimar tu nivel.'
      },
      {
        question: '¿Qué evalúa principalmente?',
        answer: 'Precisión gramatical, vocabulario avanzado y comprensión de estructuras más complejas.'
      }
    ]
  },
  C2: {
    items: [
      {
        question: '¿Para quién es este test de inglés C2?',
        answer: 'Para niveles muy avanzados, cuando ya puedes entender y comunicarte casi como un nativo educado.'
      },
      {
        question: '¿Qué significa obtener C2?',
        answer: 'Que manejas el idioma con gran precisión, comprensión profunda y vocabulario amplio.'
      },
      {
        question: '¿Es normal no aprobar C2?',
        answer: 'Sí. C2 es exigente y no es necesario para la mayoría de objetivos.'
      },
      {
        question: '¿El resultado es certificación?',
        answer: 'No. Es una estimación orientativa, no reemplaza un examen oficial.'
      }
    ]
  }
};
