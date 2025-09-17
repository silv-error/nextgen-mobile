import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TravelPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View className="relative w-full h-60">
          <Image source={{ uri: "https://picsum.photos/800/500" }} className="w-full h-full" />
          {/* Back Button */}
          <TouchableOpacity className="absolute top-12 left-4 bg-white/80 rounded-full p-2">
            <Ionicons name="arrow-back" size={22} color="#111" />
          </TouchableOpacity>
          {/* Heart Button */}
          <TouchableOpacity className="absolute top-12 right-4 bg-white/80 rounded-full p-2">
            <Ionicons name="heart-outline" size={22} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-5 mt-4">
          {/* Title + Reviews */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-3">
              <Text className="text-2xl font-bold text-[#111]">Rio de Janeiro</Text>
              <View className="flex-row items-center mt-1">
                <View className="w-2 h-2 rounded-full bg-green-600 mr-2" />
                <Text className="text-gray-500">Brazil</Text>
              </View>
            </View>
            <View className="items-end">
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#facc15" />
                <Text className="ml-1 font-semibold">5.0</Text>
              </View>
              <Text className="text-gray-500 text-xs">143 reviews</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-gray-600 mt-3">
            Rio de Janeiro, often simply called Rio, is one of Brazil’s most iconic cities, renowned for its beaches,
            Carnival, and breathtaking scenery.
          </Text>
          <Text className="mt-1 text-[#3754ED] font-semibold">Read more</Text>

          {/* Upcoming Tours */}
          <View className="flex-row justify-between items-center mt-6">
            <Text className="text-lg font-bold text-[#111]">Upcoming tours</Text>
            <TouchableOpacity>
              <Text className="text-[#3754ED] font-semibold">See all</Text>
            </TouchableOpacity>
          </View>

          {/* Tour Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            {/* Card 1 */}
            <View className="w-56 mr-4 bg-white rounded-2xl shadow-md">
              <View className="relative">
                <Image source={{ uri: "https://picsum.photos/400/250" }} className="w-full h-36 rounded-t-2xl" />
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
                <Image source={{ uri: "https://picsum.photos/400/251" }} className="w-full h-36 rounded-t-2xl" />
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
