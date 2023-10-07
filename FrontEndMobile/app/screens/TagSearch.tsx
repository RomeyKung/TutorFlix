import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import SearchBar from "../Components/SearchBar";
import Tag from "../Components/Tag";


const TagSearch = () => {
    return (
        <ScrollView>
            <View>
                <SearchBar></SearchBar>
            </View>
            <View style={styles.textbox}>
                <Tag title="Dota2"></Tag>
            </View>
        </ScrollView>
    )
}
export default TagSearch

const styles = StyleSheet.create({
    tagtext : {
        paddingHorizontal : 30,
        paddingVertical : 10,
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 40,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontSize : 20
    },
    textbox : {
        flexDirection : "column",
        width: "100%",
    }
})

