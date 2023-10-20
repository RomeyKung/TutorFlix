import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import firebase
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { storeUser } from "../Store/UsersSlice/UsersSlice";
import { storeCourses } from "../Store/UsersSlice/CoursesSlice";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";

// Import Screens
import { Login, Signup } from "../screens/Index";

// Import Navigation
import MainStack from "../Navigation/MainStack";
import Test from "../screens/Test";

const Stack = createNativeStackNavigator();

function AuthenStack() {
  console.log("///////////////AuthenStack///////////////////////");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      FIREBASE_AUTH,
      async (authUser) => {
        if (authUser) {
          ///////////////////////////////////////////////////////////////////////////
          // Set user state
          setUser(authUser);

          // Fetch user data and store it in Redux
          const userDocRef = doc(FIREBASE_DB, "Users", authUser.uid);
          const unsubscribeUser = onSnapshot(userDocRef, (userSnapshot) => {
            dispatch(storeUser(userSnapshot.data()));
          });
          ///////////////////////////////////////////////////////////////////////////

          const userCollectionRef = collection(FIREBASE_DB, "Users");
          const unsubscribeUserAll = onSnapshot(
            userCollectionRef,
            (userSnapshot) => {
              const users = userSnapshot.docs.map((userDoc) => {
                const userData = userDoc.data();
                return {
                  userId: userDoc.id,
                  ...userData,
                };
              });
              console.log("users:", users);

              const reviewCollectionRef = collection(FIREBASE_DB, "Reviews");
              const unsubscribeReviews = onSnapshot(
                reviewCollectionRef,
                (reviewSnapshot) => {
                  const reviews = reviewSnapshot.docs.map((reviewDoc) => {
                    const reviewData = reviewDoc.data();
                    return {
                      reviewId: reviewDoc.id,
                      ...reviewData,
                      // userReviewInfo: users.filter((user: any) => user.userId === reviewData.userId),
                    };
                  });
                  ///////////////////////////////////////////////////////////////////////////
    
                  const courseCollectionRef = collection(FIREBASE_DB, "Courses");
                  const unsubscribeCourses = onSnapshot(
                    courseCollectionRef,
                    (courseSnapshot) => {
                      const reviewInCourse = reviews;
                      const courses = courseSnapshot.docs.map((courseDoc) => {
                        const courseData = courseDoc.data();
    
                        return {
                          courseId: courseDoc.id,
                          ...courseData,
                          reviews: reviewInCourse.filter(
                            (review: any) => review.courseId === courseDoc.id
                          ),
                          teacherInfo:users.filter((user: any) => user.userId === courseData.id),
                        };
                      });
                      // console.log("courses:", courses);
                      dispatch(storeCourses(courses));
                    }
                  );
                  ///////////////////////////////////////////////////////////////////////////
                }
              );

            }
          );

          ///////////////////////////////////////////////////////////////////////////
          // Fetch review data and store it in state
        

       
          return () => {
            // unsubscribeUser();
            // unsubscribeCourses();
            // unsubscribeReviews();
          };
        } else {
          setUser(null);
        }
      }
    );
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthenStack;
