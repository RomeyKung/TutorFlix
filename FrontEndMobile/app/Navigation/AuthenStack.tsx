import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import firebase
import { User, onAuthStateChanged } from "firebase/auth";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../FirebaseConfig";

//import Sceens
import { Login, Signup } from "../screens/Index";

//import navigation
import MainStack from "../Navigation/MainStack";
import Test from "../screens/Test";
import { useDispatch } from "react-redux";
import { storeUser } from "../Store/UsersSlice/UsersSlice";

const Stack = createNativeStackNavigator();

function AuthenStack() {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      try {
        setUser(user);
        // console.log("id"+ user.uid);

        const userDocRef = doc(FIREBASE_DB, "Users", user?.uid);
        // console.log(userDocRef.id);

        const userInfo = onSnapshot(userDocRef, (doc: any) => {
          console.log("Current data: ", doc.data());
          dispatch(storeUser(doc.data()));
        });








        return ()=>{
          userInfo ? userInfo() : null;
        }




      } catch (err) {
        console.log(err);
      }

    

    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthenStack;
