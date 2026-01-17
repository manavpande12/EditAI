import { Colors } from "@/assets/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  setStatusBarHidden,
  setStatusBarStyle,
  setStatusBarTranslucent,
} from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import MobileAds from "react-native-google-mobile-ads";
import "../global.css";

SplashScreen.preventAutoHideAsync();

function RouteGuard({ children }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    if (!user) {
      router.replace("/");
    } else {
      router.replace("/home");
    }
  }, [isMounted, user]);
  return <>{children}</>;
}

export default function RootLayout() {
  // Font Logic
  const [loaded, error] = useFonts({
    "Urbanist-Regular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Medium": require("../assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Navigation Color Scheme
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  useEffect(() => {
    // Change Android navigation & Status bar color dynamically
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setButtonStyleAsync(scheme === "dark" ? "light" : "dark");
    setStatusBarTranslucent(true);
    setStatusBarStyle(scheme === "dark" ? "light" : "dark");
    setStatusBarHidden(true, "slide");
  }, [scheme]);

  // Initialize Ads
  useEffect(() => {
    MobileAds()
      .initialize()
      .then(() => console.log("AdMob initialized"));
  }, []);

  if (!loaded && !error) {
    return null;
  }
  return (
    <RouteGuard>
      <Stack
        screenOptions={{
          headerShown: false, // full control per page
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RouteGuard>
  );
}
