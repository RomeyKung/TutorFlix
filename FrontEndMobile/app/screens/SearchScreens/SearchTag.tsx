import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import SearchBar from "../../Components/SearchBar";
import Tag from "../../Components/Tag";
import { useSelector } from "react-redux";

const SearchTag = ({ navigation, route }) => {
  const courseAll = useSelector((state) => state.course.Courses);
  // const category = route.params.type;

  const [search, setSearch] = useState("");

  // ฟังก์ชันสำหรับดึงแท็กที่ไม่ซ้ำกัน
  const extractUniqueTopics = () => {
    // ดึงข้อมูล topic ทั้งหมดจากคอร์สในหมวดหมู่ที่เลือก
    const allTopics = courseAll

      .map((item) => item.topic);

    // ใช้ Set เพื่อลบข้อมูลที่ซ้ำกัน
    const uniqueTopics = [...new Set(allTopics)];

    return uniqueTopics;
  };

  return (
    <View>
      <SearchBar setSearch={setSearch} search={search} />

      {/* แสดงแท็กที่ไม่ซ้ำกันจากคอร์สในหมวดหมู่ที่เลือก */}
      <FlatList
        data={extractUniqueTopics()}
        renderItem={({ item }) => (
          <View style={styles.textbox}>
            <Tag
              title={item.toString()}
              function={() =>
                navigation.navigate("TagTutor", {
                  // ส่งคอร์สที่มี topic เดียวกันไปยังหน้า HomeTutor
          
                  topic: item,
                })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item}
      />
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
