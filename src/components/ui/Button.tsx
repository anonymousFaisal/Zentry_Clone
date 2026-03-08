import Link from "next/link";
import React from "react";
import clsx from "clsx";

interface ButtonProps {
  id?: string;
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ id, title, rightIcon, leftIcon, containerClass, href, target, rel }) => {
  const InnerContent = () => (
    <>
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs md:text-sm uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">{title}</div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">{title}</div>
      </span>
      {rightIcon}
    </>
  );

  const containerClasses = clsx(
    "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
    containerClass
  );

  if (href) {
    return (
      <Link href={href} id={id} className={containerClasses} target={target} rel={rel}>
        <InnerContent />
      </Link>
    );
  }

  return (
    <button id={id} className={containerClasses}>
      <InnerContent />
    </button>
  );
};

export default Button;
