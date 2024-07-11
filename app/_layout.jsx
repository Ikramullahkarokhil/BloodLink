import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useRouter } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

export default function Layout() {
  const router = useRouter();
  NavigationBar.setBackgroundColorAsync("white");

  useEffect(() => {
    checkUserToken();
  }, []);

  const checkUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        // User is logged in, navigate to the tabs screen
        router.replace("(tabs)");
      } else {
        // User is not logged in, navigate to the index screen
        router.replace("index");
      }
    } catch (error) {
      console.error("Error checking user token:", error);
      // Handle error if necessary
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#d9534f" },
          headerTitleStyle: { color: "#fff" },
          animation: "ios",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />

        {/* Additional screens for tabs */}
      </Stack>
    </>
  );
}
