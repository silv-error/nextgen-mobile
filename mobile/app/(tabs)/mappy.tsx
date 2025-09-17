import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const trips = [
    {
      id: "1",
      country: "Brazil",
      city: "Rio de Janeiro",
      image: "https://picsum.photos/id/1015/600/400",
      rating: "5.0",
      reviews: "143",
    },
    {
      id: "2",
      country: "Japan",
      city: "Tokyo",
      image: "https://picsum.photos/id/1011/600/400",
      rating: "4.9",
      reviews: "210",
    },
    {
      id: "3",
      country: "France",
      city: "Paris",
      image: "https://picsum.photos/id/1018/600/400",
      rating: "4.8",
      reviews: "320",
    },
  ];

  const [cards, setCards] = useState(trips);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4">
          <View>
            <Text className="text-lg font-semibold text-gray-800">Hello, Vanessa</Text>
            <Text className="text-gray-500">Welcome to TripGlide</Text>
          </View>
          <Image source={{ uri: "https://i.pravatar.cc/100" }} className="w-10 h-10 rounded-full" />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mt-5">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput placeholder="Search" placeholderTextColor="#999" className="flex-1 ml-2 text-gray-700" />
          <TouchableOpacity className="bg-black rounded-full p-2">
            <Ionicons name="options-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <Text className="text-lg font-bold text-gray-900 mt-6">Select your next trip</Text>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full mr-2">
            <Text className="text-gray-600 font-medium">Asia</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full mr-2">
            <Text className="text-gray-600 font-medium">Europe</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black px-5 py-2 rounded-full mr-2">
            <Text className="text-white font-medium">South America</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full">
            <Text className="text-gray-600 font-medium">Africa</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Trip Cards (Horizontal Scroll) */}

        <Swiper
          cards={cards}
          cardStyle={{
            width: "95%",
            alignSelf: "center",
          }}
          renderCard={(item) => {
            if (!item) return null;
            return (
              <View className="top-52 h-[420px] align-middle rounded-3xl shadow-lg overflow-hidden">
                {/* Full Image */}
                <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />

                {/* Floating Heart */}
                <TouchableOpacity className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
                  <Ionicons name="heart-outline" size={20} color="#111" />
                </TouchableOpacity>

                {/* Gradient + Info */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 0, height: 200 }}
                >
                  <View className="absolute bottom-0 p-4 w-full">
                    <Text className="text-white text-sm">{item.country}</Text>
                    <Text className="text-white text-lg font-bold">{item.city}</Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="star" size={14} color="#facc15" />
                      <Text className="text-white ml-1 text-sm">{item.rating}</Text>
                      <Text className="text-gray-300 ml-2 text-xs">{item.reviews} reviews</Text>
                    </View>

                    {/* Button */}
                    <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-full px-4 py-2 mt-3">
                      <Text className="text-black font-semibold text-center">See more</Text>
                      <Ionicons name="arrow-forward" size={18} color="#111" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            );
          }}
          // onSwiped={(cardIndex) => console.log("Swiped:", cardIndex)}
          // onSwipedAll={() => console.log("All cards swiped!")}
          stackSize={3}
          backgroundColor="transparent"
          cardIndex={0}
          infinite={false}
          animateCardOpacity
        />
      </ScrollView>
    </SafeAreaView>
  );
}
