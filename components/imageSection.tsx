"use client";

import { Project } from "@/firebase/firestoreTypes.d";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ImageSection({ data }: { data: Project[] }) {
  const [nowHover, setNowHover] = useState<string>("");
  return (
    <>
      <div className="w-full aspect-square relative">
        {data.map((project) => {
          if (!project.visible) return null;
          return project.essays.map((essay) => {
            const nowDate = new Date(essay.date.seconds * 1000);
            const dateString = `${nowDate.getFullYear()}.${(
              nowDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}.${nowDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;

            return (
              <Link
                key={`${project.title}-${essay.title}`}
                href={`/essay/${project.title}/${essay.title}/0`}
              >
                <div
                  style={{
                    top: `${essay.top}%`,
                    width: `${essay.width}%`,
                    left: `${essay.left}%`,
                  }}
                  className={`absolute shadow-xl transition-all duration-200 
                  ${
                    essay.depth === 0
                      ? "blur-none z-40"
                      : essay.depth === 1
                      ? "blur-[2px] z-30"
                      : essay.depth === 2
                      ? "blur-sm z-20"
                      : "blur z-10"
                  }
                  ${
                    nowHover === `${project.title}-${essay.title}` &&
                    "blur-none z-[90] bg-bg-white"
                  } ${
                    nowHover !== "" &&
                    nowHover !== `${project.title}-${essay.title}` &&
                    `scale-90 ${
                      essay.left + essay.width / 2 >= 50
                        ? "-ml-[2%]"
                        : "ml-[2%]"
                    }
                    ${
                      essay.top + essay.width / 2 >= 50 ? "-mt-[2%]" : "mt-[2%]"
                    }`
                  }`}
                  onMouseOver={() => {
                    setNowHover(`${project.title}-${essay.title}`);
                  }}
                  onMouseOut={() => {
                    setNowHover("");
                  }}
                >
                  <Image
                    alt="tst"
                    width={1024}
                    height={1024}
                    src={essay.thumbnail}
                    className={`flip-image size-full top-0 left-0 transition-all duration-200 ${
                      nowHover === `${project.title}-${essay.title}` &&
                      "opacity-0"
                    }`}
                  />
                  <div
                    className={`flip-preview size-full top-0 left-0 absolute opacity-0 transition-opacity duration-200 delay-75 h-full flex flex-col ${
                      nowHover === `${project.title}-${essay.title}` &&
                      "opacity-100"
                    } p-6`}
                  >
                    <div className="flex justify-between">
                      <h4 className="">{project.title}</h4>
                      <h4 className="">{dateString}</h4>
                    </div>

                    <h2 className="text-2xl mt-6 mb-10">{essay.title}</h2>
                    <h4 className="whitespace-pre-line overflow-y-auto">
                      {essay.contents
                        .find((e) => e.type === "text")
                        ?.text.join("\n")}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          });
        })}
      </div>
    </>
  );
}
