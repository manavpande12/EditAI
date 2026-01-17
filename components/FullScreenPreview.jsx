import { Colors } from "@/assets/Colors";
import { GetAspectRatio } from "@/constants/ratios";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { Modal, useColorScheme, View } from "react-native";
import BrandBtn from "./BrandBtn";

const FullScreenPreview = ({ visible, data, onClose, section }) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  if (!visible || !data || data.length === 0) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
        }}
      >
        {/* Close button */}
        <View className="absolute top-10 right-6 z-50">
          <BrandBtn
            element={<FontAwesome6 name="xmark" size={32} color="#fff" />}
            onTap={() => onClose(false)}
          />
        </View>

        {/* Full screen image */}
        {section === "Image" && (
          <View
            className="rounded-3xl overflow-hidden"
            style={{
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Image
              source={{ uri: data.image }}
              style={[
                GetAspectRatio(data.ratio),
                {
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 20,
                },
              ]}
              contentFit="contain"
            />
          </View>
        )}

        {/* Btn */}
        <View className="absolute w-full p-6 h-[54px] bottom-16 justify-between items-center flex-row">
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
            text="12.1K"
            element={<FontAwesome name="heart" size={28} color="black" />}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FullScreenPreview;
