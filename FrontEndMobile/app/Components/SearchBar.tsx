import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet, Button, TextInput, Keyboard } from "react-native";


const SearchBar = () => {
    {
        const [clicked, setClicked] = useState(false);
        const [searchPhrase, setSearchPhrase] = useState("");
        return (
            <View style={styles.container}>
                <View style={clicked ? styles.searchBar_clicked : styles.searchBar_unclicked}>
                    <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
                    <TextInput style={styles.input}
                        placeholder="Search"
                        value={searchPhrase}
                        onChangeText={setSearchPhrase}
                        onFocus={() => {
                            setClicked(true);
                        }}
                    />
                    {clicked && (
                        <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                            setSearchPhrase("")
                        }} />
                    )}
                </View>
                {clicked && (
                    <View>
                        <Button
                            title="Cancel"
                            onPress={() => {
                                Keyboard.dismiss();
                                setClicked(false);
                            }}
                        ></Button>
                    </View>
                )}
            </View>
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
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar_clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});