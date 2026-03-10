"use client";

import type { FC, ReactElement } from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { MdArrowUpward } from "react-icons/md";

interface SocialLink {
  href: string;
  icon: ReactElement;
}

const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com/Anonymous.IamND", icon: <FaFacebook aria-hidden /> },
  { href: "https://www.linkedin.com/in/anonymous-nahid-hasan", icon: <FaLinkedin aria-hidden /> },
  { href: "https://www.instagram.com/nahid_hasan_nd/", icon: <FaInstagram aria-hidden /> },
  { href: "https://github.com/anonymousFaisal", icon: <FaGithub aria-hidden /> },
];

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-screen bg-black py-8 text-blue-50 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-10 md:flex-row">
        {/* Copyright */}
        <p className="text-center font-circular-web text-sm font-light text-blue-50/60 md:text-left transition-colors hover:text-blue-50 cursor-default">
          © aNDnymous {year}. All rights reserved
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 md:justify-start -mb-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-blue-50/70 text-2xl transition-all duration-300 ease-in-out hover:text-violet-300 hover:-translate-y-1 hover:scale-110"
              aria-label={`Open ${new URL(link.href).hostname}`}
            >
              <div className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{link.icon}</div>
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center justify-center gap-2 text-center font-circular-web text-sm font-light text-blue-50/60 hover:text-blue-50 md:text-right transition-colors group"
        >
          Back to Top
          <MdArrowUpward className="transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
