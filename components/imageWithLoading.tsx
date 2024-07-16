"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ImageWithLoadingProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export default function ImageWithLoading({
  src,
  ...props
}: ImageWithLoadingProps) {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  function onLoad() {
    if (isLoad) return;
    if (!imgRef.current) return;
    const img = imgRef.current;
    const container = img.parentElement;
    if (!container) return;
    setIsLoad(true);
  }
  useEffect(() => {
    if (imgRef.current?.complete) {
      onLoad();
    }
  }, []);
  return (
    <>
      <Image
        width={1000}
        height={1000}
        alt=""
        onLoad={onLoad}
        src={src}
        ref={imgRef}
        className={`${isLoad || "opacity-0"} ${props.className}`}
      />
      {/* {!isLoad ? (
        <div className={`absolute bg-slate-300 size-full top-0`}>
          <h3>loading...</h3>
        </div>
      ) : null} */}
    </>
  );
}
