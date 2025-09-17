import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Landing Page</Text>
    </SafeAreaView>
  );
};

export default LandingPage;
