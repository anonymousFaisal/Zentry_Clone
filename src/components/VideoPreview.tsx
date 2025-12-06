"use client";

import { gsap } from "gsap";
import { useState, useRef, useEffect, type FC, type ReactNode, type MouseEvent } from "react";

interface VideoPreviewProps {
  children: ReactNode;
}

export const VideoPreview: FC<VideoPreviewProps> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !contentRef.current || !isHovering) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const xOffset = event.clientX - (rect.left + rect.width / 2);
    const yOffset = event.clientY - (rect.top + rect.height / 2);

    // Animate container
    gsap.to(sectionRef.current, {
      x: xOffset / 5, // Dampened translation
      y: yOffset / 5, // Dampened translation
      rotationY: xOffset / 5, // Dampened rotation
      rotationX: -yOffset / 5, // Dampened rotation
      transformPerspective: 600,
      duration: 1,
      ease: "power3.out", // Smoother easing
      scale: 1.02, // Subtle scale up
    });

    // Animate inner content in opposite direction
    gsap.to(contentRef.current, {
      x: -xOffset / 5,
      y: -yOffset / 5,
      duration: 1,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    if (!isHovering) {
      // Reset positions when hover ends
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1, // Reset scale
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 w-full h-full overflow-hidden rounded-lg"
      style={{ perspective: "600px" }}
    >
      <div ref={contentRef} className="origin-center rounded-lg w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
