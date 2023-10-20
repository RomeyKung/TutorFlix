import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";
const SearchTutor = ({ navigation, route }) => {
  console.log(
    "//////////////////////////////////////////SearchTutor//////////////////////////////////////////"
  );
  const [course, setCourse] = useState(route.params.course);
  console.log("course:", course);
  const content = course.content;
  const topic = course.topic;
  const teacherInfo = course.teacherInfo; 
  // console.log("teacherInfo:", teacherInfo);
  const { email, firstName, lastName, phone, img, social, history } = teacherInfo[0]; 

  const rating = course.rating ? course.rating : 0;
  const price = course.price;
  const imgPath = img.path;
  const { facebook, IG, line } = social;
  const reviews = course.reviews;
  console.log("reviews:", reviews);
  console.log("doc id:",course);
  const courseForSend = {
    courseId: course.courseId,
    content: content,
    topic: topic,
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    img: imgPath,
    social: social,
    rating: rating,
    price: price,
    imgPath: imgPath,
    facebook: facebook,
    IG: IG,
    line: line,
    history: history,
    reviews: reviews,
  };

  return (
    <View>
      <View>
        <SearchBar />
      </View>
      <View style={styles.cardbox}>
        <TeacherCard
          img={img}
          name={firstName + " " + lastName}
          topic={topic}
          rating={rating}
          price={price}
          function={() =>
            navigation.navigate("SearchTutorDetail", { course: courseForSend})
          }
        />
      </View>
    </View>
  );
};
export default SearchTutor;

const styles = StyleSheet.create({
  cardbox: {
    flexDirection: "column",
    alignItems: "center",
  },
});
