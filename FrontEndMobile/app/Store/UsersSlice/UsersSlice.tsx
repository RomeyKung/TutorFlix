import { createSlice } from "@reduxjs/toolkit";
import type { AnyAction, PayloadAction, Reducer } from "@reduxjs/toolkit";

export interface UserState {
  nameUser: String;
  email: String;
  phone: String;
  history: String;
  course: any;
  social: any;
  favorite: any;
  img: object;
}

const initialState: UserState = {
  nameUser: "",
  email: "",
  phone: "",
  history: "",
  course: [],
  social: [],
  favorite: [],
  img: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUser: (
      state,
      action: PayloadAction<{
        nameUser: String;
        email: String;
        phone: String;
        history: String;
        course: any;
        social: any;
        favorite: any;
        img: object;
      }>
    ) => {
      // ทำอะไรบางอย่างเมื่อ action "storeUser" ถูกเรียกใช้
      return action.payload;
    },
    // รายการ reducers อื่น ๆ ที่คุณต้องการ
  },
});

// Action creators are generated for each case reducer function
export const { storeUser } = userSlice.actions;

export default userSlice;
