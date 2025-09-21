import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Navigation, Send } from "lucide-react-native";

export default function TravelPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { country } = useLocalSearchParams();

  // Feedback State
  const [feedbacks, setFeedbacks] = useState([
    {
      avatar: "https://avatar.iran.liara.run/public/45",
      fullName: "Maria Santos",
      address: "Manila, Philippines",
      stars: 5,
      comment: "Amazing place, highly recommended!",
      timestamp: "2",
    },
    {
      avatar: "https://avatar.iran.liara.run/public/46",
      fullName: "Juan Dela Cruz",
      address: "Manila, Philippines",
      stars: 4,
      comment: "Great experience, but a bit pricey.",
      timestamp: "4",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newStars, setNewStars] = useState(5);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    setFeedbacks((prev) => [
      {
        avatar: "https://avatar.iran.liara.run/public/45", // or use a default or user avatar
        fullName: "Anonymous", // or get from user profile
        address: "Unknown", // or get from user profile
        stars: newStars,
        comment: newComment,
        timestamp: "0", // or use a function to get current date/time
      },
      ...prev,
    ]);
    setNewComment("");
    setNewStars(5);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-50 flex-1">
        {/* Header Image */}
        <View className="w-full h-72">
          <Image
            source={{ uri: "https://picsum.photos/800/500" }}
            className="w-full h-full rounded-b-3xl"
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute top-12 right-4 bg-white/30 rounded-full p-2">
            <Ionicons name="heart-outline" size={22} color="white" />
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
          {/* Business Info + Button */}
          <View className="flex-row justify-between items-center mt-8">
            <View>
              <Text className="text-lg font-bold text-[#111]">Open Hours</Text>
              <Text className="text-gray-500 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</Text>
              <Text className="text-gray-500 text-sm">Contact: (123) 456-7890</Text>
            </View>
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

          {/* Feedback Section */}
          <View className="mt-10" style={{ paddingBottom: insets.bottom + 80 }}>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold text-[#111]">Feedback</Text>
              <TouchableOpacity className="px-4 py-2 flex-row items-center gap-1" onPress={() => setModalVisible(true)}>
                <Send size={14} className="text-secondary" color={"#0097e6"} />
                <Text className="text-secondary font-semibold text-sm">Send Feedback</Text>
              </TouchableOpacity>
            </View>

            {feedbacks.map((fb, idx) => (
              <View
                key={idx}
                className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                {/* User Info */}
                <View className="flex-row items-center mb-3">
                  <Image source={{ uri: fb.avatar }} className="w-10 h-10 rounded-full mr-3" />
                  <View className="flex-1">
                    <Text className="text-[#111827] font-semibold">{fb.fullName}</Text>
                    <Text className="text-gray-500 text-xs">{fb.address}</Text>
                  </View>
                  <Text className="text-gray-400 text-xs">{fb.timestamp} days ago</Text>
                </View>

                {/* Stars */}
                <View className="flex-row items-center mb-2">
                  {Array.from({ length: fb.stars }).map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color="#facc15" />
                  ))}
                </View>

                {/* Comment */}
                <Text className="text-gray-500 leading-relaxed">{fb.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Feedback Modal */}
      <Modal transparent animationType="none" visible={modalVisible}>
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md">
            <Text className="text-lg font-bold text-[#111] mb-3">Leave Feedback</Text>

            {/* Star Rating */}
            <View className="flex-row mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setNewStars(i + 1)} className="mr-1">
                  <Ionicons name={i < newStars ? "star" : "star-outline"} size={24} color="#facc15" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Comment Input */}
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Write your feedback..."
              className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
              multiline
            />

            {/* Buttons */}
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity className="px-4 py-2" onPress={() => setModalVisible(false)}>
                <Text className="text-gray-600 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-full" onPress={handleSubmit}>
                <Text className="text-white font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
