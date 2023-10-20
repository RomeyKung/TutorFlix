import { View, Text } from "react-native";
import React from "react";
import TeacherCard from "../../Components/TeacherCard";
import { useSelector } from "react-redux";
const Favorite = (props: any) => {
  const user = useSelector((state: any) => state.user);
  console.log("user:", user);
  return (
    <View style={{backgroundColor:"#fff", height:"100%", alignItems:"center"}}>
        
      {/* <TeacherCard likeAlready={true} name={"rome"} title={"rome"} price={20} rating={5}/> */}
    </View>
  );
};

export default Favorite;
