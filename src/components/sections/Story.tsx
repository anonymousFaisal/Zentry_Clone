"use client";

import gsap from "gsap";
import { useRef, type FC } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { useStoryAnimations } from "@/hooks/useStoryAnimations";

const Story: FC = () => {
  const frameRef = useRef<HTMLImageElement | null>(null);

  useStoryAnimations();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tighter bounds and smoother feel
    const rotateX = ((yPos - centerY) / centerY) * -15; // Increased slightly for more tactility
    const rotateY = ((xPos - centerX) / centerX) * 15;

    gsap.to(element, {
      duration: 0.5, // slightly longer duration to smooth out the tracking
      rotateX,
      rotateY,
      transformPerspective: 1000, // Deeper perspective for a premium glass feel
      ease: "power2.out", // Smoother easing curve
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.8, // Slow, elegant return to center
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out", // Luxurious smooth stop
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[15px] story-subtitle">the multiversal ip world</p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <Image
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-end">
            <p className="mt-3 max-w-sm text-center md:text-lg font-circular-web text-violet-50 md:text-right story-content-reveal">
              Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.
            </p>

            <div className="story-content-reveal">
              <Button id="realm-btn" title="discover prologue" containerClass="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
