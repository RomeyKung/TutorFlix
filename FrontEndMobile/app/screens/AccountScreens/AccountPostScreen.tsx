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
  //fetch all Course from firebase

  const [courseList, setCourseList] = useState([]);
  const fetchCourse = async () => {
    const courseCollection = collection(FIREBASE_DB, "Courses");
    const courseSnapshot = await getDocs(courseCollection);
    const courseList = courseSnapshot.docs.map((doc) => doc.data());
    setCourseList(courseList);
    console.log("CourseList" + JSON.stringify(courseList));
  };

  const [category, setCategory] = useState("วิชาการ");
  const [topic, setTopic] = useState("เพิ่มหัวข้อใหม่");
  const [content, setContent] = useState("");
  const [newTopic, setNewTopic] = useState(""); // เพิ่ม state สำหรับหัวข้อใหม่

  useEffect(() => {
    fetchCourse();
  }, [category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleTopicChange = (value) => {
    setTopic(value);
    // เมื่อเลือก "เพิ่มหัวข้อใหม่" ใน drop-down หัวข้อ
    // ให้ล้างค่าของหัวข้อที่สอนใน TextInput
    if (value === "เพิ่มหัวข้อใหม่") {
      setContent("");
    }
  };

  const handleContentChange = (value) => {
    setContent(value); // เมื่อผู้ใช้พิมหัวข้อที่สอน
  };

  const handleNewTopicChange = (value) => {
    setNewTopic(value); // เมื่อผู้ใช้พิมหัวข้อใหม่
  };

  const addCourse = async (category, topic, content) => {
    const courseCollection = collection(FIREBASE_DB, "Courses");

    try {
      const newDocRef = await addDoc(courseCollection, {
        id: FIREBASE_AUTH.currentUser.uid,
        category: category,
        topic: topic,
        content: content,
      });
      console.log("Document added with ID: ", newDocRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, [category]);

  const handlePostBlog = () => {
    // ทำสิ่งที่คุณต้องการเมื่อกดปุ่มโพสต์บล็อก
    console.log("///////////////////////////////////////");
    console.log("Category:", category);
    console.log("Topic:", topic);
    console.log("New Topic:", newTopic); // เพิ่มการแสดงค่าหัวข้อใหม่
    console.log("Content:", content);

    if (topic === "เพิ่มหัวข้อใหม่") {
      addCourse(category, newTopic, content);
    } else {
      addCourse(category, topic, content);
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
            .filter((course) => course.category === category) // กรองรายการคอร์สตามประเภทที่ถูกเลือก
            .map((course) => (
              <Picker.Item
                label={course.topic}
                value={course.topic}
                key={course.topic}
              />
            ))}
        </Picker>

        {topic === "เพิ่มหัวข้อใหม่" && ( // แสดง TextInput เมื่อเลือก "เพิ่มหัวข้อใหม่"
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
          numberOfLines={4} // ปรับตามความต้องการ
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
    justifyContent: "center", // จัดเรียง UI ตามแนวแนวตั้ง
    // alignItems: 'center', // จัดเรียง UI ตามแนวนอน
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
    // position: "absolute",
    // bottom: 0,
  },
});
