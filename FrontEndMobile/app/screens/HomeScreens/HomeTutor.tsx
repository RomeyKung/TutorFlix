import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";

const HomeTutor = ({ navigation, route }) => {


  const category = route.params.category; //บันเทิง
  const topic = route.params.topic; // dota2
  const [search, setSearch] = useState("");
  const courseAll = useSelector((state) => state.course.Courses);
  const [courseTopic, setCourseTopic] = useState(courseAll);

  useEffect(() => {
    const filteredCourse = courseAll.filter(
      (item) =>
        item.category === category &&
        item.topic === topic &&
        item.teacherInfo[0].firstName.toLowerCase().includes(search.toLowerCase())
    );
    setCourseTopic(filteredCourse);
  }, [search, category, topic, courseAll]);

  return (
    <ScrollView style={{backgroundColor: "white"}}>
      <SearchBar setSearch={setSearch} search={search} />
      {courseTopic.map((item) => (
        <View style={{ alignItems: "center" }} key={item.courseId}>
          <TeacherCard
            item={item}
            name={
              item.teacherInfo[0].firstName +
              " " +
              item.teacherInfo[0].lastName
            }
            courseId={item.courseId}
            topic={item.topic}
            price={item.price}
            rating={item.rating ? item.rating : 0}
            img={item.teacherInfo[0].img.path}
            function={() =>
              navigation.navigate("HomeTutorDetail", {
                course: item,
              })
            }
          />
        </View>
      ))}
    </ScrollView>
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
