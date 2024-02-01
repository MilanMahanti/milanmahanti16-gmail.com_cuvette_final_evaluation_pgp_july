import { useQuery } from "@tanstack/react-query";
import { getAllQuiz } from "../services/apiQuiz";

export function useAllQuiz() {
  const {
    isLoading,
    data: quizzes,
    error,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getAllQuiz,
  });
  return { isLoading, quizzes, error };
}
