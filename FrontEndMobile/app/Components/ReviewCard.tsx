import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import ButtonCustom from "./ButtonCustom";
import { deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const tutorInfo = {
  img: require("../../assets/img/Anya.jpg"),
  name: "Anya",
  subject: "Math",
  cost: 200,
  rating: 4.5,
};

const ReviewCard = (props) => {
  console.log(
    "//////////////////////////////////////////ReviewCard//////////////////////////////////////////"
  );
  const review = props.review;
  // console.log("review:", review);
  const {
    content,
    additionalComments,
    techniq,
    uimg,
    worth,
    userName,
    userId,
  } = review;
  const setFoceRender = props.function;
  const foceRender = props.foceRender;
  const calculateRating = props.calculateRating;

  const deleteReview = async () => {
    const reviewRef = doc(FIREBASE_DB, "Reviews", review.reviewId);
    await deleteDoc(reviewRef);
    // fetchReviews();
    setFoceRender(!foceRender);
  };
  useEffect(() => {
    // code
    calculateRating(worth, content, techniq);
  }, []);
  // console.log( "Here2"+ uimg);
  // console.log(props.review)

  return (
    <View>
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.textSpace, { paddingTop: 20 }]}>
          <Image
            style={styles.reviewImg}
            source={uimg ? { uri: uimg } : require("../../assets/img/Anya.jpg")}
          ></Image>
        </View>
        <View style={styles.textSpace}>
          <Text style={{ paddingVertical: 10 }}>{userName}</Text>
        </View>
      </View>
      <View style={[styles.textSpace, { flexDirection: "column", gap: 10 }]}>
        <Text>ความคุ้มค่า {worth}/10</Text>
        <Text>เนื้อหาที่สอน {content}/10</Text>
        <Text>เทคนิคในการสอน {techniq}/10</Text>
      </View>
      <View
        style={{
          width: "80%",
          paddingTop: 10,
          paddingBottom: 10,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text style={styles.textSpace}>{additionalComments}</Text>
      </View>
      <View style={[styles.reviewBorder]}>
        <View
          style={{ opacity: userId === FIREBASE_AUTH.currentUser?.uid ? 1 : 0 }}
        >
          <ButtonCustom
            title={"ลบ comment"}
            function={deleteReview}
            color="red"
            font="white"
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
    borderRadius: 90,
  },
  reviewImg: {
    width: 70,
    height: 70,
    borderRadius: 90,
  },
  imgPosition: {
    alignItems: "center",
    paddingVertical: 40,
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
  text: {
    fontWeight: "800",
    fontSize: 18,
  },
  textSpace: {
    paddingLeft: 30,
  },
  contactPosition: {
    paddingLeft: 30,
    marginTop: 5,
    gap: 10,
    flexDirection: "row",
  },
  iconImg: {
    width: 30,
    height: 30,
  },
  button: {
    width: "40%",
    justifyContent: "center",
    padding: 10,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    marginRight: 20,
  },
  reviewBorder: {
    width: "80%",
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBlockColor: "black",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
});
