import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
interface TeacherProps {
  // children?: React.ReactNode;
  function?: () => void;
  likeAlready?: any;
  name: String;
  topic: String;
  price: Number;
  rating: Number;
  img?: any;
  courseId?: String;
  item:any;
}

function TeacherCard(props: TeacherProps) {
  const courseId = props.courseId;
  // console.log("//////////////////TeacherCard//////////////////===>", courseId);
  // console.log("courseIdCurrentCard:", courseId);
  const [name, setName] = useState<String>("anyone");
  const [topic, setTopic] = useState<String>("topic");
  const [price, setPrice] = useState<Number>(0);
  const [rating, setRating] = useState<Number>(0);
  const [img, setImg] = useState<any>(null);
  const item = props.item;
  // console.log("item:", item);

  const [userFav, setUserFav] = useState<boolean>(props.likeAlready);
//toggle ui
  const toggleFavorite = () => {
    setUserFav(!userFav);
  };
  //check for update ui
  const checkFav = async () => {
    const userRef = doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid);
    const userNow = await getDoc(userRef);
    // console.log("userNow:", userNow.data().favorite);
  
    if (userNow.data().favorite) {
      // เช็คว่าคอร์สปัจจุบันอยู่ในรายการ favorite หรือไม่
      
      const isFavorite = userNow.data().favorite.some( course => course.courseId === courseId);
      // console.log("isFavorite:", isFavorite);
      // console.log("courseIdinside:", courseId);
      setUserFav(isFavorite);
    }
  };
  
  const addToDB = async () => {
    const userRef = doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid);
    const userNow = await getDoc(userRef);
    // console.log("userNow:", userNow.data().favorite);
    if (userNow.data().favorite == undefined) {
      // console.log("itemInFunction:", item),
      await updateDoc(userRef, {
        favorite: [
          {
            item:item,
            courseId: courseId,
            name: name,
            topic: topic,
            price: price,
            rating: rating,
            img: img,
           
          },
        ],
      });
    } else {
      await updateDoc(userRef, {
        favorite: [
          ...userNow.data().favorite,
          {
            item:item,
            courseId: courseId,
            name: name,
            topic: topic,
            price: price,
            rating: rating,
            img: img,
          },
        ],
      });
    }
  };
  const removeFromDB = async () => {
    const userRef = doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid);
    const userNow = await getDoc(userRef);
    
    if (userNow.data().favorite) {
      const updatedFavorite = userNow.data().favorite.filter(item => item.courseId !== courseId);
      await updateDoc(userRef, {
        favorite: updatedFavorite,
      });
    }
  
    toggleFavorite(); // อัปเดตสถานะใน UI
  };
  
  // ฟังก์ชันสำหรับเพิ่มหรือลบคอร์สในรายการ favorite
  const toggleFavInDB = () => {
    if (userFav) {
      // remove from favorite
      // console.log("remove from favorite");
      removeFromDB();
    } else {
      // add to favorite
      addToDB();
      toggleFavorite();
      // console.log("add to favorite");
    }
  };

  useEffect(() => {
    // console.log(props.img)
    // setCourseId(props.courseId);
    setName(props.name);
    setTopic(props.topic);
    setPrice(props.price);
    setRating(props.rating);
    setImg(props.img);
    checkFav();
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={props.function}>
      <View style={styles.imgSide}>
        <Image
          style={styles.img}
          source={img ? { uri: img } : require("../../assets/img/Anya.jpg")}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.text}>{name}</Text>
        <Text style={[styles.text, { color: "#4CA771" }]}>{topic}</Text>
        <Text style={[styles.text, { color: "#0487FF" }]}>
          THB {price.toString()}/hr
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.rating}>
            <Image
              style={{ height: 25 }}
              source={require("../../assets/icons/star.png")}
              resizeMode="contain"
            />
            <Text
              style={[styles.text, { color: "#fff", fontWeight: "normal" }]}
            >
              {rating.toString()}
            </Text>
          </View>

          {/* Favorite Button */}
          <Pressable onPress={toggleFavInDB}>
            <MaterialCommunityIcons
              style={{ marginTop: 10 }}
              name={userFav ? "heart" : "heart-outline"}
              size={30}
              color={userFav ? "#FF0000" : "#000"}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TeacherCard;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20, // Add some horizontal padding
  },
  imgSide: {
    width: "30%", // Set the image width to 30% of the card width
    height: "100%", // Set the image height to 100% of the card height
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1, // Take the remaining space in the card
    paddingHorizontal: 10, // Add some horizontal padding
    marginHorizontal: 20,
  },
  text: {
    fontWeight: "800",
    fontSize: 18,
  },
  rating: {
    width: 70,
    height: 30,
    marginTop: 10,
    backgroundColor: "#000",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});
