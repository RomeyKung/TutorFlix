import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";

const HomeTutor = ({ navigation, route }) => {
  const category = route.params.category;
  const courseAll = useSelector((state) => state.course.Courses);

  // กรองคอร์สทั้งหมดในหมวดหมู่ที่เลือก
  const coursesInCategory = courseAll.filter((course) => course.category === category);

  // แบ่งคอร์สตามหัวข้อ (topic)
  const topics = [...new Set(coursesInCategory.map((course) => course.topic))];

  return (
    <View>
      <View>
        <SearchBar />
      </View>
      <View style={styles.cardbox}>
        {topics.map((topic) => {
          return (
            <View key={topic}>
              <Text style={styles.topicTitle}>{topic}</Text>
              {coursesInCategory
                .filter((course) => course.topic === topic)
                .map((course) => {
                  const {
                    content,
                    teacherInfo,
                    courseId,
                    rating,
                    price,
                    reviews,
                  } = course;

                  const teacher = teacherInfo[0];
                  const { email, firstName, lastName, phone, img, social, history } = teacher;
                  const imgPath = img.path;
                  const { facebook, IG, line } = social;

                  const courseForSend = {
                    courseId,
                    content,
                    topic,
                    email,
                    firstName,
                    lastName,
                    phone,
                    img: imgPath,
                    social,
                    rating: rating ? rating : 0,
                    price,
                    imgPath,
                    facebook,
                    IG,
                    line,
                    history,
                    reviews,
                  };

                  return (
                    <TeacherCard
                      course={courseForSend}
                      navigation={navigation}
                      key={courseId}
                    />
                  );
                })}
            </View>
          );
        })}
      </View>
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
