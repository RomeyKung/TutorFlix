import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
interface BlockProps {
  bgColor: string;
  title: string;
  function?: () => void;
}

const Block = (props:BlockProps) => {
  const [loaded] = useFonts({
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "PakkadThin": require("../../assets/fonts/PakkadThin.ttf"),
  });

  if (!loaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <TouchableOpacity style={[styles.block, { backgroundColor: props.bgColor }]} onPress={props.function}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
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
