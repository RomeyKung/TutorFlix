import { createSlice } from "@reduxjs/toolkit";
import type { AnyAction, PayloadAction, Reducer } from "@reduxjs/toolkit";

const initialState = {
    Courses: [],
};

export const CoursesSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        storeCourses: (state, action) => {
                // const allCourse = [...state.Courses, action.payload];
                // state.Courses = allCourse;
                // console.log("action.payload:", JSON.stringify(action.payload));
                state.Courses = action.payload;
        },
        updateRating: (state, action) => {
            const allCourse = [...state.Courses];
            allCourse.forEach((course) => {
                if (course.courseId === action.payload.courseId) {
                    course.rating = action.payload.rating;
                }
            });
            state.Courses = allCourse;
        }
    },
});

// Action creators are generated for each case reducer function
export const { storeCourses, updateRating } = CoursesSlice.actions;

export default CoursesSlice;
