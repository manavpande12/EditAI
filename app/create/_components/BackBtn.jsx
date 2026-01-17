import { Colors } from "@/assets/Colors";
import { Octicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, useColorScheme } from "react-native";

const BackBtn = ({ onPress }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  return (
    <Pressable className="active:scale-95" onPress={onPress}>
      <BlurView
        style={{ borderWidth: 1, borderColor: theme.border }}
        className=" w-16 h-16 flex justify-center items-center rounded-full overflow-hidden"
        intensity={100}
        tint={scheme}
      >
        <MaskedView
          style={{ width: 28, height: 28 }}
          maskElement={<Octicons name="chevron-left" size={28} color="black" />}
        >
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

export default BackBtn;
