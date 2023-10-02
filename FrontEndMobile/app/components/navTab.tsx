import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View, Text } from 'react-native'

//import screens
import HomeScreen from '../screens/HomeScreen'


const Tab = createBottomTabNavigator()
const navTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    )
}

export default navTab
