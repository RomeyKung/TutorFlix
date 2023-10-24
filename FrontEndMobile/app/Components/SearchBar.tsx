import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";


const SearchBar = (props) => {
    {   
        // const [searchPhrase, setSearchPhrase] = useState("");
        const searchPhrase = props.search
        const setSearchPhrase = props.setSearch
        // const [isFocus, setIsFocus] = useState(false)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.searchBar_unclicked}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Feather name="search" size={20} color="black" />
                            <TextInput style={styles.input}
                                placeholder="Search"
                                value={searchPhrase}
                                onChangeText={setSearchPhrase}
                            />
                        </View>
                        {searchPhrase !== "" ? <TouchableOpacity onPress={ () => setSearchPhrase("")}>
                            <Entypo name="cross" size={20} color="black" />
                        </TouchableOpacity> : null}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
export default SearchBar

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    searchBar_unclicked: {
        marginLeft: 20,
        padding: 10,
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "85%",
        fontFamily : 'Montserrat'

    },
});
