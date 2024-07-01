import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { MyData, getDataFromNotion } from "@/utils/notion";

let data: null | MyData = null;
export default async function Home() {
  if (!data) {
    data = await getDataFromNotion();
  }
  return (
    <main className="">
      <NavigationBar data={data} />
      <BlurImages data={data} />
    </main>
  );
}
