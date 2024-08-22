import ImageSection from "@/components/imageSection";
import NavigationBar from "@/components/navigationBar";
import { getProjectData } from "@/firebase/firestore";

export default async function Home() {
  const data = await getProjectData(true);
  return (
    <main className="">
      <NavigationBar data={data}></NavigationBar>
      <div className="ml-80">
        <ImageSection data={data} />
      </div>
    </main>
  );
}
