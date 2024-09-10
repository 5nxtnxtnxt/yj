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
      {projectData ? (
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
                    <button className="text-red-600">EditProject</button>
                    <button
                      className="text-red-600"
                      onClick={() => {
                        confirm("정말로 삭제하시겠습니까?")
                          ? confirm("다시는 복구할 수 없습니다.")
                            ? alert("삭제되었습니다")
                            : null
                          : null;
                      }}
                    >
                      DeleteProject
                    </button>
                  </div>
                </div>
                {project.essays.map((essay, index) => {
                  return (
                    <div key={project.title + indexP + essay.title + index}>
                      <div className="pl-6 flex gap-10 text-xl">
                        <h2>{essay.title}</h2>
                        <div className="flex gap-3 text-sm">
                          <button className="text-red-600">EditEssay</button>
                          <button
                            className="text-red-600"
                            onClick={() => {
                              confirm("정말로 삭제하시겠습니까?")
                                ? confirm("다시는 복구할 수 없습니다.")
                                  ? alert("삭제되었습니다")
                                  : null
                                : null;
                            }}
                          >
                            DeleteEssay
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <a
                  className="pl-6"
                  href={`/admin/createContent/${project.title}`}
                >
                  에세이 추가하기
                </a>
              </div>
            );
          })}
          <a
            className="p-6 text-xl text-gray-600"
            href={`/admin/createProject`}
          >
            프로젝트 추가하기
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
