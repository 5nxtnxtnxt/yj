import firebasedb from "./firebasedb";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Project } from "@/firebase/firestoreTypes.d";

let myData: Project[] | undefined;

export async function getProjectData(force: boolean = false) {
  if (myData) return myData;

  const fireStore = getFirestore(firebasedb);
  if (!fireStore) return;
  const data = await getDocs(collection(fireStore, "project"));

  myData = [];
  data.forEach((e) => {
    myData!.push(e.data() as Project);
  });
  return myData;
}
