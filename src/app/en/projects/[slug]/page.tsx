import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {projectsEn} from '@/lib/content-en';
import {contactUrlEn,siteUrl} from '@/lib/content';
import {Nav} from '@/components/nav';
import {projectVisuals} from '@/lib/project-visuals';
import {ProjectArt} from '@/components/project-art';

export function generateStaticParams(){return projectsEn.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projectsEn.find(p=>p.slug===slug);return p?{title:`${p.name}: ${p.type} and digital development`,description:p.description,...(siteUrl?{alternates:{canonical:`${siteUrl}/en/projects/${slug}`,languages:{'es-AR':`${siteUrl}/proyectos/${slug}`,'en':`${siteUrl}/en/projects/${slug}`}}}:{})}:{};}
export default async function EnglishProject({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projectsEn.find(p=>p.slug===slug);if(!p)notFound();const next=projectsEn[(projectsEn.indexOf(p)+1)%projectsEn.length];return <><Nav locale="en" languageHref={`/proyectos/${slug}`}/><main className="case-page section" id="contenido"><Link className="text-link" href="/en#projects"><ArrowLeft size={16}/> All projects</Link><div className="case-hero"><span className="eyebrow">{p.category} / {p.number}</span><h1>{p.name}<ArrowUpRight aria-hidden="true"/></h1><p>{p.headline}</p><div className="project-tags">{p.stack.map(t=><span key={t}>{t}</span>)}</div></div><ProjectArt slug={p.slug} eager/>{projectVisuals[p.slug]&&<a className="text-link case-live-link" href={projectVisuals[p.slug].url} target="_blank" rel="noopener noreferrer">Visit live website <ArrowUpRight size={18}/></a>}<div className="case-body"><div><span className="eyebrow">THE CONTEXT</span><h2>{p.headline}</h2><p>{p.description}</p></div><div><h3>The challenge</h3><p>{p.challenge}</p><h3>My approach</h3><p>{p.approach}</p><h3>Areas of work</h3><ul>{p.scope.map(s=><li key={s}>{s}</li>)}</ul><p className="case-note">{p.note}</p></div></div><div className="case-cta"><h2>A similar challenge?</h2><a href={contactUrlEn} className="button primary" target="_blank" rel="noopener noreferrer">Let&apos;s talk about your project <ArrowUpRight size={18}/></a></div><Link className="next-project" href={`/en/projects/${next.slug}`}><span>NEXT PROJECT</span><strong>{next.name}</strong><ArrowUpRight size={38}/></Link></main></>}
