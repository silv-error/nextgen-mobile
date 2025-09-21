import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1 px-6 justify-center"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Title */}
        <View className="mb-10">
          <Text className="text-5xl font-bold text-primary">Welcome</Text>
          <Text className="text-gray-500 mt-2">Login to continue</Text>
        </View>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity
          className="bg-primary py-4 rounded-full mb-4"
          onPress={() => {
            // here you can add your real login check later
            if (email && password) {
              // after successful login → go to onboarding stage 1
              router.push("/(boarding)");
            } else {
              alert("Please enter your email and password");
            }
          }}
        >
          <Text className="text-white text-center font-semibold text-lg">Login</Text>
        </TouchableOpacity>

        {/* Sign Up Redirect */}
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text className="text-center text-gray-600">
            Don’t have an account? <Text className="text-secondary font-semibold">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
