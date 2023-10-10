import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
const HomeTutor = ({ navigation, route }) => {
  const subObj = route.params.subObj;
  const { idAcc, title, rating, price, lesson } = subObj;

  useEffect(() => {
    console.log(subObj)
  }, []);

  return (
    <View>
      <View>
        <SearchBar />
      </View>
      <View style={styles.cardbox}>
        <TeacherCard
          // img={img}
          name={idAcc}
          title={title}
          rating={rating}
          price={price}
          function={() =>
            navigation.navigate("HomeTutorDetail", { subObj: subObj })
          }
        />
      </View>
    </View>
  );

  // return <SearchTutorSystem />;
};
export default HomeTutor;

const styles = StyleSheet.create({
  cardbox: {
    flexDirection: "column",
    alignItems: "center",
  },
});
