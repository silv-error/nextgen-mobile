import { Redirect, Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStore from "../store/authStore";
import { useEffect, useState } from "react";
import { restoreSession } from "../services/auth/useLogin";

const TabIcon = ({ focused, icon }: any) => (
  <View
    className={`border-2 ${focused ? "border-white" : "border-transparent"} rounded-full w-14 h-14 items-center justify-center`}
    style={{ backgroundColor: focused ? "white" : "transparent" }}
  >
    <Ionicons name={icon} size={20} color={focused ? "#00a8ff" : "black"} />
  </View>
);

export default function TabsLayout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await restoreSession();
      if (session) {
        router.replace("/(tabs)"); // logged in
      } else {
        router.replace("/(auth)"); // not logged in
      }
      setLoading(false);
    })();
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      // screenOptions={{
      //   headerShown: false,
      //   tabBarShowLabel: false,
      //   tabBarStyle: {
      //     position: "absolute",
      //     bottom: 20 + insets.bottom, // adjust for safe areas
      //     marginHorizontal: 24,
      //     alignSelf: "center", // center horizontally
      //     height: 68,
      //     borderRadius: 35,
      //     backgroundColor: "#00a8ff",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     paddingBottom: 0,
      //     elevation: 5, // shadow Android
      //     shadowColor: "#000", // shadow iOS
      //     shadowOpacity: 0.1,
      //     shadowOffset: { width: 0, height: 5 },
      //     shadowRadius: 10,
      //   },
      //   tabBarItemStyle: {
      //     justifyContent: "center",
      //     alignItems: "center",
      //   },
      //   tabBarIconStyle: {
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     marginTop: 14,
      //   },
      // }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00a8ff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      {/* Landing Page */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"home-outline"} />,
        }}
      />

      {/* Business Page */}
      <Tabs.Screen
        name="business"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"briefcase-outline"} />,
        }}
      />

      {/* Suggestion Page */}
      <Tabs.Screen
        name="suggestion"
        options={{
          title: "Suggestions",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"compass-outline"} />,
        }}
      />

      {/* Map Page */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"map-outline"} />,
        }}
      />

      {/* Business Owner Page */}
      {/* <Tabs.Screen
        name="business-owner"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"storefront-outline"} />,
        }}
      /> */}

      {/* Profile Page */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"person-outline"} />,
        }}
      />
    </Tabs>
  );
}
