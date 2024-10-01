"use client";

import { YJData } from "@/firebase/firestoreTypes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const ESSAY_PER_PAGE = 5;

type EssayTypeForListView = {
  href: string;
  title: string;
  request: string;
  type: "단편" | "시리즈";
  date: string;
  page: number;
};
export default function EssayListView({ data }: { data: YJData }) {
  const [page, setPage] = useState(1);
  const [essays, setEssays] = useState<EssayTypeForListView[]>([]);

  useEffect(() => {
    console.log("start");
    const newList: EssayTypeForListView[] = [];
    data.projects.forEach((e) => {
      e.essays.forEach((essay) => {
        newList.push({
          href: "project",
          title: essay.title,
          request: e.title,
          type: "단편",
          date: essay.date,
          page: 0,
        });
      });
    });
    data.series.forEach((series) => {
      series.seriesProjects.forEach((project) => {
        project.seriesContents.forEach((essay, index) => {
          newList.push({
            href: series.title,
            title: essay.title,
            request: project.title,
            type: "시리즈",
            date: essay.date,
            page: index,
          });
        });
      });
    });
    newList.sort((a, b) => {
      const aDate = new Date(a.date).valueOf();
      const bDate = new Date(b.date).valueOf();

      return bDate - aDate;
    });
    console.log("useEffect");
    setEssays(newList);
  }, []);

  const nowList = essays.slice(0, page * ESSAY_PER_PAGE);
  return (
    <div className="flex flex-col">
      <div
        className={`px-6 grid grid-cols-3 md:grid-cols-5 p-3 border-y border-border-black h-16
              }`}
      >
        <h3 className="hidden md:inline-block content-center">CATEGORY</h3>
        <h2 className="col-span-2 content-center">TITLE</h2>
        <h4 className="hidden md:inline-block text-right content-center">
          TYPE
        </h4>
        <h3 className="text-right content-center">DATE</h3>
      </div>
      {nowList.map((essay, index) => {
        return (
          <Link
            key={essay.title + index}
            href={
              essay.type === "단편"
                ? `/project/${essay.request}/${essay.title}/0`
                : `/series/${essay.href}/${essay.request}/${essay.page}}`
            }
          >
            <div
              className={`px-6 grid grid-cols-3 md:grid-cols-5 p-3 border-b border-border-black h-16 content-center  ${
                index < nowList.length - 1 && "border-dashed"
              } ${
                page * ESSAY_PER_PAGE > index + ESSAY_PER_PAGE
                  ? "md:hidden"
                  : null
              }`}
            >
              <h3 className="hidden md:inline-block">{essay.request}</h3>
              <h2 className="col-span-2 flex gap-2">
                {index < 3 ? (
                  <h5 className="bg-black text-bg-white px-2 rounded-sm text-center content-center realNova font-bold">
                    new
                  </h5>
                ) : null}
                <h4 className=" truncate w-full  ">{essay.title}</h4>
              </h2>
              <h4 className="hidden md:inline-block text-right">
                {essay.type}
              </h4>

              <h3 className="text-right">{essay.date}</h3>
            </div>
          </Link>
        );
      })}
      <div className="md:hidden flex items-center justify-center h-40">
        {essays.length > page * ESSAY_PER_PAGE ? (
          <div
            className="cursor-pointer items-center flex gap-3"
            onClick={() => setPage(page + 1)}
          >
            <h4>LOAD MORE</h4>
            <Image
              className="size-[1rem]"
              width={100}
              height={100}
              src="/down.svg"
              alt="loadmore"
            ></Image>
          </div>
        ) : null}
      </div>
      <div className="h-96 flex flex-col justify-center items-center max-md:hidden">
        <div className="flex gap-4 items-center">
          {Array.from({
            length: Math.ceil(essays.length / ESSAY_PER_PAGE),
          }).map((_, index) => (
            <div
              key={index}
              onClick={() => setPage(index + 1)}
              className={` cursor-pointer
                ${
                  index + 1 === page ? "text-lg font-bold" : "text-opacity-80"
                }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
