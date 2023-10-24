import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import ButtonCustom from "./ButtonCustom";
import { useFonts } from "expo-font";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { doc, updateDoc } from "@firebase/firestore";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
const ImgIcon = {
  fb: require("../../assets/img/fbicon.png"),
  line: require("../../assets/img/lineicon.png"),
  ig: require("../../assets/img/igicon1.png"),
};

const EditHistory = (props) => {
  const { history, social, setHistory, setSocial } = props;
  const [isVisible, setIsVisible] = useState(false);


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
  const updateHistory = async () => {
    const user = doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser?.uid);
    await updateDoc(user, {
      history: history,
      social: social,
    });
    Alert.alert("อัปเดตข้อมูลเสร็จสิ้น");
  };



  const SubmitHistory = () => {
    // ทำการนำข้อมูลที่ผู้ใช้กรอกไปใช้งานต่อ
    // console.log("Review submitted:", {
    //   history,
    //   social,
    // });
    updateHistory();
    // ปิด Modal
    hideModal();
  };

  return (
    <Text>
      <ButtonCustom title="ใส่ข้อมูลประวัติ" function={showModal} />
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
              

                <View style={styles.reviewItemArea}>
                  <Text style={styles.text}>ประวัติการศึกษา</Text>
                  <TextInput
                    style={styles.inputArea}
                    multiline
                    numberOfLines={4}
                    placeholder="รายละเอียด"
                    value={history}
                    onChangeText={(text) => setHistory(text)}
                    
                  />
                </View>
                <View style = {styles.contactInfo}>
                <Image
                  style={styles.img}
                  source={ImgIcon.fb}
                  resizeMode="contain"
                />
                <TextInput
                      style={styles.input}
                      value={social?.facebook}
                      placeholder="link Facebook"
                      onChangeText={(text) => setSocial({...social, facebook: text}) }
                />
                    
                </View>
                <View style = {styles.contactInfo}>
                <Image
                  style={styles.img}
                  source={ImgIcon.ig}
                  resizeMode="contain"
                />
                <TextInput
                      style={styles.input}
                      value={social?.IG}
                      placeholder="link Instagram"
                      onChangeText={(text) => setSocial({...social, IG: text})}
                    />
                    
                </View>
                <View style = {styles.contactInfo}>
                <Image
                  style={styles.img}
                  source={ImgIcon.line}
                  resizeMode="contain"
                />
                <TextInput
                      style={styles.input}
                      value={social?.line}
                      placeholder="link LINE"
                      onChangeText={(text) => setSocial({...social, line: text})}
                    />
                    
                </View>

                {/* ปุ่ม Submit */}
                {/* <Button title="Submit" onPress={SubmitHistory} /> */}
                <View
                  style={{ flexDirection: "row", alignContent: "space-around" , marginTop : 10, gap : 20,}}
                >
                  <ButtonCustom title="บันทึก" function={SubmitHistory} />
                  <ButtonCustom title="กลับ" function={hideModal} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Text>
  );
};

const styles = StyleSheet.create({
  contactInfo : {
    flexDirection :  "row",
    gap : 20,
    alignItems : 'center',
    marginBottom : 10,
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
    height : '80%',
  width : '100%',
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
    width: '70%',
    height : 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    padding: 8,
    backgroundColor: "#F9F9F9",
    fontFamily : 'prompt'
  },
  inputArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#F9F9F9",
    fontFamily : 'prompt'
  },
  text: {
    fontFamily : 'prompt',
  },
});

export default EditHistory;
