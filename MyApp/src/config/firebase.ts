import { getApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

const firebaseApp = getApp();

export const authentication = getAuth(firebaseApp);
export const database = getFirestore(firebaseApp);
