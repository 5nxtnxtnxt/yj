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
  console.log(nowData);
  return (
    <div className="w-full relative">
      <div className="border-b border-black flex flex-col justify-end h-80 gap-6 p-14">
        <h1 className="text-4xl font-extrabold">{nowData.title}</h1>
        <h2>{nowData.description}</h2>
      </div>
      <div className="border-b border-black p-5 flex gap-3">
        <Link href={`/series/${nowSeries?.title}`}>{nowSeries?.title}</Link>
        <h6>{">"}</h6>
        <h4>{nowData.title}</h4>
        <h6>{">"}</h6>
        <h4>CONTENTS</h4>
      </div>

      {nowData.seriesContents.map((essay, index) => {
        return (
          <div
            className=" aspect-[2/1] grid grid-cols-2 border-b border-black p-6"
            key={index}
          >
            {index % 2 ? null : (
              <div className="w-full h-full overflow-hidden p-10">
                <Image
                  src={essay.image}
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="p-10 grid grid-cols-[3fr_1fr] grid-rows-[auto_1fr_auto] ">
              <h1 className="text-3xl pb-10">{essay.title}</h1>
              <h3 className="text-right">{essay.date}</h3>
              <textarea
                className="col-span-2 bg-bg-white resize-none outline-none overflow-hidden line-clamp-[20]"
                readOnly
                value={essay.text}
              ></textarea>
              <a
                href={essay.link}
                target="_blank"
                className="col-span-2 pt-10 text-center"
              >
                {"-> 에세이 전문 보러가기 <-"}
              </a>
            </div>
            {index % 2 ? (
              <div className="w-full h-full overflow-hidden p-10">
                <Image
                  src={essay.image}
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
