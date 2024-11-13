import firebaseApp from "./firebase";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Essay, Project, Series, YJData } from "@/firebase/firestoreTypes.d";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

let myData: YJData | undefined;

console.log("hello");

export async function uploadImageToFireStroage(imageFile: File) {
  const fireStorage = getStorage(firebaseApp);
  const newImageRef = ref(fireStorage, `images/${imageFile.name}`);
  const snapshot = await uploadBytes(newImageRef, imageFile);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export async function deleteProjectData(
  projectIndex: number,
  essayIndex: number
) {}

export async function updateSeries(series: Series[]) {
  try {
    const firestore = getFirestore(firebaseApp);
    await updateDoc(doc(firestore, "FromYJ", "YJData2"), {
      series: series,
    });
    return true;
  } catch (error) {}
}

export async function updateProject(project: Project[]) {
  try {
    const firestore = getFirestore(firebaseApp);
    await updateDoc(doc(firestore, "FromYJ", "YJData2"), {
      projects: project,
    });
    return true;
  } catch (error) {}
}

export async function getProjectData(force: boolean = false): Promise<YJData> {
  if (myData && !force) return myData;
  const fireStore = getFirestore(firebaseApp);
  if (!fireStore) return { series: [], projects: [] };
  const data = await getDoc(doc(collection(fireStore, "FromYJ"), "YJData2"));

  return data.data() as YJData;
}
