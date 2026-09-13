# Maumorell — Portfolio

Portfolio en español con Next.js App Router, TypeScript y GSAP. Estética oscura con verde ácido, tipografías locales, cuatro casos y contacto por WhatsApp.

## Desarrollo y validación

```sh
pnpm install
pnpm dev
pnpm build
pnpm start
node scripts/verify.mjs
```

El servidor local utiliza el puerto 3000. La comprobación general requiere Chrome instalado.

## Contenido

`src/lib/content.ts` centraliza los cuatro casos: Connexa, MiniFimy, Alojamiento BA y Studio Marès. Albury y Magento ya no forman parte del portfolio de proyectos; Magento sigue como especialidad profesional. Las rutas retiradas devuelven 404.

`src/lib/project-visuals.ts` relaciona capturas reales con sus sitios. `scripts/capture-sites.mjs` permite actualizarlas. La captura de Marès corresponde a https://mares-seven.vercel.app.

## Gafete interactivo

`src/components/identity-badge.tsx` permite agarrar el gafete con Pointer Events y captura de puntero, estirar la cinta con resistencia progresiva y soltarlo con inercia. La cinta SVG sigue el broche; la animación física puede interrumpirse al volver a agarrarlo. Los botones de giro y contacto funcionan independientemente del arrastre. Las flechas ofrecen interacción con teclado, y Escape suelta. Movimiento reducido elimina el rebote. El gafete conserva iniciales hasta definir una foto.

El avatar y el preloader de la exploración anterior no se renderizan ni se cargan en el home. Sus archivos se conservan sin estar importados. El antiguo `scripts/verify-badge.mjs` describe la interacción anterior por hover; no corresponde a la nueva interacción de arrastre.

## Publicación

Configurar `NEXT_PUBLIC_SITE_URL` con el origen HTTPS definitivo y recompilar para activar indexación, canonical, sitemap y datos estructurados. Sin dominio, el preview permanece noindex. El formulario abre WhatsApp con el brief: no almacena datos ni simula envío. No se realizó despliegue público.
