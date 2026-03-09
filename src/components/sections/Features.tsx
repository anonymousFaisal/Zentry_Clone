"use client";

import { type FC, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import BentoTilt from "@/components/ui/Bento/BentoTilt";
import BentoCard from "@/components/ui/Bento/BentoCard";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { useFeatureAnimations } from "@/hooks/useFeatureAnimations";

const Features: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useFeatureAnimations({ videoRef });

  return (
    <section id="features" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <AnimatedTitle title="Int<b>o</b> the <br /> Metagame Layer" containerClass="!text-blue-50 !bg-transparent md:!text-left !px-0 !sm:px-0" />
          
        </div>

        <BentoTilt className="border-hsla bento-card-reveal relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.webm"
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
            isComingSoon
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 bento-card-reveal row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.webm"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 bento-card-reveal row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.webm"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 bento-card-reveal me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.webm"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 bento-card-reveal">
            <div className="flex w-full h-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-blue-50">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
              </h1>

              <TiLocationArrow color="var(--color-blue-50)" className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 bento-card-reveal">
            <video
              ref={videoRef}
              src="videos/feature-5.webm"
              loop
              muted
              playsInline
              disablePictureInPicture
              preload="none"
              className="w-full h-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
