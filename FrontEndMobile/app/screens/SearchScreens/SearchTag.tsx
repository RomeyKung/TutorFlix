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
const SearchTag = ({ navigation, route }) => {
  //เอาข้อมูลจาก store.course มาใช้ โดยใช้ useSelector
  console.log("//////////////////////////////////////////SearchTag//////////////////////////////////////////")
  const courseAll = useSelector(state => state.course.Courses);
  // console.log("courseAll", courseAll)

  const [filterCat, setFilterCat] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const filter = courseAll.filter((item) => item.topic.toLowerCase().includes(search.toLowerCase()));
    setFilterCat(filter);

  }, [search]);
  console.log("filterCat", filterCat)

  return (
    <View>
      {/* <Text></Text> */}
      <View>
        <SearchBar setSearch={setSearch} search={search} />
      </View>
      <FlatList
        data={filterCat}
        renderItem={({ item }) => (
          <View style={styles.textbox}>
            <Tag
              title={item.topic}
              function={() =>
                navigation.navigate("TagTutor", {
                  course: item,
                })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.courseId}
      />
    </View>
    // <Text>Test</Text>
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
