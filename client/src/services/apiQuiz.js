import customFetch from "../utils/customFetch";

export async function getStats() {
  const response = await customFetch.get("/quiz/stats", {
    withCredentials: true,
  });
  return response?.data?.data;
}

export async function getAllQuiz() {
  const response = await customFetch.get("/quiz", { withCredentials: true });
  return response?.data?.data;
}
export async function getSingleQuiz(id) {
  const response = await customFetch.get(`/quiz/${id}`);
  return response?.data?.data;
}
export async function createQuiz(data) {
  const response = await customFetch.post("/quiz", data, {
    withCredentials: true,
  });
  // console.log(response);
  return response.data;
}

export async function editQuiz(quizData) {
  const { data, quizId } = quizData;

  const response = await customFetch.patch(`/quiz/${quizId}`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function deleteQuiz(id) {
  const response = await customFetch.delete(`/quiz/${id}`, {
    withCredentials: true,
  });
  return response;
}

export async function getQuizAnalysis(id) {
  const response = await customFetch.get(`/quiz/${id}/analysis`, {
    withCredentials: true,
  });
  return response?.data?.data;
}

export async function submitQuiz(userAnswer) {
  const { userSubmission: userAnswers, quizId } = userAnswer;
  const response = await customFetch.post(`/quiz/${quizId}/submit`, {
    userAnswers,
  });
  return response?.data;
}
