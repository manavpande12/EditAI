import { Colors } from "@/assets/Colors";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, useColorScheme } from "react-native";

const BrandBtn = ({ onTap, element, isText = false, text = "Share" }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const width = isText ? 120 : 58;
  return (
    <Pressable className="active:scale-95" onPress={onTap}>
      <BlurView
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          width: width,
          height: 58,
        }}
        className="flex flex-row gap-2 justify-center items-center rounded-full overflow-hidden"
        intensity={100}
        tint={scheme}
      >
        {isText && (
          <Text
            style={{
              fontFamily: "Urbanist-Medium",
              fontSize: 21,
              color: theme.text,
            }}
          >
            {text}
          </Text>
        )}
        <MaskedView style={{ width: 28, height: 28 }} maskElement={element}>
          <LinearGradient
            colors={[theme.primary, theme.secondary, theme.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </BlurView>
    </Pressable>
  );
};

export default BrandBtn;
