import { useDeleteQuiz } from "../queries/useDeleteQuiz";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import styles from "./DeleteModal.module.css";

function DeleteModal({ id, closeModal }) {
  const { isDeleting, deleteQuiz } = useDeleteQuiz();
  const { ref } = useOutsideClick(closeModal);
  const navigate = useNavigate();

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} ref={ref}>
        <p className={styles.message}>
          Are you confirm you want to delete this quiz?
        </p>
        <div className={styles.btnContainer}>
          <button
            disabled={isDeleting}
            onClick={() => {
              deleteQuiz(id);
              navigate("/dashboard");
            }}
            className={styles.deletebtn}
          >
            Confirm Delete
          </button>
          <button onClick={closeModal} className={styles.cancelbtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteModal;
