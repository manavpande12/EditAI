import { Colors } from "@/assets/Colors";
import BrandText from "@/components/BrandText";
import CreditBtn from "@/components/CreditBtn";
import { RewardedAds } from "@/lib/AdManager";
import { Entypo } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as Network from "expo-network";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "./BackBtn";

function AdBtn({ title, setStep }) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const showAds = true;
  return (
    <SafeAreaView
      className="flex-1 p-6 h-full"
      edges={["top", "bottom", "left", "right"]}
    >
      <View className="absolute top-12 flex-1 flex-row justify-between items-center w-full self-center">
        <BackBtn onPress={() => setStep(3)} />
        <CreditBtn />
      </View>
      <View className="flex-1 justify-center items-center h-full">
        <BrandText fontSize={38} text="Create Anything" />
        <BrandText fontSize={38} text="Instantly" />

        {showAds && (
          <Text
            className="text-center text-lg"
            style={{
              color: theme.textSecondary,
              fontFamily: "Urbanist-Regular",
            }}
          >
            Skip the headache, no annoying ads, {"\n"}no delays.
          </Text>
        )}
        <BlurView
          intensity={94}
          tint={scheme}
          style={{ borderColor: theme.border }}
          className="my-10 overflow-hidden p-6 rounded-full border"
        >
          <MaskedView
            style={{ width: 94, height: 94 }}
            maskElement={<Entypo name="flash" size={94} color="black" />}
          >
            <LinearGradient
              colors={[theme.primary, theme.secondary, theme.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
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
        <Pressable
          onPress={async () => {
            const net = await Network.getNetworkStateAsync();

            if (!net.isConnected || !net.isInternetReachable) {
              Alert.alert("No Internet", "Turn on internet to watch ad.");
              return;
            }
            try {
              const reward = await RewardedAds.show();
              setStep(5);
            } catch (err) {
              console.log("Ad cancelled or failed:", err);
            }
          }}
          disabled={!RewardedAds.isLoaded() || RewardedAds.isShowing()}
          className="w-full h-[54px] rounded-full overflow-hidden self-center  justify-center items-center"
        >
          <LinearGradient
            className="w-full h-full justify-center items-center"
            colors={[theme.primary, theme.secondary, theme.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {!RewardedAds.isLoaded() || RewardedAds.isShowing() ? (
              <ActivityIndicator size="large" color={theme.accent} />
            ) : (
              <>
                <Text
                  style={{ fontFamily: "Urbanist-Bold" }}
                  className="text-lg text-white"
                >
                  Generate {title}
                </Text>
                {showAds && (
                  <Text
                    style={{
                      fontFamily: "Urbanist-Regular",
                    }}
                    className="text-sm text-white"
                  >
                    (Watch Ad)
                  </Text>
                )}
              </>
            )}
          </LinearGradient>
        </Pressable>
        {showAds && (
          <Pressable
            onPress={() => setStep(5)}
            style={{ backgroundColor: theme.secondary }}
            className="w-full h-[54px] rounded-full overflow-hidden self-center mt-2 justify-center items-center"
          >
            <Text
              style={{ fontFamily: "Urbanist-Bold" }}
              className="text-lg text-white"
            >
              Go Plus
            </Text>
            <Text
              style={{
                fontFamily: "Urbanist-Regular",
              }}
              className="text-sm text-white"
            >
              (No Ads, Faster Results)
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

export default AdBtn;
