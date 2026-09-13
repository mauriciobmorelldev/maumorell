import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL || 'http://localhost:3000';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto(base,{waitUntil:'networkidle'});
await page.waitForTimeout(1600);
assert.equal(await page.locator('.project-card').count(),5);
const rig=page.locator('.badge-rig');
const before=await rig.evaluate(el=>getComputedStyle(el).transform);
const box=await page.locator('.badge-scene').boundingBox();
await page.mouse.move(box.x+box.width*.8,box.y+box.height*.3);
await page.waitForTimeout(1000);
const after=await rig.evaluate(el=>getComputedStyle(el).transform);
assert.notEqual(before,after,'Badge must react to pointer movement');
await page.screenshot({path:'artifacts/badge-tilted.png'});
await page.mouse.move(50,100);
await page.waitForTimeout(1100);
await page.getByRole('button',{name:'Girar gafete para ver contacto'}).click();
await page.waitForTimeout(950);
assert.equal(await page.locator('.badge-front').getAttribute('inert'),'');
assert.ok(await page.getByRole('link',{name:'Hablemos por WhatsApp'}).isVisible());
assert.match(await page.getByRole('link',{name:'Hablemos por WhatsApp'}).getAttribute('href'),/wa.me\/5493794934184/);
await page.screenshot({path:'artifacts/badge-back.png'});
await page.getByRole('button',{name:'Volver al frente del gafete'}).click();
await page.waitForTimeout(950);
assert.equal(await page.locator('.badge-back').getAttribute('inert'),'');
for(const slug of ['connexa','minifimy','alojamiento-buenos-aires','albury']){
 const card=page.locator(`.project-card[href="/proyectos/${slug}"]`);
 await card.scrollIntoViewIfNeeded();
 const img=card.locator('img');
 await img.evaluate(el=>el.decode());
 assert.ok(await img.evaluate(el=>el.naturalWidth>0));
 assert.match(await img.getAttribute('alt'),/Captura real/);
}
await page.goto(`${base}/proyectos/albury`,{waitUntil:'networkidle'});
assert.match(await page.title(),/Albury/);
assert.equal(await page.getByRole('link',{name:'Visitar sitio real'}).getAttribute('href'),'https://albury-one.vercel.app');
for(const width of [360,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 await page.goto(base,{waitUntil:'networkidle'});
 await page.waitForTimeout(1500);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width}`);
 const title=await page.locator('h1').boundingBox();const badge=await rig.boundingBox();
 assert.ok(title.y+title.height<badge.y || title.x+title.width<badge.x,'Badge must not obscure heading');
 if(width===390){
  await page.getByRole('button',{name:'Girar gafete para ver contacto'}).tap({force:true}).catch(async()=>page.getByRole('button',{name:'Girar gafete para ver contacto'}).click());
  await page.waitForTimeout(950);
  assert.ok(await page.getByRole('link',{name:'Hablemos por WhatsApp'}).isVisible());
 }
}
await page.emulateMedia({reducedMotion:'reduce'});
await page.goto(base,{waitUntil:'networkidle'});
const still=await rig.evaluate(el=>getComputedStyle(el).transform);
await page.mouse.move(1000,350);await page.waitForTimeout(250);
assert.equal(await rig.evaluate(el=>getComputedStyle(el).transform),still);
await page.getByRole('button',{name:'Girar gafete para ver contacto'}).click();
assert.equal(await page.locator('.badge-flipper').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
assert.deepEqual(errors,[]);
await browser.close();
console.log('PASS: real captures, Albury case, pointer tilt, both badge faces, contact URL, reduced motion and 360/390/768/1024/1440 layouts.');
