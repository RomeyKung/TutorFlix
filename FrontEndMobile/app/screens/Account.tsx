import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import ModalReview from "../Components/ModalReview";
import ButtonCustom from "../Components/ButtonCustom";
import EditHistory from "../Components/EditHistory";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}


const UserInfo = {
  img: require("../../assets/img/boss.jpg"),
  email: "bossloveyou@email.com",
  phone: "0984623772",
  name: "BossserxGod 555",
};

const Account = ({ navigation }: RouterProps) => {
  const [CurrentEmail, setCurrentEmail] = useState(UserInfo.email)
const [Currentphone, setPhone] = useState(UserInfo.phone);
const [NewEmail, setNewEmail] = useState(CurrentEmail);
const [Newphone, setNewPhone] = useState(Currentphone);
const EditInfo = () => {
  // ทำการนำข้อมูลที่ผู้ใช้กรอกไปใช้งานต่อ
  console.log("Review submitted:", {
    NewEmail,
    Newphone,
  });
  // ปิด Modal
};


  return (
    <View>
      <View style={styles.View1}>
        <Image style={styles.img} source={UserInfo.img} resizeMode="contain" />
        <Text style={styles.txt}>{UserInfo.name}</Text>
      </View>
      <View style={styles.View2}>
        <View style={styles.test}>
          <Text style={styles.txt}>Email : </Text>
          <TextInput
            style={styles.input}
            value={NewEmail}
            // placeholder={UserInfo.email}
            onChangeText={(text) => setNewEmail(text)}
          />
        </View>
        <View style={styles.test}>
          <Text style={styles.txt}>phone : </Text>
          <TextInput
            style={styles.input}
            value={Newphone}
            keyboardType="phone-pad"
            onChangeText={(text) => setNewPhone(text)}
          />
        </View>
        {/* <Button onPress={()=> navigation.navigate('Details')} title="Open Details"/> */}
        {/* <Button onPress={()=> FIREBASE_AUTH.signOut()} title="Logout"/> */}
      </View>
      <View style={styles.modal}>
        {(Newphone === Currentphone) && (NewEmail === CurrentEmail) ? "" :  <ButtonCustom title="ยืนยันแก้ไข"  function={EditInfo}/>}
        
      

        <EditHistory />

        
      </View>
      <ButtonCustom title="โพสต์" function={ ()=> navigation.navigate("PostScreen")}/>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },

  modal: {
    gap: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  View1: {
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  View2: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  input: {
    backgroundColor: "#F3F3F3",
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontWeight: "bold",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontWeight: "bold",
  },
});

export default Account;
