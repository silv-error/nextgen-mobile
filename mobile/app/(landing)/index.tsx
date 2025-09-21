import React from "react";
import { StatusBar, View, Text, TouchableOpacity, ImageBackground } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black" edges={[]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/nature.jpg")}
        className="flex-1"
        imageStyle={{ resizeMode: "cover" }}
      >
        {/* Gradient Overlay for readability */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 24, paddingBottom: 50 }}
        >
          {/* App Title in center */}
          <View className="flex-1 justify-center items-center">
            <Text
              className="text-center text-6xl font-bold text-white opacity-90"
              style={{ letterSpacing: 2, fontFamily: "Anton_400Regular", fontSize: 75 }}
            >
              Moodi
            </Text>
          </View>

          {/* Content + Buttons */}
          <View className="items-center px-8">
            {/* Title */}
            <Text className="text-white text-2xl font-semibold text-center mb-3 leading-snug">
              Find The Best Place For Rent
            </Text>

            {/* Subtitle */}
            <Text className="text-gray-300 text-center mb-8 leading-relaxed max-w-[280px]">
              Discover your dream home with comfort {"\n"}
              and convenience at the best prices.
            </Text>

            {/* Primary Button (Sign Up) */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-primary py-4 rounded-full w-full mb-4"
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text className="text-white font-semibold text-lg text-center">Sign Up</Text>
            </TouchableOpacity>

            {/* Secondary Button (Login) */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="border border-primary py-4 rounded-full w-full"
              onPress={() => router.push("/(auth)")}
            >
              <Text className="text-white font-semibold text-lg text-center">Login</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
