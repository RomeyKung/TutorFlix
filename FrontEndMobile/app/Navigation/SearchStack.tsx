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
        name="TagSearchTutor"
        component={TagTutor}
        options={({ route }) => ({ headerTitle: route.params.subject })}
      />
      <Stack.Screen name="SearchTutorDetail" component={SearchTutorDetail} />
    </Stack.Navigator>
  );
};

const TutorSearchStack = () => {return <View></View>};

const SearchStack = (props: any) => {
  return (
    <Top.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "black", height: 2 },
      }}
    >
      <Top.Screen
        options={{ title: "ค้นหาจาก TAG" }}
        name="TagSearch"
        component={TagSearchStack}
      />
      <Top.Screen
        options={{ title: "ค้นหาจากผู้สอน" }}
        name="TutorSearch"
        component={TutorSearchStack}
      />
     
    </Top.Navigator>
  );
};
export default SearchStack;
