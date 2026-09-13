import Image from 'next/image';
import { projectVisuals } from '@/lib/project-visuals';
import './project-captures.css';

export function ProjectArt({ slug, eager = false }: { slug: string; eager?: boolean }) {
  const visual = projectVisuals[slug];
  if (visual) return <div className={`project-art real-project art-${slug}`}>
    <div className="capture-window">
      <div className="capture-toolbar" aria-hidden="true"><span className="window-dots"><i/><i/><i/></span><span>{new URL(visual.url).hostname}</span><span>↗</span></div>
      <div className="capture-image"><Image src={visual.image} alt={`Captura real de ${visual.name}`} width={1440} height={1000} sizes="(max-width: 700px) 90vw, (max-width: 1500px) 43vw, 800px" quality={85} loading={eager ? 'eager' : 'lazy'}/></div>
    </div>
    <span className="capture-caption"><i/> WEB REAL / {visual.name}</span>
  </div>;
  return <div className={`project-art expertise-art art-${slug}`} aria-hidden="true"><div className="art-grid"/><div className="expertise-title"><span>{slug === 'albury' ? 'DISEÑO + DESARROLLO' : 'EXPERIENCIA EN E-COMMERCE'}</span><strong>{slug === 'albury' ? 'Albury' : 'Magento'}<b>↗</b></strong><p>{slug === 'albury' ? 'Identidad. Narrativa. Movimiento.' : 'Adobe Commerce / Integraciones / Performance'}</p></div></div>;
}
