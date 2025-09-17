import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const signup = () => {
  const router = useRouter();
  return (
    <View>
      <Text>signup</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)");
        }}
      >
        <Text>Click to go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/(landing)");
        }}
      >
        <Text>Click to go to Landing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default signup;
