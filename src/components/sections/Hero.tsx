"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { VideoPreview } from "@/components/ui/VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const totalVideos = 4;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // refs for the three videos
  const miniVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useEffect(() => {
    // The strict loading promises have been removed to prevent blocking the UI
    // while downloading heavy MP4 videos. Videos will stream natively immediately.
    setLoading(false);
  }, []);

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

  const getVideoSrc = (index: number) => `/videos/hero-${index}`;

  return (
    <div id="home" className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading overlay */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVideoClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                {/* mini video */}
                <video
                  ref={miniVideoRef}
                  src={`${getVideoSrc((currentIndex % totalVideos) + 1)}.webm`}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  id="mini-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onError={(e) => console.error("mini video error", e)}
                />
              </div>
            </VideoPreview>
          </div>

          {/* next video */}
          <video
            ref={nextVideoRef}
            src={`${getVideoSrc(currentIndex)}.webm`}
            loop
            muted
            playsInline
            preload="metadata"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onError={(e) => console.error("next video error", e)}
          />

          {/* main/background video */}
          <video
            ref={currentVideoRef}
            src={`${getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}.webm`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            id="main-video"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onError={(e) => console.error("current video error", e)}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">aNDnymous</h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">redefine</h1>

            <p className="mb-5 max-w-80 font-robert-regular lg:text-lg text-blue-100">
              A Basic Clone of the Zentry Website
              <br /> Tried to learn how GSAP and Tailwind 4 works with Next.js 15
            </p>
            <Button
              id="watch-trailer"
              title="Original Website"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
              href="https://zentry.com/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">aNDnymous</h1>
    </div>
  );
};

export default Hero;
