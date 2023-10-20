import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import SearchBar from "../../Components/SearchBar";
import Tag from "../../Components/Tag";
import { useSelector } from "react-redux";

const HomeTag = ({ navigation, route }) => {
  const courseAll = useSelector((state) => state.course.Courses);
  const category = route.params.type;

  const [filterCat, setFilterCat] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filter = courseAll.filter(
      (item) => item.category === category && item.topic.toLowerCase().includes(search.toLowerCase())
    );
    setFilterCat(filter);
  }, [search]);

  const extractUniqueTopics = () => {
    // ดึงข้อมูล topic ทั้งหมดจากคอร์สในหมวดหมู่ที่เลือก
    const allTopics = courseAll
      .filter((item) => item.category === category)
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
        renderItem={({ item }:any) => (
          <View style={styles.textbox}>
            <Tag
              title={item}
              function={() =>
                navigation.navigate("HomeTutor", {
                  // ส่งคอร์สที่มี topic เดียวกันไปยังหน้า HomeTutor
                  courses: courseAll.filter(
                    (course) => course.category === category && course.topic === item
                  ),
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
  },
  textbox: {
    flexDirection: "column",
    width: "100%",
  },
});
