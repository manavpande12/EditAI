import { Dimensions } from "react-native";

export const ratios = {
  "1:1": "SQUARE",
  "3:2": "CLASSIC",
  "4:3": "STANDARD",
  "9:16": "POTRAIT",
  "16:9": "CINEMATIC",
  "21:9": "ULTRA WIDE",
};

export const GetAspectRatio = (ratio) => {
  const [w, h] = ratio?.split(":").map(Number);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const maxWidth = screenWidth * 0.9;

  let width = maxWidth;
  let height = width * (h / w);

  if (ratio === "9:16") {
    const maxPortraitHeight = screenHeight * 0.6; // 60% of screen height
    if (height > maxPortraitHeight) {
      height = maxPortraitHeight;
      width = height * (w / h);
    }
  }

  return {
    width,
    height,
    aspectRatio: w / h,
  };
};
