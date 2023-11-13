// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//initializeApp คือ การเชื่อมต่อกับ Firebase โดยใช้ค่า config ที่ได้จากข้างบน
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import * as firebaseAuth from "firebase/auth";
import { getAuth, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrxZVwT0zvR-NPZJ0FJoOqV0SnaE2HGNk",
  authDomain: "tutorflix-8b873.firebaseapp.com",
  projectId: "tutorflix-8b873",
  storageBucket: "tutorflix-8b873.appspot.com",
  messagingSenderId: "1098040533701",
  appId: "1:1098040533701:web:24fd4da6a62ecab8e5c6ac",
  measurementId: "G-CX0CGPZY96"
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Initialize Firebase คือ การเชื่อมต่อกับ Firebase โดยใช้ค่า config ที่ได้จากข้างบน
export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
