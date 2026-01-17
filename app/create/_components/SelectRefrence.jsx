import { Colors } from "@/assets/Colors";
import BrandText from "@/components/BrandText";
import CreditBtn from "@/components/CreditBtn";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "./BackBtn";

const SelectRefrence = ({ setStep, onContinue }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const [selectedRefImg, setSelectedRefImg] = useState();
  const [loading, setLoading] = useState(false);
  const [isImg, setIsImg] = useState(false);

  const pickImage = async () => {
    // Ask permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert("Permission required to upload images.");
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: false,
      allowsEditing: false,
    });
    setLoading(true);
    if (!result.canceled) {
      setSelectedRefImg(result.assets[0].uri);
      setIsImg(true);
    }
    setLoading(false);
  };

  //   When img load
  const imgFade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isImg) {
      Animated.timing(imgFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isImg]);

  return (
    <SafeAreaView
      className="flex-1 p-6 h-full"
      edges={["top", "bottom", "left", "right"]}
    >
      <View className="absolute top-12 flex-1 flex-row justify-between items-center w-full self-center">
        <BackBtn onPress={() => setStep(2)} />
        <CreditBtn />
      </View>
      <View className="flex-1 justify-center items-center h-full">
        {!isImg && (
          <Text
            className="text-center"
            style={{
              color: theme.text,
              fontFamily: "Urbanist-Bold",
              fontSize: 28,
            }}
          >
            Tap To Choose Reference Image
          </Text>
        )}
        {isImg && (
          <>
            <BrandText fontSize={28} text="Your Image Is Ready" />
            <Text
              className="text-lg font-semibold"
              style={{
                color: theme.textSecondary,
                opacity: 0.6,
                fontFamily: "Urbanist-Regular",
              }}
            >
              Tap to replace the image
            </Text>
          </>
        )}
        <Pressable onPress={pickImage} className="w-full mt-10">
          <BlurView
            intensity={90}
            tint={scheme}
            style={{
              borderColor: theme.border,
              aspectRatio: 1,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
            className="overflow-hidden rounded-3xl border"
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

            {isImg ? (
              <Animated.Image
                source={{ uri: selectedRefImg }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                  opacity: imgFade,
                  resizeMode: "cover",
                }}
              />
            ) : (
              <View className=" m-6 p-4 flex-1 rounded-3xl justify-center items-center gap-4">
                <MaskedView
                  style={{ width: 100, height: 100 }}
                  maskElement={
                    <Ionicons
                      name="cloud-upload-outline"
                      size={100}
                      color="black"
                    />
                  }
                >
                  <LinearGradient
                    colors={[theme.primary, theme.secondary, theme.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                  />
                </MaskedView>

                <Text
                  className="text-xl font-semibold text-center"
                  style={{
                    color: theme.secondary,
                    fontFamily: "Urbanist-Bold",
                  }}
                >
                  Upload Reference Image
                </Text>

                <Text
                  className="text-sm font-semibold text-center"
                  style={{
                    opacity: 0.7,
                    color: theme.textSecondary,
                    fontFamily: "Urbanist-Regular",
                  }}
                >
                  Optional · Helps generate more accurate results
                </Text>
              </View>
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
        </Pressable>
      </View>
      <Pressable
        onPress={() => onContinue?.(selectedRefImg)}
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

export default SelectRefrence;
