# Mide tu inglés

Aplicación Next.js 14 (App Router) para evaluar tu nivel de inglés de manera rápida y sin registro. Incluye niveles A1-B2, preguntas originales y resultados inmediatos con barra de progreso y persistencia en localStorage.

## Estructura principal
- `src/app/page.tsx`: landing con CTA.
- `src/app/test/page.tsx`: redirección a A1.
- `src/app/test/[level]/page.tsx`: flujo de preguntas por nivel.
- `src/app/resultado/page.tsx`: resumen final.
- `src/components`: tarjetas, barra de progreso y resumen.
- `src/lib`: motor de calificación y utilidades de storage.
- `src/data/questions.en.cefr.json`: banco de preguntas (listo para ampliar a 20 por nivel).

## Ejecutar localmente
```bash
npm install
npm run dev
```
Luego visita `http://localhost:3000`.

## Notas
- Sin autenticación ni registro.
- Usa localStorage para guardar intentos, mejores puntajes y última fecha.
- Optimizado para mobile-first y con títulos/meta por nivel para SEO básico.
