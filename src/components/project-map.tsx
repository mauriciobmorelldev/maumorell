'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, X} from 'lucide-react';
import gsap from 'gsap';
import {ProjectArt} from './project-art';
import type {projects as projectData} from '@/lib/content';
import './project-map.css';

const groups = ['all', 'property', 'commerce', 'artists', 'platforms'] as const;
type Group = typeof groups[number];
function group(slug: string): Group {
  if (['connexa', 'alojamiento-buenos-aires'].includes(slug)) return 'property';
  if (['lourdes-montenegro', 'rosario-juarez'].includes(slug)) return 'artists';
  return slug === 'mares' ? 'platforms' : 'commerce';
}

export function ProjectMap({projects, locale = 'es'}: {projects: typeof projectData; locale?: 'es' | 'en'}) {
  const en = locale === 'en';
  const [filter, setFilter] = useState<Group>('all');
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const map = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const visible = projects.filter(p => filter === 'all' || group(p.slug) === filter);
  const labels = en ? ['All projects', 'Real estate', 'Online stores', 'Artists', 'Platforms'] : ['Todos', 'Inmobiliarias', 'Tiendas online', 'Artistas', 'Plataformas'];

  useEffect(() => {
    if (!map.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.from('.map-node', {opacity: 0, y: 24, scale: .96, duration: .55, stagger: .045, ease: 'power3.out'});
    }, map);
    return () => context.revert();
  }, [filter]);

  useEffect(() => {
    const element = map.current;
    if (!element || !matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const moveX = gsap.quickTo(element, 'x', {duration: .7, ease: 'power3.out'});
    const moveY = gsap.quickTo(element, 'y', {duration: .7, ease: 'power3.out'});
    const move = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      moveX(((event.clientX - bounds.left) / bounds.width - .5) * 16);
      moveY(((event.clientY - bounds.top) / bounds.height - .5) * 12);
    };
    const reset = () => {moveX(0); moveY(0);};
    element.addEventListener('pointermove', move, {passive: true});
    element.addEventListener('pointerleave', reset);
    return () => {element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); gsap.killTweensOf(element);};
  }, []);

  useEffect(() => {
    if (!selected || !dialog.current) return;
    const modal = dialog.current;
    modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let tween: gsap.core.Tween | undefined;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = origin.current?.getBoundingClientRect();
      const to = modal.getBoundingClientRect();
      tween = gsap.fromTo(modal, {opacity: 0, scale: .88, x: from ? from.left + from.width / 2 - to.left - to.width / 2 : 0, y: from ? from.top + from.height / 2 - to.top - to.height / 2 : 30}, {opacity: 1, scale: 1, x: 0, y: 0, duration: .5, ease: 'power3.out', clearProps: 'transform,opacity'});
    }
    return () => {tween?.kill(); modal.close(); document.body.style.overflow = previousOverflow; origin.current?.focus({preventScroll: true});};
  }, [selected]);

  return <div className="project-constellation">
    <div className="map-controls"><div className="map-filters" role="group" aria-label={en ? 'Filter projects' : 'Filtrar proyectos'}>{groups.map((value, index) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{labels[index]}</button>)}</div><span className="map-count" aria-live="polite">{String(visible.length).padStart(2, '0')} {en ? 'PROJECTS' : 'PROYECTOS'}</span></div>
    <p className="map-instruction">{en ? 'Different worlds. Connected by design. Select a project to explore.' : 'Mundos distintos. Conectados por el diseño. Elegí un proyecto para explorarlo.'}</p>
    <div className="map-universe" ref={map}>
      <svg className="map-connections" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><path d="M160 150L500 420L830 150 M160 500L500 420L830 500 M160 850L500 420L830 850 M500 150L500 850"/></svg>
      {visible.map(project => <article className={`map-node map-${group(project.slug)}`} key={project.slug}><button type="button" className="map-project" aria-haspopup="dialog" onClick={event => {origin.current = event.currentTarget; setSelected(project);}}><div className="map-thumbnail"><ProjectArt slug={project.slug}/><span className="map-open"><ArrowUpRight size={20}/></span></div><div className="map-node-label"><span className="map-number">{project.number}</span><div><h3>{project.name}</h3><p>{project.headline}</p></div></div></button></article>)}
    </div>
    <dialog className="map-dialog" ref={dialog} aria-labelledby="map-dialog-title" onCancel={event => {event.preventDefault(); setSelected(null);}} onClick={event => {if(event.target === event.currentTarget) setSelected(null);}}>
      {selected && <div className="map-dialog-content"><button className="map-close" type="button" onClick={() => setSelected(null)} aria-label={en ? 'Close project' : 'Cerrar proyecto'} autoFocus><X size={23}/></button><div className="map-dialog-art"><ProjectArt slug={selected.slug}/></div><div className="map-dialog-copy"><span className="eyebrow">{selected.category}</span><h3 id="map-dialog-title">{selected.name}</h3><p>{selected.description}</p><Link className="button primary" href={`${en ? '/en/projects' : '/proyectos'}/${selected.slug}`}>{en ? 'View full project' : 'Ver el proyecto completo'} <ArrowUpRight size={18}/></Link></div></div>}
    </dialog>
  </div>;
}
