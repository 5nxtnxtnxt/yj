import { Project, Series } from "@/firebase/firestoreTypes";
import Image from "next/image";
import Link from "next/link";

export default function SeriesGridView({ data }: { data: Series }) {
  return (
    <div className="flex w-full flex-col mb-40">
      <h2 className="block border-b border-black w-full text-xl p-6">LIST</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.seriesProjects.map((project, index) => {
          return (
            <div
              key={index}
              className={`border-b border-black grid grid-rows-2 grid-cols-2 md:h-96  w-full p-4 relative gap-4 ${
                index % 2 || "border-r"
              }`}
            >
              <div className="w-full h-96 md:h-full overflow-hidden relative md:row-span-2 row-span-1 md:col-span-1 col-span-2">
                <Image
                  width={500}
                  height={500}
                  alt="test"
                  src={project.thumbnail}
                  className="size-full object-cover"
                />
                <div className="truncate flex flex-col gap-4 text-white z-10 top-0 md:hidden w-full h-full p-6 absolute ">
                  <div className="flex justify-between">
                    <h2>{data.title}</h2>
                    <h3>{project.date}</h3>
                  </div>

                  <h1 className="text-2xl">{project.title}</h1>
                </div>
              </div>
              <div className="truncate md:flex flex-col gap-4 text-black z-10 top-auto w-full h-full p-6 hidden">
                <div className="flex justify-between">
                  <h2>{data.title}</h2>
                  <h3>{project.date}</h3>
                </div>

                <h1 className="text-2xl">{project.title}</h1>
              </div>
              <div className="flex w-full flex-col col-span-2 md:col-span-1">
                <div className="flex flex-col justify-between">
                  <h4 className="line-clamp-5 whitespace-pre-line h-[7.5rem]">
                    {project.description}
                  </h4>
                  <Link
                    className="border-t border-black border-dotted text-center pt-3"
                    href={`/series/${data.title}/${project.title}s`}
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
