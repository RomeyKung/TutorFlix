import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../../FirebaseConfig";
import ModalReview from "../../Components/ModalReview";
import ButtonCustom from "../../Components/ButtonCustom";
import EditHistory from "../../Components/EditHistory";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc } from "@firebase/firestore";
import { updateDoc } from "firebase/firestore";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Account = ({ navigation }: RouterProps) => {
  const storeUser = useSelector((state: any) => state.user);
  // console.log("storeUser " + JSON.stringify(storeUser.img.path));

  const [currentImage, setCurrentImage] = useState(
    storeUser.img.path == null ? null : storeUser.img.path
  );
  // console.log("currentImage " + currentImage);

  const [newImage, setNewImage] = useState(currentImage);

  const [CurrentEmail, setCurrentEmail] = useState(storeUser.email);
  const [CurrentPhone, setCurrentPhone] = useState(storeUser.phone);

  const [NewEmail, setNewEmail] = useState(CurrentEmail);
  const [Newphone, setNewPhone] = useState(CurrentPhone);

  const [CurrentHistory, setCurrentHistory] = useState(storeUser.history);
  const [NewHistory, setNewHistory] = useState(CurrentHistory);

  const [CurrentSocial, setCurrentSocial] = useState(storeUser.social);
  const [NewSocial, setNewSocial] = useState(CurrentSocial);

  const [uploading, setUploading] = useState(false);
  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(newImage);
    const blob = await response.blob();
    const fileName = newImage.substring(newImage.lastIndexOf("/") + 1);

    try {
      //upload image to firebase storage
      const snapshot = await uploadBytes(
        ref(FIREBASE_STORAGE, "images/" + fileName),
        blob
      );

      //convert to url  // by get url from storage
      const reference = ref(FIREBASE_STORAGE, snapshot.ref.fullPath); //ref(FIREBASE_STORAGE, path ใน storage)
      const imageUrl = await getDownloadURL(reference);

      //sava url to firestore
      const user = doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser?.uid);
      await updateDoc(user, {
        img: { name: fileName, path: imageUrl },
      });

      setUploading(false);
      Alert.alert("อัปโหลดรูปภาพเสร็จสิ้น");
      setCurrentImage(imageUrl);
      setNewImage(imageUrl);
    } catch (e) {
      console.error(e);
      setUploading(false);
      Alert.alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
    }
  };
  // logic สำหรับอัปเดตข้อมูล
  const updatePhone = async () => {
    const user = doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser?.uid);
    await updateDoc(user, {
      phone: Newphone,
    });
    setCurrentPhone(Newphone);
    Alert.alert("อัปเดตข้อมูลเสร็จสิ้น");
  };
  //btn ยืนยันแก้ไข ไว้กด confirm แก้ไขข้อมูล
  const EditInfo = async () => {
    if (currentImage !== newImage) {
      uploadImage();
    }
    if (CurrentPhone !== Newphone) {
      updatePhone();
    }
  };

  // logic สำหรับเลือกรูปภาพ
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: "white"}}>
        <View style={styles.Profile}>
          {/* <Image style={styles.img} source={UserInfo.img} resizeMode="contain" /> */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.img}
              source={
                newImage
                  ? { uri: newImage }
                  : require("../../../assets/img/Anya.jpg")
              }
            />
          </TouchableOpacity>
          <Text style={styles.txt}>
            {storeUser.firstName} {storeUser.lastName}
          </Text>
        </View>
        <View style={styles.Contact}>
          <View style={styles.flexAndRow}>
            <Text style={styles.txt}>Email : </Text>
            <Text style={styles.input}>{NewEmail}</Text>
          </View>
          <View style={styles.flexAndRow}>
            <Text style={styles.txt}>Phone : </Text>
            <TextInput
              style={styles.input}
              value={Newphone}
              keyboardType="phone-pad"
              onChangeText={(text) => setNewPhone(text)}
            />
          </View>
          <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
        </View>

        <View style={styles.formBtn}>
          <View style={styles.btn}>
            {Newphone === CurrentPhone && currentImage === newImage ? (
              <View style={{ opacity: 0, height: 0 }}>
                <ButtonCustom title="ยืนยันแก้ไข" function={EditInfo} />
              </View>
            ) : (
              <ButtonCustom title="ยืนยันแก้ไข" function={EditInfo} />
            )}

            <EditHistory history={NewHistory} social={NewSocial} setHistory={setNewHistory} setSocial={setNewSocial}/>
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
      </View>
    </ScrollView>
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
    height: 200,

    // borderWidth: 2,
    // borderColor: "black",
  },
  btn: {
    marginBottom: 30,
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
    backgroundColor: "#FFF",
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
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default Account;
