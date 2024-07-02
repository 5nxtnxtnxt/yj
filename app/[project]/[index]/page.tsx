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

  return <Link href={"/"}>{data[project][index].des}</Link>;
}
