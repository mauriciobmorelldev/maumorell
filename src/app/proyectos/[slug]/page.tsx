import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {projects,contactUrl,siteUrl} from '@/lib/content';
import {Nav} from '@/components/nav';

import {projectVisuals} from '@/lib/project-visuals';
import {ProjectArt} from '@/components/project-art';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(p=>p.slug===slug);return p?{title:`${p.name}: ${p.type} y desarrollo digital`,description:p.description,...(siteUrl?{alternates:{canonical:`${siteUrl}/proyectos/${slug}`}}:{})}:{};}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();const next=projects[(projects.indexOf(p)+1)%projects.length];return <><Nav/><main className="case-page section" id="contenido"><Link className="text-link" href="/#proyectos"><ArrowLeft size={16}/> Todos los proyectos</Link><div className="case-hero"><span className="eyebrow">{p.category} / {p.number}</span><h1>{p.name}<span>↗</span></h1><p>{p.headline}</p><div className="project-tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div></div><ProjectArt slug={p.slug} eager/>{projectVisuals[p.slug] && <a className="text-link case-live-link" href={projectVisuals[p.slug].url} target="_blank" rel="noopener noreferrer">Visitar sitio real <ArrowUpRight size={18}/></a>}<div className="case-body"><div><span className="eyebrow">EL CONTEXTO</span><h2>{p.headline}</h2><p>{p.description}</p></div><div><h3>El desafío</h3><p>{p.challenge}</p><h3>Mi enfoque</h3><p>{p.approach}</p><h3>Áreas de trabajo</h3><ul>{p.scope.map(s=><li key={s}>{s}</li>)}</ul><p className="case-note">{p.note}</p></div></div><div className="case-cta"><h2>¿Un desafío parecido?</h2><a href={contactUrl} className="button primary" target="_blank" rel="noopener noreferrer">Hablemos de tu proyecto <ArrowUpRight size={18}/></a></div><Link className="next-project" href={`/proyectos/${next.slug}`}><span>SIGUIENTE PROYECTO</span><strong>{next.name}</strong><ArrowUpRight size={38}/></Link></main></>}
