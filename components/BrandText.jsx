import { Colors } from "@/assets/Colors";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useColorScheme, View } from "react-native";

export default function BrandText({
  text = "",
  fontSize = 18,
  maxWidth = 300,
  align = "center",
}) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  // estimate + padding + clamp to maxWidth
  const estimated = Math.ceil(text.length * (fontSize * 0.75));
  const width = Math.min(Math.max(80, estimated + 12), maxWidth); // +12 padding

  const flexAlignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };
  const alignItemsValue = flexAlignMap[align] || "flex-start";

  return (
    <View style={{ width, alignItems: "center" }}>
      <MaskedView
        style={{
          width,
          height: fontSize + 12,
          justifyContent: "center",
          alignItems: "center",
        }}
        maskElement={
          <View
            style={{
              justifyContent: "center",
              alignItems: alignItemsValue,
              height: fontSize + 12,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize,
                fontFamily: "Urbanist-Bold",
                color: "black", // must be opaque
                backgroundColor: "transparent",
                textAlign: "center",
              }}
            >
              {text}
            </Text>
          </View>
        }
      >
        <LinearGradient
          colors={[
            theme.primary,
            theme.secondary,
            theme.accentAI || theme.accent,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            width: "100%",
            height: fontSize + 12,
          }}
        />
      </MaskedView>
    </View>
  );
}
