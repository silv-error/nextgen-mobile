import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.push("/(pages)/business/123")}>
        <Text>Go to Business</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(pages)/mappy")}>
        <Text>Go to Mappy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LandingPage;
