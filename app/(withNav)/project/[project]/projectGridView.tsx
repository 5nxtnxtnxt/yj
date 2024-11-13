import { Project } from "@/firebase/firestoreTypes";
import Image from "next/image";
import Link from "next/link";

export default function ProjectGridView({
  data,
  projectIndex,
}: {
  data: Project;
  projectIndex: number;
}) {
  return (
    <div className="flex w-full flex-col">
      <h2 className="block border-b border-border-black w-full text-xl p-6">
        LIST
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.essays.map((essay, index) => {
          return (
            <Link
              key={index}
              className={`border-b border-border-black flex flex-col md:grid grid-rows-1 grid-cols-2 w-full p-5 md:p-8 relative gap-[1.875rem] md:h-[31.25rem] ${
                index % 2 || "md:border-r"
              }`}
              href={`/project/${projectIndex}/${index}/0`}
            >
              <div className="w-full aspect-square md:h-full overflow-hidden relative row-start-1 col-start-1">
                <Image
                  width={500}
                  height={500}
                  alt="test"
                  src={essay.thumbnail}
                  className="size-full object-cover"
                />
                <div className="truncate flex flex-col gap-14 md:hidden text-white  z-10 absolute top-0 w-full p-5">
                  <div className="flex justify-between w-full text-lg">
                    <h2>{data.title}</h2>
                    <h3>{essay.date}</h3>
                  </div>

                  <h1 className="text-3xl">{essay.title}</h1>
                </div>
              </div>

              <div className="flex md:grid grid-cols-1 grid-rows-[1fr_2fr] gap-6">
                <div className="truncate flex flex-col gap-[1.875rem] max-md:hidden">
                  <div className="flex justify-between">
                    <h2>{data.title}</h2>
                    <h3>{essay.date}</h3>
                  </div>
                  <h1 className="text-4xl">{essay.title}</h1>
                </div>
                <div className="flex flex-col justify-end gap-6 leading-[1.875rem]">
                  <h4 className="line-clamp-5 whitespace-pre-line">
                    {essay.text}
                  </h4>

                  <h4 className="border-t border-border-black  border-dotted text-center pt-8">
                    READ MORE
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
        {data.essays.length % 2 ? (
          <div className="border-b border-border-black"></div>
        ) : null}
      </div>
    </div>
  );
}
