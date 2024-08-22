"use client";

import { Project } from "@/firebase/firestoreTypes.d";
import { ReactNode, useState } from "react";

export default function ImageSection({ data }: { data: Project[] }) {
  // const list = [];
  // data.forEach((project) => {
  //   if (!project.visible) return;
  //   project.essays.forEach((essay) => {
  //     if (essay.onMain) list.push({ ...essay, projecTitle: project.title });
  //   });
  // });
  // console.log(list);
  // console.log(data);
  const [nowHover, setNowHover] = useState<string>("");
  console.log(nowHover);
  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const flipContainer = e.currentTarget;
    const foreDiv = flipContainer.querySelector(".flip-image") as HTMLElement;
    const backDiv = flipContainer.querySelector(".flip-preview") as HTMLElement;
    foreDiv.style.opacity = "0%";
    backDiv.style.opacity = "100%";
  };
  return (
    <div className="w-full aspect-square bg-red-50 relative">
      {data.map((project) => {
        // console.log(project.visible);

        if (!project.visible) return null;
        return project.essays.map((essay) => {
          // console.log(essay);
          return (
            <div
              style={{
                top: `${essay.top}%`,
                width: `${essay.width}%`,
                height: `${essay.width}%`,
                left: `${essay.left}%`,
              }}
              key={`${project.title}-${essay.title}`}
              className="absolute border"
              onMouseOver={() => {
                setNowHover(`${project.title}-${essay.title}`);
              }}
              onMouseOut={() => {
                setNowHover("");
              }}
            >
              <div
                className={`flip-image bg-red-500 size-full top-0 left-0 transition-all duration-200 ${
                  nowHover === `${project.title}-${essay.title}`
                    ? "opacity-20"
                    : nowHover !== "" &&
                      `scale-90 ${
                        essay.left + essay.width / 2 >= 50
                          ? "-ml-[10%]"
                          : "ml-[10%]"
                      }
                          ${
                            essay.top + essay.width / 2 >= 50
                              ? "-mt-[10%]"
                              : "mt-[10%]"
                          }`
                }`}
              ></div>
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
          );
        });
      })}
    </div>
  );
}
