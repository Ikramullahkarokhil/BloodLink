import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  TextInput,
  Button,
  Subheading,
  Text,
  HelperText,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../config/firebase";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  phone: Yup.string()
    .min(10, "Phone number is too short")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        fullName: values.fullName,
        email: values.email,
        bloodGroup: values.bloodGroup,
        phone: values.phone,
        address: values.address,
      });

      console.log("User registered.");
      setLoading(false);
      router.push("verify-email"); // Navigate to a screen where user can verify email
    } catch (error) {
      setLoading(false);

      console.error("Error during registration: ", error);
      Alert.alert(
        "Registration failed",
        "An error occurred during registration. Please try again later."
      );
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        bloodGroup: "",
        phone: "",
        address: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Subheading style={styles.subtitle}>Create your account</Subheading>

          <TextInput
            label="Full Name"
            onChangeText={handleChange("fullName")}
            onBlur={handleBlur("fullName")}
            value={values.fullName}
            style={styles.input}
            mode="outlined"
            placeholder="Enter your full name"
            error={touched.fullName && errors.fullName}
          />
          {touched.fullName && errors.fullName && (
            <HelperText type="error">{errors.fullName}</HelperText>
          )}

          <TextInput
            label="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            style={styles.input}
            mode="outlined"
            placeholder="Enter your email"
            autoCapitalize="none"
            error={touched.email && errors.email}
          />
          {touched.email && errors.email && (
            <HelperText type="error">{errors.email}</HelperText>
          )}

          <TextInput
            label="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
            style={styles.input}
            mode="outlined"
            placeholder="Enter your password"
            autoCapitalize="none"
            error={touched.password && errors.password}
          />
          {touched.password && errors.password && (
            <HelperText type="error">{errors.password}</HelperText>
          )}

          <TextInput
            label="Confirm Password"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
            placeholder="Confirm your password"
            autoCapitalize="none"
            error={touched.confirmPassword && errors.confirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <HelperText type="error">{errors.confirmPassword}</HelperText>
          )}

          <Text style={styles.label}>Blood Group</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.bloodGroup}
              onValueChange={(itemValue) =>
                setFieldValue("bloodGroup", itemValue)
              }
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Select your blood group" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
          {touched.bloodGroup && errors.bloodGroup && (
            <HelperText type="error">{errors.bloodGroup}</HelperText>
          )}

          <TextInput
            label="Phone Number"
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            value={values.phone}
            style={styles.input}
            mode="outlined"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            error={touched.phone && errors.phone}
          />
          {touched.phone && errors.phone && (
            <HelperText type="error">{errors.phone}</HelperText>
          )}

          <TextInput
            label="Address"
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
            value={values.address}
            style={[styles.input, styles.multilineInput]}
            mode="outlined"
            placeholder="Enter your address"
            multiline
            numberOfLines={3}
            error={touched.address && errors.address}
          />
          {touched.address && errors.address && (
            <HelperText type="error">{errors.address}</HelperText>
          )}

          <Button
            onPress={handleSubmit}
            mode="contained"
            style={styles.buttonContained}
            labelStyle={styles.buttonLabel}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <ActivityIndicator color="#fff" /> // Show loading indicator inside button
            ) : (
              "Register"
            )}
          </Button>

          <Text style={styles.signupText}>
            Already have an account?{" "}
            <Text
              style={styles.signupLink}
              onPress={() => router.push("/login")}
            >
              Log in
            </Text>
          </Text>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF7F8",
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d9534f",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#6c757d",
  },
  input: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  multilineInput: {
    height: 100,
  },
  buttonContained: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#d9534f",
    borderRadius: 10,
    elevation: 3,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  signupText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  signupLink: {
    color: "#d9534f",
    fontWeight: "bold",
  },
});
