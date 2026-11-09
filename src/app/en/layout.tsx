import type {Metadata} from 'next';
import {siteUrl} from '@/lib/content';
import {HtmlLanguage} from '@/components/html-language';

export const metadata:Metadata={
 title:'Custom websites, online stores and artist portfolios',
 description:'Custom websites, online stores, artist portfolios and real estate websites. Clear, responsive experiences built around each business.',
 keywords:['custom website design','web development Argentina','online store development','real estate website','artist portfolio website','professional website design'],
 ...(siteUrl?{alternates:{canonical:`${siteUrl}/en`,languages:{'es-AR':siteUrl,'en':`${siteUrl}/en`}}}:{}),
 openGraph:{locale:'en_US',...(siteUrl?{url:`${siteUrl}/en`}:{}),title:'Custom websites and online stores | Maumorell',description:'Custom websites, online stores, artist portfolios and real estate platforms built around each business.'},
 twitter:{card:'summary_large_image',title:'Custom websites and online stores | Maumorell',description:'Professional websites, online stores and artist portfolios.'},
};
export default function EnglishLayout({children}:{children:React.ReactNode}){return <><HtmlLanguage lang="en"/>{children}</>}
