'use client';

import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [shared, setShared] = useState<string>('');

  const handleShare = async () => {
    const shareData = {
      title: 'Mide tu inglés',
      text: 'Test por niveles A1–C2, gratis y sin registro.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://midetuingles.com'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared('¡Enlace compartido!');
      } else if (navigator.clipboard && shareData.url) {
        await navigator.clipboard.writeText(shareData.url);
        setShared('Link copiado');
      } else {
        setShared('Copia este link: ' + shareData.url);
      }
    } catch (err) {
      console.error('Error al compartir', err);
      setShared('No se pudo compartir. Intenta copiar el link.');
    }
  };

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="container narrow">
        <div className="footer-top">
          <div>
            <h2 id="footer-heading" className="footer-title">
              MideTuInglés
            </h2>
            <p className="footer-text">Test por niveles A1–C2</p>
            <p className="footer-text">Sin registro</p>
            <p className="footer-text">Resultados inmediatos</p>
          </div>
          <div className="footer-grid">
            <div>
              <h3 className="footer-heading">Secciones</h3>
              <ul className="footer-list">
                <li>
                  <Link href="/">Inicio</Link>
                </li>
                <li>
                  <Link href="/niveles">Niveles</Link>
                </li>
                <li>
                  <Link href="/faq">Preguntas frecuentes</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-list">
                <li>
                  <Link href="/privacidad">Privacidad</Link>
                </li>
                <li>
                  <Link href="/contacto">Contacto</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Compartir</h3>
              <button type="button" className="button secondary" onClick={handleShare}>
                Compartir
              </button>
              {shared && <p className="footer-hint">{shared}</p>}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <small className="footer-hint">Hecho con foco en claridad y progreso.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
