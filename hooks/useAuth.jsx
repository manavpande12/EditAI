// // hooks/useAuth.js
// import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
// import { useEffect, useState } from "react";

// export function useAuth() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function handleAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }
//   useEffect(() => {
//     const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   return { user };
// }

// or wherever your firebase.js is
import { firebaseAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (usr) => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, [initializing]);

  return { user, initializing };
}
