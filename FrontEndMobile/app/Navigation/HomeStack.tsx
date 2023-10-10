import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {HomeScreen, HomeTag, HomeTutor, HomeTutorDetail} from "../screens/Index"
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HomeTag" component={HomeTag}   options={({route})=> (
        {headerTitle: route.params.type}
      )}/>
      <Stack.Screen name="HomeTutor" component={HomeTutor} options={({route})=> (
        {headerTitle: route.params.subject}
      )} />
    <Stack.Screen name="HomeTutorDetail" component={HomeTutorDetail}  />
    </Stack.Navigator>
  );
};

export default HomeStack;
