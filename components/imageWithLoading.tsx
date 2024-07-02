"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";

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
  // const handle = (e: SyntheticEvent) => {
  //   const target = e.target as HTMLElement;
  //   const container = target.parentElement;
  //   const top = parseInt(container?.style.top.split("%")[0] as string);
  //   const left = parseInt(container?.style.left.split("%")[0] as string);
  //   console.log(top, left);
  //   container?.classList.add(
  //     `${top > 50 ? "-translate-y-full" : "translate-y-full"}`,
  //     `${left > 50 ? "-translate-x-full" : "translate-x-full"}`
  //   );
  //   target.style.opacity = "100%";
  //   setIsLoad(true);
  // };
  function onLoad() {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const container = img.parentElement;
    const top = parseInt(container?.style.top as string);
    const left = parseInt(container?.style.left as string);
    const width = parseInt(container?.style.width as string);
    console.log(top, left, width);
    container?.classList.add(
      `${top > 50 ? "-translate-y-full" : "translate-y-full"}`
    );
    container?.classList.add(
      `${left > 50 ? "-translate-x-full" : "translate-x-full"}`
    );
    setIsLoad(true);
  }
  useEffect(() => {
    if (imgRef.current?.complete) {
      onLoad();
    }
  }, []);
  return (
    <>
      <img
        loading="eager"
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
