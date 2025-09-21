import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
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
    ],
    []
  );

  const router = useRouter();
  const authUser = {
    avatar: "https://avatar.iran.liara.run/public/45",
    name: "John Doe",
  };

  const [cards, setCards] = useState(trips);
  const [cardIndex, setCardIndex] = useState(0);
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const renderCard = useCallback(
    (item: { image: string; country: string; city: string; rating: string; reviews: string }, index: number) => {
      if (!item) return null;
      return (
        <View className="w-full h-[420px] rounded-[20px] shadow-lg overflow-hidden">
          {/* Full Image */}
          <Image source={{ uri: item.image, cache: "force-cache" }} className="w-full h-full" resizeMode="cover" />

          {/* Floating Heart */}
          <TouchableOpacity className="absolute top-3 right-3 bg-white/30 rounded-full p-2">
            <Ionicons name="heart-outline" size={25} color="white" />
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
              <TouchableOpacity
                className="flex-row items-center h-14 bg-white/20 backdrop-blur-md rounded-full mt-3 shadow-md"
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/suggestion",
                    params: {
                      country: item?.country,
                    },
                  });
                }}
              >
                <Text className="text-white relative mx-auto font-semibold text-base">See more</Text>
                <View className="bg-white/30 absolute flex justify-center items-center right-0 rounded-full p-1.5 h-14 w-14">
                  <Ionicons name="chevron-forward" size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    },
    [router]
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
            <Ionicons name="options-outline" size={32} color="white" />
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

        {/* Trip Cards (Swiper) */}
        <View className="h-[400px] -mt-10">
          <Swiper
            ref={swiperRef}
            cards={cards}
            // cardIndex={cardIndex}
            onSwiped={(i) => setActive(i + 1)}
            onSwipedAll={() => setActive(0)}
            stackSize={3}
            backgroundColor="transparent"
            animateCardOpacity={false}
            cardStyle={{ width: "90%", alignSelf: "center" }}
            renderCard={renderCard}
            verticalSwipe={false}
            infinite={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
