import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const TabIcon = ({ focused, icon }: any) => (
  <View
    className={`border-2 ${focused ? "border-white" : "border-transparent"} rounded-full w-14 h-14 items-center justify-center`}
    style={{ backgroundColor: focused ? "white" : "transparent" }}
  >
    <Ionicons name={icon} size={22} color={focused ? "black" : "white"} />
  </View>
);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 100,
          backgroundColor: "#080E29",
          paddingBottom: 0,
          width: "80%",
          margin: "auto",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 14,
        },
      }}
    >
      {/* Landing Page */}
      <Tabs.Screen
        name="index"
        options={{
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
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"sparkles-outline"} />,
        }}
      />

      {/* Map Page */}
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"map-outline"} />,
        }}
      />

      {/* Business Owner Page */}
      <Tabs.Screen
        name="business-owner"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"storefront-outline"} />,
        }}
      />

      {/* Profile Page */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={"person-outline"} />,
        }}
      />
    </Tabs>
  );
}
