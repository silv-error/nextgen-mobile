import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const visitedPlaces = [
    {
      name: "Lisbon City Tour",
      location: "Lisbon, Portugal",
      image: "https://picsum.photos/id/1015/300/200",
      date: "Aug 2025",
    },
    {
      name: "Tokyo Food Market",
      location: "Shinjuku, Tokyo",
      image: "https://picsum.photos/id/1043/300/200",
      date: "Jun 2025",
    },
    {
      name: "Santorini Sunset",
      location: "Oia, Greece",
      image: "https://picsum.photos/id/1067/300/200",
      date: "Mar 2025",
    },
  ];

  return (
    <View className="flex-1 relative" style={{ paddingBottom: insets.bottom + 40 }}>
      <ScrollView
        className="flex-1 bg-[#F7FDFF] m-4 pt-10 rounded-3xl"
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mt-10">
          <View className="w-28 h-28 rounded-full items-center justify-center border-4 border-secondary shadow-md">
            <Image source={{ uri: "https://avatar.iran.liara.run/public/45" }} className="w-24 h-24 rounded-full" />
          </View>

          <Text className="text-xl font-semibold mt-4 text-[#131B62]">Lillie Brown</Text>
          <Text className="text-[#3754ED] text-sm font-medium mt-1">🏆 Ambassador</Text>

          <View className="flex-row justify-center items-center gap-8 mt-6 w-3/4">
            <View className="items-center border-r border-gray-300 pr-4">
              <Text className="text-lg font-bold text-[#080E29]">{visitedPlaces?.length}</Text>
              <Text className="text-gray-500 text-sm">Discoveries</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-[#080E29]">627</Text>
              <Text className="text-gray-500 text-sm">Likes</Text>
            </View>
          </View>
        </View>

        {/* History Cards */}
        <View className="mt-10 mx-4 mb-20">
          <Text className="text-lg font-semibold text-[#131B62] mb-4">Visited Places</Text>
          {visitedPlaces.map((place, idx) => (
            <View
              key={idx}
              className="rounded-3xl mb-6 overflow-hidden"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              {/* Image with overlay */}
              <View className="relative">
                <Image source={{ uri: place.image }} className="w-full h-56" />

                {/* Gradient for text readability */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                  }}
                />

                {/* Content on top of gradient */}
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-lg font-semibold text-white">{place.name}</Text>
                  <Text className="text-gray-200 text-sm">{place.location}</Text>

                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-gray-300 text-xs">{place.date}</Text>

                    {/* iOS style button */}
                    <TouchableOpacity
                      className="bg-white/30 px-4 py-2 rounded-full"
                      style={{
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 1 },
                        shadowRadius: 2,
                      }}
                    >
                      <Text className="text-slate-100 text-sm font-semibold">View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fade overlay */}
      <LinearGradient
        colors={["transparent", "#F7FDFF"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 16,
          right: 16,
          height: 60,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      />
    </View>
  );
}
