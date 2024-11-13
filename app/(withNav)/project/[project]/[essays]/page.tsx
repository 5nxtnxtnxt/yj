import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import EssayView from "@/components/essay";
import Link from "next/link";
import Info from "@/components/info";
import Image from "next/image";

export default async function a({
  params,
}: {
  params: { project: string; essays: string };
}) {
  const projectIndex = parseInt(params.project);
  const essayIndex = parseInt(params.essays);

  const data = await getProjectData();
  const nowData = data.projects[projectIndex].essays[essayIndex];

  if (!nowData) {
    redirect("/error");
  }
  return (
    <>
      <Info data={data}></Info>
      <div className="h-full relative ">
        <EssayView data={nowData}></EssayView>
      </div>
    </>
  );
}
