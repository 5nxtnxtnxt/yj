import BlurImages from "@/components/blurImages";
import NavigationBar from "@/components/navigationBar";
import { getDataFromNotion } from "@/utils/notion";
import { Suspense, useEffect } from "react";
import fireStore from "../firebase/firestore";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";

export default async function Home() {
  // const data = await getDataFromNotion();
  console.log(fireStore);
  const data = await getDocs(collection(fireStore, "project"));
  console.log("-----");
  data.forEach((e) => {
    console.log(e.id, " : ", e.data());
  });
  return (
    <main className="">
      {/* <Suspense fallback={<div>loading.....</div>}>
        <div className="flex relative w-screen h-screen">
          <NavigationBar
            data={data}
            className="w-60 border-r border-gray-500"
          />
          <BlurImages data={data} />
        </div>
      </Suspense> */}
    </main>
  );
}
