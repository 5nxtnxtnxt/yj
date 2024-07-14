import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { getDataFromNotion } from "@/utils/notion";
import { Suspense } from "react";

export default async function Home() {
  const data = await getDataFromNotion();
  return (
    <main className="">
      <Suspense fallback={<div>loading.....</div>}>
        <div className="">
          <NavigationBar data={data} className="fixed w-1/5" />
          <BlurImages data={data} />
        </div>
      </Suspense>
    </main>
  );
}
