import type {Metadata} from 'next';
import {siteUrl} from '@/lib/content';
import {HtmlLanguage} from '@/components/html-language';

export const metadata:Metadata={
 title:'Web development, e-commerce and digital products',
 description:'Web development and e-commerce with Next.js, Magento, Shopify, WooCommerce and Empretienda. Real projects, integrations and custom platforms.',
 ...(siteUrl?{alternates:{canonical:`${siteUrl}/en`,languages:{'es-AR':siteUrl,'en':`${siteUrl}/en`}}}:{}),
 openGraph:{locale:'en_US',title:'Maumorell — Ideas turned into digital products',description:'Web development and e-commerce with Next.js, Magento, Shopify, WooCommerce and Empretienda.'},
};
export default function EnglishLayout({children}:{children:React.ReactNode}){return <><HtmlLanguage lang="en"/>{children}</>}
