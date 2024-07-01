import { MyData } from "@/utils/notion";
import { link } from "fs";
import Link from "next/link";

export default function BlurImages({ data }: { data: MyData }) {
  const projects = Object.keys(data);
  const positions: any = {};
  Object.keys(data).forEach((project) => {
    data[project].forEach(({ width, top, left }, index) => {
      positions[`${project}-${index}`] = {
        width: `${width * 100}%`,
        top: `${top * 100}%`,
        left: `${(100 - width * 100) * left}%`,
      };
    });
  });
  return (
    <div className="overflow-y-scroll overflow-x-visible w-screen h-screen relative border border-black">
      {projects.map((project) =>
        data[project].map((e, index) => (
          <Link href={"/te"} key={index}>
            <div
              style={positions[`${project}-${index}`]}
              className={`group hover:blur-none hover:shadow-xl shadow-black transition-all duration-200 absolute hover:z-40  ${
                e.depth === 1
                  ? "blur-none z-30"
                  : e.depth === 2
                  ? "blur-[1px] z-20"
                  : e.depth === 3
                  ? "blur-[2px] z-10"
                  : "blur-[3px] -z-0"
              }`}
            >
              <img
                src={e.thumbNailSrc}
                className="group-hover:opacity-0 transition-opacity duration-200 ease-in w-full h-full object-cover group-hover:delay-200"
              />
              <div className="grid grid-cols-2 grid-rows-5 bg-[rgb(241,242,234)] absolute top-0 left-0 size-full opacity-0 text-black  group-hover:opacity-80 transition-opacity duration-300 p-5 group-hover:delay-300">
                <h3 className="col-span-1 col-start-1">{project}</h3>
                <h4 className="col-span-1 col-start-2 text-right">{e.date}</h4>
                <h3 className="col-span-2 text-2xl">{e.title}</h3>
                <h5 className="col-span-2 row-span-3 text-ellipsis whitespace-pre overflow-y-scroll overflow-x-hidden">
                  {e.des}
                </h5>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
