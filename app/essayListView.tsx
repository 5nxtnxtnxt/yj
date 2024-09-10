"use client";

import { Project } from "@/firebase/firestoreTypes";
import Link from "next/link";
import { useState } from "react";

export default function EssayListView({ data }: { data: Project[] }) {
  const [page, setPage] = useState(1);
  const ESSAY_PER_PAGE = 1;
  console.log(page);
  const essayList = data
    .map((project) =>
      project.essays.map((essay) => ({ ...essay, projectTitle: project.title }))
    )
    .flat()
    .sort((a, b) => b.date.seconds - a.date.seconds);
  const nowList = essayList.slice(0, page * ESSAY_PER_PAGE);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 border-t p-4 border-b border-black ">
        <h2>CATEGORY</h2>
        <h2 className="col-span-2">TITLE</h2>
        <h2>TYPE</h2>
        <h2>DATE</h2>
      </div>
      {nowList.map((essay, index) => {
        const nowDate = new Date(essay.date.seconds * 1000);
        const dateString = `${nowDate.getFullYear()}.${(nowDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${nowDate.getDate().toString().padStart(2, "0")}`;

        return (
          <Link
            key={essay.title + index}
            href={`/essay/${essay.projectTitle}/${essay.title}/0`}
          >
            <div
              className={`grid grid-cols-5 p-3 border-b border-black  ${
                index < nowList.length - 1 && "border-dashed"
              }`}
            >
              <h3>{essay.projectTitle}</h3>
              <h2 className="col-span-2">{essay.title}</h2>
              <h4>단편</h4>
              <h3>{dateString}</h3>
            </div>
          </Link>
        );
      })}
      <div className="h-40 flex items-center justify-center">
        {essayList.length > page * ESSAY_PER_PAGE ? (
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
