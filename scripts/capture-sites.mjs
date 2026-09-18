import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const targets = [
  {slug:'mares',url:'https://mares-seven.vercel.app'},
  {slug:'minifimy',url:'https://www.minifimy.com'},
  {slug:'connexa',url:'https://catalogopropiedades.com/propiedades'},
  {slug:'alojamiento-buenos-aires',url:'https://alojamientobuenosaires.com'},
  {slug:'courts',url:'https://www.courts.com/jamaica/'},
  {slug:'imeca',url:'https://www.imeca.com/'},
  {slug:'a-caballo-regalado',url:'https://acaballoregalado.empretienda.com.ar/'},
];
await mkdir('public/projects',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const captures=[];
for(const target of targets){
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
 try{
  const response=await page.goto(target.url,{waitUntil:'domcontentloaded',timeout:45000});
  if(!response.ok())throw new Error(`HTTP ${response.status()}`);
  await page.waitForTimeout(6000);
  for (const selector of ['text=Reject All Cookies','[aria-label*="close" i]','button[class*="close" i]']) {
   const candidates=page.locator(selector);
   for(let i=0;i<Math.min(await candidates.count(),6);i++){
    const candidate=candidates.nth(i);
    if(await candidate.isVisible().catch(()=>false)){await candidate.click({timeout:3000}).catch(()=>{});break;}
   }
  }
  await page.waitForTimeout(500);
  await page.evaluate(async()=>{await Promise.race([Promise.all([document.fonts.ready,...[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{}))]),new Promise(resolve=>setTimeout(resolve,4000))]);});
  await page.screenshot({path:`public/projects/${target.slug}.jpg`,type:'jpeg',quality:90,timeout:20000});
  captures.push({...target,finalUrl:page.url(),title:await page.title(),capturedAt:new Date().toISOString()});
  console.log(JSON.stringify(captures.at(-1)));
 }catch(e){console.error(target.slug,e.message);process.exitCode=1;}
 await page.close();
}
await writeFile('public/projects/captures.json',JSON.stringify(captures,null,2));
await browser.close();
