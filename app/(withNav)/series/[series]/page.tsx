import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import SeriesGridView from "./seriesGridView";
import Info from "@/components/info";

export default async function a({ params }: { params: { series: string } }) {
  const seriesIndex = parseInt(params.series);

  const data = await getProjectData();
  const nowData = data.series[seriesIndex];

  if (!nowData) redirect("/error");
  return (
    <>
      <Info data={data}></Info>
      <div className=" flex flex-col">
        <div className="w-full aspect-square md:h-[50rem] border-b border-border-black flex flex-col justify-center items-center gap-8 max-md:p-5">
          <h1 className="text-8xl realNova text-center">{nowData.infoTitle}</h1>
          <h4 className=" whitespace-pre-line text-center text-lg leading-8">
            {nowData.infoContent}
          </h4>
        </div>
        <SeriesGridView data={nowData} seriesIndex={seriesIndex} />
      </div>
    </>
  );
}
