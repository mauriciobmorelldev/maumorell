'use client';
import {usePathname} from 'next/navigation';
import {SitePreloader} from '@/components/site-preloader';
export function SiteLanguageShell(){const en=usePathname().startsWith('/en');return <><SitePreloader locale={en?'en':'es'}/><a className="skip-link" href="#contenido">{en?'Skip to content':'Saltar al contenido'}</a></>}
