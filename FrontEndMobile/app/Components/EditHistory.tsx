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
} from "react-native";
import ButtonCustom from "./ButtonCustom";
import { useFonts } from "expo-font";
const ImgIcon = {
  fb: require("../../assets/img/fbicon.png"),
  line: require("../../assets/img/lineicon.png"),
  ig: require("../../assets/img/igicon1.png"),
};

const EditHistory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [HistoryDetail, setHistoryDetail] = useState("");

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

  const SubmitHistory = () => {
    // ทำการนำข้อมูลที่ผู้ใช้กรอกไปใช้งานต่อ
    console.log("Review submitted:", {
      value1,
      value2,
      value3,
      HistoryDetail,
    });
    // ปิด Modal
    hideModal();
  };

  return (
    <View>
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
                <Text style={styles.modalTitle}>ประวัติ</Text>

                <View style={styles.reviewItemArea}>
                  <Text style={styles.text}>ประวัติการศึกษา</Text>
                  <TextInput
                    style={styles.inputArea}
                    multiline
                    numberOfLines={4}
                    placeholder="รายละเอียด"
                    value={HistoryDetail}
                    onChangeText={(text) => setHistoryDetail(text)}
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
                      value={value1}
                      placeholder="link Facebook"
                      onChangeText={(text) => setValue1(text)}
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
                      value={value2}
                      placeholder="link Instagram"
                      onChangeText={(text) => setValue2(text)}
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
                      value={value3}
                      placeholder="link LINE"
                      onChangeText={(text) => setValue3(text)}
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
    </View>
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

export default EditHistory;
