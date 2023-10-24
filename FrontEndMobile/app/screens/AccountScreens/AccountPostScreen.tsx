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
  console.log("//////////////////PostScreen//////////////////");
  function removeDuplicates(data) {
    const seen = new Set();
    return data.filter((item) => {
      const key = item.category + item.topic;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  const [courseList, setCourseList] = useState([]);
  const fetchCourse = async () => {
    const courseCollection = collection(FIREBASE_DB, "Courses");
    const courseSnapshot = await getDocs(courseCollection);
    const courseList = courseSnapshot.docs.map((doc) => doc.data());
    console.log("courseList:", courseList);
    setCourseList(removeDuplicates(courseList)); // spread the courseList array inside the Set constructor
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

    // ตรวจสอบว่ามีหัวข้อซ้ำใน Firestore หรือไม่
    const querySnapshot = await getDocs(courseCollection);
    const duplicateTopic = querySnapshot.docs.find((doc) => {
      const data = doc.data();
      return data.category === category && data.topic === topic;
    });

    // ตรวจสอบว่าข้อมูลทุกช่องถูกกรอกครบ
    if (!category || !topic || !content || !price) {
      Alert.alert("โปรดกรอกข้อมูลให้ครบ");
      return;
    } else if (isNaN(price)) {
      Alert.alert("ราคาต้องเป็นตัวเลขเท่านั้น");
      return;

    } else if (duplicateTopic) {
      Alert.alert("ขออภัย, หัวข้อนี้มีอยู่แล้ว");
      return;

    } else {
      try {
        const newDocRef = await addDoc(courseCollection, {
          id: FIREBASE_AUTH.currentUser.uid,
          category: category,
          topic: topic,
          content: content,
          price: price,
        });
        console.log("Document added with ID: ", newDocRef.id);
        Alert.alert("โพสต์บล็อกสำเร็จ");
        navigation.goBack();
        setCategory("วิชาการ");
        setTopic("เพิ่มหัวข้อใหม่");
        setContent("");
        setNewTopic("");
        setPrice(""); // เพิ่มราคา
      } catch (error) {
        console.error("Error adding document: ", error);
      }
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
   
    Alert.alert("โพสต์บล็อกสำเร็จ");
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>เลือกหมวดหมู่:</Text>
        <Picker
        style={[styles.picker, { fontSize:15, color:"black", fontFamily :'prompt'}]}
          selectedValue={category}
          onValueChange={handleCategoryChange}
          >
          <Picker.Item label="วิชาการ" value="วิชาการ" />
          <Picker.Item label="ความบันเทิง" value="ความบันเทิง" />
          <Picker.Item label="ทั่วไป" value="ทั่วไป" />
        </Picker>

        <Text style={styles.title}>เลือกหัวข้อ:</Text>
        <Text style={[styles.title, {fontWeight:"500", fontSize:15, color:"red", fontFamily :'prompt'}]}>**ดูหัวข้อที่เคย post เพื่อไม่ให้โพสต์ซ้ำ</Text>
        <Picker style={[styles.title, {fontWeight:"500", fontSize:15, color:"black", fontFamily :'prompt'}]}
        selectedValue={topic} onValueChange={handleTopicChange}>
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

        {/* {topic === "เพิ่มหัวข้อใหม่" && ( */}
          <View>
            <Text style={styles.title}>หัวข้อใหม่:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="หัวข้อใหม่"
              onChangeText={handleNewTopicChange}
              value={newTopic}
            />
          </View>
         {/* )} */}

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
        <View style={styles.buttonContainer}>
        <ButtonCustom title="โพสต์บล็อก" function={handlePostBlog} />
        <ButtonCustom title="กลับ" function={() => navigation.goBack()} />
      </View>
      </ScrollView>
      
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
    fontFamily :"prompt"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily :"prompt-bold"
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily :"prompt"
  },
  textArea: {
    width: "100%",
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    fontFamily :"prompt"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 40,
    alignItems: "flex-end",
    fontFamily :"prompt",
    marginBottom : 20,
    
  },
});
