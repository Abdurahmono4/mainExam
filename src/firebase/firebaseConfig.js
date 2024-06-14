import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCqIgi4vcxoVhHrxd4LBQYpuOZorwd7bQI",
  authDomain: "my-exam-6448e.firebaseapp.com",
  projectId: "my-exam-6448e",
  storageBucket: "my-exam-6448e.appspot.com",
  messagingSenderId: "797282036481",
  appId: "1:797282036481:web:991fac2f6380ab7c8a4900",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
