import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Block from "../../Components/Block";

const HomeScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.banner}>
        <View style={{ flexDirection: "row", columnGap: 18 }}>
          <Image
            resizeMode="contain"
            style={{ height: 59, width: 60 }}
            source={require("../../../assets/icons/logo.png")}
          />
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            TutorFlix
          </Text>
        </View>
      </View>
      {/* <TeacherCard /> */}
      {/* //content */}
      <View style={[styles.container]}>
        <FlatList
          data={[
            { color: "#FF7C55", title: "ความบันเทิง",  },
            { color: "#FFA800", title: "วิชาการ", },
            { color: "#4CA771", title: "ทั่วไป", },
            // Add more items here if needed
          ]}
          renderItem={({ item }) => (
            <Block bgColor={item.color} title={item.title} function={()=>navigation.navigate("HomeTag", {type: item.title})}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    // justifyContent:"space-around",
    // rowGap:30,
  },
  banner: {
    width: "100%",
    height: 95,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
