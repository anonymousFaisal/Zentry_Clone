"use client";
import { useEffect, useRef, useState, useCallback } from "react";
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

  // Poster images load instantly (~50-100KB each), providing immediate visual content
  const getPosterSrc = (index: number) => `/img/posters/hero-${index}.webp`;
  const getVideoSrc = (index: number) => `/videos/hero-${index}`;

  /**
   * Progressive loading strategy:
   * 1. Poster image loads instantly (< 100KB) → user sees content immediately
   * 2. Loader dismisses after poster + minimal delay (no waiting for full video)
   * 3. Video streams in background → seamlessly replaces poster when ready
   */
  useEffect(() => {
    let cancelled = false;

    // Preload the poster image so the browser caches it before the loader dismisses
    const posterImg = new Image();
    posterImg.src = getPosterSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex);

    const dismiss = () => {
      if (!cancelled) setLoading(false);
    };

    // If poster loads quickly (expected), dismiss after a brief reveal animation delay
    // If poster is slow, dismiss after a max of 3 seconds regardless
    posterImg.onload = () => setTimeout(dismiss, 800);
    posterImg.onerror = () => setTimeout(dismiss, 800);
    const maxTimer = setTimeout(dismiss, 3000);

    // Meanwhile, kick off video playback in the background
    const video = currentVideoRef.current;
    if (video) {
      const onCanPlay = () => {
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      };
      video.addEventListener("canplay", onCanPlay, { once: true });

      return () => {
        cancelled = true;
        clearTimeout(maxTimer);
        video.removeEventListener("canplay", onCanPlay);
      };
    }

    return () => {
      cancelled = true;
      clearTimeout(maxTimer);
    };
  }, [currentIndex]);

  useHeroAnimations({
    hasClicked,
    currentIndex,
    nextVideoRef,
    isLoaded: !loading,
  });

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
                {/* mini video — preload metadata only, poster for instant visual */}
                <video
                  ref={miniVideoRef}
                  poster={getPosterSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  id="mini-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                >
                  <source src={`${getVideoSrc((currentIndex % totalVideos) + 1)}.webm`} type="video/webm" />
                  <source src={`${getVideoSrc((currentIndex % totalVideos) + 1)}.mp4`} type="video/mp4" />
                </video>
              </div>
            </VideoPreview>
          </div>

          {/* next video */}
          <video
            ref={nextVideoRef}
            poster={getPosterSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          >
            <source src={`${getVideoSrc(currentIndex)}.webm`} type="video/webm" />
            <source src={`${getVideoSrc(currentIndex)}.mp4`} type="video/mp4" />
          </video>

          {/* main/background video — poster is the instant visual bridge */}
          <video
            ref={currentVideoRef}
            poster={getPosterSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            id="main-video"
            className="absolute left-0 top-0 size-full object-cover object-center"
          >
            <source src={`${getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}.webm`} type="video/webm" />
            <source src={`${getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Overflow wrappers prevent the GSAP animation from expanding the document height */}
        <div className="absolute bottom-5 right-5 z-40 overflow-hidden perspective-midrange">
          <h1 className="special-font hero-heading text-blue-75 hero-text-reveal block transform-style-3d origin-bottom">aNDnymous</h1>
        </div>

        <div id="hero-content" className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <div className="overflow-hidden perspective-midrange">
              <h1 className="special-font hero-heading text-blue-100 hero-text-reveal block transform-style-3d origin-bottom">redefine</h1>
            </div>

            <div className="overflow-hidden">
              <div className="hero-subtext-reveal block">
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

      <div className="absolute bottom-5 right-5 overflow-hidden perspective-midrange">
        <h1 className="special-font hero-heading text-black hero-text-reveal transform-style-3d origin-bottom">aNDnymous</h1>
      </div>
    </div>
  );
};

export default Hero;
