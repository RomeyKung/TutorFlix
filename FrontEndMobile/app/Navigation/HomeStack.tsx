import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  HomeTag,
  HomeTutor,
  HomeTutorDetail,
} from "../screens/Index";
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen}   options={{ headerShown: false }} />
      <Stack.Screen
        name="HomeTag"
        component={HomeTag}
        options={({ route }: any) => ({ headerTitle: route.params.type })}
      />
      <Stack.Screen
        name="HomeTutor"
        component={HomeTutor}
        options={({ route }: any) => ({
          // headerTitle: route.params.course.topic,
        })}
      />
      <Stack.Screen name="HomeTutorDetail" component={HomeTutorDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
