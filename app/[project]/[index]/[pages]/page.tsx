import NavigationBar from "@/components/navigationBar";
import { getDataFromNotion } from "@/utils/notion";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function a({
  params,
}: {
  params: { project: string; index: string; pages: string };
}) {
  const project = decodeURIComponent(params.project);
  const index = parseInt(params.index);
  const page = parseInt(params.pages);

  const data = await getDataFromNotion();
  const nowData = data[project][index].data;
  if (Math.floor(nowData.length / 2) < page || page < 0) {
    redirect(`./0`);
  }
  const [left, right] = [nowData[page * 2], nowData[page * 2 + 1]];
  return (
    <div className="w-screen  h-screen relative flex">
      <NavigationBar
        data={data}
        className="w-1/5 border-r border-black"
      ></NavigationBar>
      <div className="grid grid-cols-2 size-full overflow-hidden relative">
        <div className="size-full relative border-r border-black">
          {left?.type === "image" ? (
            <div
              id="img-container"
              className="absolute w-full top-1/2 -translate-y-1/2 overflow-hidden flex justify-center"
            >
              <Image
                src={left.url}
                className="max-h-screen object-contain object-center"
                alt={left.type}
              ></Image>
            </div>
          ) : (
            <div>
              <h5>{left?.text}</h5>
            </div>
          )}
        </div>
        <div>
          {right?.type === "image" ? (
            <div className="w-1/2">
              <Image src={right.url} alt="s"></Image>
            </div>
          ) : (
            <div>
              <h5>{right?.text}</h5>
            </div>
          )}
        </div>
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
