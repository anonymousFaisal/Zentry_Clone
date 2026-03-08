"use client";

import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWindowScroll } from "react-use";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type FC } from "react";
import Image from "next/image";
import { TiLocationArrow } from "react-icons/ti";

import Button from "@/components/ui/Button";

const navItems = ["Home", "About", "Features", "Contact"];

const NavBar: FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    if (!audioElementRef.current) {
      console.log("Audio ref not found");
      return;
    }

    if (!isAudioPlaying) {
      audioElementRef.current.play().catch((err) => {
        console.error("Audio failed to play:", err);
      });
    } else {
      audioElementRef.current.pause();
    }

    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useGSAP(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-18 border-none transition-all duration-700 sm:inset-x-8 lg:inset-x-12">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-6 py-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <div className="relative overflow-hidden rounded-full shadow-md bg-white/5 backdrop-blur-sm p-1 transition-transform hover:scale-110">
              <Image src="/img/NHD-logo.webp" alt="logo" width={44} height={44} className="object-contain" priority />
            </div>

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 shadow-lg hover:bg-white hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                  className="nav-hover-btn px-4 py-2 font-medium tracking-wide text-white/80 transition-colors hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>

            <button onClick={toggleAudioIndicator} className="ml-10 flex items-center space-x-0.5" aria-label="Toggle audio">
              <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop preload="auto" />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
