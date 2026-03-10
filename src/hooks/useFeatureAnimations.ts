"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

interface UseFeatureAnimationsProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export const useFeatureAnimations = ({ videoRef }: UseFeatureAnimationsProps) => {
  // 1. IntersectionObserver for standalone video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => console.error("Feature video play failed", err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, [videoRef]);

  // 2. GSAP staggered reveal for bento cards and intro text
  useGSAP(() => {
    // Staggered reveal for all bento cards
    gsap.from(".bento-card-reveal", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      force3D: true,
      scrollTrigger: {
        trigger: ".bento-card-reveal", // Use the first card as trigger for the whole group
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
};
