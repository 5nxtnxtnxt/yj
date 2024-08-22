import { getProjectData } from "@/firebase/firestore";

export default async function Home() {
  const data = await getProjectData();
  // console.log(data);
  return (
    <main className="">
      <h2>{JSON.stringify(data)}</h2>
    </main>
  );
}
