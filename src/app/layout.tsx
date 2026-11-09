import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/dm-sans';
import type { Metadata } from 'next';


import './globals.css';
import { siteUrl } from '@/lib/content';
import { SiteLanguageShell } from '@/components/site-language-shell';
export const metadata: Metadata = {
 metadataBase: new URL(siteUrl || 'http://localhost:3000'),
 ...(siteUrl ? {alternates: {canonical: siteUrl,languages:{'es-AR':siteUrl,'en':`${siteUrl}/en`}}} : {}),
 title: { default: 'Diseño de páginas web y tiendas online | Maumorell', template: '%s | Maumorell' },
 description: 'Diseño y desarrollo de páginas web, tiendas online, portfolios para artistas y webs inmobiliarias. Proyectos a medida con atención directa por WhatsApp.',
 keywords: ['diseño de páginas web','desarrollo web Argentina','crear página web','tiendas online','web para inmobiliarias','portfolio para artistas','páginas web profesionales','posicionamiento en Google'],
 authors: [{name:'Maumorell',url:siteUrl||undefined}],
 creator: 'Maumorell',
 publisher: 'Maumorell',
 category: 'Diseño y desarrollo web',
 robots: {index: Boolean(siteUrl), follow: true, googleBot:{index:Boolean(siteUrl),follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
 openGraph: {type: 'website', locale: 'es_AR', siteName: 'Maumorell', ...(siteUrl?{url:siteUrl}:{}), title: 'Diseño de páginas web y tiendas online | Maumorell', description: 'Páginas web, tiendas online, portfolios para artistas y plataformas inmobiliarias diseñadas alrededor de cada negocio.'},
 twitter: {card: 'summary_large_image',title:'Diseño de páginas web y tiendas online | Maumorell',description:'Páginas web profesionales, tiendas online y portfolios a medida.'},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="es-AR"><body><SiteLanguageShell/>{children}</body></html>; }
