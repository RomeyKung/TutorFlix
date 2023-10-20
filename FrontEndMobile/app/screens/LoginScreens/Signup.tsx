import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Signup = (prop, { navigation }: any) => {
  //navigation
  const navigateToLogin = () => prop.navigation.navigate("Login");
  const navigateToMain = () => prop.navigation.navigate("Main");

  //logic for signup
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [isMatch, setIsMatch] = useState(true);
  const handleValidPassword = (val: string) => {
    if (val !== data.password) {
      setIsMatch(false);
    } else {
      setIsMatch(true);
    }
  };
  const [isPhone, setIsPhone] = useState(true);
  const handleValidPhone = (val: string) => {
    // ตรวจสอบว่าเป็นตัวเลขหรือไม่ และมีความยาวเท่ากับ 10 และเริ่มต้นด้วย 0
    const isPhoneNumberValid = /^[0-9]{10}$/.test(val) && val.startsWith("0");
    setIsPhone(isPhoneNumberValid);
  };

  const [data, setData] = useState({
    email: "",
    confirmPassword: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    img: {},
    social: {},
  });

  const addUserData = async (id: String, user: any) => {
    try {
      const { firstName, lastName, phone, email } = user;
      const img = {
        name: "blank-profile.webp",
        path: "https://firebasestorage.googleapis.com/v0/b/tutorflix-c64b4.appspot.com/o/images%2Fblank-profile.webp?alt=media&token=ad7c1084-a05f-4b22-a595-ddf2b39f9f82",
      };

      const docRef = await setDoc(doc(FIREBASE_DB, "Users", id.toString()), {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        history: "",
        social: {},
        img: {
          name: "blank-profile.webp",
          path: "https://firebasestorage.googleapis.com/v0/b/tutorflix-c64b4.appspot.com/o/images%2Fblank-profile.webp?alt=media&token=ad7c1084-a05f-4b22-a595-ddf2b39f9f82",
        },
      });
      // console.log("id user", id);
      // console.log("Document written with ID: ", docRef.id);

      return docRef;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  const signUp = async () => {
    const auth = FIREBASE_AUTH;
    const { email, password } = data;

    try {
      // Create user with email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // console.log("res: " + JSON.stringify(response));
      console.log("resUser: " + JSON.stringify(response.user.uid));
      // console.log(response);

      //add UserData to DB
      addUserData(response.user.uid, data);
      navigateToMain();
      alert("Check your email for verification");
    } catch (err: any) {
      console.log(err);
      alert("Sign up failed: " + err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
        <ScrollView>
          <Text style={styles.h1}>SIGN UP TO APP</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            inputMode="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.nativeEvent.text })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            inputMode="text"
            value={data.firstName}
            onChange={(e) =>
              setData({ ...data, firstName: e.nativeEvent.text })
            }
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            inputMode="text"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.nativeEvent.text })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Phone"
            inputMode="tel"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.nativeEvent.text })}
            onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
          />
          {!isPhone && (
            <Text style={{ color: "red" }}>
              Must be 10 numbers and start with 0
            </Text>
          )}
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.nativeEvent.text })}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.nativeEvent.text })
            }
            value={data.confirmPassword}
            onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
          />
          {!isMatch && (
            <Text style={{ color: "red" }}>Password does not match</Text>
          )}
        </ScrollView>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={styles.btn} onPress={signUp}>
            <Text style={{ color: "white" }}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "black" }]}
            onPress={navigateToLogin}
          >
            <Text style={{ color: "white" }}>Back</Text>
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  h1: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
  btn: {
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 158,
    justifyContent: "center",
    alignItems: "center",
  },
});
