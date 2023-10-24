import React, { useState } from "react";

import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import ButtonCustom from "./ButtonCustom";
import { useFonts } from "expo-font";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";


const ImgIcon = {
  fb: require("../../assets/img/fbicon.png"),
  line: require("../../assets/img/lineicon.png"),
  ig: require("../../assets/img/igicon1.png"),
};
const ModalContact = (props) => {
  // console.log("///////////ModalReview///////////");
  //for foce rerender
  const rerender = props.rerender;
  const setRerender = props.setRerender;

  const courseId = props.courseId;
  const userReview = props.packUser;
  const fbCon = props.fbCon;
  const igCon = props.igCon;
  const lineCon = props.lineCon;
  const blogID = props.blogId
  const uEmail = props.uEmail
  console.log( "This is uEmail : " + JSON.stringify(uEmail))
  console.log( "This is bloG id : " + JSON.stringify(blogID))
  console.log(fbCon, igCon, lineCon)
  const { uid, img, ufirstName, ulastName, uname } = userReview;
  const addEmail = async () => {
    try {
      const updatedCourseData = {
        unAllowEmail: arrayUnion(uEmail),
        // Email: arrayUnion(uEmail)
       // เพิ่มราคา
      };
      const courseRef = doc(FIREBASE_DB, "Courses", blogID);
      await updateDoc(courseRef, updatedCourseData);
      console.log("ADD EMAIL SUCCESS")
      hideModal()
  
    } catch (e) {
      console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล:", e);
    }
  };
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
      <ButtonCustom title="ติดต่อผู้สอน" function={showModal} />
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
                <Text style={styles.modalTitle}>ติดต่อผู้สอน</Text>

                {/* 1. ความคุ้มค่า */}
                <View style={styles.reviewItem}>
                  <Text style={styles.text}>ท่านสามารถติดต่อผู้สอนได้ที่</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 5,
                    }}
                  >
                    
                   


                    </View>
                    
                  </View>
                      <View style = {{flexDirection : "row",marginBottom : 10}}>
                  <Image
                        style={styles.img}
                        source={ImgIcon.fb}
                        resizeMode="contain"
                      />

                      <Text style={{textAlign : 'center', marginTop : 10, fontFamily : 'prompt'}}> : {fbCon}</Text>
                      </View>
                      <View style = {{flexDirection : "row", marginBottom : 10}}>
                  <Image
                        style={styles.img}
                        source={ImgIcon.ig}
                        resizeMode="contain"
                      />

                      <Text style={{textAlign : 'center', marginTop : 10, fontFamily : 'prompt' }}> : {igCon}</Text>
                      </View>
                      
                      <View style = {{flexDirection : "row",marginBottom : 10}}>
                  <Image
                        style={styles.img}
                        source={ImgIcon.line}
                        resizeMode="contain"
                      />

                      <Text style={{textAlign : 'center', marginTop : 10 ,  fontFamily : 'prompt'}}> : {lineCon}</Text>
                      </View>

                  {/* ปุ่ม Submit */}
                  {/* <Button title="Submit" onPress={submitReview} /> */}
                  <View
                    style={{ flexDirection: "row", alignContent: "space-around" }}
                  >
                   <ButtonCustom title="เสร็จสิ้น" function={addEmail} />
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
  contactInfo: {
    flexDirection: "row",
    gap: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
    width: 40,
    height: 40,

  },
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

    marginBottom: 10,
    fontFamily: 'prompt-bold'
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
    fontFamily: 'prompt'

  },
});

export default ModalContact;
