import { StyleSheet, Text, View, TouchableOpacity , Button} from 'react-native'
import React from 'react'

interface Props {
    function?: () => void;
    title: string;
}

const Tag = (props: Props) => {
    return (
        <View >
            <TouchableOpacity onPress={props.function}>
                <Text style={styles.tagtext}># {props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Tag

const styles = StyleSheet.create({
    tagtext: {

        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 40,
       
        borderRadius : 20,
        borderLeftWidth : 0.5,
        borderRightWidth : 0.5,
        borderTopWidth : 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: "black",
        fontSize: 20,
        fontFamily : 'Montserrat',
       
    
    },
    textbox: {
        flexDirection: "column",
        width: "100%",
    }
})
