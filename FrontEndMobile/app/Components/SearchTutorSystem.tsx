import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import TeacherCard from "./TeacherCard";
import SearchBar from "./SearchBar";

const SearchTutorSystem = () => {
  return (
    <ScrollView>
      <View>
        <SearchBar></SearchBar>
      </View>
      <View style={styles.cardbox}>
        <TeacherCard />
      </View>
    </ScrollView>
  );
};
export default SearchTutorSystem;

const styles = StyleSheet.create({
  cardbox: {
    flexDirection: "column",
    alignItems: "center",
  },
});
