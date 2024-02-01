import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleQuiz } from "../services/apiQuiz";

export function useSingleQuiz() {
  const { quizId } = useParams();
  const {
    isLoading,
    data: quizData,
    error,
  } = useQuery({
    queryFn: () => getSingleQuiz(quizId),
    queryKey: ["singlequiz", quizId],
    retry: false,
  });
  return { isLoading, quizData, error };
}
