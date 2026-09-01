// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX06jhGXk3XxF6jFUTqcPg8lLefYUbaVQ",
  authDomain: "expensemanager-98031.firebaseapp.com",
  projectId: "expensemanager-98031",
  storageBucket: "expensemanager-98031.firebasestorage.app",
  messagingSenderId: "487597780116",
  appId: "1:487597780116:web:12219b67d7b42b2ce71881",
  measurementId: "G-BD3W1SKCVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Kết nối Cloud Firestore
export const database = getFirestore(app);