"use client";

import { Project, YJData } from "@/firebase/firestoreTypes.d";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@/hook/useMediaQuery";

type DataType = {
  highTitle: string;
  title: string;
  isSeries: boolean;
  top: number;
  width: number;
  left: number;
  depth: number;
  thumbnail: string;
  date: string;
  des: string;
};

export default function ImageSection({ data }: { data: YJData }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [nowScroll, setNowScroll] = useState(0);
  const [nowClick, setNowClick] = useState(-1);
  const [nowHover, setNowHover] = useState<string>("");
  const nowList = useMemo(() => {
    return refineData(data);
  }, [data]);
  if (isMobile === undefined)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h3>loading...</h3>
      </div>
    );
  return (
    <>
      {isMobile ? (
        <div className="w-full relative">
          <button
            className="absolute left-5 bottom-0 z-20"
            onClick={() => {
              setNowClick(-1);
              setNowScroll((nowList.length + nowScroll - 1) % nowList.length);
            }}
          >
            {"<"}
          </button>
          <button
            className="absolute right-5 bottom-0 z-20"
            onClick={() => {
              setNowClick(-1);
              setNowScroll((nowScroll + 1) % nowList.length);
            }}
          >
            {">"}
          </button>
          <div className="w-full aspect-[1/1.5] relative overflow-hidden p-24">
            <div
              className="w-full flex h-full transition-all duration-300"
              style={{ transform: `translateX(${nowScroll * -100}%)` }}
            >
              {nowList.map((e, index) => {
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <div
                      className={`size-full relative ${
                        index !== nowScroll && "opacity-70 scale-75"
                      }`}
                      onClick={() => {
                        setNowClick(index);
                      }}
                    >
                      <Image
                        alt="tst"
                        width={1024}
                        height={1024}
                        src={e.thumbnail}
                        className={`flip-image size-full object-cover transition-all duration-200 ${
                          nowClick === index && "opacity-0"
                        }`}
                      />
                      <Link
                        href={"/test"}
                        className={`flip-preview size-full top-0 left-0 absolute opacity-0 transition-opacity duration-200 delay-75 h-full flex flex-col ${
                          nowClick === index
                            ? "opacity-100"
                            : "pointer-events-none"
                        } p-6`}
                      >
                        <div className="grid grid-cols-2 relative">
                          <h4 className="truncate">{e.highTitle}</h4>
                          <h4 className="truncate text-right">{e.date}</h4>
                        </div>

                        <h2 className="text-2xl mt-6 mb-10">{e.title}</h2>
                        <h4 className="whitespace-pre-line overflow-y-auto">
                          {e.des}
                        </h4>
                      </Link>
                    </div>
                  </div>
                );
              })}
              <div className="min-w-10"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-square relative overflow-hidden truncate">
          {nowList.map((e, index) => {
            return (
              <Link
                key={e.highTitle + e.title + index}
                href={`/${e.isSeries ? "series" : "project"}/${e.highTitle}/${
                  e.title
                }${e.isSeries ? "" : "/0"}`}
              >
                <div
                  style={{
                    top: `${e.top}%`,
                    width: `${e.width}%`,
                    left: `${e.left}%`,
                  }}
                  className={`absolute shadow-xl transition-all duration-200 
                  
                  ${
                    nowHover === `${e.highTitle}-${e.title}`
                      ? "blur-none z-[90] bg-bg-white"
                      : e.depth === 0
                      ? "blur-none z-40"
                      : e.depth === 1
                      ? "blur-[2px] z-30"
                      : e.depth === 2
                      ? "blur-sm z-20"
                      : "blur z-10"
                  } ${
                    nowHover !== "" &&
                    nowHover !== `${e.highTitle}-${e.title}` &&
                    `scale-90 ${
                      e.left + e.width / 2 >= 50 ? "-ml-[2%]" : "ml-[2%]"
                    }
                    ${e.top + e.width / 2 >= 50 ? "-mt-[2%]" : "mt-[2%]"}`
                  }`}
                  onMouseOver={() => {
                    setNowHover(`${e.highTitle}-${e.title}`);
                  }}
                  onMouseOut={() => {
                    setNowHover("");
                  }}
                >
                  <Image
                    alt="tst"
                    width={1024}
                    height={1024}
                    src={e.thumbnail}
                    className={`flip-image size-full top-0 left-0 transition-all duration-200 ${
                      nowHover === `${e.highTitle}-${e.title}` && "opacity-0"
                    }`}
                  />
                  <div
                    className={`flip-preview size-full top-0 left-0 absolute opacity-0 transition-opacity duration-200 delay-75 h-full flex flex-col ${
                      nowHover === `${e.highTitle}-${e.title}` && "opacity-100"
                    } p-6`}
                  >
                    <div className="grid grid-cols-2 relative">
                      <h4 className="truncate">{e.highTitle}</h4>
                      <h4 className="truncate text-right">{e.date}</h4>
                    </div>

                    <h2 className="text-2xl mt-6 mb-10">{e.title}</h2>
                    <h4 className="whitespace-pre-line overflow-y-auto">
                      {e.des}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

const refineData = (data: YJData): DataType[] => {
  const newList: DataType[] = [];
  data.projects
    .filter((e) => e.visible)
    .forEach((p) =>
      p.essays.forEach((essay) => {
        newList.push({
          highTitle: p.title,
          title: essay.title,
          isSeries: false,
          top: essay.top,
          width: essay.width,
          left: essay.left,
          depth: essay.depth,
          thumbnail: essay.thumbnail,
          date: essay.date,
          des: essay.contents.find((c) => c.type === "text")?.data || "",
        });
      })
    );
  data.series
    .filter((e) => e.visible)
    .forEach((s) =>
      s.seriesProjects
        .filter((e) => e.onMain)
        .forEach((project) => {
          newList.push({
            highTitle: s.title,
            title: project.title,
            isSeries: true,
            top: project.top,
            width: project.width,
            left: project.left,
            depth: project.depth,
            thumbnail: project.thumbnail,
            date: project.date,
            des: project.description,
          });
        })
    );
  return newList;
};
