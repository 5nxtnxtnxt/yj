import { getProjectData } from "@/firebase/firestore";
import { redirect } from "next/navigation";
import EssayView from "@/components/essay";
import Link from "next/link";
import Info from "@/components/info";
import Image from "next/image";

export default async function a({
  params,
}: {
  params: { project: string; essays: string; page: string };
}) {
  const projectIndex = parseInt(params.project);
  const essayIndex = parseInt(params.essays);
  const page = parseInt(params.page);

  const data = await getProjectData();
  const nowData = data.projects[projectIndex].essays[essayIndex];

  if (!nowData) {
    redirect("/error");
  }
  return (
    <>
      <Info data={data}></Info>
      <div className="h-full relative ">
        {page > 0 && nowData.layout === 0 && (
          <Link
            className="text-2xl absolute top-1/2 left-12 size-[3.125rem] bg-opacity-50 bg-white shadow rounded-full text-center content-center z-50 -translate-y-1/2 flex justify-center"
            href={`./${page - 1}`}
          >
            <Image
              className="w-3"
              width={0}
              height={0}
              src="/left.svg"
              alt="leftPage"
            ></Image>
          </Link>
        )}

        <EssayView data={nowData} page={page}></EssayView>

        {page < nowData.contents.length / 2 - 1 && nowData.layout === 0 && (
          <Link
            className="text-2xl absolute top-1/2 right-12 size-[3.125rem] bg-opacity-50 bg-white  shadow rounded-full text-center content-center flex justify-center z-50 -translate-y-1/2 "
            href={`./${page + 1}`}
          >
            <Image
              width={0}
              height={0}
              src="/right.svg"
              alt="rightPage"
              className="w-3"
            ></Image>
          </Link>
        )}
      </div>
    </>
  );
}
