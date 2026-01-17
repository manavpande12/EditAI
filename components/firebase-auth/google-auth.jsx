import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

import { Pressable, Text, View } from "react-native";
GoogleSignin.configure({
  webClientId:
    "531461297841-si1cd1est4a66e056ktu56vfhs1jlt6a.apps.googleusercontent.com",
});
export default function GoogleAuth() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const signIn = async () => {
    let idToken;
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    idToken = signInResult?.data?.idToken || signInResult?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error("No ID token found");
    }

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(
      signInResult.data.idToken
    );

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await getAuth().signOut();
      setUser(null);
      console.log("Sign Out Succesfully.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          const user = await signIn();
          console.log(user, "user");
        }}
      /> */}

      {user && (
        <Pressable onPress={() => signOut()}>
          <Text className="text-white text-xl font-bold">Sign Out</Text>
        </Pressable>
      )}
    </View>
  );
}
