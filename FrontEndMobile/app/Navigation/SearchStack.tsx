import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  TagSearch,
  TutorSearch,
  SearchTutorDetail,
  HomeTutor,
  
} from "../screens/Index";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Top = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TagSearchStack = () => {
  const TagTutor = HomeTutor;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TagSearch"
        component={TagSearch}
        options={{ headerTitle: "TAG ทั้งหมด" }}
      />
      <Stack.Screen
        name="TagTutor"
        component={TagTutor}
        options={({ route }) => ({ headerTitle: route.params.subject })}
      />
      <Stack.Screen
        name="SearchTutorDetail"
        component={SearchTutorDetail}
        options={({ route }) => ({ headerTitle: route.params.subject })}
      />
    </Stack.Navigator>
  );
};

const TutorSearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TutorSearch"
        component={TutorSearch}
        options={{ headerTitle: "ค้นหาจากผู้สอน" }}
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
