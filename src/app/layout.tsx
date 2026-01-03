import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mide tu inglés | Test rápido online',
  description: 'Evalúa tu nivel de inglés (A1-B2) con pruebas rápidas y sin registro. Resultados inmediatos y mobile-first.',
  metadataBase: new URL('https://midetuingles.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
