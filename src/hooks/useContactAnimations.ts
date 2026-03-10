"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const useContactAnimations = () => {
  useGSAP(() => {
    // 1. Text Reveals (Subtitle & Button)
    gsap.from(".contact-text-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // 2. Left Images Reveal (contact 1 & 2)
    gsap.from(".contact-clip-path-1, .contact-clip-path-2", {
      y: 100, // Slide up from lower
      scale: 0.9, // Slight zoom in
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // 3. Right Swordman Reveal
    gsap.from(".swordman-reveal", {
      x: 100, // Slide in from the right
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  });
};
