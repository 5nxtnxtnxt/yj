"use client";

import { MyData } from "@/utils/notion";
import Link from "next/link";
import ImageWithLoading from "./imageWithLoading";
import { CSSProperties, useRef, useState } from "react";

export default function BlurImages({ data }: { data: MyData }) {
  const projects = Object.keys(data);
  const positions: { [key: string]: CSSProperties } = {};
  const [nowHover, setNowHover] = useState<string>("");
  let maxWidth = 200;
  Object.keys(data).forEach((project) => {
    data[project].forEach(({ width, top, left }, index) => {
      const calcLeft = (1 - width) * left;
      positions[`${project}-${index}`] = {
        width: `${width * 100}%`,
        top: `calc(100vw * ${top})`,
        left: `${calcLeft * 100}%`,
        marginLeft: `10%`,
        marginTop: `-20%`,
      };
    });
  });
  const onMouseEnter = (nowPost: string) => {
    setNowHover(nowPost);
  };
  const onMouseOut = () => {
    setNowHover("");
  };
  return (
    <div className="overflow-x-hidden w-full relative overflow-y-scroll">
      {projects.map((project) =>
        data[project].map((e, index) => (
          <Link href={`${project}/${index}/0`} key={`${index}+${project}`}>
            <div
              style={{
                width: positions[`${project}-${index}`].width,
                top: positions[`${project}-${index}`].top,
                left: positions[`${project}-${index}`].left,
                marginLeft:
                  nowHover !== "" && nowHover !== `${project}-${index}`
                    ? positions[`${project}-${index}`].marginLeft
                    : "",
                marginTop:
                  nowHover !== "" && nowHover !== `${project}-${index}`
                    ? positions[`${project}-${index}`].marginTop
                    : "",
              }}
              className={` shadow-black absolute transition-[margin-left,margin-top] duration-[800ms] ease-in-out   ${
                nowHover === `${project}-${index}` && "z-50 blur-none"
              }  ${
                e.depth === 1
                  ? "blur-none z-30"
                  : e.depth === 2
                  ? "blur-[1px] z-20"
                  : e.depth === 3
                  ? "blur-[2px] z-10"
                  : "blur-[3px] -z-0"
              }`}
              onMouseEnter={() => onMouseEnter(`${project}-${index}`)}
              onMouseOut={() => onMouseOut()}
            >
              <ImageWithLoading
                src={e.thumbNailSrc}
                className="pointer-events-none"
              />
              <div className="grid grid-cols-2 grid-rows-5 bg-[rgb(241,242,234)] absolute top-0 left-0 size-full opacity-0 text-black p-3 gap-3 pointer-events-none">
                <h3 className="col-span-1 col-start-1 text-ellipsis text-nowrap overflow-hidden">
                  {project}
                </h3>
                <h4 className="col-span-1 col-start-2 text-right text-ellipsis text-nowrap overflow-hidden">
                  {e.date}
                </h4>
                <h3 className="col-span-2 text-2xl text-ellipsis text-nowrap overflow-hidden">
                  {e.title}
                </h3>
                <h5 className="col-span-2 row-span-3 whitespace-pre-line overflow-y-scroll text-ellipsis">
                  {e.des}
                </h5>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
