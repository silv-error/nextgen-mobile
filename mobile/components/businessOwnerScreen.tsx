import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MasonryList from "@react-native-seoul/masonry-list";
import { useRouter, useNavigation } from "expo-router";
import { fetchUserProfile } from "../app/services/user/getAuthUser";
import { fetchBusinessProfile } from "../app/services/user/getBusiness";
import useStore from "@/app/store/authStore";

export default function BusinessOwnerPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Profile state
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [editVisible, setEditVisible] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [tempBio, setTempBio] = useState("");

  const { authUser } = useStore() as { authUser: {} };

  const openEdit = () => {
    setTempName(profile?.full_name || "");
    setTempUsername(profile?.username || "");
    setTempBio(profile?.bio || "");
    setEditVisible(true);
  };

  const saveEdit = () => {
    setProfile({
      ...profile,
      full_name: tempName,
      username: tempUsername,
      bio: tempBio,
    });
    setEditVisible(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3754ED" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7FDFF]" style={{ paddingBottom: insets.bottom + 20 }}>
      <ScrollView className="flex-1">
        {/* Cover Image */}
        <View className="w-full h-44">
          <Image source={{ uri: "https://picsum.photos/800/300" }} className="w-full h-full" />
        </View>

        {/* Profile Info */}
        <View className="px-4 -mt-12">
          {/* Avatar */}
          <View className="border-4 border-white rounded-full w-20 h-20 overflow-hidden shadow-md">
            <Image source={{ uri: profile?.avatar_url || "https://picsum.photos/200" }} className="w-20 h-20" />
          </View>

          {/* Name + Buttons */}
          <View className="flex-row justify-between items-center mt-3">
            <View>
              <Text className="text-xl font-bold text-[#131B62]">{profile?.full_name}</Text>
              <Text className="text-[#3754ED]">@{authUser?.username}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={openEdit}
                className="flex-row items-center gap-1 px-4 py-2.5 rounded-full bg-gray-100"
              >
                <Ionicons name="create-outline" size={18} color="#131B62" />
                <Text className="text-[#131B62] font-medium">Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
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
                className="flex-row items-center gap-2 justify-center bg-secondary px-5 py-2.5 rounded-full shadow-sm border border-white/60"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                }}
              >
                <Ionicons name="locate-outline" size={18} color="white" />
                <Text className="text-white font-semibold text-sm">Directions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bio */}
          <Text className="mt-3 text-gray-600">{profile?.bio}</Text>
        </View>

        {/* Photos Grid */}
        <MasonryList
          style={{ marginTop: 24 }}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          data={
            [
              { uri: "https://picsum.photos/id/1015/400/600" },
              { uri: "https://picsum.photos/id/1022/400/300" },
              { uri: "https://picsum.photos/id/1036/400/500" },
              { uri: "https://picsum.photos/id/1041/400/350" },
              { uri: "https://picsum.photos/id/1050/400/450" },
              { uri: "https://picsum.photos/id/1062/400/250" },
            ] as { uri: string }[]
          }
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: { item: unknown; i: number }) => {
            const photo = item as { uri: string };
            return (
              <Image
                source={{ uri: photo.uri }}
                style={{
                  flex: 1,
                  marginHorizontal: 4,
                  borderRadius: 4,
                  marginBottom: 8,
                  resizeMode: "cover",
                  height: Math.floor(Math.random() * 120) + 180,
                }}
              />
            );
          }}
        />

        {/* Visit Site Button */}
        <TouchableOpacity
          className="flex-row items-center bg-[#3754ED]/10 px-4 py-3 rounded-xl mx-4 mt-6 mb-12"
          style={{
            marginBottom: insets.bottom + 100,
          }}
        >
          <Ionicons name="open-outline" size={18} color="#3754ED" />
          <Text className="ml-2 font-semibold text-[#3754ED]">Visit site</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6">
            <Text className="text-lg font-bold text-[#131B62] mb-4">Edit Profile</Text>

            <Text className="text-sm text-gray-600 mb-1">Name</Text>
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
            />

            <Text className="text-sm text-gray-600 mb-1">Username</Text>
            <TextInput
              value={tempUsername}
              onChangeText={setTempUsername}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
            />

            <Text className="text-sm text-gray-600 mb-1">Bio</Text>
            <TextInput
              value={tempBio}
              onChangeText={setTempBio}
              multiline
              className="border border-gray-300 rounded-lg px-3 py-2 mb-4 h-24 text-start"
            />

            {/* Buttons */}
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity onPress={() => setEditVisible(false)}>
                <Text className="text-gray-500 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEdit}>
                <Text className="text-[#3754ED] font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
