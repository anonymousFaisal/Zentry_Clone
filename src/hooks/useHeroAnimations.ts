import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface UseHeroAnimationsProps {
  hasClicked: boolean;
  currentIndex: number;
  nextVideoRef: React.RefObject<HTMLVideoElement | null>;
  isLoaded: boolean;
}

export const useHeroAnimations = ({ hasClicked, currentIndex, nextVideoRef, isLoaded }: UseHeroAnimationsProps) => {
  // 1. Video Expansion Animation (Clicking the mini video)
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 0.75,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVideoRef.current) {
              const p = nextVideoRef.current.play();
              if (p && typeof p.catch === "function") p.catch(() => {});
            }
          },
        });
        gsap.from("#main-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    },
  );

  // 2. Video Frame Scrolling Clip Path
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // 3. Premium Text Reveal (Triggers after loader finishes)
  useGSAP(() => {
    if (isLoaded) {
      const tl = gsap.timeline();

      // Set initial 3D rotated state for HEADINGS
      gsap.set(".hero-text-reveal", {
        xPercent: 5,
        yPercent: 30, // y offset instead of yPercent 120
        z: -30,
        rotationX: -20,
        rotationY: 25,
        transformOrigin: "50% 100% -50px",
        opacity: 0,
      });

      // Set initial flat state for SUBTEXT
      gsap.set(".hero-subtext-reveal", { yPercent: 100, opacity: 0 });

      // Animate headings into flat, visible position
      tl.to(".hero-text-reveal", {
        xPercent: 0,
        yPercent: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power2.inOut",
        delay: 1.2,
      });

      // Animate subtext sliding up right after the headings start (position parameter `<0.4`)
      tl.to(
        ".hero-subtext-reveal",
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "<0.4",
      );
    }
  }, [isLoaded]);

  // 4. Parallax drift on hero text
  useGSAP(() => {
    // Hero content drifts up at a different speed than the video
    gsap.to("#hero-content", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};
