import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import EssayView from "@/components/essay";
import Link from "next/link";
import Info from "@/components/info";

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
    <>
      <Info data={data}></Info>
      <div className="h-full relative ">
        {page > 0 && nowData.layout === 0 && (
          <Link
            className="text-2xl absolute top-1/2 left-12 size-[3.125rem] bg-opacity-75 bg-white shadow rounded-full text-center content-center z-50 -translate-y-1/2 "
            href={`./${page - 1}`}
          >
            {"<"}
          </Link>
        )}

        <EssayView data={nowData} page={page}></EssayView>

        {page < nowData.contents.length / 2 - 1 && nowData.layout === 0 && (
          <Link
            className="text-2xl absolute top-1/2 right-12 size-[3.125rem] bg-opacity-75 bg-white shadow rounded-full text-center content-center  z-50 -translate-y-1/2"
            href={`./${page + 1}`}
          >
            {">"}
          </Link>
        )}
      </div>
    </>
  );
}
