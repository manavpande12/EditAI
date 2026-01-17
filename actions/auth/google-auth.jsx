// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({
//   webClientId:
//     "531461297841-si1cd1est4a66e056ktu56vfhs1jlt6a.apps.googleusercontent.com",
// });

// export async function SignInWithGoogle() {
//   try {
//     let idToken;
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const signInResult = await GoogleSignin.signIn();
//     // Try the new style of google-sign in result, from v13+ of that module
//     idToken = signInResult?.data?.idToken || signInResult?.idToken;
//     if (!idToken) {
//       // if you are using older versions of google-signin, try old style result
//       idToken = signInResult.idToken;
//     }
//     if (!idToken) {
//       throw new Error("No ID token found");
//     }
//     // Create a Google credential with the token
//     const googleCredential = GoogleAuthProvider.credential(
//       signInResult.data.idToken
//     );
//     // Sign-in the user with the credential
//     const data = await signInWithCredential(getAuth(), googleCredential);

//     console.log(data);
//     return {
//       status: "success",
//       data: data,
//     };
//   } catch (er) {
//     console.log(er.message);
//     return {
//       status: "error",
//       error: er.message,
//     };
//   }
// }

// export async function SignOutFromGoogle() {
//   try {
//     await GoogleSignin.signOut();
//     await getAuth().signOut();
//     console.log("Logged Out");
//     return {
//       status: "success",
//     };
//   } catch (er) {
//     console.log(er.message);
//     return {
//       status: "error",
//       error: er.message,
//     };
//   }
// }

import { firebaseApp, firebaseAuth } from "@/lib/firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { StoreUserInfo } from "./register-user";

GoogleSignin.configure({
  webClientId:
    "531461297841-si1cd1est4a66e056ktu56vfhs1jlt6a.apps.googleusercontent.com",
});

export async function SignInWithGoogle() {
  try {
    // Ensure Play Services (Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Trigger Google Sign-In
    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult?.data?.idToken || signInResult?.idToken;

    if (!idToken) throw new Error("No ID token found");

    // Create Firebase credential
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign in to Firebase
    const auth = getAuth(firebaseApp);
    const result = await signInWithCredential(firebaseAuth, googleCredential);

    console.log("User signed in:", result.user);

    const user = result.user;
    await StoreUserInfo(user);
    return { status: "success", data: result.user };
  } catch (er) {
    console.log("Google Sign-In error:", er.message);
    return { status: "error", error: er.message };
  }
}

export async function SignOutFromGoogle() {
  try {
    const auth = getAuth(firebaseApp);
    await GoogleSignin.signOut();
    await signOut(auth);
    console.log("Logged out successfully");
    return { status: "success" };
  } catch (er) {
    console.log("Sign-out error:", er.message);
    return { status: "error", error: er.message };
  }
}
