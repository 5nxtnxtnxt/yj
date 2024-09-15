import Link from "next/link";
import { Project, YJData } from "@/firebase/firestoreTypes.d";

export default function NavigationBar({ data }: { data: YJData }) {
  return (
    <div className="w-full h-full border-r border-black md:h-screen">
      <Link href={"/"}>
        <div className="flex flex-col items-center border-b border-black h-full md:h-40 justify-center">
          <h1 className="text-4xl font-serif">예진으로부터</h1>
          <h3 className="text-2xl font-extralight font-serif">
            formfor.hyunye
          </h3>
        </div>
      </Link>
      <div className="flex-col p-10 gap-10 hidden md:flex">
        {data.projects.map((project, indexP) => {
          return (
            <div key={indexP}>
              <Link href={`/project/${project.title}`} className="text-xl">
                {project.title}
              </Link>
              {project.essays.map((essay, indexE) => {
                return (
                  <Link
                    key={`${project.title}${indexE}`}
                    className="text-base ml-10 block"
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
              <Link href={`/series/${series.title}`} className="text-xl">
                {series.title}
              </Link>
              {series.seriesProjects.map((sProject, indexP) => {
                return (
                  <Link
                    key={`${sProject.title}${indexP}`}
                    className="text-base ml-10 block"
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
