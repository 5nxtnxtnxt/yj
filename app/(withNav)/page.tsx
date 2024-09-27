import ImageSection from "@/components/imageSection";
import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";
import EssayListView from "./essayListView";
import Info from "@/components/info";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getProjectData(true);
  return (
    <div className="w-full">
      <Info data={data}></Info>
      <ImageSection data={data} />
      <EssayListView data={data} />
    </div>
  );
}
