import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  formatDate,
  formatImpressionCount,
  copyLink,
} from "../../utils/helpers";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import styles from "./TableRow.module.css";

function TableRow({ quiz, index }) {
  const { _id, createdAt, impressions, title } = quiz;
  const [deleteModal, setDeleteModal] = useState(false);

  const { origin } = window.location;

  const closeModal = () => {
    setDeleteModal(false);
  };
  const openModal = () => {
    setDeleteModal(true);
  };

  return (
    <>
      <tr key={_id}>
        <td>{index + 1}</td>
        <td>{`${title.slice(0, 10)}...`}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatImpressionCount(impressions)}</td>
        <td className={styles.icons}>
          <Link to={`/dashboard/edit-quiz/${_id}`}>
            <FaRegEdit size={20} color="#854CFF" />
          </Link>
          <span onClick={openModal}>
            <RiDeleteBin6Fill size={20} color="#D60000" />
          </span>
          <IoMdShare
            size={20}
            color="#60B84B"
            value="text to be copied"
            onClick={() => copyLink(`${origin}/quiz/${_id}`)}
          />
        </td>
        <td>
          <Link to={`/dashboard/quiz-analysis/${_id}`} className={styles.link}>
            Question wise analysis
          </Link>
        </td>
      </tr>
      {deleteModal ? <DeleteModal id={_id} closeModal={closeModal} /> : null}
    </>
  );
}

export default TableRow;
