'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="container narrow">
        <div className="footer-grid">
          <div>
            <h2 id="footer-heading" className="footer-title">
              MideTuInglés
            </h2>
            <p className="footer-text">Test online por niveles A1–C2.</p>
            <p className="footer-text">Gratis, sin registro y con resultado inmediato.</p>
          </div>
          <div>
            <h3 className="footer-heading">Navegación</h3>
            <ul className="footer-list">
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <Link href="/#como-funciona">Cómo funciona</Link>
              </li>
              <li>
                <Link href="/#niveles">Niveles</Link>
              </li>
              <li>
                <Link href="/test/a1">Test</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <small className="footer-hint">Hecho con foco en claridad y progreso. Sin publicidad.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
