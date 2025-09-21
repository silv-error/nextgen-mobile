import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const tripTypes = ["Adventure", "Relaxation", "Cultural", "Nature", "Family", "Luxury"];

const climates = ["Tropical", "Cold", "Moderate", "No preference"];

export default function StageOne() {
  const router = useRouter();
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);
  const [selectedClimate, setSelectedClimate] = useState("");

  const toggleTrip = (trip: string) => {
    setSelectedTrips((prev) => (prev.includes(trip) ? prev.filter((t) => t !== trip) : [...prev, trip]));
  };

  const handleContinue = () => {
    if (selectedTrips.length === 0 || !selectedClimate) {
      Alert.alert("Incomplete", "Please pick at least one trip type and a climate.");
      return;
    }
    router.push("/(boarding)/stageTwo");
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
          <Text className="text-gray-500 text-center mt-2 text-base">Stage 1 of 2</Text>

          {/* Progress Bar */}
          <View className="h-2 bg-gray-200 rounded-full mt-6">
            <View className="h-2 bg-primary rounded-full w-1/2" />
          </View>
        </View>

        {/* Trip Type */}
        <View className="mb-10">
          <Text className="text-lg font-semibold mb-3 text-gray-900">What type of trip are you planning?</Text>
          <View className="flex flex-row flex-wrap justify-between">
            {tripTypes.map((item) => (
              <TouchableOpacity
                key={item}
                className={`w-[30%] p-3 mb-4 rounded-xl border items-center justify-center ${
                  selectedTrips.includes(item) ? "bg-primary border-primary" : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => toggleTrip(item)}
                activeOpacity={0.8}
              >
                <Text
                  className={`font-medium text-center ${selectedTrips.includes(item) ? "text-white" : "text-gray-700"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Climate */}
        <View className="mb-10">
          <Text className="text-lg font-semibold mb-3 text-gray-900">Preferred climate?</Text>
          <View className="flex flex-row flex-wrap justify-between">
            {climates.map((item) => (
              <TouchableOpacity
                key={item}
                className={`w-[47%] p-3 mb-4 rounded-xl border items-center justify-center ${
                  selectedClimate === item ? "bg-primary border-primary" : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => setSelectedClimate(item)}
                activeOpacity={0.8}
              >
                <Text
                  className={`font-medium text-center ${selectedClimate === item ? "text-white" : "text-gray-700"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-primary py-4 rounded-2xl shadow-md mt-4"
          onPress={handleContinue}
          activeOpacity={0.9}
        >
          <Text className="text-center text-white font-semibold text-lg">Continue →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
