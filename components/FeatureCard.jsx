import { Colors } from "@/assets/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import BrandText from "./BrandText";

export default function FeatureCard({
  icon = "bolt",
  title = "Feature Title",
  description = "Feature description goes here.",
  tintLight = "light",
  tintDark = "dark",
  intensity = 40,
  onPress,
  route,
}) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  return (
    <Pressable
      className="w-full active:scale-95 mb-6"
      onPress={() => {
        if (onPress) onPress();
        else if (route) router.push(route);
      }}
    >
      <BlurView
        tint={scheme === "dark" ? tintDark : tintLight}
        intensity={intensity}
        className="rounded-3xl overflow-hidden h-[150px]  w-full p-4 flex flex-row items-center gap-3"
        style={{
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        {/* Icon Section */}
        <View className="justify-center items-center rounded-full w-24 h-24 overflow-hidden">
          <LinearGradient
            colors={[theme.primary, theme.secondary, theme.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-full p-[2px] w-24 h-24 justify-center items-center"
          >
            <BlurView
              tint={scheme === "dark" ? tintDark : tintLight}
              intensity={80}
              className="rounded-full overflow-hidden justify-center items-center w-24 h-24"
              style={{
                borderWidth: 1,
                borderColor: theme.border,
              }}
            >
              <FontAwesome name={icon} size={28} color={theme.text} />
            </BlurView>
          </LinearGradient>
        </View>

        {/* Text Section */}
        <View className="flex-1">
          <BrandText text={title} fontSize={24} align="left" />
          <Text
            className="text-sm font-semibold leading-5"
            style={{
              fontFamily: "Urbanist-Bold",
              color: theme.textSecondary,
            }}
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>
      </BlurView>
    </Pressable>
  );
}
