import NavigationBar from "@/components/navigationBar";
import { getDataFromNotion } from "@/utils/notion";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function a({
  params,
}: {
  params: { project: string; index: number };
}) {
  const project = decodeURIComponent(params.project);
  const index = params.index;

  const data = await getDataFromNotion();

  return (
    <div>
      <NavigationBar data={data} />
      <div className=" ml-48">
        <Link href={"/"}>뒤로가기</Link>
        {data[project][index].texts.map((e, index) => (
          <>
            <h2 key={index} className=" whitespace-pre-line">
              {e}
            </h2>
            <br />
          </>
        ))}
      </div>
    </div>
  );
}
