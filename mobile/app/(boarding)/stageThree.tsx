import React, { useMemo, useRef } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Animated } from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 360;

export default function TripsSwiper() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(1)).current;

  const trips = useMemo(
    () => [
      {
        image: "https://picsum.photos/500/700",
        country: "Japan",
        city: "Tokyo",
        rating: "4.8",
        reviews: "120",
        description: "Explore Tokyo's vibrant culture, delicious food, and historic temples.",
      },
      {
        image: "https://picsum.photos/500/701",
        country: "Italy",
        city: "Rome",
        rating: "4.7",
        reviews: "89",
        description: "Discover ancient landmarks, art, and exquisite Italian cuisine.",
      },
      {
        image: "https://picsum.photos/500/702",
        country: "USA",
        city: "New York",
        rating: "4.9",
        reviews: "200",
        description: "Experience the city that never sleeps with its iconic skyline and culture.",
      },
    ],
    []
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: " 50%" }}>
      <Swiper
        loop={false}
        showsPagination={true}
        activeDotColor="#3754ED"
        dotColor="rgba(0,0,0,0.2)"
        containerStyle={{ height: CARD_HEIGHT + 90 }}
        scrollEnabled={true}
      >
        {trips.map((trip, index) => {
          const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View key={index} style={[styles.cardContainer, { transform: [{ scale }] }]}>
              <ImageBackground source={{ uri: trip.image }} style={styles.cardImage} imageStyle={{ borderRadius: 16 }}>
                <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.gradientOverlay}>
                  <Text style={styles.cityText}>
                    {trip.city}, {trip.country}
                  </Text>
                  <Text style={styles.ratingText}>
                    ⭐ {trip.rating} ({trip.reviews} reviews)
                  </Text>
                  <Text style={styles.descText}>{trip.description}</Text>

                  <TouchableOpacity onPress={() => router.push("/(tabs)")} style={styles.button}>
                    <Ionicons name="arrow-forward-outline" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Go to Tabs</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </ImageBackground>
            </Animated.View>
          );
        })}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  gradientOverlay: {
    padding: 16,
    borderRadius: 16,
  },
  cityText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  descText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#3754ED",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },
});
