import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { MyData, getDataFromNotion } from "@/utils/notion";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getDataFromNotion(true);
  console.log("test");
  return (
    <main className="">
      <Suspense fallback={<div>loading.....</div>}>
        <NavigationBar data={data} />
        <BlurImages data={data} />
      </Suspense>
    </main>
  );
}
