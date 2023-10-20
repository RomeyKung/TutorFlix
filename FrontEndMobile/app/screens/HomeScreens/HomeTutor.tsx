import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";

const HomeTutor = ({ navigation, route }) => {
  const category = route.params.category; //บันเทิง
  const topic = route.params.topic; // dota2

  const courseAll = useSelector((state) => state.course.Courses);
  const courseTopic = courseAll.filter(
    (item) => item.category === category && item.topic === topic
  );
  console.log(courseTopic);


  const [search, setSearch] = useState("");
  return(

    <View>
      <SearchBar setSearch={setSearch} search={search} />
      <FlatList
        data={courseTopic}
        renderItem={({ item }) => (
          console.log(item),
          
          // <TeacherCard
          //   name={"test"}
          //   topic={item.topic}
          //   price={item.price}
          //   rating={item.rating}
          //   img={item.teacherInfo.img}
          //   function={() =>
          //     navigation.navigate("HomeTutorDetail", {
          //       course: item,
          //     })
          //   }
          // />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>


  );
};

export default HomeTutor;

const styles = StyleSheet.create({
  cardbox: {
    flexDirection: "column",
    alignItems: "center",
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
