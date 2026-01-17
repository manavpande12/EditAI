import React, { useEffect, useRef } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 3 - 20; // 3 cards visible per screen

const videos = [
  { id: "1", thumbnail: "https://placehold.co/300x400?text=Video+1" },
  { id: "2", thumbnail: "https://placehold.co/300x400?text=Video+2" },
  { id: "3", thumbnail: "https://placehold.co/300x400?text=Video+3" },
  { id: "4", thumbnail: "https://placehold.co/300x400?text=Video+4" },
  { id: "5", thumbnail: "https://placehold.co/300x400?text=Video+5" },
  { id: "6", thumbnail: "https://placehold.co/300x400?text=Video+6" },
  { id: "7", thumbnail: "https://placehold.co/300x400?text=Video+7" },
  { id: "8", thumbnail: "https://placehold.co/300x400?text=Video+8" },
  { id: "9", thumbnail: "https://placehold.co/300x400?text=Video+9" },
];

export default function VideoCarousel() {
  const flatListRef = useRef(null);

  useEffect(() => {
    let offset = 0;
    const totalWidth = (CARD_WIDTH + 16) * videos.length;

    const interval = setInterval(() => {
      offset += 1; // controls scroll speed
      if (offset > totalWidth) offset = 0;

      flatListRef.current?.scrollToOffset({
        offset,
        animated: false,
      });
    }, 16); // ~60 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ height: 190 }}>
      <FlatList
        ref={flatListRef}
        data={videos.concat(videos)}
        keyExtractor={(item, index) => item.id + "-" + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View
            className="rounded-2xl bg-gray-800 mr-4 overflow-hidden"
            style={{ width: CARD_WIDTH, height: 180 }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
            <View className="absolute bottom-2 left-2">
              <Text className="text-white text-xs font-semibold">
                Video {item.id}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
