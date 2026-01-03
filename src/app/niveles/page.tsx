import type { Metadata } from 'next';
import LevelCards from '@/components/LevelCards';

export const metadata: Metadata = {
  title: 'Niveles de inglés A1–C2 | Mide tu inglés',
  description: 'Conoce qué significa cada nivel de inglés según el MCER y descubre cómo interpretamos tu resultado.'
};

export default function NivelesPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 3rem' }}>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="eyebrow">Guía</div>
        <h1 style={{ marginTop: '0.4rem' }}>Niveles de inglés (A1–C2)</h1>
        <p>
          Usamos los niveles del Marco Común Europeo de Referencia (MCER) para estimar dónde estás hoy. El
          objetivo es ubicarte rápido y darte una idea clara de lo que ya dominas y lo que puedes reforzar.
        </p>
      </div>
      <LevelCards showLink={false} />
      <div className="card" style={{ marginTop: '1.5rem' }} id="niveles-completo">
        <h2 style={{ marginTop: 0 }}>Cómo leer tu resultado</h2>
        <ul className="bullet-list">
          <li>Si quedas entre dos niveles, prioriza el que sientas más cómodo para practicar.</li>
          <li>Un nivel más bajo no es un problema: te da foco en vocabulario y estructuras clave.</li>
          <li>Si obtienes B2, sigue puliendo fluidez y lectura de textos largos para consolidarlo.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          Recuerda que cada intento es una foto del momento. Puedes repetir el test cuando quieras para ver cómo
          progresa tu comprensión.
        </p>
      </div>
    </div>
  );
}
