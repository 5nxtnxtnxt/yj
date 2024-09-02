"use client";

import { Project } from "@/firebase/firestoreTypes.d";
import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ImageSection({ data }: { data: Project[] }) {
  const [nowHover, setNowHover] = useState<string>("");
  return (
    <div className="w-full aspect-square relative">
      {data.map((project) => {
        if (!project.visible) return null;
        return project.essays.map((essay) => {
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
                      ? "blur-none"
                      : essay.depth === 1
                      ? "blur-sm"
                      : essay.depth === 2
                      ? "blur"
                      : "blur-md"
                  }
                  ${
                    nowHover === `${project.title}-${essay.title}` &&
                    "blur-none"
                  } ${
                  nowHover !== "" &&
                  nowHover !== `${project.title}-${essay.title}` &&
                  `scale-90 ${
                    essay.left + essay.width / 2 >= 50 ? "-ml-[2%]" : "ml-[2%]"
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
                    "opacity-20"
                  }`}
                />
                <div
                  className={`flip-preview size-full top-0 left-0 absolute pointer-events-none opacity-0 transition-opacity duration-200 delay-75 ${
                    nowHover === `${project.title}-${essay.title}` &&
                    "opacity-100"
                  }`}
                >
                  <h4>{project.title}</h4>
                  <h4>{`2014-01-01`}</h4>
                </div>
              </div>
            </Link>
          );
        });
      })}
    </div>
  );
}
