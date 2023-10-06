import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
interface Props {
  function?: () => void;
  title: string;
  color?: string;
}

const ButtonCustom = (props: Props | null) => {
  const colorBtn = props.color? props.color : "#FFF";
  return (
    <TouchableOpacity style={[styles.btn, {backgroundColor: colorBtn}]} onPress={props.function}>
      <Text style={styles.title}>{props.title} </Text>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 20,
    width: 130,
    height: 38,
    borderColor: "#000",
    borderWidth: 2,
    backgroundColor: "#FFF",
    borderRadius: 19,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
