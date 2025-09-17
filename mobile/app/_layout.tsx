// app/_layout.js
import { Stack } from "expo-router";
import "@/global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(pages)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
