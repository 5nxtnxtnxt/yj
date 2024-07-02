import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import {
  MyData,
  getDataFromNotion,
  getDataFromNotionForce,
} from "@/utils/notion";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getDataFromNotionForce();
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
