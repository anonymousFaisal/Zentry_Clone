"use client";

import ImageClipBox from "@/components/ui/Image/ImageClipBox";
import type { FC } from "react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Button from "@/components/ui/Button";
import { useContactAnimations } from "@/hooks/useContactAnimations";

const Contact: FC = () => {
  useContactAnimations();
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50">
        {/* Background / Unclipped Swordman Partial */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-80 
        md:top-10 md:left-auto md:-right-20
        lg:top-10 swordman-reveal pointer-events-none"
        >
          <div className="absolute h-full w-full">
            <ImageClipBox src="/img/swordman-partial.webp" alt="partial swordman" />
          </div>
        </div>

        {/* Inner container to clip the main image and gallery images */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          {/* Left side images */}
          <div
            className="absolute -left-20 top-0 hidden h-full w-96 overflow-hidden 
          md:block
          lg:left-20"
          >
            <div className="contact-clip-path-1 absolute h-full w-full -translate-y-20 ">
              <ImageClipBox src="/img/contact-1.webp" alt="contact 1" />
            </div>
            <div className="contact-clip-path-2 absolute h-full w-full translate-y-60 -translate-x-10">
              <ImageClipBox src="/img/contact-2.webp" alt="contact 2" />
            </div>
          </div>

          {/* Right side clipped main swordman */}
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-80 
          md:top-10 md:left-auto md:-right-20
          lg:top-10 swordman-reveal pointer-events-auto"
          >
            <div className="sword-man-clip-path absolute h-full w-full">
              <ImageClipBox src="/img/swordman.webp" alt="swordman" />
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center text-center relative z-10">
          <p className="mb-10 font-general text-[15px] uppercase contact-text-reveal">Join Zentry</p>

          <AnimatedTitle
            title="let's b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          <div className="contact-text-reveal">
            <Button title="contact us" containerClass="mt-10 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
