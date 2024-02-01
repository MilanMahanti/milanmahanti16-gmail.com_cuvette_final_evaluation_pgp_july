import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuiz as deleteQuizApi } from "../services/apiQuiz";
import toast from "react-hot-toast";

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteQuiz } = useMutation({
    mutationFn: (id) => deleteQuizApi(id),
    onSuccess: () => {
      toast.success("Quiz successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteQuiz };
}
