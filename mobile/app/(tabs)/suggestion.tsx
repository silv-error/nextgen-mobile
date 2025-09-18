import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Navigation } from "lucide-react-native";

export default function TravelPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { country } = useLocalSearchParams();
  console.log("country", country);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80,
        }}
        className="bg-gray-50"
      >
        {/* Header Image */}
        <View className="w-full h-72">
          <Image
            source={{ uri: "https://picsum.photos/800/500" }}
            className="w-full h-full rounded-b-3xl"
            resizeMode="cover"
          />

          {/* Heart Button */}
          <TouchableOpacity className="absolute top-12 right-4 bg-white/80 rounded-full p-2">
            <Ionicons name="heart-outline" size={22} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Content Card */}
        <View className="flex-1 bg-white -mt-8 rounded-t-3xl p-5 shadow-lg">
          {/* Title + Reviews */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-3">
              <Text className="text-2xl font-bold text-[#111]">Urban Apartment</Text>
              <Text className="text-gray-500 mt-1">Toronto, Ontario</Text>
            </View>
            <View className="items-end">
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#facc15" />
                <Text className="ml-1 font-semibold">4.9</Text>
              </View>
              <Text className="text-gray-500 text-xs">120 reviews</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-gray-600 mt-3">
            This place is perfect for a big family. Here you will find all the facilities that an apartment should have.
            And there's also some special facility that others don’t.{" "}
            <Text className="text-[#3754ED] font-semibold">Read More</Text>
          </Text>

          {/* Facilities */}
          <View className="flex-row justify-between mt-6">
            <View className="items-center">
              <Ionicons name="bed-outline" size={22} color="#111" />
              <Text className="text-gray-600 text-sm mt-1">Bedroom</Text>
            </View>
            <View className="items-center">
              <Ionicons name="water-outline" size={22} color="#111" />
              <Text className="text-gray-600 text-sm mt-1">Bathroom</Text>
            </View>
            <View className="items-center">
              <Ionicons name="wifi-outline" size={22} color="#111" />
              <Text className="text-gray-600 text-sm mt-1">WiFi</Text>
            </View>
          </View>

          {/* Price + Button */}
          <View className="flex-row justify-between items-center mt-8">
            <Text className="text-lg font-bold text-[#111]">
              $16.78k{"\n"}
              <Text className="text-gray-500 text-sm">Per month with Tax</Text>
            </Text>
            <TouchableOpacity
              className="flex-row gap-2 bg-blue-600 px-6 py-3 rounded-full"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/map",
                  params: {
                    latitude: 35.6895,
                    longitude: 139.6917,
                    title: "New York City",
                    description: "The Big Apple",
                  },
                })
              }
            >
              <Navigation size={20} color={"white"} />
              <Text className="text-white font-semibold text-base">Directions</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-6">
            {/* Card 1 */}
            <View className="w-56 mr-4 bg-white rounded-2xl shadow-md">
              <View className="relative">
                <Image source={{ uri: "https://picsum.photos/500/250" }} className="w-full h-36 rounded-t-2xl" />
                <TouchableOpacity className="absolute top-2 right-2 bg-white/80 rounded-full p-2">
                  <Ionicons name="heart-outline" size={18} color="#111" />
                </TouchableOpacity>
              </View>
              <View className="p-3">
                <Text className="font-semibold text-[#111]">Iconic Brazil</Text>
                <Text className="text-gray-500 text-sm mt-1">8 days • from $659/person</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={14} color="#facc15" />
                  <Text className="ml-1 text-sm font-semibold">4.8</Text>
                  <Text className="ml-2 text-gray-500 text-xs">56 reviews</Text>
                </View>
              </View>
            </View>

            {/* Card 2 */}
            <View className="w-56 mr-4 bg-white rounded-2xl shadow-md">
              <View className="relative">
                <Image source={{ uri: "https://picsum.photos/500/251" }} className="w-full h-36 rounded-t-2xl" />
                <TouchableOpacity className="absolute top-2 right-2 bg-white/80 rounded-full p-2">
                  <Ionicons name="heart-outline" size={18} color="#111" />
                </TouchableOpacity>
              </View>
              <View className="p-3">
                <Text className="font-semibold text-[#111]">Beach Escape</Text>
                <Text className="text-gray-500 text-sm mt-1">6 days • from $499/person</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={14} color="#facc15" />
                  <Text className="ml-1 text-sm font-semibold">4.6</Text>
                  <Text className="ml-2 text-gray-500 text-xs">48 reviews</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
