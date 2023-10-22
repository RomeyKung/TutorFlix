import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";

const SearchTutor = ({ navigation, route }) => {
  // const category = route.params.category; //บันเทิง
  const topic = route.params?.topic; // dota2
  // console.log(category);
  // console.log(topic);

  const courseAll = useSelector((state) => state.course.Courses);
  const courseTopic = topic
    ? courseAll.filter((item) => item.topic === topic)
    : courseAll;
  // console.log(courseTopic);

  const [search, setSearch] = useState("");
  return (
    <ScrollView>
      <SearchBar setSearch={setSearch} search={search} />
      <FlatList
        scrollEnabled={false}
        data={courseTopic}
        renderItem={({ item }) => (
          // console.log(item),
          // console.log(item.teacherInfo[0].img.path),

          <TeacherCard
            courseId={item.courseId}
            item={item}
            name={
              item.teacherInfo[0].firstName + " " + item.teacherInfo[0].lastName
            }
            topic={item.topic}
            price={item.price}
            rating={item.rating ? item.rating : 0}
            img={item.teacherInfo[0].img.path}
            function={() =>
              navigation.navigate("SearchTutorDetail", {
                course: item,
              })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default SearchTutor;

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
