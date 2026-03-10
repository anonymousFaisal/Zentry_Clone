"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const useAboutAnimations = () => {
  useGSAP(() => {
    // 1. Clip path expanding animation
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1, // Reduces jitter right as the pin engages
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease: "power1.inOut",
    });

    // 2. Intro text fade-up animations
    gsap.from(".about-intro-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      force3D: true, // Hardware acceleration for text translation
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".about-subtext", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2, // Play slightly after the initial intro text
      ease: "power3.out",
      force3D: true,
      scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  });
};
