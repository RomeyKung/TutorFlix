import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TagSearch  from "../screens/TagSearch"
import TutorSearch from "../screens/TutorSearch"
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const Top = createMaterialTopTabNavigator();

const Search = (props : any) => {
    return (   
    <Top.Navigator screenOptions={{tabBarIndicatorStyle: { backgroundColor: 'black', height: 2 }}}>
        <Top.Screen options={{title: "ค้นหาจาก TAG"}} name="Tag" component={TagSearch}/>
        <Top.Screen options={{title : "ค้นหาจากผู้สอน"}} name="Tutor" component={TutorSearch}/>
    </Top.Navigator>
    )
}
export default Search 