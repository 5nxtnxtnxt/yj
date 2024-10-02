"use client";

import { useEffect, useState } from "react";
import { Project, Series, YJData } from "@/firebase/firestoreTypes";
import {
  getProjectData,
  updateProject,
  updateSeries,
} from "@/firebase/firestore";
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

  const deleteProjectData = async (
    projectIndex: number,
    seriesIndex?: number
  ) => {
    const newProjects: Project[] = JSON.parse(JSON.stringify(yjData?.projects));
    if (seriesIndex !== undefined) {
      newProjects[projectIndex].essays.splice(seriesIndex, 1);
    } else {
      newProjects.splice(projectIndex, 1);
    }
    const result = await updateProject(newProjects);
    if (result) setYJData(await getProjectData());
  };

  const deleteSeriesData = async (
    seriesIndex: number,
    projectIndex?: number,
    essayIndex?: number
  ) => {
    const newSeries: Series[] = JSON.parse(JSON.stringify(yjData?.series));
    // console.log(newSeries, seriesIndex, projectIndex, essayIndex);
    if (essayIndex !== undefined && projectIndex !== undefined) {
      newSeries[seriesIndex].seriesProjects[projectIndex].seriesContents.splice(
        essayIndex,
        1
      );
    } else if (projectIndex !== undefined) {
      newSeries[seriesIndex].seriesProjects.splice(projectIndex, 1);
    } else {
      newSeries.splice(seriesIndex, 1);
    }
    const result = await updateSeries(newSeries);
    // console.log(newSeries);
    if (result) setYJData(await getProjectData());
  };

  return (
    <div className="w-screen h-screen">
      {yjData ? (
        <div className="flex flex-col">
          {yjData.projects.map((project, indexP) => {
            return (
              <div
                key={project.title + indexP}
                className="flex flex-col gap-2 border-b p-6 border-border-black"
              >
                <div className="flex gap-10 text-2xl">
                  <h2>
                    [{indexP}] {project.title}
                  </h2>
                  <div className="flex gap-3 text-base items-center">
                    <a
                      className="text-blue-700"
                      href={`/admin/edit/project/${indexP}`}
                    >
                      Edit
                    </a>
                    <DeleteButton
                      target={`[${indexP}] ${project.title}`}
                      callback={() => {
                        deleteProjectData(indexP);
                      }}
                    >
                      Delete
                    </DeleteButton>
                  </div>
                </div>
                {project.essays.map((essay, index) => {
                  return (
                    <div key={project.title + indexP + essay.title + index}>
                      <div className="pl-6 flex gap-10 text-xl">
                        <h2>
                          [{index}] {essay.title}
                        </h2>
                        <div className="flex gap-3 text-sm items-center">
                          <a
                            className="text-blue-700"
                            href={`/admin/edit/project/${indexP}/${index}`}
                          >
                            Edit
                          </a>
                          <DeleteButton
                            target={`[${indexP}] ${project.title} >  [${index}] ${essay.title}`}
                            callback={() => {
                              deleteProjectData(indexP, index);
                            }}
                          >
                            Delete
                          </DeleteButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <a className="pl-6" href={`/admin/create/project/${indexP}`}>
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
          <div className="w-full border-t border-border-black"></div>
          {yjData.series.map((series, indexP) => {
            return (
              <div
                key={series.title + indexP}
                className="flex flex-col gap-2 border-b p-6 border-border-black"
              >
                <div className="flex gap-10 text-2xl">
                  <h2>
                    [{indexP}] {series.title}
                  </h2>
                  <div className="flex gap-3 text-base items-center">
                    <a
                      className="text-blue-700"
                      href={`/admin/edit/series/${indexP}`}
                    >
                      Edit
                    </a>
                    <DeleteButton
                      target={`[${indexP}] ${series.title}`}
                      callback={() => {
                        deleteSeriesData(indexP);
                      }}
                    >
                      Delete
                    </DeleteButton>
                  </div>
                </div>
                {series.seriesProjects.map((project, index) => {
                  return (
                    <div key={series.title + indexP + project.title + index}>
                      <div className="pl-6 flex gap-8 text-xl">
                        <h2>
                          [{index}] {project.title}
                        </h2>
                        <div className="flex gap-3 text-sm items-center">
                          <a
                            className="text-blue-700"
                            href={`/admin/edit/series/${indexP}/${index}`}
                          >
                            Edit
                          </a>
                          <DeleteButton
                            target={`[${indexP}] ${series.title} >  [${index}] ${project.title}`}
                            callback={() => {
                              deleteSeriesData(indexP, index);
                            }}
                          >
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
                            <h3 className="pl-10">
                              [{indexS}] {content.title}
                            </h3>
                            <div className="flex gap-3 text-sm items-center">
                              <a
                                className="text-blue-700"
                                href={`/admin/edit/series/${indexP}/${index}/${indexS}`}
                              >
                                Edit
                              </a>
                              <DeleteButton
                                target={`[${indexP}] ${series.title} >  [${index}] ${project.title} > [${indexS}] ${content.title}`}
                                callback={() => {
                                  deleteSeriesData(indexP, index, indexS);
                                }}
                              >
                                Delete
                              </DeleteButton>
                            </div>
                          </div>
                        ))}
                        <a
                          className="pl-10"
                          href={`/admin/create/series/${indexP}/${index}`}
                        >
                          에세이 추가하기
                        </a>
                      </div>
                    </div>
                  );
                })}
                <a
                  className="pl-6 text-xl"
                  href={`/admin/create/series/${indexP}}`}
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
