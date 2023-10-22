import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import { Favorite, FavoriteTutorDetail } from '../screens/Index'
const Stack = createStackNavigator()
const FavoriteStack = () => {
    return (
        <Stack.Navigator initialRouteName="Favorite">
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="FavoriteTutorDetail" component={FavoriteTutorDetail} />
        </Stack.Navigator>
    )
}

export default FavoriteStack
