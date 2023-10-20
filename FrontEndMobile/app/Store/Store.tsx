import { configureStore, AnyAction, Reducer } from "@reduxjs/toolkit";
import { userSlice, UserState } from "./UsersSlice/UsersSlice";
import CoursesSlice from "./UsersSlice/CoursesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    course: CoursesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
