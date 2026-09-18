'use client';
import Link from 'next/link';
import {useState} from 'react';
import {ArrowUpRight, Asterisk, Menu, X} from 'lucide-react';
import {contactUrl, projects} from '@/lib/content';
export function Nav(){const [open,setOpen]=useState(false);return <header className="nav"><Link href="/" className="wordmark" aria-label="Maumorell, inicio">mau<span>morell</span><Asterisk className="brand-mark" aria-hidden="true"/></Link><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)} aria-label={open?'Cerrar menú':'Abrir menú'}>{open?<X/>:<Menu/>}</button><nav id="navigation" className={open?'nav-links open':'nav-links'} aria-label="Navegación principal"><Link onClick={()=>setOpen(false)} href="/#proyectos">Proyectos <sup>{String(projects.length).padStart(2,'0')}</sup></Link><Link onClick={()=>setOpen(false)} href="/#servicios">Lo que hago</Link><Link onClick={()=>setOpen(false)} href="/#sobre-mi">Sobre mí</Link><a className="nav-cta" href={contactUrl} target="_blank" rel="noopener noreferrer">Hablemos <ArrowUpRight size={16}/></a></nav></header>}
