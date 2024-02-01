import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizDetails: {
    title: "",
    type: "",
  },
};

const createQuizSlice = createSlice({
  name: "createQuiz",
  initialState,
  reducers: {
    updateValues(state, action) {
      state.quizDetails = { ...action.payload };
    },
  },
});
export const getQuizDetails = (state) => state.createQuiz.quizDetails;
export const { updateValues } = createQuizSlice.actions;
export default createQuizSlice.reducer;
