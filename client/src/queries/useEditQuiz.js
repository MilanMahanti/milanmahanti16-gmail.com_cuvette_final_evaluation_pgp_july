import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editQuiz as editQuizApi } from "../services/apiQuiz";
import toast from "react-hot-toast";

export function useEditQuiz() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editQuiz } = useMutation({
    mutationFn: (data) => editQuizApi(data),
    onSuccess: () => {
      toast.success("Quiz edited succcessfully!");
      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editQuiz };
}
