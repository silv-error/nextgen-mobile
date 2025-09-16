// app/_layout.tsx
import { Stack, useNavigation } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(pages)/index" />
      <Stack.Screen name="(pages)/map" />
      <Stack.Screen name="(pages)/suggestion" options={{ title: "Suggestion" }} />
      <Stack.Screen name="(pages)/profile" options={{ title: "Profile" }} />
    </Stack>
  );
}
