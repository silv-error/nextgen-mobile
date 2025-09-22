import { Redirect, Stack } from "expo-router";
import useStore from "../store/authStore";
import { useEffect } from "react";
import supabase from "../lib/supabase";

export default function AuthRoutesLayout() {
  // const isAuthenticated = true; // Replace with your authentication logic

  return <Stack screenOptions={{ headerShown: false }} />;
}
