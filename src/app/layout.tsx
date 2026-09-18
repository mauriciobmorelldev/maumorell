import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/dm-sans';
import type { Metadata } from 'next';


import './globals.css';
import { siteUrl } from '@/lib/content';
import { SitePreloader } from '@/components/site-preloader';
export const metadata: Metadata = {
 metadataBase: new URL(siteUrl || 'http://localhost:3000'),
 ...(siteUrl ? {alternates: {canonical: siteUrl}} : {}),
 title: { default: 'Maumorell — Desarrollo web, e-commerce y productos digitales', template: '%s | Maumorell' },
 description: 'Desarrollo web y e-commerce con Next.js, Magento, Shopify, WooCommerce y Empretienda. Casos reales, integraciones y plataformas a medida.',
 robots: {index: Boolean(siteUrl), follow: true},
 openGraph: {type: 'website', locale: 'es_AR', siteName: 'Maumorell', title: 'Maumorell — Ideas que se vuelven digitales', description: 'Desarrollo web y e-commerce con Next.js, Magento, Shopify, WooCommerce y Empretienda. Casos reales y plataformas a medida.'},
 twitter: {card: 'summary_large_image'},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="es-AR"><body><SitePreloader/><a className="skip-link" href="#contenido">Saltar al contenido</a>{children}</body></html>; }
