import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "../services/auth/useLogin"; // 👈 our new function
import useStore from "../store/authStore";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Move this to the top level
  const { setAuthUser, setUserType } = useStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password");
      return;
    }

    try {
      setLoading(true);
      const { user, session, profile } = await loginUser(email, password, setAuthUser);
      console.log("✅ Logged in:", { user, session, profile });
      console.log("✅ user type", typeof profile?.user_type);
      if (profile?.user_type === "business") {
        setUserType("business");
        return router.push("/(business)");
      }
      setUserType("traveler");
      router.push("/(boarding)");
    } catch (err: any) {
      Alert.alert("Login failed", err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1 px-6 justify-center"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="mb-10">
          <Text className="text-5xl font-bold text-primary">Welcome</Text>
          <Text className="text-gray-500 mt-2">Login to continue</Text>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
          secureTextEntry
        />

        <TouchableOpacity className="bg-primary py-4 rounded-full mb-4" onPress={handleLogin} disabled={loading}>
          <Text className="text-white text-center font-semibold text-lg">{loading ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
          <Text className="text-center">
            Don't have an acocunt?
            <Text className="text-primary"> Create one</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
