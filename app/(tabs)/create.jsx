import { Colors } from "@/assets/Colors";
import BrandText from "@/components/BrandText";
import BreathingBackground from "@/components/BreathingBackground";
import CreditBtn from "@/components/CreditBtn";
import FeatureCard from "@/components/FeatureCard";
import { SafeAreaView, ScrollView, useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme = scheme == "dark" ? Colors.dark : Colors.light;

  return (
    <BreathingBackground speed={7000} intensity={1.08}>
      <SafeAreaView
        className="flex-1 items-center p-6"
        edges={["top", "bottom", "left", "right"]}
      >
        <View className="absolute top-12 flex-1 flex-row justify-between items-center w-full self-center">
          <BrandText fontSize={36} text="Create AI Edit's" align="left" />
          <CreditBtn />
        </View>
        <ScrollView className="mt-28 w-full">
          <FeatureCard
            icon="photo"
            title="Generate Image"
            description="Create stunning AI art from text prompts."
            route="/create/image"
          />
          <FeatureCard
            icon="video-camera"
            title="Generate Video"
            description="Bring your imagination to life with AI motion."
            route="/create/video"
          />
          <FeatureCard
            icon="microphone"
            title="Generate Video"
            description="Transform text into lifelike voice."
            route="/create/speech"
          />
        </ScrollView>
      </SafeAreaView>
    </BreathingBackground>
  );
}
