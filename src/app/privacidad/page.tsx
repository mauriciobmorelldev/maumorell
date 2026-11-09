import type {Metadata} from 'next';
import {PrivacyPage} from '@/components/privacy-page';
import {siteUrl} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo Maumorell trata la privacidad, las consultas por WhatsApp y las tecnologías de seguimiento en este sitio.',
  ...(siteUrl ? {alternates: {canonical: `${siteUrl}/privacidad`, languages: {'es-AR': `${siteUrl}/privacidad`, en: `${siteUrl}/en/privacy`}}} : {}),
};

export default function Privacy() {
  return <PrivacyPage locale="es"/>;
}
