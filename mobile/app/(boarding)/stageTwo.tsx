import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import useStore from "../store/authStore";

const activities = ["Hiking", "Food Tours", "Museums", "Nightlife", "Beach", "Festivals"];

const companions = ["Solo", "Friends", "Family", "Partner"];

export default function StageTwo() {
  const router = useRouter();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedCompanion, setSelectedCompanion] = useState("");
  const { setAuthUser } = useStore() as { setAuthUser: any };

  const toggleActivity = (item: string) => {
    setSelectedActivities((prev) => (prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]));
  };

  const handleComplete = () => {
    if (selectedActivities.length === 0 || !selectedCompanion) {
      Alert.alert("Incomplete", "Please select at least one activity and one companion.");
      return;
    }
    setAuthUser(true);
    router.push("/success");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6 py-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-gray-900">Personalize Your Experience</Text>
          <Text className="text-gray-500 text-center mt-2 text-base">Stage 2 of 2</Text>

          {/* Progress Bar */}
          <View className="h-2 bg-gray-200 rounded-full mt-6">
            <View className="h-2 bg-primary rounded-full w-full" />
          </View>
        </View>

        {/* Activities */}
        <View className="mb-10">
          <Text className="text-lg font-semibold mb-3 text-gray-900">Activities you enjoy? (Select multiple)</Text>
          <View className="flex flex-row flex-wrap justify-between">
            {activities.map((item) => (
              <TouchableOpacity
                key={item}
                className={`w-[30%] p-3 mb-4 rounded-xl border items-center justify-center ${
                  selectedActivities.includes(item) ? "bg-primary border-primary" : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => toggleActivity(item)}
                activeOpacity={0.8}
              >
                <Text
                  className={`font-medium text-center ${
                    selectedActivities.includes(item) ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Companions */}
        <View className="mb-10">
          <Text className="text-lg font-semibold mb-3 text-gray-900">Preferred travel companions?</Text>
          <View className="flex flex-row flex-wrap justify-between">
            {companions.map((item) => (
              <TouchableOpacity
                key={item}
                className={`w-[47%] p-3 mb-4 rounded-xl border items-center justify-center ${
                  selectedCompanion === item ? "bg-primary border-primary" : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => setSelectedCompanion(item)}
                activeOpacity={0.8}
              >
                <Text
                  className={`font-medium text-center ${selectedCompanion === item ? "text-white" : "text-gray-700"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity
            className="bg-gray-200 py-3 px-6 rounded-xl w-[48%] items-center"
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text className="text-gray-700 font-semibold">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary py-3 px-6 rounded-xl w-[48%] items-center"
            onPress={handleComplete}
            activeOpacity={0.9}
          >
            <Text className="text-white font-semibold">Complete 🎉</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
