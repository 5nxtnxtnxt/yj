"use client";

import { useEffect, useState } from "react";
import { Project } from "@/firebase/firestoreTypes";
import { getProjectData } from "@/firebase/firestore";

export default function AdminPage() {
  const [projectData, setProjectData] = useState<Project[]>();
  //projectData === undefined 이면 로딩중
  useEffect(() => {
    const getData = async () => {
      setProjectData(await getProjectData());
    };
    getData();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col">
        {projectData?.map((project, indexP) => {
          return (
            <div
              key={project.title + indexP}
              className="flex flex-col gap-2 border-b p-6 border-black"
            >
              <div className="flex gap-10 text-2xl">
                <h2>{project.title}</h2>
                <div className="flex gap-3 text-base">
                  <button className="text-red-600">AddEssay</button>
                  <button className="text-red-600">EditProject</button>
                  <button className="text-red-600">DeleteProject</button>
                </div>
              </div>
              {project.essays.map((essay, index) => {
                return (
                  <div key={project.title + indexP + essay.title + index}>
                    <div className="pl-6 flex gap-10 text-xl">
                      <h2>{essay.title}</h2>
                      <div className="flex gap-3 text-sm">
                        <button className="text-red-600">EditEssay</button>
                        <button className="text-red-600">DeleteEssay</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
