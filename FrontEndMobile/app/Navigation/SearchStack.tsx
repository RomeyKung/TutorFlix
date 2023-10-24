import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  TagSearch,
  TutorSearch,
  SearchTutorDetail,
  SearchTutorWithoutTopic,
} from "../screens/Index";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Top = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TagSearchStack = () => {
 

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TagSearch"
        component={TagSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TagTutor"
        component={TutorSearch}
        // options={({ route }) => ({ headerTitle: route.params })}
      />
      <Stack.Screen
        name="SearchTutorDetail"
        component={SearchTutorDetail}
        options={({ route }) => ({ headerTitle: route.params.course.topic })}
      />
    </Stack.Navigator>
  );
};

const TutorSearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TutorSearch"
        component={SearchTutorWithoutTopic}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SearchTutorDetail" component={SearchTutorDetail} />
    </Stack.Navigator>
  );
};

const SearchStack = (props: any) => {
  return (
    <Top.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
      }}
    >
      <Top.Screen
        options={{ title: "ค้นหาจาก TAG" }}
        name="TagSearchStack"
        component={TagSearchStack}
      />
      <Top.Screen
        options={{ title: "ค้นหาจากผู้สอน" }}
        name="TutorSearchStack"
        component={TutorSearchStack}
      />
    </Top.Navigator>
  );
};
export default SearchStack;
