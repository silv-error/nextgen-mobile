import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MasonryList from "@react-native-seoul/masonry-list";
import { useRouter } from "expo-router";
import useStore from "@/app/store/authStore";

import { logoutUser } from "../services/auth/useLogout";

export default function BusinessOwnerPage() {
  const router = useRouter();
  const { authUser, setAuthUser } = useStore() as { authUser: any; setAuthUser: (authUser: any) => void };

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [editVisible, setEditVisible] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [tempBio, setTempBio] = useState("");

  const openEdit = () => {
    setTempName(profile?.full_name || "Jane Doe");
    setTempUsername(profile?.username || "janedoe");
    setTempBio(
      profile?.bio || "Hi I’m Skye! 📍 Lisbon, Portugal based 📍 Travel + drone videographer ✈️ Follow my adventures!"
    );
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

  const handleLogout = async () => {
    try {
      const { success } = await logoutUser();
      if (!success) Alert.alert("Logout failed", "Please try again...");
      router.replace("/(landing)"); // navigate to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3754ED" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7FDFF]">
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
              <Text className="text-xl font-bold text-[#131B62]">{tempName || "Jane Doe"}</Text>
              <Text className="text-[#3754ED]">@{tempUsername || "janedoe"}</Text>
            </View>

            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={openEdit}
                className="flex-row items-center gap-1 px-4 py-2.5 rounded-full bg-primary"
              >
                <Ionicons name="create-outline" size={18} color="white" />
                <Text className="text-white font-medium">Edit</Text>
              </TouchableOpacity>

              {/* Logout Button */}
              <TouchableOpacity
                onPress={handleLogout}
                className="flex-row items-center px-4 py-2.5 rounded-full bg-red-500"
              >
                <Ionicons name="log-out-outline" size={18} color="white" />
                {/* <Text className="text-white font-medium"></Text> */}
              </TouchableOpacity>
            </View>
          </View>

          {/* Bio */}
          <Text className="mt-3 text-gray-600">
            {tempBio ||
              "Hi I’m Skye! 📍 Lisbon, Portugal based 📍 Travel + drone videographer ✈️ Follow my adventures!"}
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
            { uri: "https://picsum.photos/id/1051/400/250" },
            { uri: "https://picsum.photos/id/1063/400/550" },
            { uri: "https://picsum.photos/id/1065/400/650" },
            { uri: "https://picsum.photos/id/1066/400/750" },
            { uri: "https://picsum.photos/id/1064/400/650" },
          ]}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <Image
              source={{ uri: (item as { uri: string }).uri }}
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
