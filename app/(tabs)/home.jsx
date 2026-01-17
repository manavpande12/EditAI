import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-black relative overflow-hidden">
        {/* 💡 Glowing orb */}
        <View className="absolute top-24 right-16 w-[250px] h-[250px] rounded-full opacity-90">
          <BlurView
            tint="dark"
            experimentalBlurMethod="dimezisBlurView"
            intensity={100}
            style={{
              height: 200,
              width: 200,
              borderRadius: 9999999,
            }}
            className="blur-2xl"
          >
            <LinearGradient
              // vivid colors — not transparent
              colors={[
                "rgba(56,189,248,1)", // sky-400
                "rgba(147,51,234,0.9)", // purple-600
                "rgba(56,189,248,0.6)", // fade tail
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 9999,
                transform: [{ scale: 1.4 }], // soft edge
                shadowColor: "#60A5FA", // glow color
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 60,
                elevation: 40, // Android glow
              }}
            />
          </BlurView>
        </View>

        {/* Example foreground card */}
        <View className="w-[380px] h-[160px] rounded-2xl bg-neutral-900/70 border border-neutral-800" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
