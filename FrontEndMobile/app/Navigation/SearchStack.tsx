import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TagSearch, TutorSearch } from "../screens/Index";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const Top = createMaterialTopTabNavigator();

const SearchStack = (props : any) => {
    return (   
    <Top.Navigator screenOptions={{tabBarIndicatorStyle: { backgroundColor: 'black', height: 2 }}}>
        <Top.Screen options={{title: "ค้นหาจาก TAG"}} name="TagSearch" component={TagSearch}/>
        <Top.Screen options={{title : "ค้นหาจากผู้สอน"}} name="TutorSearch" component={TutorSearch}/>
    </Top.Navigator>
    )
}
export default SearchStack 