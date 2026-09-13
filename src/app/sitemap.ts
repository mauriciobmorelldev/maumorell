import type { MetadataRoute } from 'next';
import {projects,siteUrl} from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{return siteUrl?[{url:siteUrl,changeFrequency:'monthly',priority:1},...projects.map(p=>({url:`${siteUrl}/proyectos/${p.slug}`,changeFrequency:'monthly' as const,priority:.8}))]:[];}
