'use client';

import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-line > span', {yPercent: 110, rotate: 3, duration: 1.15, stagger: .14, ease: 'power4.out'});
      gsap.from('.hero-meta, .hero-description, .hero-actions', {opacity: 0, y: 20, duration: .8, delay: .45, stagger: .12});

      gsap.utils.toArray<HTMLElement>('[data-reveal]:not(.service-row)').forEach((element) => {
        gsap.from(element, {y: 48, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: {trigger: element, start: 'top 93%', once: true}});
      });

      gsap.utils.toArray<HTMLElement>('.service-row').forEach((row, index) => {
        const visual = row.querySelector<HTMLElement>('.service-visual');
        const art = row.querySelector<HTMLElement>('.service-visual-art');
        const image = row.querySelector<HTMLImageElement>('.service-visual-art img');
        const caption = row.querySelectorAll('.service-visual figcaption > *');
        const content = row.querySelectorAll('.service-num, .service-copy, ul, .service-row > a');

        const timeline = gsap.timeline({
          scrollTrigger: {trigger: row, start: 'top 88%', once: true},
          defaults: {ease: 'power3.out'},
        });

        timeline
          .from(content, {y: 28, opacity: 0, duration: .72, stagger: .07}, 0)
          .from(visual, {xPercent: index % 2 === 0 ? 5 : -5, scale: .965, opacity: 0, duration: .9}, 0)
          .from(art, {yPercent: 8, scale: .88, opacity: 0, duration: 1, ease: 'power4.out'}, .08)
          .from(caption, {y: 12, opacity: 0, duration: .55, stagger: .08}, .35);

        if (image && visual) {
          gsap.fromTo(image, {yPercent: -2.5}, {
            yPercent: 2.5,
            ease: 'none',
            scrollTrigger: {trigger: visual, start: 'top bottom', end: 'bottom top', scrub: .8},
          });
        }
      });

      gsap.to('.ticker-track', {xPercent: -50, duration: 28, repeat: -1, ease: 'none'});
      gsap.to('.progress', {scaleX: 1, ease: 'none', scrollTrigger: {start: 0, end: 'max', scrub: true}});
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 901px)', () => {
      const reel = document.querySelector<HTMLElement>('.project-reel');
      const track = reel?.querySelector<HTMLElement>('.reel-track');
      const viewport = reel?.querySelector<HTMLElement>('.reel-viewport');
      if (!reel || !track || !viewport) return;
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const timeline = gsap.timeline({scrollTrigger: {
        trigger: reel, start: 'top 92px', end: () => `+=${distance() * .8}`,
        pin: true, scrub: .7, invalidateOnRefresh: true, anticipatePin: 1,
      }});
      timeline.to(track, {x: () => -distance(), ease: 'none'}, 0)
        .fromTo(reel.querySelector('.reel-progress span'), {scaleX: .03}, {scaleX: 1, ease: 'none'}, 0);
      const onFocus = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const story = target.closest<HTMLElement>('.project-story');
        const trigger = timeline.scrollTrigger;
        if (!story || !trigger) return;
        const ratio = Math.min(1, story.offsetLeft / distance());
        window.scrollTo({top: trigger.start + ratio * (trigger.end - trigger.start), behavior: 'instant'});
      };
      reel.addEventListener('focusin', onFocus);
      return () => reel.removeEventListener('focusin', onFocus);
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const cleanups: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>('.service-visual').forEach((visual) => {
        const art = visual.querySelector<HTMLElement>('.service-visual-art');
        const glow = visual.querySelector<HTMLElement>('.service-visual-glow');
        if (!art || !glow) return;

        const artX = gsap.quickTo(art, 'x', {duration: .4, ease: 'power3.out'});
        const artY = gsap.quickTo(art, 'y', {duration: .4, ease: 'power3.out'});
        const rotateX = gsap.quickTo(art, 'rotationX', {duration: .45, ease: 'power3.out'});
        const rotateY = gsap.quickTo(art, 'rotationY', {duration: .45, ease: 'power3.out'});
        const glowX = gsap.quickTo(glow, 'x', {duration: .32, ease: 'power3.out'});
        const glowY = gsap.quickTo(glow, 'y', {duration: .32, ease: 'power3.out'});
        const glowOpacity = gsap.quickTo(glow, 'opacity', {duration: .25, ease: 'power2.out'});

        const onPointerMove = (event: PointerEvent) => {
          const bounds = visual.getBoundingClientRect();
          const normalizedX = (event.clientX - bounds.left) / bounds.width - .5;
          const normalizedY = (event.clientY - bounds.top) / bounds.height - .5;
          artX(normalizedX * 12);
          artY(normalizedY * 9);
          rotateX(normalizedY * -3.5);
          rotateY(normalizedX * 4.5);
          glowX(normalizedX * bounds.width * .55);
          glowY(normalizedY * bounds.height * .55);
          glowOpacity(.8);
        };

        const onPointerLeave = () => {
          artX(0);
          artY(0);
          rotateX(0);
          rotateY(0);
          glowX(0);
          glowY(0);
          glowOpacity(0);
        };

        visual.addEventListener('pointermove', onPointerMove, {passive: true});
        visual.addEventListener('pointerleave', onPointerLeave);
        cleanups.push(() => {
          visual.removeEventListener('pointermove', onPointerMove);
          visual.removeEventListener('pointerleave', onPointerLeave);
        });
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    });

    return () => mm.revert();
  }, []);

  return <div className="progress" aria-hidden="true" />;
}
