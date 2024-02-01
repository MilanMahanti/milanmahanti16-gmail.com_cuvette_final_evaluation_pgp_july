import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQuizAnalysis } from "../services/apiQuiz";

export function useQuizAnalysis() {
  const { quizId } = useParams();
  const {
    isLoading,
    data: quizAnalysis,
    error,
  } = useQuery({
    queryKey: ["quiz-analysis", quizId],
    queryFn: () => getQuizAnalysis(quizId),
  });
  return { isLoading, quizAnalysis, error };
}
