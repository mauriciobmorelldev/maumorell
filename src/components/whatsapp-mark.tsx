import Image from 'next/image';

export function WhatsAppMark({size = 18}: {size?: number}) {
  return <Image className="whatsapp-mark" src="/icons/whatsapp.svg" alt="" aria-hidden="true" width={size} height={size} />;
}
