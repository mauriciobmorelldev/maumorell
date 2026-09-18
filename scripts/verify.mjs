import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', e => errors.push(e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
assert.equal(await page.locator('h1').count(), 1);
assert.equal(await page.locator('.project-card').count(), 7);
assert.match(await page.title(), /Maumorell/);
await page.screenshot({ path: 'artifacts/desktop-hero.png' });
for (const section of ['#proyectos','#servicios','#sobre-mi','.process','.faq','#contacto']) {
  await page.locator(section).scrollIntoViewIfNeeded();
  await page.waitForTimeout(950);
}
await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true });
await page.locator('summary').first().click();
assert.equal(await page.locator('details').first().getAttribute('open'), '');
await page.getByLabel('Tu nombre', { exact:true }).fill('Prueba portfolio');
await page.getByLabel('Contame un poco de tu proyecto').fill('Quiero desarrollar una tienda nueva con WooCommerce.');
await page.getByText('Un e-commerce', { exact: true }).click();
await page.evaluate(() => { window.__opened = ''; window.open = url => { window.__opened = url; return null; }; });
await page.getByRole('button', {name:'Conversemos por WhatsApp'}).click();
const url = await page.evaluate(() => window.__opened);
assert.match(url, /https:\/\/wa.me\/5493794934184/);
assert.match(decodeURIComponent(url), /Un e-commerce/);
assert.match(decodeURIComponent(url), /Prueba portfolio/);
for (const slug of ['connexa','minifimy','mares','alojamiento-buenos-aires','courts','imeca','a-caballo-regalado']) {
  const response = await page.goto(`http://localhost:3000/proyectos/${slug}`);
  assert.equal(response.status(),200);
  assert.equal(await page.locator('h1').count(),1);
  assert.ok(await page.locator('main').innerText());
}
await page.screenshot({path:'artifacts/project-desktop.png',fullPage:true});
assert.equal((await page.goto('http://localhost:3000/proyectos/no-existe')).status(),404);
for (const width of [390, 768, 1440]) {
  await page.setViewportSize({width,height:844});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  await page.waitForTimeout(1400);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert.equal(overflow,false,`Overflow at ${width}`);
  if (width===390) {
    await page.screenshot({path:'artifacts/mobile-hero.png'});
    assert.equal(/[✳✦↗↙↶↑→]/u.test(await page.locator('body').innerText()),false,'Emoji-prone unicode remains in mobile text');
    await page.getByRole('button',{name:'Abrir menú'}).click();
    await page.getByRole('navigation').getByRole('link',{name:'Lo que hago'}).click();
    assert.equal(await page.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded'),'false');
    await page.locator('#proyectos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({path:'artifacts/mobile-projects.png'});
    await page.locator('.project-card').first().click();
    await page.waitForURL('**/proyectos/connexa');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  }
}
await page.emulateMedia({reducedMotion:'reduce'});
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
assert.equal(await page.locator('.hero-line > span').first().evaluate(el=>getComputedStyle(el).transform),'none');
const html = await (await page.request.get('http://localhost:3000')).text();
assert.match(html,/name="description"/);
assert.match(html,/noindex/);
assert.match(await (await page.request.get('http://localhost:3000/robots.txt')).text(),/Disallow: \//);
assert.equal((await page.request.get('http://localhost:3000/opengraph-image')).status(),200);
assert.deepEqual(errors,[]);
console.log('PASS: 7 static project routes, 404, title/description, preview robots, OG image, brief WhatsApp, FAQ, mobile menu, mobile unicode audit, 390/768/1440 overflow, reduced motion and no browser errors.');
await browser.close();
