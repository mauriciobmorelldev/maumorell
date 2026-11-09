import Link from 'next/link';
import {ArrowLeft, ArrowUpRight, Asterisk} from 'lucide-react';
import {Nav} from '@/components/nav';
import {contactUrl, contactUrlEn} from '@/lib/content';

const copy = {
  es: {
    languageHref: '/en/privacy',
    eyebrow: 'PRIVACIDAD · INFORMACIÓN CLARA',
    title: <>Tu privacidad,<br/><em>sin letra chica.</em></>,
    intro: 'Esta web está pensada para mostrar mi trabajo y facilitar una conversación. No utiliza herramientas publicitarias para seguir tu navegación.',
    summaryTitle: 'En pocas palabras',
    summary: ['No uso cookies propias.', 'No hay Google Analytics, Meta Pixel ni herramientas de seguimiento publicitario.', 'No creo perfiles de visitantes ni vendo información personal.'],
    contactTitle: 'Cuando iniciás una consulta',
    contact: 'El brief se procesa únicamente en tu navegador: arma el texto y abre WhatsApp con el mensaje listo. Esta web no guarda tu nombre ni el contenido de la consulta. Si decidís enviarlo, la conversación continúa en WhatsApp y se rige por las políticas de ese servicio.',
    technicalTitle: 'Información técnica',
    technical: 'Como ocurre con cualquier sitio publicado, el proveedor de alojamiento puede procesar registros técnicos básicos para entregar el contenido, mantener la disponibilidad y proteger el servicio. Maumorell no utiliza esos registros para publicidad ni para crear perfiles de comportamiento.',
    linksTitle: 'Servicios externos',
    links: 'Los enlaces a WhatsApp, Instagram y a los proyectos publicados llevan a servicios de terceros. Cada uno aplica sus propias condiciones y políticas de privacidad.',
    rightsTitle: 'Consultas sobre tus datos',
    rights: 'Si ya te comunicaste conmigo y querés consultar, corregir o solicitar la eliminación de información compartida en esa conversación, podés escribirme directamente.',
    futureTitle: 'Si esto cambia',
    future: 'Si en el futuro incorporo analítica, publicidad o cualquier tecnología no esencial, esta política se actualizará y, cuando corresponda, se solicitará consentimiento antes de activarla.',
    updated: 'Última actualización: 9 de noviembre de 2026.',
    contactCta: 'Consultar por WhatsApp',
    back: 'Volver al inicio',
    footer: 'PRIVACIDAD Y TRANSPARENCIA',
  },
  en: {
    languageHref: '/privacidad',
    eyebrow: 'PRIVACY · PLAIN LANGUAGE',
    title: <>Your privacy,<br/><em>without the fine print.</em></>,
    intro: 'This website exists to show my work and make it easy to start a conversation. It does not use advertising tools to track your browsing.',
    summaryTitle: 'In short',
    summary: ['I do not set first-party cookies.', 'There is no Google Analytics, Meta Pixel or advertising tracker.', 'I do not build visitor profiles or sell personal information.'],
    contactTitle: 'When you start an enquiry',
    contact: 'The brief is processed only in your browser: it prepares the text and opens WhatsApp with the message ready. This website does not store your name or enquiry. If you choose to send it, the conversation continues on WhatsApp and is governed by that service’s policies.',
    technicalTitle: 'Technical information',
    technical: 'As with any published website, the hosting provider may process basic technical logs to deliver content, maintain availability and protect the service. Maumorell does not use those logs for advertising or behavioural profiling.',
    linksTitle: 'External services',
    links: 'Links to WhatsApp, Instagram and published projects lead to third-party services. Each service applies its own terms and privacy policies.',
    rightsTitle: 'Questions about your data',
    rights: 'If you have already contacted me and want to access, correct or request the deletion of information shared in that conversation, you can message me directly.',
    futureTitle: 'If this changes',
    future: 'If analytics, advertising or any other non-essential technology is added in the future, this policy will be updated and consent will be requested before activation whenever required.',
    updated: 'Last updated: November 9, 2026.',
    contactCta: 'Ask on WhatsApp',
    back: 'Back to home',
    footer: 'PRIVACY AND TRANSPARENCY',
  },
} as const;

export function PrivacyPage({locale}: {locale: 'es' | 'en'}) {
  const content = copy[locale];
  const home = locale === 'en' ? '/en' : '/';
  const whatsapp = locale === 'en' ? contactUrlEn : contactUrl;

  return <><Nav locale={locale} languageHref={content.languageHref}/><main id="contenido" className="privacy-page section">
    <header className="privacy-hero"><span className="eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p></header>
    <div className="privacy-grid">
      <section className="privacy-summary"><span>01</span><h2>{content.summaryTitle}</h2><ul>{content.summary.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <div className="privacy-details">
        {[[content.contactTitle, content.contact], [content.technicalTitle, content.technical], [content.linksTitle, content.links], [content.rightsTitle, content.rights], [content.futureTitle, content.future]].map(([title, text], index) => <section key={title}><span>0{index + 2}</span><h2>{title}</h2><p>{text}</p></section>)}
      </div>
    </div>
    <div className="privacy-actions"><p>{content.updated}</p><div><Link className="text-link" href={home}><ArrowLeft size={17}/>{content.back}</Link><a className="button primary" href={whatsapp} target="_blank" rel="noopener noreferrer">{content.contactCta}<ArrowUpRight size={18}/></a></div></div>
  </main><footer className="footer privacy-footer"><Link className="wordmark" href={home}>mau<span>morell</span><Asterisk className="brand-mark" aria-hidden="true"/></Link><span>{content.footer}</span><span>© {new Date().getFullYear()} Maumorell</span></footer></>;
}
