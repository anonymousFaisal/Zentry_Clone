"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const useStoryAnimations = () => {
  useGSAP(() => {
    // 1. Top Subtitle Fade
    gsap.from(".story-subtitle", {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#story",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // 2. Main Image Reveal
    gsap.from(".story-img-mask", {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", // Start from center point
      opacity: 0,
      duration: 1.5,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".story-img-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      clearProps: "clipPath", // Clear inline clip path so CSS styles take over hover
    });

    // 3. Staggered bottom text & button
    gsap.from(".story-content-reveal", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".story-content-reveal",
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
    });
  });
};
