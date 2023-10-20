import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import ButtonCustom from "./ButtonCustom";
import { useFonts } from "expo-font";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";

const ModalReview = (props) => {
  //for foce rerender
  const rerender = props.rerender;
  const setRerender = props.setRerender;

  const courseId = props.courseId;
  const userReview = props.packUser;
  const { uid, img, ufirstName, ulastName, uname } = userReview;

  // const userName = props.userName;
  const [isVisible, setIsVisible] = useState(false);
  const [worth, setWorth] = useState("");
  const [content, setContent] = useState("");
  const [techniq, setTechniq] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  const [loaded] = useFonts({
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    PakkadThin: require("../../assets/fonts/PakkadThin.ttf"),
  });

  if (!loaded) {
    return <Text style={styles.text}>Loading fonts...</Text>;
  }
  const showModal = () => {
    setIsVisible(true);
  };
  const hideModal = () => {
    setIsVisible(false);
  };

  const addReview = async () => {
    try {
      const reviewsCollection = collection(FIREBASE_DB, "Reviews");
      const newReview = {
        // userReview: userReview,
        userName: uname,
        userId: uid,
        uimg: img,
        ufirstName: ufirstName,
        ulastName: ulastName,

        courseId: courseId,
        worth: worth,
        content: content,
        techniq: techniq,
        additionalComments: additionalComments,
      };

      // เพิ่มเรื่องรีวิวใหม่ในคอลเลคชัน "Reviews" และรับ ID ที่ถูกสร้างโดยอัตโนมัติ
      const newReviewRef = await addDoc(reviewsCollection, newReview);
      console.log("Review added with ID: ", newReviewRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const clearReview = () => {
    setWorth("");
    setContent("");
    setTechniq("");
    setAdditionalComments("");
  };

  const submitReview = () => {
    // ทำการนำข้อมูลที่ผู้ใช้กรอกไปใช้งานต่อ
    console.log("Review submitted:", {
      worth,
      content,
      techniq,
      additionalComments,
    });
    addReview();
    // ปิด Modal
    setRerender(!rerender);
    hideModal();
    clearReview();
  };

  return (
    <View>
      <ButtonCustom title="เขียนรีวิว" function={showModal} />
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>รีวิว</Text>

                {/* 1. ความคุ้มค่า */}
                <View style={styles.reviewItem}>
                  <Text style={styles.text}>ความคุ้มค่า</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 5,
                    }}
                  >
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={worth}
                      onChangeText={(text) => setWorth(text)}
                    />
                    <Text style={styles.text}>/10</Text>
                  </View>
                </View>

                {/* 2. เนื้อหาที่สอน */}
                <View style={styles.reviewItem}>
                  <Text style={styles.text}>เนื้อหาที่สอน</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 5,
                    }}
                  >
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={content}
                      onChangeText={(text) => setContent(text)}
                    />
                    <Text style={styles.text}>/10</Text>
                  </View>
                </View>

                {/*3. เทคนิคในการ */}
                <View style={styles.reviewItem}>
                  <Text style={styles.text}>เทคนิคในการ</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 5,
                    }}
                  >
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={techniq}
                      onChangeText={(text) => setTechniq(text)}
                    />
                    <Text style={styles.text}>/10</Text>
                  </View>
                </View>

                {/* ช่องคำบรรยายเพิ่มเติม */}
                <View style={styles.reviewItemArea}>
                  <Text style={styles.text}>คำบรรยายเพิ่มเติม</Text>
                  <TextInput
                    style={styles.inputArea}
                    multiline
                    numberOfLines={4}
                    placeholder="บรรยายเพิ่มเติม..."
                    value={additionalComments}
                    onChangeText={(text) => setAdditionalComments(text)}
                  />
                </View>

                {/* ปุ่ม Submit */}
                {/* <Button title="Submit" onPress={submitReview} /> */}
                <View
                  style={{ flexDirection: "row", alignContent: "space-around" }}
                >
                  <ButtonCustom title="โพสต์รีวิว" function={submitReview} />
                  <ButtonCustom title="กลับ" function={hideModal} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  reviewItemArea: {
    marginBottom: 15,
    // flexDirection: "row",
    // alignItems: "center",
    // columnGap: 10,
  },
  input: {
    width: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#F9F9F9",
  },
  inputArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#F9F9F9",
  },
  text: {
    fontWeight: "600",
    fontFamily: "Montserrat-Regular",
  },
});

export default ModalReview;
