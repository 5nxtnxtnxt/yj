import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import SeriesGridView from "./seriesGridView";

export default async function a({ params }: { params: { series: string } }) {
  const seriesTitle = decodeURIComponent(params.series);

  const data = await getProjectData();
  const nowData = data.series.find((p) => p.title === seriesTitle);

  if (!nowData) redirect("/error");
  return (
    <div className=" flex flex-col">
      <div className="w-full h-[50rem] border-b border-black flex flex-col justify-center items-center gap-6">
        <h1 className="text-7xl">{nowData.infoTitle}</h1>
        <h4 className=" whitespace-pre-line text-center">
          {nowData.infoContent}
        </h4>
      </div>
      <SeriesGridView data={nowData} />
    </div>
  );
}
