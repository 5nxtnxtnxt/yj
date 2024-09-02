import ImageSection from "@/components/imageSection";
import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import EssayListView from "./essayListView";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getProjectData(true);
  console.log(data);
  return (
    <main className="">
      <NavigationBar data={data}></NavigationBar>
      <div className="ml-80 overflow-x-hidden">
        <ImageSection data={data} />
        <EssayListView data={data} />
      </div>
    </main>
  );
}
