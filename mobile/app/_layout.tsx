// app/_layout.js
import "@/global.css";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import supabase from "./lib/supabase";
import { clearSession } from "./services/storage";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<import("@supabase/supabase-js").Session | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // clearSession(); // manually logout for testing purposes
    async function init() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      console.log("currently loggedin: ", data);
      setLoading(false);
    }
    init();

    // optional: listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        return <Redirect href={"/(auth)"} />;
      } else {
        return <Redirect href={"/(tabs)"} />;
      }
    };
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(landing)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
