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

const HomeTag = ({ navigation, route }) => {
  const data = [
    {
      idAcc: "NutThai",
      title: "Dota2",
      type: "ความบันเทิง",
      rating: 4.5,
      price: 250,
      lesson: {
        "1": "เริ่มต้นการเล่น",
        "2": "การเล่นเป็นทีม",
        "3": "การเล่นเป็นทีม",
      },
    },
    {
      idAcc: "Oak",
      title: "C++",
      type: "วิชาการ",
      rating: 4.5,
      price: 250,
      lesson: {
        "1": "เริ่มต้นการเล่น",
        "2": "การเล่นเป็นทีม",
        "3": "การเล่นเป็นทีม",
      },
    },
    {
      idAcc: "NutThai",
      title: "LOL",
      type: "ความบันเทิง",
      rating: 4.5,
      price: 250,
      lesson: {
        "1": "เริ่มต้นการเล่น",
        "2": "การเล่นเป็นทีม",
        "3": "การเล่นเป็นทีม",
      },
    },
  ];
  const type = route.params.type;
  const [allTag, setAllTag] = useState(data);
  const [tag, setTag] = useState([]);
  const [search, setSearch] = useState("");

  // const [tag, setTag] = useState([]);

  useEffect(() => {
    // request data from cloud firebase
    setTag(
      allTag.filter((item) => {
        // console.log("type", type);
        // console.log("item.type", item.type);
        // console.log("search.toLowerCase()", search.toLowerCase());
        return item.type === type && item.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search]);

  return (
    <View>
      <View>
        <SearchBar setSearch={setSearch} search={search} />
      </View>
      <FlatList
        data={tag}
        renderItem={({ item }) => (
          <View style={styles.textbox}>
            <Tag
              title={item.title}
              function={() =>
                navigation.navigate("HomeTutor", {
                  subject: item.title,
                  subObj: item,
                })
              }
            />
          </View>
        )}
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
