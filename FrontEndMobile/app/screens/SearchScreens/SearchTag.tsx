import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Tag from "../../Components/Tag";
import { useSelector } from "react-redux";

const SearchTag = ({ navigation, route }) => {
  const courseAll = useSelector((state) => state.course.Courses);
  const [search, setSearch] = useState("");

  // ฟังก์ชันสำหรับดึงแท็กที่ไม่ซ้ำกัน
  const extractUniqueTopics = () => {
    // ดึงข้อมูล topic ทั้งหมดจากคอร์สที่ตรงกับเงื่อนไขการค้นหา
    const allTopics = courseAll
      .filter((item) => item.topic.toLowerCase().includes(search.toLowerCase()))
      .map((item) => item.topic);

    // ใช้ Set เพื่อลบข้อมูลที่ซ้ำกัน
    const uniqueTopics = [...new Set(allTopics)];

    return uniqueTopics;
  };

  return (
    <View style={{backgroundColor: "white", height: "100%"}}>
      <SearchBar setSearch={setSearch} search={search} />

      {/* แสดงแท็กที่ไม่ซ้ำกันจากคอร์สที่ตรงกับเงื่อนไขการค้นหา */}
      {extractUniqueTopics().map((item, index) => (
        <View style={styles.textbox} key={index}>
          <Tag
            title={item.toString()}
            function={() =>
              navigation.navigate("TagTutor", {
                // ส่งคอร์สที่มี topic เดียวกันไปยังหน้า TagTutor
                topic: item,
              })
            }
          />
        </View>
      ))}
    </View>
  );
};

export default SearchTag;

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
  },
  textbox: {
    flexDirection: "column",
    width: "100%",
  },
});
