"use client";

import Image from "next/image";
import { useState } from "react";

export default function Info() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {opened || (
        <Image
          src="/민들레.png"
          alt="infoIcon"
          width={120}
          height={160}
          className="fixed right-0 top-0 w-16 m-5 cursor-pointer z-[100]"
          onClick={() => setOpened(true)}
        />
      )}

      {opened && (
        <div className="fixed top-0 right-0 bg-[#B5BBA1] z-[100] w-full  md:w-[calc((100vw-20rem)/2)] h-screen p-5">
          <div className="flex items-center justify-between">
            <Image
              src="/민들레white.png"
              alt="openedIcon"
              width={120}
              height={160}
              className="w-16  cursor-pointer"
            />
            <button
              className=" w-16 cursor-pointer z-50 text-7xl text-bg-white font-[100] content-center"
              onClick={() => setOpened(false)}
            >
              X
            </button>
          </div>
          <div className="text-bg-white text-lg absolute bottom-5 flex flex-col gap-1">
            <h3>HYUN YE-JIN WRITER. SELECTED PROJECT.</h3>
            <h3>+82 101234121234 @YEJIN.GMAIL.COM</h3>
            <h3>BASED IN SEOUL, KOREA, REPUBLIC OF</h3>
            <h4 className="text-base mt-4">
              COPYRIGHT © 예진 ALL RIGHTS RESERVED.
            </h4>
          </div>
        </div>
      )}
    </>
  );
}
