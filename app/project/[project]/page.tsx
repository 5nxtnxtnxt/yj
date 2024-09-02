import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function a({ params }: { params: { project: string } }) {
  const projectTitle = decodeURIComponent(params.project);

  const data = await getProjectData();
  const nowData = data.find((p) => p.title === projectTitle);

  if (!nowData) redirect("/error");
  return (
    <div className="w-screen  h-screen">
      <NavigationBar data={data}></NavigationBar>
      <div className="ml-80 relative flex flex-col">
        <div className="w-full aspect-[2/1] border-b border-black flex flex-col justify-center items-center gap-6">
          <h1 className="text-7xl">{nowData.infoTitle}</h1>
          <h4 className=" whitespace-pre-line text-center">
            {nowData.infoContent.join("\n")}
          </h4>
        </div>
      </div>
    </div>
  );
}
