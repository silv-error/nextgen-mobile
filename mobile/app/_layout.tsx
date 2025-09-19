// app/_layout.js
import { Stack } from "expo-router";
import "@/global.css";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(landing)" />
    </Stack>
  );
}
