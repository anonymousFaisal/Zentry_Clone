import type { FC, ReactElement } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

interface SocialLink {
  href: string;
  icon: ReactElement;
}

const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com/Anonymous.IamND", icon: <FaFacebook aria-hidden /> },
  { href: "https://www.linkedin.com/in/anonymous-nahid-hasan", icon: <FaLinkedin aria-hidden /> },
  { href: "https://www.instagram.com/nahid_hasan_nd/", icon: <FaInstagram aria-hidden /> },
];

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">© aNDnymous {year}. All rights reserved</p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-500 ease-in-out hover:text-violet-300"
              aria-label={`Open ${new URL(link.href).hostname}`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a href="#privacy-policy" className="text-center text-sm font-light hover:underline md:text-right text-white">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
