import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function TeacherCard(props: any) {
  const teacherInfo = {
    img: require("../../assets/img/Anya.jpg"),
    name: "Anya",
    subject: "Math",
    cost: 200,
    rating: 4.5,
  };

  const [userFav, setUserFav] = useState<boolean>(props.likeAlready);

  const toggleFavorite = () => {
    setUserFav(!userFav);
  };


  return (
    <View style={styles.card}>
      <View style={styles.imgSide}>
        <Image
          style={styles.img}
          source={teacherInfo.img}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.text}>{teacherInfo.name}</Text>
        <Text style={[styles.text, { color: "#4CA771" }]}>
          {teacherInfo.subject}
        </Text>
        <Text style={[styles.text, { color: "#0487FF" }]}>
          THB {teacherInfo.cost}/hr
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.rating}>
            <Image
              style={{ height: 25 }}
              source={require("../../assets/icons/star.png")}
              resizeMode="contain"
            />
            <Text
              style={[styles.text, { color: "#fff", fontWeight: "normal" }]}
            >
              {teacherInfo.rating}
            </Text>
          </View>

          {/* Favorite Button */}
          <Pressable onPress={toggleFavorite}>
            <MaterialCommunityIcons
              name={userFav ? "heart" : "heart-outline"}
              size={30}
              color={userFav ? "#FF0000" : "#000"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TeacherCard;

const styles = StyleSheet.create({
  card: {
    width: 270,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    paddingHorizontal: 10, // Add some horizontal padding
  },
  imgSide: {
    width: "30%", // Set the image width to 30% of the card width
    height: "100%", // Set the image height to 100% of the card height
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1, // Take the remaining space in the card
    paddingHorizontal: 10, // Add some horizontal padding
  },
  text: {
    fontWeight: "800",
    fontSize: 18,
  },
  rating: {
    width: 70,
    height: 30,
    backgroundColor: "#000",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});
