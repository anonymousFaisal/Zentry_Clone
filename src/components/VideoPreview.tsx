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
      x: xOffset,
      y: yOffset,
      rotationY: xOffset / 2,
      rotationX: -yOffset / 2,
      transformPerspective: 500,
      duration: 1,
      ease: "power1.out",
    });

    // Animate inner content in opposite direction
    gsap.to(contentRef.current, {
      x: -xOffset,
      y: -yOffset,
      duration: 1,
      ease: "power1.out",
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
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out",
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
      style={{ perspective: "500px" }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
