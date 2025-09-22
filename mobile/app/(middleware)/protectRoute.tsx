import { View, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomerScreen from "@/components/customerScreen";
import BusinessOwnerPage from "@/components/businessOwnerScreen";
import supabase from "../lib/supabase";
import { fetchUserProfile } from "../services/user/getAuthUser";
import { fetchBusinessProfile } from "../services/user/getBusiness";
import useStore from "../store/authStore";
import { Redirect } from "expo-router";

const ProtectRoute = () => {
  const { userType } = useStore();
  console.log(userType);

  return userType === "traveler" ? <Redirect href={"/(tabs)"} /> : <Redirect href={"/(business)"} />;
};

export default ProtectRoute;
