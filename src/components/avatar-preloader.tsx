'use client';
import {useEffect,useRef} from 'react';

export function AvatarPreloader(){
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const el=dialog.current;if(!el)return;
  let disposed=false;let timer:ReturnType<typeof setTimeout>|undefined;let replayTimer:ReturnType<typeof setTimeout>|undefined;
  const close=()=>{if(el.open)el.close();};
  const markReady=()=>{if(disposed)return;clearTimeout(timer);close();window.dispatchEvent(new Event('portfolio:ready'));};
  const avatar=document.getElementById('hero-avatar') as HTMLImageElement|null;
  const ready=Promise.all([document.fonts.ready,avatar?.decode().catch(()=>{})]);
  if(avatar&&!avatar.complete&&!matchMedia('(prefers-reduced-motion: reduce)').matches){el.showModal();timer=setTimeout(markReady,4500);}
  void ready.then(markReady);
  const replay=()=>{if(el.open)return;el.showModal();clearTimeout(replayTimer);replayTimer=setTimeout(close,2200);};
  window.addEventListener('portfolio:replay-intro',replay);
  return()=>{disposed=true;clearTimeout(timer);clearTimeout(replayTimer);window.removeEventListener('portfolio:replay-intro',replay);close();};
 },[]);
 return <dialog className="avatar-preloader" ref={dialog} aria-labelledby="loader-title"><div className="loader-content"><span className="loader-wordmark">maumorell<span>✦</span></span><img src="/avatar/mau-desk.png" width="330" height="330" alt="Mau sentado en su escritorio, preparando el portfolio"/><div className="loader-status"><i/><i/><i/></div><h2 id="loader-title">Preparando buenas ideas.</h2><p>Un café, un poco de código y ya estamos.</p><button autoFocus type="button" onClick={()=>dialog.current?.close()}>Entrar al portfolio <span>→</span></button></div></dialog>;
}
