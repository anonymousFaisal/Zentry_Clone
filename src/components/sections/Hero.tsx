"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { TiLocationArrow } from "react-icons/ti";
import { VideoPreview } from "@/components/ui/VideoPreview";
import Loader from "@/components/ui/Loader";
import { useHeroAnimations } from "@/hooks/useHeroAnimations";

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

  const waitForVideoReady = (video: HTMLVideoElement | null, timeoutMs = 10000) => {
    return new Promise<void>((resolve) => {
      // readyState 2 = HAVE_CURRENT_DATA (first frame)
      if (!video || video.readyState >= 2) {
        resolve();
        return;
      }

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        cleanup();
        resolve();
      };

      const onLoadedData = () => done();
      const onCanPlay = () => done();
      const onError = () => done();

      video.addEventListener("loadeddata", onLoadedData);
      video.addEventListener("canplay", onCanPlay);
      video.addEventListener("error", onError);

      const timer = setTimeout(() => done(), timeoutMs);

      const cleanup = () => {
        clearTimeout(timer);
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("error", onError);
      };
    });
  };

  useEffect(() => {
    let cancelled = false;

    const streamVideo = async () => {
      try {
        await waitForVideoReady(currentVideoRef.current);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    streamVideo();

    return () => {
      cancelled = true;
    };
  }, [currentIndex]);

  useHeroAnimations({
    hasClicked,
    currentIndex,
    nextVideoRef,
    isLoaded: !loading,
  });

  const getVideoSrc = (index: number) => `/videos/hero-${index}`;

  return (
    <div id="home" className="relative h-dvh w-screen overflow-x-hidden">
      {/* Premium loader with GSAP curtain-reveal exit */}
      <Loader isLoaded={!loading} />

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
                  disablePictureInPicture
                  id="mini-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
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
            disablePictureInPicture
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
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
            disablePictureInPicture
            id="main-video"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        {/* Overflow wrappers prevent the GSAP animation from expanding the document height */}
        <div className="absolute bottom-5 right-5 z-40 overflow-hidden">
          <h1 className="special-font hero-heading text-blue-75 hero-text-reveal block">aNDnymous</h1>
        </div>

        <div id="hero-content" className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <div className="overflow-hidden">
              <h1 className="special-font hero-heading text-blue-100 hero-text-reveal block">redefine</h1>
            </div>

            <div className="overflow-hidden">
              <div className="hero-text-reveal block">
                <p className="mb-5 max-w-sm sm:max-w-md md:max-w-xl font-robert-regular text-sm lg:text-lg text-blue-100/80">
                  A recreation of the award-winning Zentry website.
                  <br /> Built with: Next.js 16, React 19, Tailwind v4, GSAP, and Lenis.
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
        </div>
      </div>

      <div className="absolute bottom-5 right-5 overflow-hidden">
        <h1 className="special-font hero-heading text-black hero-text-reveal">aNDnymous</h1>
      </div>
    </div>
  );
};

export default Hero;
