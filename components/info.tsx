"use client";

import Image from "next/image";
import { useState } from "react";
import { YJData } from "@/firebase/firestoreTypes";
import Link from "next/link";

export default function Info({ data }: { data: YJData }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {opened || (
        <Image
          src="/민들레.png"
          alt="infoIcon"
          width={120}
          height={160}
          className="fixed right-0 top-0 w-10 md:w-16  m-5 cursor-pointer z-[100]"
          onClick={() => setOpened(true)}
        />
      )}

      {opened && (
        <div className="fixed flex flex-col justify-between gap-6 top-0 right-0 bg-[#B5BBA1] z-[100] w-full  md:w-[calc((100vw-20rem)/2)] h-screen p-5">
          <div className="flex items-center justify-between">
            <Image
              src="/민들레white.png"
              alt="openedIcon"
              width={120}
              height={160}
              className="w-10 md:w-16 cursor-pointer"
            />
            <button
              className="w-10 md:w-16 cursor-pointer z-50 text-5xl text-bg-white font-[10] content-center"
              onClick={() => setOpened(false)}
            >
              X
            </button>
          </div>
          <div className="md:hidden h-full overflow-y-auto text-white flex flex-col gap-5 py-10 text-xl">
            {data.projects.map((p, index) => {
              return (
                <Link href={`/project/${p.title}`} key={index}>
                  {p.title}
                </Link>
              );
            })}
            {data.series.map((p, index) => {
              return (
                <div key={index}>
                  <Link href={`/series/${p.title}`} key={index}>
                    {p.title}
                  </Link>
                  <div className="mt-2 flex flex-col gap-2">
                    {p.seriesProjects.map((e, index) => (
                      <Link
                        href={`/series/${p.title}/${e.title}`}
                        key={p.title + index}
                        className="pl-10 text-sm block"
                      >
                        {e.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-bg-white text-lg flex flex-col gap-1 max-md:border-t max-md:pt-6 border-bg-white">
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
