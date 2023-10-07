import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import SearchBar from "../Components/SearchBar";


const TagSearch = () => {
    return (
        <ScrollView>
            <View>
                <SearchBar></SearchBar>
            </View>
            <View style={styles.textbox}>
                <Pressable onPress={() => {Alert.alert("กดปุ่มแล้ว ไอโง่!!")}}>
                    <Text style={styles.tagtext}>#Dota2</Text>
                </Pressable>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#English</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#Cook</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#Chemistry</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#Mathematics</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#Thai</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#Japan</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.tagtext}>#Programming</Text>
                </TouchableOpacity>
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

