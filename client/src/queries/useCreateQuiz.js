import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuiz as createQuizApi } from "../services/apiQuiz";
import toast from "react-hot-toast";

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createQuiz } = useMutation({
    mutationFn: (data) => createQuizApi(data),
    onSuccess: () => {
      toast.success("Quiz successfully created");
      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
    // onError: (err) => toast.error(err.message),
  });
  return { isCreating, createQuiz };
}
