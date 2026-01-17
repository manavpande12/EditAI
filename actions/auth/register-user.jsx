import { firestore } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
export async function StoreUserInfo(user) {
  try {
    if (!user?.uid) throw new Error("Invalid User Data.");

    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: "google",
      plan: "free",
      creditBalance: 100,
      creditUsed: 0,
      userSpends: 0,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    };

    if (!userSnap.exists()) {
      await setDoc(userRef, userData);
      console.log("New user added to Firestore:", user.displayName);
    } else {
      await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
      console.log("User already exists in Firestore:", user.displayName);
    }
    return { status: "success" };
  } catch (er) {
    console.log("Error storing user:", er.message);
    return { status: "error", error: er.message };
  }
}
