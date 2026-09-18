'use client';

import { useEffect, useState } from 'react';

export function SitePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    const hide = () => {
      const elapsed = performance.now() - started;
      window.setTimeout(() => setVisible(false), reduced ? 0 : Math.max(0, 650 - elapsed));
    };

    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });

    const fallback = window.setTimeout(() => setVisible(false), reduced ? 0 : 1800);
    return () => {
      window.removeEventListener('load', hide);
      window.clearTimeout(fallback);
    };
  }, []);

  return visible ? <div className="site-preloader" role="status" aria-label="Cargando portfolio">
    <div className="preloader-wordmark">mau<span>morell</span></div>
    <div className="preloader-track"><i /></div>
    <span>PREPARANDO EXPERIENCIAS DIGITALES</span>
  </div> : null;
}
