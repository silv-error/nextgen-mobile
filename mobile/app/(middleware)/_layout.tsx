import { Redirect, Stack } from "expo-router";

export default function MiddlewareLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
//
