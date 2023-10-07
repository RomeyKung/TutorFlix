import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import firebase
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

//import Sceens
import { Login, PostScreen, Signup } from "./app/screens/Index";

//import Layouts

//import navigation
import MainStack from "./app/Navigation/MainStack";
import Test from "./app/screens/Test";



const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     setUser(user);
  //     console.log(user);
  //   });
  // }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {/* {user ? (
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )} */}
        <Stack.Screen
          name="Main"
          component={MainStack}
          options={{ headerShown: false }}
        />
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
