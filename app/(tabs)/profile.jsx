import { SignOutFromGoogle } from "@/actions/auth/google-auth";
import { Colors } from "@/assets/Colors";
import { BrandAvatar } from "@/components/BrandAvatar";
import BrandBtn from "@/components/BrandBtn";
import BrandText from "@/components/BrandText";

import BreathingBackground from "@/components/BreathingBackground";
import FullScreenPreview from "@/components/FullScreenPreview";
import { PostImage } from "@/constants/dummy";
import { useAuth } from "@/hooks/useAuth";
import { useFirestoreDoc } from "@/hooks/useFirestoreDoc";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useAuth();
  const {
    data: profile,
    loading,
    refetch,
  } = useFirestoreDoc("users", user?.uid);
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const [section, setSection] = useState("Image");
  const [data, setData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState({});

  // Stats
  const Stats = {
    Gen: 100,
    Follower: "11.6M",
    Following: 5,
  };

  // Post
  const postBtn = [
    {
      name: "Image",
      Icon: Feather,
      iconName: "image",
    },
    {
      name: "Video",
      Icon: Feather,
      iconName: "video",
    },
    {
      name: "Audio",
      Icon: MaterialIcons,
      iconName: "multitrack-audio",
    },
  ];

  // Refresh logic
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.log("Error refreshing:", err);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const counts = {
    Gen: 100,
    Followers: "11M",
    Following: 5,
  };

  useEffect(() => {
    if (section === "Image") {
      setData(PostImage);
    } else {
      setData([]);
    }
  }, [section]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-gray-300 text-lg">No profile found</Text>
      </View>
    );
  }

  return (
    <BreathingBackground>
      <SafeAreaProvider>
        <SafeAreaView
          className="flex-1 p-6"
          edges={["top", "bottom", "left", "right"]}
        >
          <View className="absolute top-12 flex-1 flex-row justify-between items-center w-full self-center">
            <BrandText align="left" fontSize={36} text="Edit's AI" />
            <BrandBtn
              element={<FontAwesome name="bars" size={28} color="black" />}
            />
          </View>
          <ScrollView
            className="mt-28"
            alwaysBounceVertical={true}
            overScrollMode="always"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={scheme === "dark" ? "#fff" : "#000"}
                colors={[scheme === "dark" ? "#fff" : "#000"]}
              />
            }
          >
            {/* Header Section */}
            <View className="flex flex-row h-[120px] gap-2">
              <View className="flex flex-[1] h-full justify-center items-center">
                <BrandAvatar
                  uri={
                    profile?.photoURL
                      ? profile.photoURL
                      : "https://via.placeholder.com/150"
                  }
                />
              </View>
              <View className="flex-[2] flex-col h-full">
                <Text
                  style={{
                    fontSize: 21,
                    color: theme.text,
                    fontFamily: "Urbanist-Bold",
                  }}
                >
                  {profile.name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: theme.textSecondary,
                    fontFamily: "Urbanist-Regular",
                  }}
                >
                  {profile.email}
                </Text>

                <View className="flex-1 flex-row justify-between items-center gap-2 ">
                  {Object.entries(Stats).map(([key, value], i) => (
                    <View key={i}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: theme.text,
                          fontFamily: "Urbanist-Medium",
                        }}
                      >
                        {key}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: theme.textSecondary,
                          fontFamily: "Urbanist-Bold",
                        }}
                        className="text-center"
                      >
                        {value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {/* Buttons Section */}
            <View className="flex grow justify-between flex-col items-center mt-6 w-full gap-3">
              <Pressable
                style={{
                  backgroundColor: theme.card + "80",
                  borderColor: theme.border,
                }}
                className="grow py-3 w-full rounded-3xl h-12 border"
              >
                <Text
                  style={{ fontFamily: "Urbanist-Bold", color: theme.text }}
                  className="text-center text-sm"
                >
                  Edit Profile
                </Text>
              </Pressable>

              <View className="flex flex-row justify-between items-center w-full grow gap-3">
                <Pressable
                  style={{
                    backgroundColor: theme.secondary + "1A",
                    borderColor: theme.border,
                  }}
                  className="flex-1 flex-row justify-center items-center gap-2 py-3 rounded-3xl h-14 border"
                >
                  <FontAwesome6
                    name="wallet"
                    size={21}
                    color={theme.secondary}
                  />
                  <Text
                    style={{ fontFamily: "Urbanist-Bold", color: theme.text }}
                    className="text-center text-sm"
                  >
                    Wallet
                  </Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: theme.secondary + "1A",
                    borderColor: theme.border,
                  }}
                  className="flex-1 flex-row justify-center items-center gap-2 py-3 rounded-3xl h-14 border"
                >
                  <FontAwesome6
                    name="rocket"
                    size={21}
                    color={theme.secondary}
                  />
                  <Text
                    style={{ fontFamily: "Urbanist-Bold", color: theme.text }}
                    className="text-center text-sm"
                  >
                    Upgrade
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Post Section */}
            <View className="mt-10">
              <View className="flex-1 flex-row justify-center items-center">
                <View
                  style={{ borderColor: theme.border }}
                  className="border flex-1"
                />
                <BrandText text="Your Collections" fontSize={21} />
                <View
                  style={{ borderColor: theme.border }}
                  className="border flex-1"
                />
              </View>
              <View className="flex-1 flex-row gap-2 justify-between items-center mt-6">
                {postBtn.map((item) => (
                  <Pressable
                    key={item.name}
                    onPress={() => setSection(item.name)}
                    style={{
                      borderColor:
                        section === item.name ? theme.secondary : theme.border,
                    }}
                    className="flex-1 flex-row justify-center items-center gap-2 border-b-2"
                  >
                    <item.Icon
                      name={item.iconName}
                      size={21}
                      color={
                        section === item.name
                          ? theme.secondary
                          : theme.textSecondary
                      }
                    />

                    {section === item.name && (
                      <Text
                        style={{
                          color:
                            section === item.name
                              ? theme.secondary
                              : theme.text,
                          fontFamily:
                            section === item.name
                              ? "Urbanist-Bold"
                              : "Urbanist-Regular",
                        }}
                      >
                        {item.name}
                      </Text>
                    )}
                  </Pressable>
                ))}
              </View>

              {/* Grid */}
              <View className="flex-row flex-wrap justify-between mt-6">
                {!data.length == 0 ? (
                  data.map((item, i) => (
                    <Pressable
                      key={i}
                      onPress={() => {
                        setPreviewData(data.find((f) => f.id === item.id));
                        setPreviewVisible(true);
                      }}
                      className="w-[32%] mb-3 rounded-3xl overflow-hidden relative"
                      style={{
                        backgroundColor: theme.card + "80",
                        borderColor: theme.border,
                        borderWidth: 1,
                      }}
                    >
                      {/* Square Image Box */}
                      <View className="w-full aspect-[3/4]">
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </View>
                    </Pressable>
                  ))
                ) : (
                  <View
                    style={{ height: 240 }}
                    className="flex-1 justify-center items-center"
                  >
                    <BlurView
                      intensity={94}
                      tint={scheme}
                      style={{ borderColor: theme.border }}
                      className="my-4 overflow-hidden p-6 rounded-full border"
                    >
                      <MaskedView
                        style={{ width: 94, height: 94 }}
                        maskElement={
                          <FontAwesome6 name="trophy" size={84} color="black" />
                        }
                      >
                        <LinearGradient
                          colors={[
                            theme.primary,
                            theme.secondary,
                            theme.accent,
                          ]}
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
                    <Text
                      className="text-lg text-center"
                      style={{
                        color: theme.text,
                        fontFamily: "Urbanist-Medium",
                      }}
                    >
                      Generate More To Make It
                    </Text>
                    <BrandText fontSize={18} text="Top Of Week!" />
                  </View>
                )}
              </View>
              <Pressable
                onPress={() => SignOutFromGoogle()}
                className="bg-red-500 py-3 mt-5 rounded-2xl items-center shadow"
              >
                <Text className="text-white text-lg font-semibold">
                  Log Out
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          {previewVisible && (
            <FullScreenPreview
              visible={previewVisible}
              data={previewData}
              onClose={setPreviewVisible}
              section={section}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </BreathingBackground>
  );
}
