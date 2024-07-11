import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Title, Subheading } from "react-native-paper";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Title style={styles.title}>Welcome to BloodLink</Title>
      <Subheading style={styles.subtitle}>
        Be a hero in someone's life. Join our community of lifesavers.
      </Subheading>
      <Button
        mode="contained"
        onPress={() => router.push("/login")}
        style={styles.buttonContained}
        labelStyle={styles.buttonLabel}
      >
        Get Started
      </Button>
      <Button
        mode="outlined"
        onPress={() => router.push("/register")}
        style={styles.buttonOutlined}
        labelStyle={[styles.buttonLabel, { color: "#d9534f" }]}
      >
        Join Now
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF7F8",
    paddingHorizontal: 20,
    paddingTop: "15%",
    paddingBottom: 50,
  },
  logo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#6c757d",
  },
  buttonContained: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#d9534f",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonOutlined: {
    marginVertical: 10,
    width: "90%",
    borderColor: "#d9534f",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
  },
});
