import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { getDataFromNotion } from "@/utils/notion";
import { Suspense } from "react";

export default async function Home() {
  const data = await getDataFromNotion();
  return (
    <main className="">
      <Suspense fallback={<div>loading.....</div>}>
        <div className="flex relative">
          <NavigationBar
            data={data}
            className="w-60 border-r border-gray-500"
          />
          <BlurImages data={data} />
        </div>
      </Suspense>
    </main>
  );
}
