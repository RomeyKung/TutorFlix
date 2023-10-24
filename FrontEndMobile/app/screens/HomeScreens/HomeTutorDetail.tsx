import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Pressable,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ButtonCustom from "../../Components/ButtonCustom";
import ReviewCard from "../../Components/ReviewCard";
import ModalReview from "../../Components/ModalReview";
import ModalContact from "../../Components/ModalContact";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateRating } from "../../Store/UsersSlice/CoursesSlice";
import { store } from "../../Store/Store";
import { useFonts } from "expo-font";

const HomeTutorDetail = ({ navigation, route }) => {
 

  //////////////////////////////////////////////////////////////////////////////////////
  //For user
  const storeUser = useSelector((state: any) => state.user);
  console.log( "Myeamil" + storeUser.email);
  const uid = FIREBASE_AUTH.currentUser.uid;
  const uimg = storeUser.img.path;
  const ufirstName = storeUser.firstName;
  const ulastName = storeUser.lastName;
  const uName = ufirstName + " " + ulastName;
  const uEmail = storeUser.email
  const packUser = {
    uid: uid,
    img: uimg,
    ufirstName: ufirstName,
    ulastName: ulastName,
    uname: uName,
  };
  /////////////////////////////////////////////////////////////////////////////////////////
  //set Data for detail page
  const {
    img,
    firstName,
    lastName,
    topic,
    price,
    rating,
    history,
    courseId,
    reviews,
    facebook,
    IG,
    line,
    content,
  } = route.params.course;
  console.log("--------------------------Deatil i sus --------------------------------")
  console.log( "HISTORY------------------" + route.params.course.teacherInfo[0].history);
  console.log("HERE" + JSON.stringify(route.params.course.teacherInfo[0]))
  console.log("contact+++++++++++++++++++++" + JSON.stringify(route.params.course.teacherInfo[0].social))
  const teacherInfo = route.params.course.teacherInfo[0];
  const tutorHistory = route.params.course.teacherInfo[0].history
  const fbContact  = route.params.course.teacherInfo[0].social.facebook
  const igContact  = route.params.course.teacherInfo[0].social.IG
  const lineContact  = route.params.course.teacherInfo[0].social.line
  

  var  cusEmail = ""

  if (route.params.course.email) {
    cusEmail = route.params.course.email
  }
  console.log(cusEmail)
  const name = teacherInfo.firstName + " " + teacherInfo.lastName;
  const [ratingState, setRatingState] = useState(rating);
  const [reviewsState, setReviewsState] = useState(reviews);
  const [rerender, setRerender] = useState(false);
  const allPeople = reviewsState.length;
  const setRatingToDB = async (starRating) => {
    console.log("starRating:", starRating);
    try {
      const courseRef = collection(FIREBASE_DB, "Courses");
      const courseDoc = await getDocs(courseRef);
      courseDoc.forEach((doc) => {
        if (doc.id === courseId) {
          const courseRef = collection(FIREBASE_DB, "Courses");
          const courseDoc = doc;
          updateDoc(doc.ref, {
            rating: starRating,
          });
        }
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตคอร์ส:", error);
    }
  };

  let ans = 0;
  const calculateRating = (worth, content, techniq) => {
    // console.log("/////////////////////////////");
    // console.log("worth", worth);
    // console.log("content", content);
    // console.log("techniq", techniq);
    const sumValue = (
      (parseFloat(worth) + parseFloat(content) + parseFloat(techniq)) /
      30
    ).toFixed(2);
    console.log("sumValue", sumValue);
    ans = ans + parseFloat(sumValue);
    // console.log("ans", ans);
    let star = (ans / allPeople) * 5;
    setRatingState(star);
    setRatingToDB(star);
  };
  // console.log("ratingState", ratingState);
  useEffect(() => {
    setReviewsState(reviews);
  }, [rerender]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.imgPosition}>
        <Image
          style={styles.img}
          source={route.params.course.teacherInfo[0].img.path ? { uri: route.params.course.teacherInfo[0].img.path } : require("../../../assets/img/Anya.jpg")}
        ></Image>
      </View>
      <View style={styles.textSpace}>
      <Text style={{ fontSize: 25, fontWeight: "600", paddingBottom: 10 ,  fontFamily : "Montserrat-bold"}}>
            {name}
          </Text>
        <Text style={[{ color: "#4CA771" , fontSize: 20, fontWeight: "600", paddingBottom: 10 ,  fontFamily : "Montserrat-bold"}]}>{topic}</Text>
        <Text style={[{ color: "#0487FF",  fontSize: 20, fontWeight: "600", paddingBottom: 10 ,  fontFamily : "Montserrat-bold"}]}>{price} THB/HR</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 30,
        }}
      >
        <View style={styles.rating}>
          <Image
            style={{ height: 25 }}
            source={require("../../../assets/icons/star.png")}
            resizeMode="contain"
          />
          <Text style={[styles.text, { color: "#fff", fontWeight: "normal", fontFamily : "Montserrat" }]}>
            {ratingState}
          </Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.contactPosition}>
          <Image
            style={styles.iconImg}
            source={require("../../../assets/icons/facebook_icon.png")}
          ></Image>
          <Text style={{ paddingRight: 10 }}>{facebook}</Text>
          <Image
            style={styles.iconImg}
            source={require("../../../assets/icons/line_icon.png")}
          ></Image>
          <Text style={{ paddingRight: 10 }}>{line}</Text>
          <Image
            style={styles.iconImg}
            source={require("../../../assets/icons/instagram_icon.png")}
          ></Image>
          <Text style={{ paddingRight: 10 }}>{IG}</Text>
        </View>
        {/* <ButtonCustom title="ดูประวัติ"></ButtonCustom> */}
      </View>
      <View
        style={[
          styles.textSpace,
          { paddingTop: 20, width: "75%", flexWrap: "wrap" },
        ]}
      >
        <View>
          <Text style={{  fontSize: 25, fontWeight: "500", paddingBottom: 10 ,  fontFamily : "prompt"}}>
            แนะนำตัว
          </Text>
        </View>
        <View>
         {  tutorHistory ?
         (<Text style = {{ fontFamily : "prompt", fontSize : 15}}>
          {tutorHistory}
          </Text>) : (<Text style = {{ fontFamily : "prompt", fontSize : 15}}>
          No information
          </Text>) }
         
        </View>

        <View>
          <Text style={{ paddingTop : 10, fontSize: 25, fontWeight: "500", paddingBottom: 10,  fontFamily : "prompt" }}>
            หัวข้อที่สอน
          </Text>
        </View> 
        <View>
          <Text style = {{ fontFamily : "prompt", fontSize : 15}}>{content}</Text>
        </View>
      </View>
      <View
        style={[
          styles.textSpace,
          {
            marginRight: 20,
            paddingTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View>
          <Text style={{ fontSize: 25, fontWeight: "200", paddingBottom: 10, fontFamily : "prompt" }}>
            รีวิวผู้สอน
          </Text>
        </View>
        
  
  {cusEmail.includes(uEmail)  ?
  <ModalReview
          title="เขียนรีวิว"
          courseId={courseId}
          packUser={packUser}
          rerender={rerender}
          setRerender={setRerender}
        /> :   <ModalContact
        title="ติดต่อผู้สอน"
        courseId={courseId}
        packUser={packUser}
        rerender={rerender}
        setRerender={setRerender}
        fbCon = {fbContact}
        igCon = {igContact}
        lineCon = {lineContact}
        blogId = {route.params.course.courseId}
        uEmail = {uEmail}
      />
}



        
      </View>
      {/* <Text>reviews: {JSON.stringify(reviewsState)}</Text> */}
          
      <FlatList 
        data={reviewsState}
        renderItem={({ item }) => (
          // <View style={styles.textbox}>
          <ReviewCard
            review={item}
        
            calculateRating={calculateRating}
          />
          // </View>
        )}
        keyExtractor={(item) => item.reviewId}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};
export default HomeTutorDetail;

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
    width: 90,
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
    fontFamily : 'Montserrat',
  },
  textSpace: {
    paddingLeft: 30,
    fontFamily : 'Montserrat',
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
    borderBottomWidth: 2,
    borderBlockColor: "black",
  },
});
