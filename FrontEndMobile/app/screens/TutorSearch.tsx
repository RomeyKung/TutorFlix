import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import TeacherCard from "../Components/TeacherCard";
import SearchBar from "../Components/SearchBar";


const TutorSearch = () => {
    return (
        <ScrollView>
            <View>
                <SearchBar></SearchBar>
            </View>
            <View style={styles.cardbox}>
                <TeacherCard></TeacherCard>
                <TeacherCard></TeacherCard>
                <TeacherCard></TeacherCard>
                <TeacherCard></TeacherCard>
            </View>
        </ScrollView>
    )
}
export default TutorSearch

const styles = StyleSheet.create({
    cardbox : {
        flexDirection : "column",
        alignItems : "center"
    }
})