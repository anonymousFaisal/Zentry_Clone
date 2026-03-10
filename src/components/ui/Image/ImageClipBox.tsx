"use client";

import Image from "next/image";
import type { FC } from "react";

interface ImageClipBoxProps {
  src: string;
  alt?: string;
  clipClass?: string;
}

const ImageClipBox: FC<ImageClipBoxProps> = ({ src, alt = "", clipClass = "" }) => (
  <div className={`${clipClass} relative w-full h-full`}>
    <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 400px" />
  </div>
);

export default ImageClipBox;
