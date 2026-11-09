import Image from 'next/image';

const illustrations = [
  { src: '/illustrations/building-websites.svg', es: 'Persona construyendo una página web desde distintos dispositivos.', en: 'Person building a website across different devices.', kickerEs: 'PÁGINAS WEB A MEDIDA', kickerEn: 'CUSTOM WEBSITES', labelEs: 'De una idea a una web real', labelEn: 'From an idea to a real website' },
  { src: '/illustrations/online-shopping.svg', es: 'Persona comprando productos desde una tienda online.', en: 'Person shopping for products in an online store.', kickerEs: 'TIENDAS ONLINE', kickerEn: 'ONLINE STORES', labelEs: 'Una tienda lista para vender', labelEn: 'A store ready to sell' },
  { src: '/illustrations/search-engines.svg', es: 'Buscador web con resultados para representar la visibilidad en Google.', en: 'Web search with results representing visibility on Google.', kickerEs: 'VISIBILIDAD EN GOOGLE', kickerEn: 'GOOGLE VISIBILITY', labelEs: 'Rápida, clara y encontrable', labelEn: 'Fast, clear and discoverable' },
  { src: '/illustrations/portfolio-website.svg', es: 'Portfolio visual mostrando trabajos y proyectos profesionales.', en: 'Visual portfolio showcasing professional work and projects.', kickerEs: 'PORTFOLIOS PROFESIONALES', kickerEn: 'PROFESSIONAL PORTFOLIOS', labelEs: 'Tu trabajo en primer plano', labelEn: 'Put your work center stage' },
] as const;

type ServiceIsometricProps = { index: number; locale?: 'es' | 'en' };

export function ServiceIsometric({ index, locale = 'es' }: ServiceIsometricProps) {
  const illustration = illustrations[index];
  if (!illustration) return null;

  return (
    <figure className="service-visual">
      <span className="service-visual-glow" aria-hidden="true" />
      <span className="service-visual-art">
        <Image
          src={illustration.src}
          alt={illustration[locale]}
          width={640}
          height={480}
          sizes="(max-width: 700px) 300px, (max-width: 1050px) 235px, 360px"
          unoptimized
        />
      </span>
      <figcaption>
        <span>{locale === 'es' ? illustration.kickerEs : illustration.kickerEn}</span>
        <strong>{locale === 'es' ? illustration.labelEs : illustration.labelEn}</strong>
      </figcaption>
    </figure>
  );
}
