import { Colors } from "@/assets/Colors";
import BrandText from "@/components/BrandText";
import Carousel from "@/components/Carousel";
import CreditBtn from "@/components/CreditBtn";
import { STYLES } from "@/constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "./BackBtn";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.6;

const SelectStyle = ({ setStep, onContinue }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const fadeColors =
    scheme === "dark"
      ? ["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)", "#000"]
      : [
          "transparent",
          "rgba(255,255,255,0.4)",
          "rgba(255,255,255,0.8)",
          "#fff",
        ];

  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]?.name);

  return (
    <View className="flex-1">
      <View
        className="absolute top-0 w-full overflow-hidden"
        style={{
          height: CARD_HEIGHT,
        }}
      >
        <Carousel
          data={STYLES.map((s) => s.img)}
          itemWidth={width}
          interval={2000}
          onChange={(i) => setSelectedStyle(STYLES[i]?.name)}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{ width, height: CARD_HEIGHT }}
              resizeMode="cover"
            />
          )}
        />
        {/* Bottom Fade */}
        <LinearGradient
          colors={fadeColors}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 66,
          }}
        />
      </View>
      <SafeAreaView
        className="flex-1 p-6 h-full"
        pointerEvents="box-none"
        edges={["top", "bottom", "left", "right"]}
      >
        <View className="absolute top-12 flex-1 flex-row justify-between items-center w-full self-center">
          <BackBtn onPress={() => setStep(1)} />
          <CreditBtn />
        </View>
        <View className="w-full h-full flex-1 justify-end items-center gap-6 pb-40">
          <BrandText fontSize={36} text={selectedStyle} />
          <Text
            className="text-2xl mb-6"
            style={{ color: theme.text, fontFamily: "Urbanist-Bold" }}
          >
            Choose Preferred Style
          </Text>
        </View>
        <Pressable
          onPress={() => onContinue?.(selectedStyle)}
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
    </View>
  );
};

export default React.memo(SelectStyle);
