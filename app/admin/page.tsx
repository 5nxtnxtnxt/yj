"use client";

import { useEffect, useState } from "react";
import { Project, YJData } from "@/firebase/firestoreTypes";
import { getProjectData } from "@/firebase/firestore";
import DeleteButton from "./deleteBtn";

export default function AdminPage() {
  const [yjData, setYJData] = useState<YJData>();
  //projectData === undefined 이면 로딩중
  useEffect(() => {
    const getData = async () => {
      setYJData(await getProjectData());
    };
    getData();
  }, []);

  return (
    <div className="w-screen h-screen">
      {yjData ? (
        <div className="flex flex-col">
          {yjData.projects.map((project, indexP) => {
            return (
              <div
                key={project.title + indexP}
                className="flex flex-col gap-2 border-b p-6 border-black"
              >
                <div className="flex gap-10 text-2xl">
                  <h2>{project.title}</h2>
                  <div className="flex gap-3 text-base">
                    {/* <button className="text-red-600">Edit</button> */}
                    <DeleteButton callback={() => {}}>Delete</DeleteButton>
                  </div>
                </div>
                {project.essays.map((essay, index) => {
                  return (
                    <div key={project.title + indexP + essay.title + index}>
                      <div className="pl-6 flex gap-10 text-xl">
                        <h2>{essay.title}</h2>
                        <div className="flex gap-3 text-sm">
                          {/* <button className="text-red-600">EditEssay</button> */}
                          <DeleteButton callback={() => {}}>
                            Delete
                          </DeleteButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <a
                  className="pl-6"
                  href={`/admin/create/project/${project.title}`}
                >
                  에세이 추가하기
                </a>
              </div>
            );
          })}
          <a
            className="p-6 text-xl text-gray-600"
            href={`/admin/create/project`}
          >
            프로젝트 추가하기
          </a>
          <div className="w-full border-t border-black"></div>
          {yjData.series.map((series, indexP) => {
            return (
              <div
                key={series.title + indexP}
                className="flex flex-col gap-2 border-b p-6 border-black"
              >
                <div className="flex gap-10 text-2xl">
                  <h2>{series.title}</h2>
                  <div className="flex gap-3 text-base">
                    {/* <button className="text-red-600">Edit</button> */}
                    <DeleteButton callback={() => {}}>Delete</DeleteButton>
                  </div>
                </div>
                {series.seriesProjects.map((project, index) => {
                  return (
                    <div key={series.title + indexP + project.title + index}>
                      <div className="pl-6 flex gap-8 text-xl">
                        <h2>{project.title}</h2>
                        <div className="flex gap-3 text-sm">
                          {/* <button className="text-red-600">Edit</button> */}
                          <DeleteButton callback={() => {}}>
                            Delete
                          </DeleteButton>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {project.seriesContents.map((content, indexS) => (
                          <div
                            key={project.title + index + indexS}
                            className="flex gap-8"
                          >
                            <h3 className="pl-10">{content.title}</h3>
                            <div className="flex gap-3 text-sm">
                              {/* <button className="text-red-600">Edit</button> */}
                              <DeleteButton callback={() => {}}>
                                Delete
                              </DeleteButton>
                            </div>
                          </div>
                        ))}
                        <a
                          className="pl-10"
                          href={`/admin/create/series/${series.title}/${project.title}`}
                        >
                          에세이 추가하기
                        </a>
                      </div>
                    </div>
                  );
                })}
                <a
                  className="pl-6 text-xl"
                  href={`/admin/create/series/${series.title}`}
                >
                  프로젝트 추가하기
                </a>
              </div>
            );
          })}
          <a
            className="p-6 text-xl text-gray-600"
            href={`/admin/create/series`}
          >
            시리즈 추가하기
          </a>
        </div>
      ) : (
        <div className="size-full flex items-center justify-center">
          <h2 className="text-3xl animate-bounce">loading...</h2>
        </div>
      )}
    </div>
  );
}
