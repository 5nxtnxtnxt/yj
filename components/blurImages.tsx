import { MyData } from "@/utils/notion";

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
  console.log(positions);
  return (
    <div className="overflow-y-scroll overflow-x-visible w-screen h-screen relative border border-black">
      {projects.map((project) =>
        data[project].map((e, index) => (
          <div
            key={index}
            style={positions[`${project}-${index}`]}
            className={`group hover:blur-none hover:shadow-xl shadow-black transition-all duration-500 absolute hover:z-40  ${
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
              className="group-hover:opacity-0 transition-opacity duration-500 ease-in w-full h-full object-cover"
            />
            <div className="bg-[rgb(241,242,234)] absolute top-0 left-0 size-full opacity-0 text-black  group-hover:opacity-80 transition-opacity duration-500 p-5 flex flex-col gap-5 ">
              <div className="flex justify-between">
                <h3>{project}</h3>
                <h4>{e.date}</h4>
              </div>
              <h3 className=" text-2xl">{e.title}</h3>
              <h5>테스트내용</h5>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
