import { View, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomerScreen from "@/components/customerScreen";
import BusinessOwnerPage from "@/components/businessOwnerScreen";
import supabase from "../lib/supabase";
import { fetchUserProfile } from "../services/user/getAuthUser";
import { fetchBusinessProfile } from "../services/user/getBusiness";
import useStore from "../store/authStore";

const Profile = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");

  const { authUser: storedUser } = useStore() as { authUser: any };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { profile, userType, userRole } = await fetchUserProfile();
      setAuthUser(profile);
      setUserType(userType);
      setLoading(false);
      if (!profile) {
        console.log("OUR AUTH USER", storedUser);
        setAuthUser(storedUser);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!authUser) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No authenticated user found</Text>
      </View>
    );
  }

  return userType === "traveler" ? <CustomerScreen /> : <BusinessOwnerPage />;
};

export default Profile;
