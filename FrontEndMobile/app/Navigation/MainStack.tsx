import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Image } from "react-native";

import { HomeScreen, List } from "../screens/Index";

const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // tabBar
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require("../../assets/icons/logo.png")} style={{width:60, height:60}}/>
            </View>
          ),
        }}
      />
      <Tab.Screen name="List" component={List} />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
