'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export function Motion(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{gsap.from('.hero-line > span',{yPercent:110,rotate:3,duration:1.15,stagger:.14,ease:'power4.out'});gsap.from('.hero-meta, .hero-description, .hero-actions',{opacity:0,y:20,duration:.8,delay:.45,stagger:.12});gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:48,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 93%',once:true}}));gsap.to('.ticker-track',{xPercent:-50,duration:28,repeat:-1,ease:'none'});gsap.to('.progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});});return()=>mm.revert();},[]);return <div className="progress" aria-hidden="true"/>}
