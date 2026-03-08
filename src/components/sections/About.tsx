"use client";

import Image from "next/image";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { useAboutAnimations } from "@/hooks/useAboutAnimations";

const About = () => {
  useAboutAnimations();

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[20px] about-intro-text">Welcome to Zentry</h2>

        <AnimatedTitle title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure" containerClass="mt-5 !text-black text-center" />

        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <Image src="/img/about.webp" alt="Background" fill sizes="100vw" className="absolute left-0 top-0 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default About;
