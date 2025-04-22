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
          src="/민들레.svg"
          alt="infoIcon"
          width={120}
          height={160}
          className="fixed right-0 top-0 w-10 md:w-16 m-5 md:m-[3.125rem] cursor-pointer z-[100] "
          onClick={() => setOpened(true)}
        />
      )}

      {opened && (
        <div className="fixed flex flex-col justify-between gap-6 top-0 right-0 bg-[#B5BBA1] z-[100] w-full  md:w-[calc((100vw-20rem)/2)] h-screen p-5 md:p-12 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Image
              src="/민들레white.png"
              alt="openedIcon"
              width={120}
              height={160}
              className="w-10 md:w-16 cursor-pointer"
            />

            <Image
              src="/x.svg"
              alt="closedBtn"
              width={120}
              height={160}
              className="w-7 cursor-pointer z-50 text-5xl text-bg-white font-[10] content-center"
              onClick={() => setOpened(false)}
            />
          </div>
          <div className="md:hidden h-full  text-white flex flex-col gap-5 py-10 text-2xl">
            {data.projects.map((p, indexP) => {
              return (
                <div key={indexP}>
                  <Link href={`/project/${indexP}`} key={indexP}>
                    {p.title}
                  </Link>
                  <div className="mt-4 flex flex-col gap-4">
                    {p.essays.map((e, index) => (
                      <Link
                        href={`/project/${indexP}/${index}`}
                        key={p.title + index}
                        className="pl-10 text-xl block"
                      >
                        {e.title}
                      </Link>
                    ))}
                  </div>
                </div>
                // <Link href={`/project/${indexP}`} key={indexP}>
                //   {p.title}
                // </Link>
              );
            })}
            {data.series.map((p, indexS) => {
              return (
                <div key={indexS}>
                  <Link href={`/series/${indexS}`} key={indexS}>
                    {p.title}
                  </Link>
                  <div className="mt-4 flex flex-col gap-4">
                    {p.seriesProjects.map((e, index) => (
                      <Link
                        href={`/series/${indexS}/${index}`}
                        key={p.title + index}
                        className="pl-10 text-xl block"
                      >
                        {e.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-bg-white text-lg flex flex-col md:flex-row md:gap-12 gap-20 max-md:pb-[200px] max-md:border-t max-md:py-10 border-bg-white bg-[#B5BBA1]">
            <div className="flex flex-col gap-5 ">
              <div className="flex justify-start">
                <Image
                  src="/info.svg"
                  alt="info"
                  width={0}
                  height={0}
                  className="h-5 w-auto brightness-0 invert"
                />
              </div>
              <h4 className="md:leading-8 break-keep max-md:leading-8">
                {
                  "발신인 예진은 텍스트 기반 작업자다. 다양한 매체 및 플랫폼에서 에디터로 활동하며, 브랜드의 언어를 들리는 형태로 변환해 화자와 청자 사이에 가교를 놓는다. <예진으로부터>는 예진의 편지 프로젝트로, 활자를 통해 연결되는 경험을 제공한다. 이미지나 영상이 주류가 된 시대에 글의 가치를 재고하며, 고유의 이야기로 세계를 구축하는 일에 관심이 많다."
                }
              </h4>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-start">
                <Image
                  src="/contect.svg"
                  alt="contect"
                  width={0}
                  height={0}
                  className="h-5 w-auto brightness-0 invert"
                />
              </div>
              <div className="flex flex-col gap-1 md:leading-8 max-md:gap-[0.625rem]">
                <h4>+82 1033013191</h4>
                <h4>HYUNDOTHYUN@GMAIL.COM</h4>
                <a href="https://www.instagram.com/hyunye___/" target="_blank">
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
