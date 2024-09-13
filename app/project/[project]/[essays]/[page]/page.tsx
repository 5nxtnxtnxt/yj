import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import EssayView from "@/components/essay";
import Link from "next/link";

export default async function a({
  params,
}: {
  params: { project: string; essays: string; page: string };
}) {
  const projectTitle = decodeURIComponent(params.project);
  const essayTitle = decodeURIComponent(params.essays);
  const page = parseInt(params.page);

  const data = await getProjectData();
  const nowData = data.projects
    .find((p) => p.title === projectTitle)
    ?.essays.find((e) => e.title === essayTitle);

  if (!nowData) {
    redirect("/error");
  }
  console.log(nowData);
  return (
    <div className="w-screen  h-screen">
      <NavigationBar data={data}></NavigationBar>
      <div className="ml-80 relative h-full">
        {page > 0 && (
          <Link className="absolute top-1/2 left-0 z-50" href={`./${page - 1}`}>
            {"<"}
          </Link>
        )}

        <EssayView data={nowData} page={page}></EssayView>

        {page < nowData.contents.length / 2 - 1 && (
          <Link
            className="absolute top-1/2 right-0 z-50"
            href={`./${page + 1}`}
          >
            {">"}
          </Link>
        )}
      </div>
    </div>
  );
}
