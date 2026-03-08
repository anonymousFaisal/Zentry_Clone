"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface LoaderProps {
  isLoaded: boolean;
}

const Loader = ({ isLoaded }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const progressTween = useRef<gsap.core.Tween | null>(null);

  // Animate the progress bar while loading
  useEffect(() => {
    if (!progressRef.current || isLoaded) return;

    progressTween.current = gsap.to(progressRef.current, {
      width: "90%",
      duration: 3,
      ease: "power2.out",
    });

    return () => {
      progressTween.current?.kill();
    };
  }, [isLoaded]);

  // Exit animation when loaded
  useEffect(() => {
    if (!isLoaded || hasAnimated.current) return;
    hasAnimated.current = true;

    progressTween.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
      },
    });

    // 1. Snap progress bar to 100%
    if (progressRef.current) {
      tl.to(progressRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    // 2. Fade out the center content (logo, text, progress bar)
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power3.in",
        },
        "+=0.1",
      );
    }

    // 3. Split curtains apart
    tl.to(
      topCurtainRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.1",
    );

    tl.to(
      bottomCurtainRef.current,
      {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "<",
    );
  }, [isLoaded]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-200 pointer-events-none" aria-hidden={isLoaded}>
      {/* Top curtain */}
      <div ref={topCurtainRef} className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a]" />

      {/* Bottom curtain */}
      <div ref={bottomCurtainRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a]" />

      {/* Center content */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
        {/* Pulsing wordmark */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl md:text-6xl font-zentry font-black uppercase text-white tracking-widest loader-pulse">Zentry</h1>
          <p className="text-xs md:text-sm font-general uppercase tracking-[0.4em] text-white/40">Loading Experience</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #5d3fd3, #edff66)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
