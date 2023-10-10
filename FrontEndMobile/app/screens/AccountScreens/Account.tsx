import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import ModalReview from "../../Components/ModalReview";
import ButtonCustom from "../../Components/ButtonCustom";
import EditHistory from "../../Components/EditHistory";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const UserInfo = {
  img: require("../../../assets/img/boss.jpg"),
  email: "bossloveyou@email.com",
  phone: "0984623772",
  name: "BossserxGod 555",
};

const Account = ({ navigation }: RouterProps) => {
  const [CurrentEmail, setCurrentEmail] = useState(UserInfo.email);
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
      <View style={styles.Profile}>
        <Image style={styles.img} source={UserInfo.img} resizeMode="contain" />
        <Text style={styles.txt}>{UserInfo.name}</Text>
      </View>
      <View style={styles.Contact}>
        <View style={styles.flexAndRow}>
          <Text style={styles.txt}>Email : </Text>
          <TextInput
            style={styles.input}
            value={NewEmail}
            // placeholder={UserInfo.email}
            onChangeText={(text) => setNewEmail(text)}
          />
        </View>
        <View style={styles.flexAndRow}>
          <Text style={styles.txt}>phone : </Text>
          <TextInput
            style={styles.input}
            value={Newphone}
            keyboardType="phone-pad"
            onChangeText={(text) => setNewPhone(text)}
          />
        </View>
        {/* <Button onPress={()=> FIREBASE_AUTH.signOut()} title="Logout"/> */}
      </View>

      <View style={styles.formBtn}>
        <View style={styles.btn}>
          {Newphone === Currentphone && NewEmail === CurrentEmail ? (
            <View style={{ opacity: 0, height: 0 }}>
              <ButtonCustom title="ยืนยันแก้ไข" function={EditInfo} />
            </View>
          ) : (
            <ButtonCustom title="ยืนยันแก้ไข" function={EditInfo} />
          )}

          <EditHistory />
        </View>

        <View style={styles.btn}>
          <ButtonCustom
            title="โพสต์"
            function={() => navigation.navigate("AccountPostScreen")}
          />
          <ButtonCustom
            title="แก้ไขโพสต์"
            function={() => navigation.navigate("AccountEditScreen")}
          />
        </View>
      </View>
<<<<<<< Updated upstream:FrontEndMobile/app/screens/Account.tsx
     
      <ButtonCustom title="โพสต์" function={ ()=> navigation.navigate("PostScreen")}/>
      <ButtonCustom title="แก้ไขโพสต์" function={ ()=> navigation.navigate("EditPost")}/>
=======
>>>>>>> Stashed changes:FrontEndMobile/app/screens/AccountScreens/Account.tsx
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  formBtn: {
    flexDirection: "column",
    justifyContent: "space-between",
    height:"40%",
    // borderWidth: 2,
    // borderColor: "black",
  },
  btn: {
    gap: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  Profile: {
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  Contact: {
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
  flexAndRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontWeight: "bold",
  },
});

export default Account;
