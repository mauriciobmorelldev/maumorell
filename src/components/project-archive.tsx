import Link from 'next/link';
import {ArrowDown, ArrowUpRight} from 'lucide-react';
import {ProjectArt} from './project-art';
import type {projects as projectData} from '@/lib/content';
import './project-archive.css';

export {ProjectMap as ProjectArchive} from './project-map';

export function ProjectReel({projects, locale = 'es'}: {projects: typeof projectData; locale?: 'es' | 'en'}) {
  const english = locale === 'en';
  return <div className="project-archive project-reel">
    <div className="archive-intro"><span>{english ? 'A CLOSER LOOK AT MY WORK' : 'CADA PROYECTO, UNA HISTORIA'}</span><span>{english ? 'Scroll to discover' : 'Deslizá para descubrir'} <ArrowDown size={14}/></span></div>
    <div className="reel-viewport"><div className="reel-track">{projects.map((project, index) => <article className="project-story" key={project.slug}>
      <Link className={`project-scene ${project.color}`} href={`${english ? '/en/projects' : '/proyectos'}/${project.slug}`}>
        <div className="archive-media"><ProjectArt slug={project.slug}/></div>
        <div className="archive-topline"><span>{english ? 'SELECTED WORK' : 'TRABAJO SELECCIONADO'}</span><span><b>{String(index + 1).padStart(2, '0')}</b> / {String(projects.length).padStart(2, '0')}</span></div>
        <div className="archive-copy"><span className="eyebrow">{project.category}</span><h3>{project.name}</h3><p>{project.headline}</p><span className="archive-explore">{english ? 'Explore project' : 'Explorar proyecto'} <ArrowUpRight size={20}/></span></div>
        <span className="archive-depth" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </Link>
    </article>)}</div></div>
    <div className="reel-progress" aria-hidden="true"><span/></div>
  </div>;
}
