import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { confirmEmailVerification, applyActionCode } from "firebase/auth";
import { auth } from "../config/firebase";

export default function VerifyEmailScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    try {
      // Confirm the verification code
      await applyActionCode(auth, verificationCode);

      // Proceed to a success page or login page
      setLoading(false);
      router.push("/login"); // Navigate to login page after successful verification
    } catch (error) {
      console.error("Error verifying email: ", error.message);
      setLoading(false);
      setError("Invalid verification code. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        Please enter the verification code sent to your email.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        onChangeText={(text) => setVerificationCode(text)}
        value={verificationCode}
        keyboardType="numeric"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleVerify}
        disabled={loading}
        loading={loading}
      >
        Verify Email
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF7F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#d9534f",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#6c757d",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#d9534f",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
