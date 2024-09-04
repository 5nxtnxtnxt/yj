import { Project } from "@/firebase/firestoreTypes";
import Image from "next/image";
import Link from "next/link";

export default function ProjectGridView({ data }: { data: Project }) {
  return (
    <div className="flex w-full flex-col mb-40">
      <h2 className="block border-b border-black w-full text-xl p-6">LIST</h2>
      <div className="grid grid-cols-2">
        {data.essays.map((essay, index) => {
          const nowDate = new Date(essay.date.seconds * 1000);
          const dateStr = `${nowDate.getFullYear()}.${(nowDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${nowDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;
          return (
            <div
              key={index}
              className={`border-b border-black grid grid-cols-2 h-[30rem] w-full p-7 relative gap-7 ${
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
                    <h3>{dateStr}</h3>
                  </div>

                  <h1 className="text-3xl">{essay.title}</h1>
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="line-clamp-5 whitespace-pre-line">
                    {essay.contents
                      .find((e) => e.type === "text")
                      ?.text.join("\n")}
                  </h4>
                  <Link
                    className="border-t border-black border-dotted text-center pt-6"
                    href={`/essay/${data.title}/${essay.title}/0`}
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
