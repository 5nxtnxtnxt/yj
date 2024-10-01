import Info from "@/components/info";
import { getProjectData } from "@/firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function a({
  params,
}: {
  params: { series: string; project: string };
}) {
  const seriesTitle = decodeURIComponent(params.series);
  const projectTitle = decodeURIComponent(params.project);

  const data = await getProjectData();
  const nowSeries = data.series.find((p) => p.title === seriesTitle);
  const nowData = nowSeries?.seriesProjects.find(
    (e) => e.title === projectTitle
  );

  if (!nowData) {
    redirect("/error");
  }
  return (
    <>
      <Info data={data}></Info>
      <div className="w-full relative">
        <div className="border-b border-border-black flex flex-col justify-end h-80 gap-6 p-14">
          <h1 className="text-4xl font-extrabold">{nowData.title}</h1>
          <h2 className="text-lg leading-8">{nowData.description}</h2>
        </div>
        <div className="border-b border-border-black p-5 flex gap-3">
          <Link href={`/series/${nowSeries?.title}`}>{nowSeries?.title}</Link>
          <h6>{">"}</h6>
          <h4>{nowData.title}</h4>
          <h6>{">"}</h6>
          <h4>CONTENTS</h4>
        </div>

        {nowData.seriesContents.map((essay, index) => {
          return (
            <div
              className="aspect-[2/1] flex flex-col gap-6 md:grid grid-cols-2 border-b border-border-black p-6 max-md:pb-8"
              key={index}
            >
              <div
                className={` relative w-full aspect-square md:h-full overflow-hidden md:p-10 ${
                  index % 2 && "col-start-2"
                }`}
              >
                <Image
                  src={essay.image}
                  width={500}
                  height={500}
                  alt=""
                  className={`w-full h-full object-cover md:object-contain `}
                />
                <div className="flex flex-col gap-10 md:hidden text-white  z-10 absolute top-0 w-full p-5">
                  <div className="flex justify-between w-full text-lg gap-3">
                    <h2 className="flex-grow overflow-hidden  ">
                      {essay.title}
                    </h2>
                    <h3 className="flex-shrink-0 ">{essay.date}</h3>
                  </div>

                  <h1 className="text-4xl">{essay.title}</h1>
                </div>
              </div>
              <div
                className={`w-full flex flex-col gap-8 md:p-10 md:grid grid-cols-[3fr_1fr] grid-rows-[auto_1fr_auto] ${
                  index % 2 && "col-start-1 row-start-1"
                }`}
              >
                <div className="flex justify-between w-full text-lg gap-3 col-span-2 max-md:hidden">
                  <h2 className="flex-grow overflow-hidden text-3xl">
                    {essay.title}
                  </h2>
                  <h3 className="flex-shrink-0 ">{essay.date}</h3>
                </div>
                {/* <h1 className="text-3xl pb-10 max-md:hidden overflow-hidden">
                  {essay.title}
                </h1>
                <h3 className="text-right max-md:hidden">{essay.date}</h3> */}
                <textarea
                  className="col-span-2 bg-bg-white h-[30rem] text-lg leading-8 resize-none outline-none overflow-hidden md:line-clamp-[20] line-clamp-6 max-md:h-36"
                  readOnly
                  value={essay.text}
                ></textarea>
                <div className="col-span-2 flex justify-center w-full object-center">
                  <a
                    href={essay.link}
                    target="_blank"
                    className=" text-center max-md:border-t bg-white h-[3.125rem] content-center w-60 shadow-lg rounded-full"
                  >
                    {"전문 보러가기  >"}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
