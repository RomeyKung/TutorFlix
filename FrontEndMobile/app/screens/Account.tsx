import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import { View, Text, Button } from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}


const Account = ({navigation}:RouterProps) => {
    return (
        <View>
            <Button onPress={()=> navigation.navigate('Details')} title="Open Details"/>
            <Button onPress={()=> FIREBASE_AUTH.signOut()} title="Logout"/>
        </View>
    )
}

export default Account
