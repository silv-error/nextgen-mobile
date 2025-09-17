import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MasonryList from "@react-native-seoul/masonry-list";
import { useRouter } from "expo-router";

export default function BusinessOwnerPage() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#F7FDFF]">
      <ScrollView className="flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-4 z-20 rounded-full p-2 bg-white/70"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
          }}
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        {/* Cover Image */}
        <View className="w-full h-44">
          <Image source={{ uri: "https://picsum.photos/800/300" }} className="w-full h-full" />
        </View>

        {/* Profile Info */}
        <View className="px-4 -mt-12">
          {/* Avatar */}
          <View className="border-4 border-white rounded-full w-20 h-20 overflow-hidden shadow-md">
            <Image source={{ uri: "https://picsum.photos/200" }} className="w-20 h-20" />
          </View>

          {/* Name + Buttons */}
          <View className="flex-row justify-between items-center mt-3">
            <View>
              <Text className="text-xl font-bold text-[#131B62]">Skye Silva</Text>
              <Text className="text-[#3754ED]">@shotbyskye</Text>
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity className="bg-[#3754ED] px-4 py-2 rounded-full mr-2">
                <Text className="text-white font-semibold">Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#EAF0FF] p-2 rounded-full">
                <Ionicons name="mail-outline" size={20} color="#3754ED" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row mt-4">
            <Text className="mr-6 text-[#080E29]">
              <Text className="font-bold">204 </Text>Following
            </Text>
            <Text className="text-[#080E29]">
              <Text className="font-bold">1.2M </Text>Followers
            </Text>
          </View>

          {/* Bio */}
          <Text className="mt-3 text-gray-600">
            Hi I’m Skye! 📍 Lisbon, Portugal based 📍 Travel + drone videographer ✈️ Follow my adventures!
          </Text>
        </View>

        {/* Photos Grid */}
        <MasonryList
          style={{ marginTop: 24 }}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          data={[
            { uri: "https://picsum.photos/id/1015/400/600" },
            { uri: "https://picsum.photos/id/1022/400/300" },
            { uri: "https://picsum.photos/id/1036/400/500" },
            { uri: "https://picsum.photos/id/1041/400/350" },
            { uri: "https://picsum.photos/id/1050/400/450" },
            { uri: "https://picsum.photos/id/1062/400/250" },
          ]}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item?.uri }}
              style={{
                flex: 1,
                marginHorizontal: 4,
                borderRadius: 4,
                marginBottom: 8,
                resizeMode: "cover",
                height: Math.floor(Math.random() * 120) + 180,
              }}
            />
          )}
        />

        {/* Visit Site Button */}
        <TouchableOpacity className="flex-row items-center bg-[#3754ED]/10 px-4 py-3 rounded-xl mx-4 mt-6 mb-12">
          <Ionicons name="open-outline" size={18} color="#3754ED" />
          <Text className="ml-2 font-semibold text-[#3754ED]">Visit site</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
