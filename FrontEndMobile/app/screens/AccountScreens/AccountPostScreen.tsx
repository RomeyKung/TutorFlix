import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ButtonCustom from "../../Components/ButtonCustom";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const PostScreen = ({ navigation }) => {
  const [courseList, setCourseList] = useState([]);
  const fetchCourse = async () => {
    const courseCollection = collection(FIREBASE_DB, "Courses");
    const courseSnapshot = await getDocs(courseCollection);
    const courseList = courseSnapshot.docs.map((doc) => doc.data());
    setCourseList(courseList);
  };

  const [category, setCategory] = useState("วิชาการ");
  const [topic, setTopic] = useState("เพิ่มหัวข้อใหม่");
  const [content, setContent] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [price, setPrice] = useState(""); // เพิ่ม state สำหรับราคา
  useEffect(() => {
    fetchCourse();
  }, [category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleTopicChange = (value) => {
    setTopic(value);
    if (value === "เพิ่มหัวข้อใหม่") {
      setContent("");
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleNewTopicChange = (value) => {
    setNewTopic(value);
  };

  const handlePriceChange = (value) => {
    setPrice(value); // เมื่อผู้ใช้ใส่ราคา
  };

  const addCourse = async (category, topic, content, price) => {
    const courseCollection = collection(FIREBASE_DB, "Courses");

    try {
      const newDocRef = await addDoc(courseCollection, {
        id: FIREBASE_AUTH.currentUser.uid,
        category: category,
        topic: topic,
        content: content,
        price: price, // เพิ่มราคา
      });
      console.log("Document added with ID: ", newDocRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handlePostBlog = () => {
    // console.log("///////////////////////////////////////");
    // console.log("Category:", category);
    // console.log("Topic:", topic);
    // console.log("New Topic:", newTopic);
    // console.log("Content:", content);
    // console.log("Price:", price); // แสดงราคา

    if (topic === "เพิ่มหัวข้อใหม่") {
      addCourse(category, newTopic, content, price); // ส่งราคาเข้าไป
    } else {
      addCourse(category, topic, content, price); // ส่งราคาเข้าไป
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>เลือกหมวดหมู่:</Text>
        <Picker
          selectedValue={category}
          onValueChange={handleCategoryChange}
          style={styles.picker}
        >
          <Picker.Item label="วิชาการ" value="วิชาการ" />
          <Picker.Item label="ความบันเทิง" value="ความบันเทิง" />
          <Picker.Item label="ทั่วไป" value="ทั่วไป" />
        </Picker>

        <Text style={styles.title}>เลือกหัวข้อ:</Text>
        <Picker selectedValue={topic} onValueChange={handleTopicChange}>
          <Picker.Item label="เพิ่มหัวข้อใหม่" value="เพิ่มหัวข้อใหม่" />
          {courseList
            .filter((course) => course.category === category)
            .map((course) => (
              <Picker.Item
                label={course.topic}
                value={course.topic}
                key={course.topic}
              />
            ))}
        </Picker>

        {topic === "เพิ่มหัวข้อใหม่" && (
          <View>
            <Text style={styles.title}>หัวข้อใหม่:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="หัวข้อใหม่"
              onChangeText={handleNewTopicChange}
              value={newTopic}
            />
          </View>
        )}

        <Text style={styles.title}>หัวข้อที่สอน:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="หัวข้อที่สอน"
          onChangeText={handleContentChange}
          value={content}
          multiline={true}
          numberOfLines={4}
        />

        <Text style={styles.title}>ราคา:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ราคา"
          onChangeText={handlePriceChange}
          value={price}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonCustom title="โพสต์บล็อก" function={handlePostBlog} />
        <ButtonCustom title="กลับ" function={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 50,
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    width: "100%",
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 40,
    alignItems: "flex-end",
  },
});
