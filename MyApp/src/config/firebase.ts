import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
// Firebase có export hàm này trên React Native nhưng thiếu khai báo ở bộ kiểu dùng chung.
// @ts-expect-error Xem firebase/firebase-js-sdk#9316.
import { getReactNativePersistence } from "firebase/auth";
import {
  getAuth,
  initializeAuth,
  type Auth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDX06jhGXk3XxF6jFUTqcPg8lLefYUbaVQ",
  authDomain: "expensemanager-98031.firebaseapp.com",
  projectId: "expensemanager-98031",
  storageBucket: "expensemanager-98031.firebasestorage.app",
  messagingSenderId: "487597780116",
  appId: "1:487597780116:web:12219b67d7b42b2ce71881",
  measurementId: "G-BD3W1SKCVT",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

function createAuthentication(): Auth {
  if (Platform.OS === "web") {
    return getAuth(app);
  }

  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
}

export const authentication = createAuthentication();
export const database = getFirestore(app);
