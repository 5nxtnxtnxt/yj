"use client";

import { Project, YJData } from "@/firebase/firestoreTypes.d";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@/hook/useMediaQuery";

type DataType = {
  projectIndex: number;
  seriesIndex: number;
  essayIndex: number;
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
  const [nowHover, setNowHover] = useState(-1);
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
        <div className="w-full aspect-[1/1.8] relative">
          <button
            className="absolute size-12 m-5 z-20 top-1/2 -translate-y-full bg-white bg-opacity-50 rounded-full"
            onClick={() => {
              setNowClick(-1);
              setNowScroll((nowList.length + nowScroll - 1) % nowList.length);
            }}
          >
            {"<"}
          </button>
          <button
            className="absolute size-12 m-5 z-20 top-1/2 -translate-y-full right-0 bg-white bg-opacity-50  rounded-full"
            onClick={() => {
              setNowClick(-1);
              setNowScroll((nowScroll + 1) % nowList.length);
            }}
          >
            {">"}
          </button>
          <div className="w-full h-full relative overflow-hidden px-14 pt-36 pb-48">
            <div
              className="w-full flex h-full transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(${nowScroll * -100}%)` }}
            >
              {nowList.map((e, index) => {
                return (
                  <div key={index} className="w-full flex-shrink-0 ">
                    <div
                      className={`size-full relative  ${
                        index !== nowScroll &&
                        "opacity-50 scale-[0.85] blur-sm "
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
                        className={`flip-image size-full object-cover transition-all duration-200 bg-bg-white shadow-[0_0_25px_5px_#00000022] ${
                          nowClick === index && "opacity-0"
                        }`}
                      />
                      <Link
                        href={
                          e.isSeries
                            ? `series/${e.seriesIndex}/${e.projectIndex}/${e.essayIndex}`
                            : `project/${e.projectIndex}/${e.essayIndex}/0`
                        }
                        className={`bg-bg-white flip-preview size-full top-0 shadow-[0_0_25px_5px_#00000022] left-0 absolute opacity-0 transition-opacity duration-200 delay-75 h-full flex flex-col ${
                          nowClick === index
                            ? "opacity-100"
                            : "pointer-events-none"
                        } p-5 gap-10`}
                      >
                        <div className="grid grid-cols-2 relative">
                          <h4 className="truncate">{e.highTitle}</h4>
                          <h4 className="truncate text-right">{e.date}</h4>
                        </div>

                        <h2 className="text-3xl mb-8">{e.title}</h2>
                        <h4 className="whitespace-pre-line overflow-y-auto leading-8">
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
          <div className=" absolute bottom-10 w-full h-10 flex gap-3 justify-center items-center">
            {nowList.map((e, index) => (
              <div
                key={index}
                className={`size-[0.375rem] rounded-full bg-[#908b85] cursor-pointer ${
                  nowScroll === index &&
                  "w-[0.625rem] h-[0.625rem] !bg-black rounded-full"
                }`}
                onClick={() => setNowScroll(index)}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full aspect-square relative overflow-hidden truncate">
          {nowList.map((e, index) => {
            return (
              <Link
                key={e.highTitle + e.title + index}
                href={
                  e.isSeries
                    ? `series/${e.seriesIndex}/${e.projectIndex}/${e.essayIndex}`
                    : `project/${e.projectIndex}/${e.essayIndex}`
                }
              >
                <div
                  style={{
                    top: `${e.top}%`,
                    width: `${e.width}%`,
                    left: `${e.left}%`,
                  }}
                  className={`absolute shadow-2xl transition-all duration-200 
                  
                  ${
                    nowHover === index
                      ? "blur-none z-[90] bg-bg-white"
                      : e.depth === 0
                      ? "blur-none z-40 scale-[0.9]"
                      : e.depth === 1
                      ? "blur-[2px] z-30 scale-[0.8]"
                      : e.depth === 2
                      ? "blur-sm z-20 scale-[0.7]"
                      : "blur z-10 scale-[0.65]"
                  } ${
                    nowHover !== index &&
                    `scale-90 ${
                      e.left + e.width / 2 >= 50 ? "-ml-[2%]" : "ml-[2%]"
                    }
                    ${e.top + e.width / 2 >= 50 ? "-mt-[2%]" : "mt-[2%]"}`
                  }`}
                  onMouseOver={() => {
                    setNowHover(index);
                  }}
                  onMouseOut={() => {
                    setNowHover(-1);
                  }}
                >
                  <Image
                    alt="tst"
                    width={1024}
                    height={1024}
                    src={e.thumbnail}
                    className={`flip-image size-full top-0 left-0 transition-all duration-200 ${
                      nowHover === index && "opacity-0"
                    }`}
                  />
                  <div
                    className={`flip-preview size-full top-0 left-0 absolute opacity-0 transition-opacity duration-200 delay-75 h-full flex flex-col ${
                      nowHover === index && "opacity-100"
                    } p-[1.87rem] overflow-x-hidden gap-8 overflow-y-auto`}
                  >
                    <div className="grid grid-cols-2 relative ">
                      <h4 className="truncate">{e.highTitle}</h4>
                      <h4 className="truncate text-right">{e.date}</h4>
                    </div>

                    <h2 className="text-4xl pb-6">{e.title}</h2>
                    <div>
                      <h4 className="whitespace-pre-line break-words line-clamp-5 text-lg leading-[1.875rem]">
                        {e.des}
                      </h4>
                    </div>
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
  data.projects.forEach((p, indexP) =>
    p.essays.forEach((essay, indexE) => {
      if (essay.onMain)
        newList.push({
          projectIndex: indexP,
          highTitle: p.title,
          title: essay.title,
          isSeries: false,
          top: essay.top,
          width: essay.width,
          left: essay.left,
          depth: essay.depth,
          thumbnail: essay.thumbnail,
          date: essay.date,
          des: essay.text,
          seriesIndex: 0,
          essayIndex: indexE,
        });
    })
  );
  data.series.forEach((s, indexS) =>
    s.seriesProjects.forEach((p, indexP) =>
      p.seriesContents.forEach((essay, indexE) => {
        if (essay.onMain)
          newList.push({
            highTitle: p.title,
            title: essay.title,
            isSeries: true,
            top: essay.top,
            width: essay.width,
            left: essay.left,
            depth: essay.depth,
            thumbnail: essay.image,
            date: essay.date,
            des: essay.text,
            projectIndex: indexP,
            seriesIndex: indexS,
            essayIndex: indexE,
          });
      })
    )
  );

  return newList;
};
