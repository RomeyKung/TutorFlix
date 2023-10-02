import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home} from "../screens/Index";

const Main = () => {
  const mainStack = createNativeStackNavigator();
  return (
    <mainStack.Navigator initialRouteName="Home">
      <mainStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </mainStack.Navigator>
  );
}

export default Main;
