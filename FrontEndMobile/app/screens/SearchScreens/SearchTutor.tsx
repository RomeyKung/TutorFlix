import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import SearchTutorSystem from "../../Components/SearchTutorSystem";
const TutorSearch = () => {
  return (
   <SearchTutorSystem/>
  );
};
export default TutorSearch;

const styles = StyleSheet.create({
  cardbox: {
    flexDirection: "column",
    alignItems: "center",
  },
});
