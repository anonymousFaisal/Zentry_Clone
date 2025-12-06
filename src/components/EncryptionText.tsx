"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz!@#$%^&*()_+";

interface EncryptionTextProps {
  text: string;
  className?: string; // Expecting Tailwind classes
  speed?: number; // Speed in ms
  delay?: number; // Delay in ms
}

const EncryptionText: React.FC<EncryptionTextProps> = ({ text, className, speed = 50, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLParagraphElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;
    const element = elementRef.current;

    if (!element) return;

    const startAnimation = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      timeoutId = setTimeout(() => {
        let iterations = 0;

        intervalId = setInterval(() => {
          setDisplayText(() =>
            text
              .split("")
              .map((char, index) => {
                if (index < iterations) {
                  return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );

          if (iterations >= text.length) {
            clearInterval(intervalId);
            isAnimating.current = false;
          }

          iterations += 1 / 3;
        }, speed);
      }, delay);
    };

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: startAnimation,
    });

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      if (trigger) trigger.kill();
    };
  }, [text, speed, delay]);

  return (
    <p ref={elementRef} className={className}>
      {displayText}
    </p>
  );
};

export default EncryptionText;
