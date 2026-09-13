import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/dm-sans';
import type { Metadata } from 'next';


import './globals.css';
import { siteUrl } from '@/lib/content';
export const metadata: Metadata = {
 metadataBase: new URL(siteUrl || 'http://localhost:3000'),
 ...(siteUrl ? {alternates: {canonical: siteUrl}} : {}),
 title: { default: 'Maumorell — Desarrollo web, e-commerce y productos digitales', template: '%s | Maumorell' },
 description: 'Desarrollo web a medida con Next.js, Magento y WooCommerce. Plataformas inmobiliarias, e-commerce e integraciones con foco en tu negocio. Conocé mis proyectos.',
 robots: {index: Boolean(siteUrl), follow: true},
 openGraph: {type: 'website', locale: 'es_AR', siteName: 'Maumorell', title: 'Maumorell — Ideas que se vuelven digitales', description: 'Desarrollo web, e-commerce y plataformas a medida. Del primer concepto a una experiencia que funciona.'},
 twitter: {card: 'summary_large_image'},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="es-AR"><body><a className="skip-link" href="#contenido">Saltar al contenido</a>{children}</body></html>; }
