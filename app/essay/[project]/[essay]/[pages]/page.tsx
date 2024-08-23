import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function a({
  params,
}: {
  params: { project: string; essay: string; pages: string };
}) {
  const project = decodeURIComponent(params.project);
  const index = decodeURIComponent(params.essay);
  const page = parseInt(params.pages);

  const data = await getProjectData();
  const nowData = data
    .find((p) => p.title === project)
    ?.essays.find((e) => e.title);
  console.log(nowData?.contents);
  // if (!nowData || !nowData.contents[page]) redirect("/");
  return (
    <div className="w-screen  h-screen relative flex">
      <NavigationBar data={data}></NavigationBar>
      <div>{JSON.stringify(nowData?.contents)}</div>
      <div className="ml-80">
        <Link
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 text-4xl"
          href={`./${page - 1}`}
        >{`<`}</Link>
        <Link
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-4xl"
          href={`./${page + 1}`}
        >{`>`}</Link>
      </div>
    </div>
  );
}
