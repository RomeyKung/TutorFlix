import { createSlice } from "@reduxjs/toolkit";
import type { AnyAction, PayloadAction, Reducer } from "@reduxjs/toolkit";

export interface UserState {
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  history: String;
  social: any;
  favorite: any;
  img: object;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  history: "",
  social: [],
  favorite: [],
  img: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      // ทำอะไรบางอย่างเมื่อ action "storeUser" ถูกเรียกใช้
      return action.payload;
    },
    // รายการ reducers อื่น ๆ ที่คุณต้องการ
  },
});

// Action creators are generated for each case reducer function
export const { storeUser } = userSlice.actions;

export default userSlice;
