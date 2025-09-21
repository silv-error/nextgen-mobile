import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    // ✅ If everything is good → proceed
    Alert.alert("Success", "Account created successfully!");
    router.push("/(auth)"); // redirect to login after signup
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1 px-6 justify-center"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Title */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-primary">Create Account 🎉</Text>
          <Text className="text-gray-500 mt-2">Join us and get started</Text>
        </View>

        {/* Full Name */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
          secureTextEntry
        />

        {/* Confirm Password */}
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
          secureTextEntry
        />

        {/* Sign Up Button */}
        <TouchableOpacity className="bg-primary py-4 rounded-full mb-4" onPress={handleSignUp}>
          <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>
        </TouchableOpacity>

        {/* Redirect to Login */}
        <TouchableOpacity onPress={() => router.push("/(auth)")}>
          <Text className="text-center text-gray-600">
            Already have an account? <Text className="text-secondary font-semibold">Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
