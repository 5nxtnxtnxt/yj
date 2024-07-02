import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { MyData, getDataFromNotion } from "@/utils/notion";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getDataFromNotion();
  return (
    <main className="">
      <NavigationBar data={data} />
      <BlurImages data={data} />
    </main>
  );
}
