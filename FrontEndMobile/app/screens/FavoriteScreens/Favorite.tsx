import { View, Text } from "react-native";
import React from "react";
import TeacherCard from "../../Components/TeacherCard";
const Favorite = (props: any) => {

  return (
    <View style={{backgroundColor:"#fff", height:"100%", alignItems:"center"}}>
        
      <TeacherCard likeAlready={true}/>
    </View>
  );
};

export default Favorite;
