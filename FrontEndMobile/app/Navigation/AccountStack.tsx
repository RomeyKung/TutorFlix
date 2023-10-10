import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
<<<<<<< Updated upstream
import {Account, HomeScreen, PostScreen,EditPost} from "../screens/Index"
=======
import {
  Account,
  AccountPostScreen,
  AccountEditScreen,
} from "../screens/Index";
>>>>>>> Stashed changes
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
<<<<<<< Updated upstream
      <Stack.Screen name="PostScreen" component={PostScreen} options={{headerShown : false}}/> 
      <Stack.Screen name="EditPost" component={EditPost} options={{headerShown : false}}/>
=======
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
>>>>>>> Stashed changes
    </Stack.Navigator>
  );
};

export default AccountStack;
