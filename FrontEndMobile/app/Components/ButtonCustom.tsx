import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
interface Props {
  function?: () => void;
  title: string;
  color?: string;
  font?: string;
}

const ButtonCustom = (props: Props | null) => {
  const colorBtn = props.color? props.color : "#FFF";
  const colorFont = props.font? props.font : "#000";
  return (
    <TouchableOpacity style={[styles.btn, {backgroundColor: colorBtn}]} onPress={props.function}>
      <Text style={[styles.title, {color:colorFont}]}>{props.title} </Text>
      <MaterialIcons name="keyboard-arrow-down" size={24} color={colorFont} />
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 20,
    width: 160,
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
    fontSize: 16,
    fontWeight: "200",
    color: "#000",
    textAlign: "center",
    fontFamily : 'prompt'
  },
});
