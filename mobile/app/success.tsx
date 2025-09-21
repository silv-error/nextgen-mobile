import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
    const timer = setTimeout(() => {
      router.push("/(boarding)/stageThree");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      {/* {/* Title /} */}
      <Text className="text-2xl font-bold text-center mb-4">Way to go!</Text>

      {/* {/ Animation /} */}
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/success.json")}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
      />

      {/* {/ Subtitle /} */}
      <Text className="text-gray-600 text-center mt-4">
        We've successfully chosen a location based on your preference.
      </Text>
    </View>
  );
}
