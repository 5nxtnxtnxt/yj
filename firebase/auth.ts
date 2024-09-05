import firebaseApp from "./firebase";
import {
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

const signIn = async (email: string, password: string) => {
  try {
    console.log("try login");
    await setPersistence(auth, browserSessionPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

const isLoggedIn = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user ? true : false);
      },
      (err) => {
        resolve(false);
      }
    );
  });
};

export { signIn, isLoggedIn };
