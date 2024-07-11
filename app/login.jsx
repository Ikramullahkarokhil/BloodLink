import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { auth } from "../config/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user.uid);

      // Save user session token or ID in AsyncStorage
      await AsyncStorage.setItem("userToken", user.uid);

      // Navigate to the tabs screen
      router.push("/(tabs)");
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome to BloodLink!</Text>
      <Text style={styles.inspiringMessage}>
        Join our community and help save lives. Your contribution matters!
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        outlineColor="#d9534f"
        activeOutlineColor="#d9534f"
        placeholder="Enter your email"
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor="#d9534f"
        activeOutlineColor="#d9534f"
        placeholder="Enter your password"
        autoCapitalize="none"
      />

      <Button
        onPress={handleLogin}
        mode="contained"
        style={styles.buttonContained}
        labelStyle={styles.buttonLabel}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : "Log In"}
      </Button>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => router.push("/register")}
        >
          Sign up now
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF7F8",
    paddingHorizontal: 20,
    paddingTop: "40%",
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d9534f",
    marginBottom: 10,
  },
  inspiringMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#6c757d",
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#FFF",
  },
  buttonContained: {
    marginVertical: 20,
    width: "90%",
    backgroundColor: "#d9534f",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
  },
  signupText: {
    fontSize: 16,
    color: "#333",
  },
  signupLink: {
    color: "#d9534f",
    fontWeight: "bold",
  },
});
