import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    function?: () => void;
    title: string;
}

const Tag = (props: Props) => {
    return (
        <View>
            <TouchableOpacity onPress={props.function}>
                <Text style={styles.tagtext}>#{props.title}</Text>
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
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontSize: 20
    },
    textbox: {
        flexDirection: "column",
        width: "100%",
    }
})