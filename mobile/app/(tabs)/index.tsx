import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const trips = useMemo(
    () => [
      {
        image: "https://picsum.photos/500/700",
        country: "Japan",
        city: "Tokyo",
        rating: "4.8",
        reviews: 120,
      },
      {
        image: "https://picsum.photos/500/701",
        country: "Italy",
        city: "Rome",
        rating: "4.7",
        reviews: 89,
      },
      {
        image: "https://picsum.photos/500/702",
        country: "USA",
        city: "New York",
        rating: "4.9",
        reviews: 200,
      },
    ],
    []
  );

  const [cards, setCards] = useState(trips);
  const [cardIndex, setCardIndex] = useState(0);

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
          <TouchableOpacity className="bg-secondary rounded-full p-2">
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
          <TouchableOpacity className="bg-secondary px-5 py-2 rounded-full mr-2">
            <Text className="text-white font-medium">South America</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-5 py-2 rounded-full">
            <Text className="text-gray-600 font-medium">Africa</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Trip Cards (Horizontal Scroll) */}

        <View className="h-[400px]">
          <Swiper
            cards={cards}
            cardIndex={cardIndex} // ✅ use state instead of hard-coded
            onSwiped={(index) => setCardIndex(index + 1)}
            onSwipedAll={() => console.log("All cards swiped!")}
            stackSize={3}
            backgroundColor="transparent"
            infinite={true} // loop cards
            animateCardOpacity={false} // ✅ reduce glitch
            cardStyle={{ width: "90%", alignSelf: "center" }}
            renderCard={(item) => {
              if (!item) return null;
              return (
                <View className="w-full h-[420px] rounded-3xl shadow-lg overflow-hidden">
                  {/* Full Image */}
                  <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />

                  {/* Floating Heart */}
                  <TouchableOpacity className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
                    <Ionicons name="heart-outline" size={20} color="#111" />
                  </TouchableOpacity>

                  {/* Gradient + Info */}
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200 }}
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
                      <TouchableOpacity className="flex-row items-center justify-between bg-white/20 backdrop-blur-md rounded-full px-5 py-2.5 mt-3 shadow-md">
                        <Text className="text-white font-semibold text-base">See more</Text>
                        <View className="bg-white/30 rounded-full p-1.5 ml-2">
                          <Ionicons name="chevron-forward" size={18} color="#fff" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
