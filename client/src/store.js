import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "./slices/createQuizSlice";

const store = configureStore({
  reducer: {
    createQuiz: createQuizReducer,
  },
});

export default store;
