import { Colors } from "@/assets/Colors";
import BreathingBackground from "@/components/BreathingBackground";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useColorScheme } from "react-native";
import AdBtn from "./_components/AdBtn";
import Generate from "./_components/Generate";
import SelectRatio from "./_components/SelectRatio";
import SelectRefrence from "./_components/SelectRefrence";
import SelectStyle from "./_components/SelectStyle";

export default function ImageGenScreen() {
  const [step, setStep] = useState(1);
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  // Input
  const [ratio, setRatio] = useState("9:16");
  const [style, setStyle] = useState("cinematic");
  const [refImg, setRefImg] = useState(null);

  return (
    <BreathingBackground speed={7000} intensity={1.08}>
      {/* Step 1 – Select Ratio */}
      {step === 1 && (
        <SelectRatio
          onContinue={(selectedRatio) => {
            setRatio(selectedRatio);
            setStep(2);
          }}
        />
      )}
      {/* Step 2 – Select Style */}
      {step === 2 && (
        <SelectStyle
          setStep={setStep}
          onContinue={(style) => {
            setStyle(style);
            setStep(3);
          }}
        />
      )}
      {/* Step 3 – Select Ref Img */}
      {step === 3 && (
        <SelectRefrence
          setStep={setStep}
          onContinue={(refImg) => {
            setRefImg(refImg);
            setStep(4);
          }}
        />
      )}
      {/* Step 4 - Show Ad Btn */}
      {step === 4 && <AdBtn title="Image" setStep={setStep} />}

      {/* Step 5 – Generate */}
      {step === 5 && <Generate setStep={setStep} selectedRatio={ratio} />}
    </BreathingBackground>
  );
}
