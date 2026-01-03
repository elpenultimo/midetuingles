import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Mide tu inglés',
  description: 'Escríbenos para dudas sobre el test de inglés o sugerencias de mejoras.'
};

export default function ContactoPage() {
  return (
    <div className="container" style={{ padding: '2rem 1.5rem 3rem' }}>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="eyebrow">Contacto</div>
        <h1 style={{ marginTop: '0.4rem' }}>Hablemos</h1>
        <p>
          ¿Tienes dudas o ideas para mejorar el test? Escríbenos y responderemos lo antes posible.
        </p>
        <a className="button" href="mailto:hola@midetuingles.com" style={{ width: 'fit-content' }}>
          Enviar correo
        </a>
      </div>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>¿Qué podemos ayudarte a resolver?</h2>
        <ul className="bullet-list">
          <li>Comentarios sobre las preguntas o niveles.</li>
          <li>Ideas para nuevas funciones centradas en el aprendizaje.</li>
          <li>Reportes de errores o problemas de acceso.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          También puedes compartir el test con quien lo necesite: es gratis, sin registro y funciona en móvil.
        </p>
      </div>
    </div>
  );
}
