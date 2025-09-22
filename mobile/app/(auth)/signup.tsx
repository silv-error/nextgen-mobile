import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { registerUser } from "../services/auth/useRegister";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"business" | "traveler" | "">("");

  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert("⚠️ Error", "Passwords do not match");
        return;
      }

      const payload: any = { username, email, password, userType, confirmPassword, fullName };

      if (userType === "business") {
        payload.businessData = { businessName, businessAddress };
      } else if (userType === "traveler") {
        payload.travelerData = { fullName };
      }

      await registerUser(payload);
      Alert.alert("✅ Success", "Registration complete! Please check your email to confirm.");
      router.replace("/(auth)");
    } catch (error: any) {
      Alert.alert("⚠️ Error", error.message || "Registration failed");
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <ScrollView className="flex-1 bg-gray-50" style={{ paddingTop: insets.top + 10 }}>
      <View className="flex-1 justify-center p-6">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</Text>

        <View className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          {/* Username */}
          <Text className="text-gray-600 mb-1">Username</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Full Name (always visible now) */}
          {userType === "traveler" && (
            <>
              <Text className="text-gray-600 mb-1">Full Name</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
            </>
          )}

          {/* Email */}
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text className="text-gray-600 mb-1">Password</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Confirm Password */}
          <Text className="text-gray-600 mb-1">Confirm Password</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* User type */}
          <Text className="text-gray-600 mb-3">Account Type</Text>
          <View className="flex-row mb-4">
            <TouchableOpacity
              className={`flex-1 p-4 rounded-xl mr-2 ${userType === "business" ? "bg-blue-500" : "bg-gray-100"}`}
              onPress={() => setUserType("business")}
            >
              <Text className={`text-center font-medium ${userType === "business" ? "text-white" : "text-gray-700"}`}>
                Business
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-4 rounded-xl ${userType === "traveler" ? "bg-blue-500" : "bg-gray-100"}`}
              onPress={() => setUserType("traveler")}
            >
              <Text className={`text-center font-medium ${userType === "traveler" ? "text-white" : "text-gray-700"}`}>
                Traveler
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional fields */}
          {userType === "business" && (
            <>
              <Text className="text-gray-600 mb-1">Business Name</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
                placeholder="Enter your business name"
                value={businessName}
                onChangeText={setBusinessName}
              />
              <Text className="text-gray-600 mb-1">Business Address</Text>
              <TextInput
                className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
                placeholder="Enter your business address"
                value={businessAddress}
                onChangeText={setBusinessAddress}
              />
            </>
          )}
        </View>

        <TouchableOpacity className="bg-blue-500 p-5 rounded-2xl shadow-sm mb-4" onPress={handleRegister}>
          <Text className="text-center text-white font-semibold text-lg">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(auth)")}>
          <Text className="text-center text-blue-500 font-medium">Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
