import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { getDataFromNotionForce } from "@/utils/notion";

export default async function Home() {
  const data = await getDataFromNotionForce();
  return (
    <main className="">
      <NavigationBar data={data} />
      <BlurImages data={data} />
    </main>
  );
}
