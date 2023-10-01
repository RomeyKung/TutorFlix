import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [isMatch, setIsMatch] = useState(true);
  const [data, setData] = useState({
    email: "",
    confirmPassword: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleValidPassword = (val: string) => {
    if (val !== data.password) {
      setIsMatch(false);
    }
    setIsMatch(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.flex, { width: "100%" }]}>
        <Text style={styles.h1}>SIGN UP TO APP</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          inputMode="email"
          onChange={(e) => setData({ ...data, email: e.nativeEvent.text })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          inputMode="text"
          onChange={(e) => setData({ ...data, firstName: e.nativeEvent.text })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          inputMode="text"
          onChange={(e) => setData({ ...data, lastName: e.nativeEvent.text })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Phone"
          inputMode="tel"
          onChange={(e) => setData({ ...data, phone: e.nativeEvent.text })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => setData({ ...data, password: e.nativeEvent.text })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
            onChange={(e) =>
                setData({ ...data, confirmPassword: e.nativeEvent.text })
            }
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        />
        {!isMatch && (
          <Text style={{ color: "red" }}>Password does not match</Text>
        )}
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "black" }]}>
          <Text style={{ color: "white" }}>Back</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity></TouchableOpacity>    */}
    </SafeAreaView>
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
