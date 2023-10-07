import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Image } from "react-native";

import { HomeScreen, Account, Favorite, Search } from "../screens/Index";

import { AntDesign } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: "absolute",
          // left: 3,
          // right: 3,
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
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "100%",
                  height: 38,
                  borderColor: "#DFD7F3",
                  borderWidth: 1,
                  backgroundColor: "#DFD7F3",
                  borderRadius: 19.03,
                  justifyContent: "center",
                  alignItems: "center",


                }}
              >
                <View style={{ flexDirection: "row", columnGap: 5, }}>
                  <Feather name="home" size={24} color="#5B37B7" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#5B37B7",
                    }}
                  >
                    Home
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row", columnGap: 5 }}>
                <Feather name="home" size={24} color="#44475C" />
              </View>
            ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "100%",
                  height: 38,
                  borderColor: "#F6D6EE",
                  borderWidth: 1,
                  backgroundColor: "#F6D6EE",
                  borderRadius: 19.03,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", columnGap: 5 }}>
                  <AntDesign name="hearto" size={24} color="#C9379D" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#C9379D",
                    }}
                  >
                    Likes
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row", columnGap: 5 }}>
                <AntDesign name="hearto" size={24} color="#44475C" />
              </View>
            ),
          headerTitle: "Favorites",
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "100%",
                  height: 38,
                  borderColor: "#FBEFD3",
                  borderWidth: 1,
                  backgroundColor: "#FBEFD3",
                  borderRadius: 19.03,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", columnGap: 5 }}>
                  <AntDesign name="search1" size={24} color="#E6A919" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#E6A919",
                    }}
                  >
                    Search
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row", columnGap: 5 }}>
                <AntDesign name="search1" size={24} color="#44475C" />
              </View>
            ),
            title: "ค้นหาจากทั้งหมด"
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: "100%",
                  height: 38,
                  borderColor: "#D1EBEF",
                  borderWidth: 1,
                  backgroundColor: "#D1EBEF",
                  borderRadius: 19.03,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", columnGap: 5 }}>
                  <MaterialCommunityIcons name="account-circle-outline" size={24} color="#1194AA" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#1194AA",
                    }}
                  >
                    Profile
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ flexDirection: "row", columnGap: 5 }}>
                <MaterialCommunityIcons name="account-circle-outline" size={24} color="#44475C" />
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
