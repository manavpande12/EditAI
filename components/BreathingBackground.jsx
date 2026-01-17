import { MeshGradientView } from "expo-mesh-gradient";
import { useEffect } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// Default dark gradient colors
const DARK_COLORS = [
  "#062D22",
  "#094D37",
  "#0E6946",
  "#000000",
  "#000000",
  "#000000",
  "#1F4366",
  "#275A85",
  "#316FA3",
];

const DEFAULT_POINTS = [
  [0.0, 0.0],
  [0.5, 0.0],
  [1.0, 0.0],
  [0.0, 0.5],
  [0.5, 0.5],
  [1.0, 0.5],
  [0.0, 1.0],
  [0.5, 1.0],
  [1.0, 1.0],
];

export default function BreathingBackground({
  speed = 3000,
  intensity = 1.05,
  colors = DARK_COLORS,
  points = DEFAULT_POINTS,
  children,
}) {
  const scale = useSharedValue(1);
  const scheme = useColorScheme();
  const isLight = scheme === "light";

  // Breathing effect only applies to background
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(intensity, {
          duration: speed,
          easing: Easing.inOut(Easing.quad),
        }),
        withTiming(1, {
          duration: speed,
          easing: Easing.inOut(Easing.quad),
        })
      ),
      -1,
      false
    );
  }, [speed, intensity]);

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* Animated breathing background */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          backgroundStyle,
          { overflow: "hidden" },
        ]}
      >
        {!isLight && (
          <MeshGradientView
            style={StyleSheet.absoluteFill}
            columns={3}
            rows={3}
            colors={colors}
            points={points}
          />
        )}
      </Animated.View>

      {/* Static content */}
      {children}
    </View>
  );
}
