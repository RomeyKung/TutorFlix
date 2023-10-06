import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Block = (props) => {
  const [loaded] = useFonts({
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "PakkadThin": require("../../assets/fonts/PakkadThin.ttf"),
  });

  if (!loaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={[styles.block, { backgroundColor: props.bgColor }]}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  block: {
    width: 317,
    height: 124,
    borderRadius: 7,
    // alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    fontFamily: "PakkadThin",
  },
});
