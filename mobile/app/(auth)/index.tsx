import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)/signup");
        }}
      >
        <Text>Click to go to SignUp</Text>
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

export default index;
