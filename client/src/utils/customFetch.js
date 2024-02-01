import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://quizze-backend.vercel.app/api/v1",
});

export default customFetch;
