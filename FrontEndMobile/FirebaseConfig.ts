
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//เอามาเล่นๆ ไม่ได้ใช้
// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(FIREBASE_APP);



// Import the functions you need from the SDKs you need
//initializeApp คือ การเชื่อมต่อกับ Firebase โดยใช้ค่า config ที่ได้จากข้างบน
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
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


// Initialize Firebase คือ การเชื่อมต่อกับ Firebase โดยใช้ค่า config ที่ได้จากข้างบน
export const FIREBASE_APP = initializeApp(firebaseConfig);

const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// สร้างตัวแปรเพื่อเรียกใช้งาน Firebase Authentication และ Firebase Firestore
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);


