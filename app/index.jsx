import { Image, StatusBar, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../assets/Colors";
import landingImg from "../assets/images/landing.jpg";
import SignInBtn from "../components/SignInBtn";
import VideoCarousel from "../components/VideoCarousel";

export default function Index() {
  const scheme = useColorScheme();
  const theme = Colors[scheme];

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Make background full height */}
      <Image
        source={landingImg}
        style={{ width: "100%", height: "100%" }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Add dark overlay */}
      <View className="absolute inset-0 bg-black/50" />

      <SafeAreaView
        className="flex-1 items-center justify-end py-20"
        edges={["top", "left", "right"]}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View className="flex-1 justify-between items-center">
          <View className="px-10">
            <Text
              style={{ fontFamily: "Urbanist-Bold" }}
              className="text-white text-5xl text-center font-extrabold tracking-wide mb-4"
            >
              Edits <Text className="text-sky-500">AI</Text>
            </Text>

            <Text
              style={{ fontFamily: "Urbanist-Regular" }}
              className="text-blue-100 text-center font-semibold text-lg mb-10 leading-relaxed"
            >
              “Creativity begins where imagination meets intelligence.”
            </Text>
          </View>
          <VideoCarousel />
        </View>

        <View className="flex-1 justify-end gap-3.5 items-center px-10">
          <SignInBtn />
        </View>
      </SafeAreaView>
    </View>
  );
}
