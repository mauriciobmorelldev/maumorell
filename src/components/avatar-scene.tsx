'use client';
import Image from 'next/image';
import {useEffect,useRef} from 'react';
import {ArrowUpRight, Code2, Layers, Play, ShoppingBag} from 'lucide-react';

export function AvatarScene(){
 const scene=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=scene.current;if(!el)return;
  const query=matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
  let frame=0,last=0;const x={value:0,velocity:0,target:0};const y={value:0,velocity:0,target:0};
  const tick=(now:number)=>{const dt=Math.min((now-last)/1000||.016,.032);last=now;let moving=false;
   for(const axis of [x,y]){axis.velocity+=(155*(axis.target-axis.value)-25*axis.velocity)*dt;axis.value+=axis.velocity*dt;moving ||= Math.abs(axis.velocity)>.01||Math.abs(axis.target-axis.value)>.01;}
   el.style.setProperty('--scene-x',`${x.value}deg`);el.style.setProperty('--scene-y',`${y.value}deg`);
   frame=moving?requestAnimationFrame(tick):0;
  };
  const start=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}};
  const move=(e:PointerEvent)=>{if(!query.matches)return;const b=el.getBoundingClientRect();x.target=((e.clientX-b.left)/b.width-.5)*12;y.target=-((e.clientY-b.top)/b.height-.5)*8;start();};
  const reset=()=>{x.target=0;y.target=0;start();};
  const change=()=>{if(!query.matches){cancelAnimationFrame(frame);frame=0;x.value=y.value=x.velocity=y.velocity=0;el.style.setProperty('--scene-x','0deg');el.style.setProperty('--scene-y','0deg');}};
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset);query.addEventListener('change',change);
  return()=>{cancelAnimationFrame(frame);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);query.removeEventListener('change',change);};
 },[]);
 return <div className="avatar-scene" ref={scene}><div className="avatar-stage"><Image id="hero-avatar" src="/avatar/mau-desk.png" alt="Avatar 3D de Mau, sonriendo mientras trabaja en su notebook frente a un escritorio" width={1254} height={1254} sizes="(max-width:700px) 94vw, 600px" loading="eager" fetchPriority="high"/><div className="scene-chip chip-code"><span><Code2 size={24}/></span><div><b>Ideas → código</b><small>Hecho a medida.</small></div></div><div className="scene-chip chip-commerce"><span><ShoppingBag size={23}/></span><div><b>E-commerce</b><small>Experiencias que conectan.</small></div></div><div className="scene-sticker"><Layers size={23}/><ArrowUpRight size={14}/></div></div><button className="replay-intro" type="button" onClick={()=>window.dispatchEvent(new Event('portfolio:replay-intro'))}><Play size={12} fill="currentColor"/> Ver bienvenida</button></div>;
}
