import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import SeriesGridView from "./seriesGridView";
import Info from "@/components/info";

export default async function a({ params }: { params: { series: string } }) {
  const seriesTitle = decodeURIComponent(params.series);

  const data = await getProjectData();
  const nowData = data.series.find((p) => p.title === seriesTitle);

  if (!nowData) redirect("/error");
  return (
    <>
      <Info data={data}></Info>
      <div className=" flex flex-col">
        <div className="w-full aspect-square md:h-[50rem] border-b border-black flex flex-col justify-center items-center gap-8 max-md:p-5">
          <h1 className="text-8xl realNova text-center">{nowData.infoTitle}</h1>
          <h4 className=" whitespace-pre-line text-center text-lg leading-[1.875rem]">
            {nowData.infoContent}
          </h4>
        </div>
        <SeriesGridView data={nowData} />
      </div>
    </>
  );
}
