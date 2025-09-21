import { Redirect, Stack } from "expo-router";
import useStore from "../store/authStore";

export default function AuthRoutesLayout() {
  // const isAuthenticated = true; // Replace with your authentication logic
  const { authUser } = useStore() as { authUser: any };
  if (authUser) {
    return <Redirect href={"/(tabs)"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
