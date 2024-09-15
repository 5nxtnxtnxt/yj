"use client";

import { Project, YJData } from "@/firebase/firestoreTypes.d";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [nowHover, setNowHover] = useState<string>("");
  const nowList = useMemo(() => {
    console.log("memo");
    return refineData(data);
  }, [data]);

  return (
    <>
      <div className="w-full aspect-square relative overflow-hidden truncate">
        {nowList.map((e, index) => {
          return (
            <Link
              key={e.highTitle + e.title + index}
              href={`/${e.isSeries ? "series" : "project"}/${e.highTitle}/${
                e.title
              }/0`}
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
                    <h4 className="truncate">{e.date}</h4>
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
