import { Project, Series } from "@/firebase/firestoreTypes";
import Image from "next/image";
import Link from "next/link";

export default function SeriesGridView({ data }: { data: Series }) {
  return (
    <div className="flex w-full flex-col">
      <h2 className="block border-b border-border-black w-full text-xl p-6">
        LIST
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.seriesProjects.map((project, index) => {
          return (
            <Link
              key={index}
              className={`border-b border-border-black flex flex-col md:grid grid-rows-2 grid-cols-2  w-full p-8 relative gap-[1.875rem] md:h-[31.25rem] ${
                index % 2 || "md:border-r"
              }`}
              href={`/series/${data.title}/${project.title}`}
            >
              <div className="w-full aspect-[2/1] md:h-full overflow-hidden relative md:row-span-2 row-span-1 md:col-span-1 col-span-2">
                <Image
                  width={500}
                  height={500}
                  alt="test"
                  src={project.thumbnail}
                  className="size-full object-cover"
                />
              </div>
              <div className="truncate flex flex-col gap-6 text-black z-10 top-auto w-full row-span-2 md:grid grid-cols-1 grid-rows-[1fr_2fr]">
                <div className="truncate flex flex-col gap-3 md:gap-[1.875rem] ">
                  <div className="flex justify-between w-full text-lg ">
                    <h2 className="flex-grow overflow-hidden">{data.title}</h2>
                    <h3 className="flex-shrink-0">{project.date}</h3>
                  </div>
                  <h1 className="text-4xl">{project.title}</h1>
                </div>
                <div className="flex flex-col justify-end gap-6 leading-[1.875rem]">
                  <h4 className="line-clamp-3 md:line-clamp-5 whitespace-pre-line">
                    {project.description}
                  </h4>

                  <h4 className="border-t border-border-black border-dotted text-center pt-8">
                    READ MORE
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
        {data.seriesProjects.length % 2 ? (
          <div className="border-b border-border-black"></div>
        ) : null}
      </div>
    </div>
  );
}
