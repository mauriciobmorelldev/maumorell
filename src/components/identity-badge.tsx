'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Asterisk, Fingerprint, MoveUpRight, RotateCcw } from 'lucide-react';

import './badge.css';
import Image from 'next/image';
import { contactUrl, profile } from '@/lib/content';

/** CSS 3D keeps the identity visible without WebGL or JavaScript. */
export function IdentityBadge() {
  const scene = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const cord = useRef<SVGPathElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el=card.current, area=scene.current, rope=cord.current;if(!el||!area||!rope)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let x=0,y=0,vx=0,vy=0,frame=0,last=0,dragging=false,pointer=-1,startX=0,startY=0,originX=0,originY=0,sampleTime=0;
    const paint=()=>{
      el.style.transform='translate3d('+x+'px,'+y+'px,0) rotate('+(-7+x*.065)+'deg)';
      const angle=(-7+x*.065)*Math.PI/180,reach=el.offsetHeight/2+25;
      const endX=el.offsetLeft+el.offsetWidth/2+x+reach*Math.sin(angle), endY=el.offsetTop+el.offsetHeight/2+y-reach*Math.cos(angle);
      const anchorX=area.clientWidth/2, anchorY=window.innerWidth<=700?-30:-80;
      rope.setAttribute('d','M '+anchorX+' '+anchorY+' Q '+(anchorX+x*.18)+' '+((anchorY+endY)/2)+' '+endX+' '+endY);
    };
    const tick=(now:number)=>{const dt=Math.min((now-last)/1000||.016,.032);last=now;if(!dragging){vx+=(-145*x-17*vx)*dt;vy+=(-145*y-17*vy)*dt;x+=vx*dt;y+=vy*dt;}paint();if(!dragging&&(Math.abs(x)+Math.abs(y)+Math.abs(vx)+Math.abs(vy)>.15))frame=requestAnimationFrame(tick);else{frame=0;if(!dragging){x=y=vx=vy=0;paint();}}};
    const settle=()=>{cancelAnimationFrame(frame);if(reduced.matches){x=y=vx=vy=0;paint();frame=0;}else{last=performance.now();frame=requestAnimationFrame(tick);}};
    const down=(e:PointerEvent)=>{if(e.button!==0||!e.isPrimary||(e.target as HTMLElement).closest('a,button'))return;cancelAnimationFrame(frame);frame=0;dragging=true;pointer=e.pointerId;startX=e.clientX;startY=e.clientY;const inverse=(n:number,limit:number)=>-Math.sign(n)*limit*Math.log(Math.max(.01,1-Math.min(Math.abs(n)/limit,.99)));originX=inverse(x,Math.min(area.clientWidth*.3,170));originY=inverse(y,190);vx=vy=0;sampleTime=performance.now();el.setPointerCapture(pointer);el.dataset.dragging='true';e.preventDefault();};
    const move=(e:PointerEvent)=>{if(!dragging||e.pointerId!==pointer)return;const maxX=Math.min(area.clientWidth*.3,170);const maxY=190;
      const resist=(n:number,limit:number)=>Math.sign(n)*limit*(1-Math.exp(-Math.abs(n)/limit));
      const nx=resist(originX+e.clientX-startX,maxX),ny=resist(originY+e.clientY-startY,maxY);const now=performance.now(),dt=Math.max((now-sampleTime)/1000,.008);vx=Math.max(-1200,Math.min(1200,(nx-x)/dt));vy=Math.max(-1200,Math.min(1200,(ny-y)/dt));x=nx;y=ny;sampleTime=now;paint();};
    const up=(e:PointerEvent)=>{if(!dragging||e.pointerId!==pointer)return;dragging=false;el.dataset.dragging='false';if(el.hasPointerCapture(pointer))el.releasePointerCapture(pointer);if(performance.now()-sampleTime>90)vx=vy=0;pointer=-1;settle();};
    const cancel=()=>{if(!dragging)return;dragging=false;el.dataset.dragging='false';if(el.hasPointerCapture(pointer))el.releasePointerCapture(pointer);pointer=-1;vx=vy=0;settle();};
    const key=(e:KeyboardEvent)=>{if(e.target!==el)return;if(e.key==='Escape'){e.preventDefault();cancel();x=y=vx=vy=0;paint();}else if(['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();if(e.key==='ArrowDown')y+=25;if(e.key==='ArrowUp')y-=25;if(e.key==='ArrowLeft')x-=25;if(e.key==='ArrowRight')x+=25;paint();settle();}};
    const resize=new ResizeObserver(paint);resize.observe(area);paint();
    el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',cancel);el.addEventListener('lostpointercapture',cancel);el.addEventListener('keydown',key);window.addEventListener('blur',cancel);reduced.addEventListener('change',cancel);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',cancel);el.removeEventListener('lostpointercapture',cancel);el.removeEventListener('keydown',key);window.removeEventListener('blur',cancel);reduced.removeEventListener('change',cancel);};
  }, []);

  return <div className="badge-scene" ref={scene}>
    <div className="badge-orbit" aria-hidden="true"/>
    <span className="badge-coordinate" aria-hidden="true">IDENTITY SYSTEM / VOL. 01</span>
    <span className="badge-crosshair crosshair-top" aria-hidden="true">+</span>
    <span className="badge-crosshair crosshair-bottom" aria-hidden="true">+</span>
    <svg className="badge-cord" aria-hidden="true"><defs><linearGradient id="cord-material"><stop stopColor="#1d2515"/><stop offset=".5" stopColor="#394629"/><stop offset="1" stopColor="#1e2815"/></linearGradient></defs><path id="badge-cord-path" ref={cord} fill="none" stroke="url(#cord-material)" strokeWidth="28" strokeLinecap="round"/><text fill="#c2f74f" fontSize="7" letterSpacing="2"><textPath href="#badge-cord-path" startOffset="20%">MAUMORELL · CREATIVE DEVELOPER</textPath></text></svg>
    <div className="badge-rig" ref={card} tabIndex={0} role="group" aria-label="Gafete interactivo de Mau. Arrastrá para estirar la cinta; usá las flechas con teclado y Escape para soltar.">
      <div className="badge-lanyard" aria-hidden="true"><span>MAUMORELL · CREATIVE DEVELOPER · MAUMORELL</span></div>
      <div className="badge-clip" aria-hidden="true"/>
      <div className={`badge-flipper ${flipped ? 'is-flipped' : ''}`}>
        <div className="badge-face badge-front" inert={flipped} aria-hidden={flipped}>
          <div className="badge-topline"><span className="badge-builder">MM <Asterisk size={7}/> / DIGITAL BUILDER</span><span className="badge-chip"><i/> CONNECTED</span></div>
          <div className="badge-portrait">
            <div className="portrait-grid" aria-hidden="true"/>
            <span className="portrait-index">MM—001</span>
            {profile.portrait ? <Image className="badge-photo" src={profile.portrait} alt="Retrato de Mau Morell" fill sizes="260px" priority/> : <div className="portrait-monogram" aria-label="Iniciales de Maumorell">m<span>m</span><Asterisk aria-hidden="true"/></div>}
            <span className="portrait-caption">DESIGN MIND.<br/>DEVELOPER SOUL.</span>
            <Fingerprint className="portrait-fingerprint" size={37} strokeWidth={1}/>
          </div>
          <div className="badge-identity"><h2>Mau Morell<ArrowUpRight aria-hidden="true"/></h2><p>CREATIVE DEVELOPER</p></div>
          <div className="badge-specialties"><span>NEXT.JS</span><span>MAGENTO</span><span>WOOCOMMERCE</span></div>
          <div className="badge-bottom"><div className="badge-barcode" aria-hidden="true"/><span>IDEAS / EXPERIENCIAS</span><button type="button" onClick={() => setFlipped(true)} aria-label="Girar gafete para ver contacto"><RotateCcw size={17}/></button></div>
          <div className="badge-gloss" aria-hidden="true"/>
        </div>
        <div className="badge-face badge-back" inert={!flipped} aria-hidden={!flipped}>
          <span className="eyebrow">EL OTRO LADO DE LA IDEA</span><Asterisk className="badge-back-star" aria-hidden="true"/><h2>Lo próximo<br/>lo hacemos<br/><em>realidad.</em></h2><p>Diseño, desarrollo y criterio de negocio.<br/>Conectemos los puntos.</p><a href={contactUrl} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <ArrowUpRight size={20}/></a><div className="badge-back-footer"><span>@maumorell</span><button type="button" onClick={() => setFlipped(false)} aria-label="Volver al frente del gafete"><RotateCcw size={17}/></button></div>
        </div>
      </div>
    </div>
    <div className="badge-interaction-hint"><MoveUpRight size={13}/><span className="pointer-hint">AGARRÁ, ESTIRÁ Y SOLTÁ.</span><span className="touch-hint">ARRASTRÁ EL GAFETE. USÁ EL BOTÓN PARA GIRARLO.</span></div>
  </div>;
}
