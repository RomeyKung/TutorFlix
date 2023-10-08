import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ButtonCustom from "../Components/ButtonCustom";

const EditPost = ({ navigation }) => {
  const [category, setCategory] = useState("วิชาการ");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [newTopic, setNewTopic] = useState(""); // เพิ่ม state สำหรับหัวข้อใหม่

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
    setContent(value);
  };

  const handleNewTopicChange = (value) => {
    setNewTopic(value); // เมื่อผู้ใช้พิมหัวข้อใหม่
  };

  const handlePostBlog = () => {
    // ทำสิ่งที่คุณต้องการเมื่อกดปุ่มโพสต์บล็อก
    console.log("Category:", category);
    console.log("Topic:", topic);
    console.log("New Topic:", newTopic); // เพิ่มการแสดงค่าหัวข้อใหม่
    console.log("Content:", content);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>เลือกโพสต์:</Text>
      <Picker
        selectedValue={category}
        onValueChange={handleCategoryChange}
        style={styles.picker}
        placeholder="เลือกโพสต์ของตัวเอง"
      >
        <Picker.Item label="วิชาการ" value="วิชาการ" />
       
      </Picker>

      {/* <Text style={styles.title}>เลือกหัวข้อ:</Text>
      <Picker selectedValue={topic} onValueChange={handleTopicChange}>
        <Picker.Item label="เพิ่มหัวข้อใหม่" value="เพิ่มหัวข้อใหม่" />
        <Picker.Item label="หัวข้อ1" value="หัวข้อ1" />
        <Picker.Item label="หัวข้อ2" value="หัวข้อ2" />
        <Picker.Item label="หัวข้อ3" value="หัวข้อ3" />
      </Picker> */}

      <Text style={styles.title}>หัวข้อที่สอน:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="หัวข้อที่สอน"
        onChangeText={handleContentChange}
        value={content}
      />
        <View style ={styles.buttonContainer}>
      <ButtonCustom title="ลบโพสต์"  color = "red" function={handlePostBlog} />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCustom title="แก้ไขโพสต์" function={handlePostBlog} />
        <ButtonCustom title="กลับ" function={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    width: "90%",
    height: 100,
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

export default EditPost;
