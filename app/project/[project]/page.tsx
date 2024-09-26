import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProjectGridView from "./projectGridView";
import Info from "@/components/info";

export default async function a({ params }: { params: { project: string } }) {
  const projectTitle = decodeURIComponent(params.project);

  const data = await getProjectData();
  const nowData = data.projects.find((p) => p.title === projectTitle);

  if (!nowData) redirect("/error");
  return (
    <>
      <Info data={data}></Info>
      <div className=" flex flex-col">
        <div className="w-full max-md:aspect-square md:h-[50rem] border-b border-black flex flex-col justify-center items-center gap-6">
          <h1 className="text-7xl">{nowData.infoTitle}</h1>
          <h4 className=" whitespace-pre-line text-center">
            {nowData.infoContent}
          </h4>
        </div>
        <ProjectGridView data={nowData}></ProjectGridView>
      </div>
    </>
  );
}
