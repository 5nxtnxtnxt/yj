import Link from "next/link";
import { Project, YJData } from "@/firebase/firestoreTypes.d";

export default function NavigationBar({ data }: { data: YJData }) {
  return (
    <div className="w-full h-full border-r border-black md:h-screen relative flex flex-col">
      <Link
        href={"/"}
        className="flex  items-center border-b border-black h-full md:h-[12.25rem] justify-center"
      >
        <img src="로고.svg" className="size-3/4"></img>
      </Link>
      <div className="flex-col p-12 gap-10 hidden md:flex overflow-y-auto h-full">
        {data.projects?.map((project, indexP) => {
          return (
            <div key={indexP}>
              <Link
                href={`/project/${project.title}`}
                className="text-xl block mb-2"
              >
                {project.title}
              </Link>
              {project.essays.map((essay, indexE) => {
                return (
                  <Link
                    key={`${project.title}${indexE}`}
                    className="ml-10 block mb-1"
                    href={`/project/${project.title}/${essay.title}/0`}
                  >
                    {essay.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
        {data.series.map((series, indexS) => {
          return (
            <div key={indexS}>
              <Link
                href={`/series/${series.title}`}
                className="text-xl block mb-2"
              >
                {series.title}
              </Link>
              {series.seriesProjects.map((sProject, indexP) => {
                return (
                  <Link
                    key={`${sProject.title}${indexP}`}
                    className="ml-10 block mb-1"
                    href={`/series/${series.title}/${sProject.title}`}
                  >
                    {sProject.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
