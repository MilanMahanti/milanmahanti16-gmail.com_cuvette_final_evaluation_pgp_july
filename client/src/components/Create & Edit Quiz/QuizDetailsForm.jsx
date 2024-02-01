import { useForm } from "react-hook-form";
import styles from "./QuizDetailsForm.module.css";
import { useDispatch } from "react-redux";
import { updateValues } from "../../slices/createQuizSlice";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";

function QuizDetailsForm() {
  const dispatch = useDispatch();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(updateValues(data));
    navigate("question");
  };

  return (
    <div className="overlay">
      <div className={styles.modal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "2rem" }}>
            <input
              type="text"
              placeholder="Quiz Name"
              {...register("title", { required: "Quiz needs to have a title" })}
              className={styles.input}
            />
            {errors?.title && (
              <p className={styles.err}>{errors.title.message}</p>
            )}
          </div>
          <div style={{ marginBottom: "3.5rem" }}>
            <div className={styles.radiogroup}>
              <p>Quiz Type:</p>
              <input
                {...register("type", {
                  required: "Quiz needs to have a type",
                })}
                type="radio"
                value="qa"
                id="qa"
              />
              <label htmlFor="qa" className={styles.radiolabel}>
                Q & A
              </label>
              <input
                {...register("type", { required: true })}
                type="radio"
                value="poll"
                id="poll"
              />
              <label htmlFor="poll" className={styles.radiolabel}>
                Poll Type
              </label>
            </div>
            {errors?.type && (
              <p className={styles.err}>Quiz needs to have a type</p>
            )}
          </div>

          <div className={styles.btngroup}>
            <button className="quiz-btn secondary" onClick={moveBack}>
              Cancel
            </button>
            <button type="submit" className="quiz-btn primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizDetailsForm;
