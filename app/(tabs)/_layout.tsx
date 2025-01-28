import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthCheck } from "@/store/hooks/useAuthCheck";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const { isReady, isLoading } = useAuthCheck();

  if (isLoading || !isReady) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#E25822" />
      </View>
    );
  }
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 25,
          marginBottom: 20,
          marginTop: 20,
          height: 75,
          width: "90%",
          paddingBottom: 8,
          paddingTop: 8,
          justifyContent: "center",
          alignSelf: "center",
          display: "flex",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: "#E25822",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={25} // Slightly larger icons since we removed text
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="savedStore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tabs>
  );
}
