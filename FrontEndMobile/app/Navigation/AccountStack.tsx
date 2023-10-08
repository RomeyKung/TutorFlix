import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {Account, HomeScreen, PostScreen,EditPost} from "../screens/Index"
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PostScreen" component={PostScreen} options={{headerShown : false}}/> 
      <Stack.Screen name="EditPost" component={EditPost} options={{headerShown : false}}/>
    </Stack.Navigator>
  );
};

export default AccountStack;
