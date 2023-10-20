import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import TeacherCard from "../../Components/TeacherCard";
import SearchBar from "../../Components/SearchBar";
import { useSelector } from "react-redux";

const HomeTutor = ({ navigation, route }) => {
  const category = route.params.category; // เพิ่มใหม่
  console.log("category:", category);
  const courseAll = useSelector((state) => state.course.Courses);

  // กรองคอร์สทั้งหมดในหมวดหมู่ที่เลือก
  const coursesInCategory = courseAll.filter((course) => course.category === category);

  return (
    <View>
      <View>
        <SearchBar />
      </View>
      <View style={styles.cardbox}>
        {coursesInCategory.map((course) => {
          const {
            content,
            topic,
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
            <FlatList
              data={coursesInCategory}
              renderItem={({ item }) => (
                <TeacherCard
                  course={courseForSend}
                  navigation={navigation}
                  key={courseId}
                />
              )}
             />
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
});
