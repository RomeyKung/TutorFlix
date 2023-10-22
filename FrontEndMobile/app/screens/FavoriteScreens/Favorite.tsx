import { View, Text, FlatList } from "react-native";
import React from "react";
import TeacherCard from "../../Components/TeacherCard";
import { useSelector } from "react-redux";

const FavoriteTutor = (props: any) => {
  const user = useSelector((state: any) => state.user);


  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <FlatList
        data={user.favorite}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center" }}>
            <TeacherCard
              item={item}
              likeAlready={true}
              name={item.name}
              topic={item.topic}
              price={item.price}
              rating={item.rating}
              img={item.img}
              courseId={item.courseId}
              // แนบข้อมูลอื่น ๆ ตามความจำเป็น
              function={() =>
                props.navigation.navigate("FavoriteTutorDetail", {
                  course: item.item,
                })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.courseId}
      />
    </View>
  );
};

export default FavoriteTutor;
