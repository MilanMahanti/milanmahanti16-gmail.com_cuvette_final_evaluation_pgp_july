import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuiz as submitQuizApi } from "../services/apiQuiz";
import toast from "react-hot-toast";

export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  const { isPending: isSubmitting, mutate: submitQuiz } = useMutation({
    mutationFn: (data) => submitQuizApi(data),
    onSuccess: () => {
      toast.success("Quiz succcessfully submitted!");
      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSubmitting, submitQuiz };
}
