"use client";

import { useState, useRef, type FC, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt: FC<BentoTiltProps> = ({ children, className = "" }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    // interrupt any running tween and set new transform
    gsap.to(itemRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 0.95,
      transformPerspective: 700,
      duration: 0.18,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!itemRef.current) return;

    gsap.to(itemRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.36,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // no inline transform state needed when using GSAP
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;
