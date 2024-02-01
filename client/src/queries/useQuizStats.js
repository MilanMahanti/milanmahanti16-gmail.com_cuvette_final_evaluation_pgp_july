import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/apiQuiz";

export function useQuizStats() {
  const {
    isLoading,
    data: stats,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
  return { isLoading, stats, error };
}
