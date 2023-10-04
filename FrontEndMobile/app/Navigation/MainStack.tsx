import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Image } from "react-native";

import { HomeScreen, Account, Favorite } from "../screens/Index";

const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 7,
          left: 3,
          right: 3,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: 90,
          // ...styles.shadow,
          borderTopWidth: 1, // Add a black border at the top
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopColor: "#000000", // Set the border color to black
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={
                  focused
                    ? require("../../assets/icons/Home.png")
                    : require("../../assets/icons/HomeDisable.png")
                }
                resizeMode="contain"
                style={{
                  width: 120,
                  marginLeft: 30,
                }}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={
                  focused
                    ? require("../../assets/icons/Likes.png")
                    : require("../../assets/icons/LikesDisable.png")
                }
                resizeMode="contain"
                style={{
                  width: 120,
                  // marginLeft: 30,
                }}
              />
            </View>
          ),
          headerTitle: "Favorites",
          
        }}
      />
      <Tab.Screen
        name="Search"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={
                  focused
                    ? require("../../assets/icons/Search.png")
                    : require("../../assets/icons/SearchDisable.png")
                }
                resizeMode="contain"
                style={{
                  width: 120,
                  // marginLeft: 30,
                }}
              />
            </View>
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={
                  focused
                    ? require("../../assets/icons/Profile.png")
                    : require("../../assets/icons/ProfileDisable.png")
                }
                resizeMode="contain"
                style={{
                  width: 120,
                  marginRight: 30,
                }}
              />
            </View>
          ),
          // headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12,
  },
});
