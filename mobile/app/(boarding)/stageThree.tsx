import React, { useMemo } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.6;

export default function TripsSwiper() {
  const router = useRouter();

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
    <View style={styles.container}>
      {/* Swiper needs explicit height */}
      <Swiper
        loop={false}
        showsPagination
        activeDotColor="#3754ED"
        dotColor="rgba(0,0,0,0.2)"
        style={{ height: height * 0.85 }}
        containerStyle={{}}
        removeClippedSubviews={false} // Fixes some rendering issues
      >
        {trips.map((trip, index) => (
          <View key={index} style={styles.slide}>
            <ImageBackground
              source={{ uri: trip.image }}
              style={styles.imageBackground}
              imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.cityText}>
                {trip.city}, {trip.country}
              </Text>
              <Text style={styles.ratingText}>
                ⭐ {trip.rating} ({trip.reviews} reviews)
              </Text>
              <Text style={styles.descText}>{trip.description}</Text>
            </View>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity style={styles.getStartedButton} onPress={() => router.push("/(tabs)")} activeOpacity={0.8}>
        <Text style={styles.getStartedText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  slide: {
    flex: 1,
    width: width,
  },
  imageBackground: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  textContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cityText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  ratingText: {
    fontSize: 16,
    marginTop: 4,
    color: "#555",
  },
  descText: {
    fontSize: 14,
    marginTop: 8,
    color: "#777",
  },
  getStartedButton: {
    marginHorizontal: 40,
    marginBottom: 40,
    paddingVertical: 16,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
