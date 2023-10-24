import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ButtonCustom from "../../Components/ButtonCustom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import Swal from "sweetalert2";




const AccountEditScreen = ({ navigation }) => {
  
  const [selectedEmail, setSelectedEmail] = useState('');
  const [emailArray, setemailArray] = useState([]);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [postid, setPostid] = useState("");
  const [price, setPrice] = useState(""); // เพิ่ม state สำหรับราคา
  
  var handleTopicChange = (value) => {
    setTopic(value);

    if (value === "เลือกหัวข้อ") {
      setContent("");
      setPostid("");
      setPrice("");
      setemailArray([]);
 // เมื่อไม่มีคอร์สที่ถูกเลือกเป็นไปตามค่าว่าง  
    } else {
      const selectedCourse = courseList.find(
        (course) => course.topic === value
      );
        
      if (selectedCourse) {
        
        setemailArray(selectedCourse.unAllowEmail)
        setContent(selectedCourse.content);
        setPostid(selectedCourse.postid);
        setPrice(selectedCourse.price); // ดึงข้อมูลราคาจาก Firebase
       
      }
      console.log(emailArray)
    }
  };
  const handleEmailChange = (value) => {
    setSelectedEmail(value);
  };
  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleEditBlog = async () => {
    try {
      const updatedCourseData = {
        topic: topic,
        content: content,
        price: price, // เพิ่มราคา
        email : arrayUnion(selectedEmail),
        unAllowEmail : arrayRemove(selectedEmail)

      };

      const courseRef = doc(FIREBASE_DB, "Courses", postid);
      await updateDoc(courseRef, updatedCourseData);

      Alert.alert("Edit Post Success");
      navigation.goBack();
    } catch (e) {
      console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล:", e);
    }
  };

  const [courseList, setCourseList] = useState([]);
  const fetchCourse = async () => {
    const courseCollection = collection(FIREBASE_DB, "Courses");
    const courseSnapshot = await getDocs(courseCollection);
    const courseList = courseSnapshot.docs.map((doc) => ({
      ...doc.data(),
      postid: doc.id,
    }));
    setCourseList(courseList);
  };

  useEffect(() => {
    fetchCourse();
  }, [topic]);

  const handleRemoveBlog = (postid) => {
    Alert.alert("ยืนยันการลบ", "คุณแน่ใจหรือไม่ที่ต้องการลบโพสต์นี้?", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ลบ",
        onPress: async () => {
          try {
            const studentRef = doc(FIREBASE_DB, "Courses", postid);
            await deleteDoc(studentRef);
            console.log("ลบข้อมูลเรียบร้อยแล้ว");
            navigation.goBack();
          } catch (e) {
            console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", e);
          }
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ backgroundColor: "white" }}>
  <View style={styles.container}>
    <Text style={styles.title}>เลือกโพสต์:</Text>
    <View style={styles.picker}>
      <Picker
        selectedValue={topic}
        onValueChange={handleTopicChange}
        style={styles.picker}
      >
        <Picker.Item label="เลือกหัวข้อ" value="เลือกหัวข้อ" />
        {courseList
          .filter((course) => course.id === FIREBASE_AUTH.currentUser.uid)
          .map((course) => (
            <Picker.Item
              label={course.topic}
              value={course.topic}
              key={course.topic}
              style={{ fontFamily: "prompt", fontWeight: "300" }}
            />
          ))}
      </Picker>
    </View>

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
      onChangeText={(value) => setPrice(value)}
      value={price}
    />
 <Text style={styles.title}>Select an Email:</Text> 
    <View style={styles.emailPickerContainer}>
     
      <Picker
        selectedValue={selectedEmail}
        onValueChange={handleEmailChange}
        style={styles.picker}
      >
        <Picker.Item label="Select an Email" value="" />
        {emailArray.map((email) => (
          <Picker.Item
            label={email}
            value={email}
            key={email}
            style={{ fontFamily: "prompt", fontWeight: "300" }}
          />
        ))}
      </Picker>
    </View>

    <View style={styles.buttonContainer1}>
      <View style={styles.buttonContainer2}>
        <View style={{ height: 38, width: 140 }}></View>
        {topic === "เลือกหัวข้อ" ? (
          <View style={{ height: 38, width: 140 }}></View>
        ) : (
          <ButtonCustom
            title="ลบโพสต์"
            color="red"
            function={() => handleRemoveBlog(postid)}
          />
        )}
      </View>
      <View style={styles.buttonContainer2}>
        <ButtonCustom title="แก้ไขโพสต์" function={handleEditBlog} />
        <ButtonCustom title="กลับ" function={() => navigation.goBack()} />
      </View>
    </View>
  </View>
</ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AccountEditScreen;

const styles = StyleSheet.create({
  emailPickerContainer: {
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontFamily: 'prompt',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    position: "relative",
  },
  picker: {
    width: "100%",
    height: 50,
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily : 'prompt'
  },
  title: {
    fontSize: 20,
   
    marginVertical: 10,
    fontFamily :"prompt-bold",
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily : 'prompt'
  },
  textArea: {
    width: "90%",
    height: 100,
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    fontFamily : 'prompt'
  },
  buttonContainer1: {
    gap: 40,
    alignItems: "center",
  },
  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    alignItems: "flex-end",
  },
});
