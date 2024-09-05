import firebaseApp from "./firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Project } from "@/firebase/firestoreTypes.d";

let myData: Project[] | undefined;

export async function getProjectData(
  force: boolean = false
): Promise<Project[]> {
  if (myData && !force) return myData;
  const fireStore = getFirestore(firebaseApp);
  if (!fireStore) return [];
  const data = await getDocs(collection(fireStore, "project"));

  myData = [];
  data.forEach((e) => {
    const nowData = e.data() as Project;
    nowData.essays.forEach((essay) => {
      essay.date = {
        seconds: essay.date.seconds,
        nanoseconds: essay.date.nanoseconds,
      };
    });
    myData!.push(nowData);
  });
  return myData;
}
