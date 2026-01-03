import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacidad | Mide tu inglés',
  description: 'Política breve de privacidad para el test de inglés gratuito MideTuInglés.'
};

export default function PrivacidadPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 3rem' }}>
      <div className="card">
        <div className="eyebrow">Privacidad</div>
        <h1 style={{ marginTop: '0.4rem' }}>Política breve</h1>
        <p>
          MideTuInglés no requiere registro ni recopila datos personales sensibles. Las respuestas del test se usan
          solo para calcular tu resultado en tu propio dispositivo.
        </p>
        <ul className="bullet-list">
          <li>No guardamos tus respuestas en servidores externos.</li>
          <li>No usamos cookies de seguimiento ni analytics de terceros.</li>
          <li>Solo almacenamos temporalmente tu avance en el navegador para que puedas retomar.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          Si borras los datos de tu navegador, se eliminarán también los progresos del test. Para cualquier duda,
          contáctanos en <a href="mailto:hola@midetuingles.com">hola@midetuingles.com</a>.
        </p>
      </div>
    </div>
  );
}
