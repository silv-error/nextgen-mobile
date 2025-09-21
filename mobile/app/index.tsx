import { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start fully visible

  useEffect(() => {
    // Start fade-out after 1.5s
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    const timer = setTimeout(() => {
      fadeOut.start(() => {
        // After fade completes, navigate
        router.push("/(landing)");
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "#00a8ff", // blue background
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeAnim,
      }}
    >
      <Text className="text-white text-6xl font-bold">Moodi</Text>
      <Text className="text-white mt-3 text-lg">Your mood, your way</Text>
    </Animated.View>
  );
}
