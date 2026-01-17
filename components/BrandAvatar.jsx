import { Colors } from "@/assets/Colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export function BrandAvatar({ uri, size = 110 }) {
  const rotate = useSharedValue(0);
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(1, { duration: 4500, easing: Easing.inOut(Easing.ease) }),
      -1
    );
  }, []);

  const ringStyle = useAnimatedStyle(() => {
    const t = rotate.value * Math.PI * 2;
    const amp = 0.04;
    const scale = 1 + Math.sin(t) * amp;

    return {
      transform: [{ scale }],
    };
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedView
        style={[
          ringStyle,
          {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            padding: 3,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <LinearGradient
          colors={[theme.primary, theme.secondary, theme.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      </AnimatedView>
      <Image
        source={{ uri }}
        style={{
          width: size - 12,
          height: size - 12,
          borderRadius: (size - 12) / 2,
        }}
        contentFit="cover"
      />
    </View>
  );
}
