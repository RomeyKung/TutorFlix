import { configureStore, AnyAction, Reducer } from "@reduxjs/toolkit";
import { userSlice, UserState } from "./UsersSlice/UsersSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const reducer: Reducer<unknown, AnyAction> = userSlice.reducer;

export default reducer;
