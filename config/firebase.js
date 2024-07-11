import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEhR9-Q-qC2HfXoqNwea5RGfUqmdohYso",
  authDomain: "bloodlink-97e05.firebaseapp.com",
  projectId: "bloodlink-97e05",
  storageBucket: "bloodlink-97e05.appspot.com",
  messagingSenderId: "137244758765",
  appId: "1:137244758765:web:0deded6dc203592fe232e4",
  measurementId: "G-2KG9WJG4SV",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
