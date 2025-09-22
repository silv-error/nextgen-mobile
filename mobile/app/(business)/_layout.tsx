import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./index";
import DashboardScreen from "./dashboard";
import { LayoutDashboard, SquarePlus } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function BusinessTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3754ED",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="index"
        component={HomePage} // Replace <></> with your actual component for "index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen} // Replace <></> with your actual component for "Create"
        options={{
          tabBarIcon: ({ color, size }) => <SquarePlus />,
        }}
      />
    </Tab.Navigator>
  );
}
