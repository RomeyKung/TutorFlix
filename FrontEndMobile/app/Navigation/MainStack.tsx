import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text } from "react-native";

import { HomeScreen, List } from "../screens/Index";

const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={List} />
    </Tab.Navigator>
  );
};

export default MainStack;
