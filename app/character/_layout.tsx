import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Общее",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Инвентарь",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="spells"
        options={{
          title: "Заклинания",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="magic" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Заметки",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
