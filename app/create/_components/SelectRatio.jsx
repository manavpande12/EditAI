import { Colors } from "@/assets/Colors";
import BackBtn from "@/components/BackBtn";
import BrandText from "@/components/BrandText";
import Carousel from "@/components/Carousel";
import CreditBtn from "@/components/CreditBtn";
import { GetAspectRatio, ratios } from "@/constants/ratios";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SelectRatio = ({ onContinue }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const { width } = Dimensions.get("window");

  const [selectedRatio, setSelectedRatio] = useState("1:1");

  // Shared animated values
  const cardWidth = useSharedValue(GetAspectRatio("1:1").width);
  const cardHeight = useSharedValue(GetAspectRatio("1:1").height);

  // Animated card style
  const animatedCardStyle = useAnimatedStyle(() => ({
    width: withTiming(cardWidth.value, { duration: 350 }),
    height: withTiming(cardHeight.value, { duration: 350 }),
  }));

  // Precompute available ratios (avoid computing inside render)
  const ratioKeys = useMemo(() => Object.keys(ratios), []);

  return (
    <SafeAreaView
      className="flex-1 p-6"
      pointerEvents="box-none"
      edges={["top", "bottom", "left", "right"]}
    >
      {/* Header */}
      <View className="absolute top-12 flex-row justify-between self-center items-center w-full">
        <BackBtn route="(tabs)/create" />
        <CreditBtn />
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center p-4 gap-4">
        <View style={{ width, height: 600 }}>
          <Carousel
            data={ratioKeys}
            itemWidth={width}
            onChange={(index) => {
              const nextRatio = ratioKeys[index];
              setSelectedRatio(nextRatio);

              // update animation
              const newSize = GetAspectRatio(nextRatio);
              cardWidth.value = newSize.width;
              cardHeight.value = newSize.height;
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  width,
                }}
                className="justify-center items-center"
              >
                <Animated.View
                  style={[
                    animatedCardStyle,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 24,
                      overflow: "hidden",
                      borderWidth: 1,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <BlurView
                    tint={scheme}
                    intensity={90}
                    style={StyleSheet.absoluteFill}
                  />

                  <BrandText fontSize={24} text={ratios[item]} />
                  <BrandText fontSize={20} text={item} />

                  <LinearGradient
                    colors={[theme.primary, theme.secondary, theme.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFill, { opacity: 0.12 }]}
                  />
                </Animated.View>
              </View>
            )}
          />
        </View>

        {/* Title */}
        <Text
          className="text-2xl"
          style={{ color: theme.text, fontFamily: "Urbanist-Bold" }}
        >
          Choose Aspect Ratio
        </Text>
      </View>

      {/* Continue Button */}
      <Pressable
        onPress={() => onContinue?.(selectedRatio)}
        className="w-full h-[54px] rounded-full overflow-hidden bottom-16 absolute self-center"
      >
        <LinearGradient
          className="w-full h-full justify-center items-center"
          colors={[theme.primary, theme.secondary, theme.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-lg text-white">Continue</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

export default SelectRatio;
