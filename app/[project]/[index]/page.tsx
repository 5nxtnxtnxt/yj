import NavigationBar from "@/components/navigationBar";
import { getDataFromNotion } from "@/utils/notion";
import Link from "next/link";
import { useState } from "react";
export const dynamic = "force-dynamic";

export default async function a({
  params,
}: {
  params: { project: string; index: number };
}) {
  const project = decodeURIComponent(params.project);
  const index = params.index;

  const data = await getDataFromNotion();
  const nowData = data[project][index].data.reverse();

  return (
    <div>
      {/* <NavigationBar data={data} /> */}
      <div className="w-screen h-screen relative">
        {nowData.map((e, i) => {
          return (
            <div
              key={i}
              className={`w-1/2 h-full absolute ${
                i % 2 && "left-1/2"
              } overflow-hidden bg-slate-300`}
            >
              {e?.type === "image" ? (
                <div className="flex size-full justify-center items-center">
                  <img src={e.url} alt="" className=" w-1/2" />
                </div>
              ) : (
                <div>{e?.text}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
