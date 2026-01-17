import { Colors } from "@/assets/Colors";
import BrandBtn from "@/components/BrandBtn";
import CreditBtn from "@/components/CreditBtn";
import { GetAspectRatio } from "@/constants/ratios";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "./BackBtn";

const Generate = ({ setStep, selectedRatio, genLoading }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const [loading, setLoading] = useState(genLoading || false);
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 p-6 h-full"
      edges={["top", "bottom", "left", "right"]}
    >
      <View className="absolute top-12 flex-1 flex-row justify-between items-center w-full self-center">
        <BackBtn onPress={() => setStep(3)} />
        <CreditBtn />
      </View>
      <View className="flex-1 justify-center items-center h-full py-28">
        <View className="w-full h-full justify-between items-center">
          {/* Output */}
          <View
            style={{ height: 600 }}
            className="w-full justify-center items-center"
          >
            <BlurView
              tint={scheme}
              intensity={90}
              className="rounded-3xl overflow-hidden justify-center items-center "
              style={[
                GetAspectRatio(selectedRatio),
                {
                  borderWidth: 1,
                  borderColor: theme.border,
                },
              ]}
            >
              {loading && (
                <ActivityIndicator
                  size="large"
                  color={theme.secondary}
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: "45%",
                  }}
                />
              )}
              <LinearGradient
                colors={[theme.primary, theme.secondary, theme.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  opacity: 0.1,
                }}
              />
            </BlurView>
          </View>
          {/* Btn */}
          <View className="w-full h-[80px] justify-between items-center flex-row">
            <BrandBtn
              onTap={() => {}}
              element={<Feather name="download" size={28} color="black" />}
            />
            <BrandBtn
              onTap={() => {}}
              element={<AntDesign name="whats-app" size={28} color="black" />}
            />
            <BrandBtn
              onTap={() => {}}
              element={<Entypo name="instagram" size={28} color="black" />}
            />
            <BrandBtn
              onTap={() => {}}
              element={<FontAwesome name="share" size={28} color="black" />}
            />
            <BrandBtn
              onTap={() => {}}
              isText={true}
              text="Post"
              element={
                <MaterialCommunityIcons name="post" size={28} color="black" />
              }
            />
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          router.push("(tabs)/create");
        }}
        className="w-full h-[54px] rounded-full overflow-hidden bottom-16 absolute self-center"
      >
        <LinearGradient
          className="w-full h-full justify-center items-center"
          colors={[theme.primary, theme.secondary, theme.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-lg text-white">Close</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

export default Generate;
