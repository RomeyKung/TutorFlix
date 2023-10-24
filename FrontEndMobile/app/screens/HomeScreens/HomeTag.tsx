import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Tag from "../../Components/Tag";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";

const HomeTag = ({ navigation, route }) => {

  const courseAll = useSelector((state) => state.course.Courses);
  const category = route.params.type;
  const [search, setSearch] = useState("");

  // ฟังก์ชันสำหรับดึงแท็กที่ไม่ซ้ำกัน
  const extractUniqueTopics = () => {
    // ดึงข้อมูล topic ทั้งหมดจากคอร์สในหมวดหมู่ที่เลือก
    const allTopics = courseAll
      .filter(
        (item) =>
          item.category === category &&
          item.topic.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => item.topic);

    // ใช้ Set เพื่อลบข้อมูลที่ซ้ำกัน
    const uniqueTopics = [...new Set(allTopics)];

    return uniqueTopics;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{backgroundColor: "white", height: "100%"}}>
        <SearchBar setSearch={setSearch} search={search} />

        {/* แสดงแท็กที่ไม่ซ้ำกันจากคอร์สในหมวดหมู่ที่เลือก */}
        {extractUniqueTopics().map((item, index) => (
          <View style={styles.textbox} key={index}>
            <Tag
              title={item.toString()}
              function={() =>
                navigation.navigate("HomeTutor", {
                  // ส่งคอร์สที่มี topic เดียวกันไปยังหน้า HomeTutor
                  category: category,
                  topic: item,
                })
              }
            />
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeTag;

const styles = StyleSheet.create({
  tagtext: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 40,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 20,
    fontFamily : 'Montserrat',
  },
  textbox: {
    flexDirection: "column",
    width: "100%",
    fontFamily : 'Montserrat',
  },
});
