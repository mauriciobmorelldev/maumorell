import Image from 'next/image';

const illustrations = [
  { src: '/isometric/custom-products.svg', es: 'Banco modular isométrico para representar páginas web y plataformas a medida.', en: 'Isometric modular workbench representing custom websites and platforms.', kickerEs: 'PÁGINAS WEB A MEDIDA', kickerEn: 'CUSTOM WEBSITES', labelEs: 'De una idea a una web real', labelEn: 'From an idea to a real website' },
  { src: '/isometric/ecommerce.svg', es: 'Estación isométrica de empaque y escaneo para una tienda online.', en: 'Isometric packing and scanning station representing an online store.', kickerEs: 'TIENDAS ONLINE', kickerEn: 'ONLINE STORES', labelEs: 'Una tienda lista para vender', labelEn: 'A store ready to sell' },
  { src: '/isometric/performance-seo.svg', es: 'Instrumento isométrico que representa una web rápida y visible en Google.', en: 'Isometric instrument representing a fast website ready for Google search.', kickerEs: 'VISIBILIDAD EN GOOGLE', kickerEn: 'GOOGLE VISIBILITY', labelEs: 'Rápida, clara y encontrable', labelEn: 'Fast, clear and discoverable' },
  { src: '/isometric/artist-portfolios.svg', es: 'Escenario y proyector isométricos para portfolios de artistas.', en: 'Isometric stage and projector representing artist portfolios.', kickerEs: 'PORTFOLIOS PROFESIONALES', kickerEn: 'PROFESSIONAL PORTFOLIOS', labelEs: 'Tu trabajo en primer plano', labelEn: 'Put your work center stage' },
] as const;

type ServiceIsometricProps = { index: number; locale?: 'es' | 'en' };

export function ServiceIsometric({ index, locale = 'es' }: ServiceIsometricProps) {
  const illustration = illustrations[index];
  if (!illustration) return null;

  return (
    <figure className="service-visual">
      <Image
        src={illustration.src}
        alt={illustration[locale]}
        width={320}
        height={320}
        sizes="(max-width: 700px) 230px, (max-width: 1050px) 180px, 210px"
        unoptimized
      />
      <figcaption>
        <span>{locale === 'es' ? illustration.kickerEs : illustration.kickerEn}</span>
        <strong>{locale === 'es' ? illustration.labelEs : illustration.labelEn}</strong>
      </figcaption>
    </figure>
  );
}
