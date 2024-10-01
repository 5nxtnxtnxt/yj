import Info from "@/components/info";
import { getProjectData } from "@/firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import TestView from "./test";

export default async function a({
  params,
}: {
  params: { series: string; project: string; scroll: string };
}) {
  const seriesTitle = decodeURIComponent(params.series);
  const projectTitle = decodeURIComponent(params.project);
  const scrollIndex = parseInt(params.scroll);

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
      <div className={`w-full relative`}>
        <div className="border-b border-border-black flex flex-col justify-end h-80 gap-6 p-14">
          <h1 className="text-4xl font-extrabold">{nowData.title}</h1>
          <h2>{nowData.description}</h2>
        </div>
        <div className="border-b border-border-black p-5 flex gap-3">
          <Link href={`/series/${nowSeries?.title}`}>{nowSeries?.title}</Link>
          <h6>{">"}</h6>
          <h4>{nowData.title}</h4>
          <h6>{">"}</h6>
          <h4>CONTENTS</h4>
        </div>
        <TestView nowData={nowData} scrollIndex={scrollIndex}></TestView>
      </div>
    </>
  );
}
