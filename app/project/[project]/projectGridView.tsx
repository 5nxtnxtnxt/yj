import { Project } from "@/firebase/firestoreTypes";
import Image from "next/image";
import Link from "next/link";

export default function ProjectGridView({ data }: { data: Project }) {
  return (
    <div className="flex w-full flex-col mb-40">
      <h2 className="block border-b border-black w-full text-xl p-6">LIST</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data.essays.map((essay, index) => {
          return (
            <div
              key={index}
              className={`border-b border-black grid grid-cols-2 aspect-video w-full p-4 relative gap-4 ${
                index % 2 || "border-r"
              }`}
            >
              <div className="w-full h-full overflow-hidden relative">
                <Image
                  width={500}
                  height={500}
                  alt="test"
                  src={essay.thumbnail}
                  className="size-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 grid-rows-[1fr_2fr] gap-6">
                <div className="truncate flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h2>{data.title}</h2>
                    <h3>{essay.date}</h3>
                  </div>

                  <h1 className="text-2xl">{essay.title}</h1>
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="line-clamp-4 whitespace-pre-line">
                    {essay.contents.find((e) => e.type === "text")?.data}
                  </h4>
                  <Link
                    className="border-t border-black border-dotted text-center pt-3"
                    href={`/project/${data.title}/${essay.title}/0`}
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
