import { Colors } from "@/assets/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text, useColorScheme, View } from "react-native";
import BrandThemeText from "../BrandText";

const Header = () => {
  const scheme = useColorScheme();
  const theme = scheme == "dark" ? Colors.dark : Colors.light;
  return (
    <View className="flex flex-row items-center justify-between w-full gap-4">
      <Text
        className="text-4xl"
        style={{ fontFamily: "Urbanist-Bold", color: theme.text }}
      >
        Create AI Edit's
      </Text>
      <BlurView
        intensity={100}
        tint={scheme === "dark" ? "dark" : "light"}
        style={{
          borderWidth: 1,
          borderColor: theme.border,
        }}
        className="rounded-3xl p-4 overflow-hidden justify-center items-center flex flex-row"
      >
        <MaterialCommunityIcons
          name="lightning-bolt"
          size={21}
          color="#FFD54F"
        />
        <BrandThemeText text="9.919K" fontSize={12} />
      </BlurView>
    </View>
  );
};

export default Header;
