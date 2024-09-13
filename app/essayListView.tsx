"use client";

import { YJData } from "@/firebase/firestoreTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

const ESSAY_PER_PAGE = 3;

type EssayTypeForListView = {
  title: string;
  request: string;
  type: string;
  date: string;
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
          title: essay.title,
          request: e.title,
          type: "단편",
          date: essay.date,
        });
      });
    });
    data.series.forEach((series) => {
      series.seriesProjects.forEach((project) => {
        project.seriesContents.forEach((essay) => {
          newList.push({
            title: essay.title,
            request: project.title,
            type: "시리즈",
            date: essay.date,
          });
        });
      });
    });
    newList.sort((a, b) => (a.date < b.date ? 1 : -1));
    console.log("useEffect");
    setEssays(newList);
  }, []);

  const nowList = essays.slice(0, page * ESSAY_PER_PAGE);
  return (
    <div className="flex flex-col">
      <div
        className={`px-6 grid grid-cols-3 md:grid-cols-5 p-3 border-y border-black
              }`}
      >
        <h3 className="hidden md:inline-block">CATEGORY</h3>
        <h2 className="col-span-2">TITLE</h2>
        <h4 className="hidden md:inline-block text-right">TYPE</h4>

        <h3 className="text-right">DATE</h3>
      </div>
      {nowList.map((essay, index) => {
        return (
          <Link
            key={essay.title + index}
            href={`/project/${essay.request}/${essay.title}/0`}
          >
            <div
              className={`px-6 grid grid-cols-3 md:grid-cols-5 p-3 border-b border-black  ${
                index < nowList.length - 1 && "border-dashed"
              }`}
            >
              <h3 className="hidden md:inline-block">{essay.request}</h3>
              <h2 className="col-span-2">{essay.title}</h2>
              <h4 className="hidden md:inline-block text-right">단편</h4>

              <h3 className="text-right">{essay.date}</h3>
            </div>
          </Link>
        );
      })}
      <div className="h-40 flex items-center justify-center">
        {essays.length > page * ESSAY_PER_PAGE ? (
          <h3 className=" cursor-pointer" onClick={() => setPage(page + 1)}>
            ↓ LOAD MORE ↓
          </h3>
        ) : (
          <h4>다 불러왔으요</h4>
        )}
      </div>
    </div>
  );
}
