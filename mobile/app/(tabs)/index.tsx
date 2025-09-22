import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const trips = useMemo(
    () => [
      {
        image: "https://picsum.photos/500/700",
        country: "Japan",
        city: "Tokyo",
        rating: "4.8",
        reviews: "120",
      },
      {
        image: "https://picsum.photos/500/701",
        country: "Italy",
        city: "Rome",
        rating: "4.7",
        reviews: "89",
      },
      {
        image: "https://picsum.photos/500/702",
        country: "USA",
        city: "New York",
        rating: "4.9",
        reviews: "200",
      },
      {
        image: "https://picsum.photos/500/703",
        country: "France",
        city: "Paris",
        rating: "4.6",
        reviews: "150",
      },

      {
        image: "https://picsum.photos/500/704",
        country: "USA",
        city: "New York",
        rating: "4.9",
        reviews: "200",
      },
      {
        image: "https://picsum.photos/500/705",
        country: "France",
        city: "Paris",
        rating: "4.6",
        reviews: "150",
      },
      {
        image: "https://picsum.photos/500/706",
        country: "USA",
        city: "New York",
        rating: "4.9",
        reviews: "200",
      },
      {
        image: "https://picsum.photos/500/707",
        country: "France",
        city: "Paris",
        rating: "4.6",
        reviews: "150",
      },
    ],
    []
  );

  const router = useRouter();
  const authUser = {
    avatar: "https://i.pravatar.cc/100",
    name: "John Doe",
  };

  const renderTrip = ({ item }: any) => (
    <TouchableOpacity
      className="flex-1 m-1 rounded-2xl overflow-hidden"
      style={{ aspectRatio: 0.8 }}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/suggestion",
          params: { country: item.country },
        })
      }
    >
      <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 8 }}
      >
        <Text className="text-white font-semibold">{item.city}</Text>
        <Text className="text-white text-xs">{item.country}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4">
          <View>
            <Text className="text-lg font-semibold text-gray-800">Hello, {authUser?.name}</Text>
            <Text className="text-gray-500">Welcome to Moodi</Text>
          </View>
          <Image source={{ uri: authUser?.avatar }} className="w-10 h-10 rounded-full" />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full pl-4 pr-1 py-1 mt-5">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput placeholder="Search" placeholderTextColor="#999" className="flex-1 ml-2 text-gray-700" />
          <TouchableOpacity className="bg-secondary rounded-full p-2">
            <Ionicons name="options-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <Text className="text-lg font-bold text-gray-900 mt-6">Select your next trip</Text>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full mr-2">
            <Text className="text-gray-600 font-medium">Sightseeing</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full mr-2">
            <Text className="text-gray-600 font-medium">Hiking</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-secondary px-5 py-2 rounded-full mr-2">
            <Text className="text-white font-medium">Beach</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full mr-2">
            <Text className="text-gray-600 font-medium">Food Tours</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full mr-2">
            <Text className="text-gray-600 font-medium">Museums</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full">
            <Text className="text-gray-600 font-medium">Wildlife Safari</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Trip Grid (instead of swiper) */}
        <FlatList
          data={trips}
          renderItem={renderTrip}
          keyExtractor={(_, i) => i.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
