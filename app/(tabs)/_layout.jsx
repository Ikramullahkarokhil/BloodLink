import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",

        tabBarAllowFontScaling: true,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarHideOnKeyboard: true,
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="donation-request"
        options={{
          tabBarHideOnKeyboard: true,
          title: "Request",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "git-pull-request"
              : "git-pull-request-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarHideOnKeyboard: true,
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? "person-circle"
              : "person-circle-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default layout;

const styles = StyleSheet.create({});
