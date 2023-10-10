import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Account,
  AccountPostScreen,
  AccountEditScreen,
} from "../screens/Index";
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="AccountPostScreen"
        component={AccountPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountEditScreen"
        component={AccountEditScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
