"use client";

import { useState, useRef, useEffect, type FC, type ReactNode, type MouseEvent } from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoCardProps {
  src: string; // base path without extension, e.g. "videos/feature-1"
  title: ReactNode;
  description?: string;
  isComingSoon?: boolean;
  poster?: string; // poster image path
}

const BentoCard: FC<BentoCardProps> = ({ src, title, description, isComingSoon, poster }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  // Lazy load: only load/play video when it enters the viewport
  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading and playing
          video.preload = "metadata";
          video.load();
          const p = video.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          // Pause when out of view to save bandwidth
          video.pause();
        }
      },
      { rootMargin: "200px" }, // Start loading 200px before visible
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Derive source paths — support both "videos/feature-1.webm" (legacy) and "videos/feature-1" (new base path)
  const baseSrc = src.replace(/\.(webm|mp4)$/, "");

  return (
    <div ref={cardRef} className="relative w-full h-full">
      <video
        ref={videoRef}
        poster={poster}
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="none"
        className="absolute left-0 top-0 w-full h-full object-cover object-center"
      >
        <source src={`${baseSrc}.webm`} type="video/webm" />
        <source src={`${baseSrc}.mp4`} type="video/mp4" />
      </video>
      <div className="relative z-10 flex w-full h-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BentoCard;
