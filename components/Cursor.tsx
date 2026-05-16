'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const curORef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cur = curRef.current;
    const curO = curORef.current;
    if (!cur || !curO) return;

    let mx = 0, my = 0, ox = 0, oy = 0;
    let rafId: number;

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      cur!.style.left = mx + 'px';
      cur!.style.top = my + 'px';
    }

    function loop() {
      ox += (mx - ox) * 0.1;
      oy += (my - oy) * 0.1;
      curO!.style.left = ox + 'px';
      curO!.style.top = oy + 'px';
      rafId = requestAnimationFrame(loop);
    }

    function onEnter() { cur!.classList.add('xl'); }
    function onLeave() { cur!.classList.remove('xl'); }

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    loop();

    const interactiveEls = document.querySelectorAll('a, button');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef} />
      <div id="curO" ref={curORef} />
    </>
  );
}
