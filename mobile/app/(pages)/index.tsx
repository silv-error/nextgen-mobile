import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const LandingPage = () => {
  const router = useRouter();

  return (
    <View>
      <Text>LandingPage</Text>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Text>Go to Profile Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;
