import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProjectGridView from "./projectGridView";
import Info from "@/components/info";

export default async function a({ params }: { params: { project: string } }) {
  const projectIndex = parseInt(params.project);

  const data = await getProjectData();
  const nowData = data.projects[projectIndex];

  if (!nowData) redirect("/error");
  return (
    <>
      <Info data={data}></Info>
      <div className=" flex flex-col">
        <div className="w-full max-md:aspect-square md:h-[50rem] border-b border-border-black flex flex-col justify-center items-center gap-8 max-md:p-4">
          <h1 className="max-md:text-7xl text-8xl realNova text-center">
            {nowData.infoTitle}
          </h1>
          <h4 className=" whitespace-pre-line text-center text-lg leading-8">
            {nowData.infoContent}
          </h4>
        </div>
        <ProjectGridView
          data={nowData}
          projectIndex={projectIndex}
        ></ProjectGridView>
      </div>
    </>
  );
}
