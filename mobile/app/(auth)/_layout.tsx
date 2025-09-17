import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const isAuthenticated = false; // Replace with your authentication logic
  if (isAuthenticated) {
    return <Redirect href={"/(tabs)"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
