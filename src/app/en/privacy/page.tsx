import type {Metadata} from 'next';
import {PrivacyPage} from '@/components/privacy-page';
import {siteUrl} from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Maumorell handles privacy, WhatsApp enquiries and tracking technologies on this website.',
  ...(siteUrl ? {alternates: {canonical: `${siteUrl}/en/privacy`, languages: {'es-AR': `${siteUrl}/privacidad`, en: `${siteUrl}/en/privacy`}}} : {}),
};

export default function Privacy() {
  return <PrivacyPage locale="en"/>;
}
