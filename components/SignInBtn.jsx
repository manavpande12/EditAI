import { SignInWithGoogle } from "@/actions/auth/google-auth";
import { Image, Text, TouchableOpacity } from "react-native";
import apple from "../assets/images/apple.png";
import google from "../assets/images/google.png";

const SignInBtn = () => {
  return (
    <>
      <TouchableOpacity
        onPress={() => SignInWithGoogle()}
        className="flex-row gap-2 bg-white px-8 py-4 border rounded-full shadow-lg active:scale-95 w-4/5 items-center"
      >
        <Image source={google} style={{ width: 24, height: 24 }} />
        <Text
          style={{ fontFamily: "Urbanist-Bold" }}
          className="text-black text-center text-xl"
        >
          Continue With Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/auth")}
        className="flex-row gap-2 bg-black px-8 py-4 border border-gray-200 rounded-full shadow-lg active:scale-95 w-4/5 items-center"
      >
        <Image source={apple} style={{ width: 24, height: 24 }} />
        <Text
          style={{ fontFamily: "Urbanist-Bold" }}
          className="text-white text-center text-xl"
        >
          Continue With Apple
        </Text>
      </TouchableOpacity>
      <Text
        style={{ fontFamily: "Urbanist-Regular" }}
        className="text-blue-100 font-semibold text-center text-sm leading-relaxed"
      >
        By continuing, you agree to Edits AI{" "}
        <Text className="text-blue-500">Terms of Service</Text> and{" "}
        <Text className="text-blue-500">Privacy Policy</Text>.
      </Text>
    </>
  );
};

export default SignInBtn;
