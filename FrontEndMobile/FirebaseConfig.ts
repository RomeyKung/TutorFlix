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
  apiKey: "AIzaSyCPUhQ54ds-5UlyXs7QFM3AItL0kk-Ihi4",
  authDomain: "tutorflix-c64b4.firebaseapp.com",
  projectId: "tutorflix-c64b4",
  storageBucket: "tutorflix-c64b4.appspot.com",
  messagingSenderId: "810840685231",
  appId: "1:810840685231:web:506576d8f8032f8c13f25a",
  measurementId: "G-EPZTQ0WG4D",
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
