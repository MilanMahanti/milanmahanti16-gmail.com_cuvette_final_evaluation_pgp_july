import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar({ logoutUser }) {
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>Quizze</h1>
      <div className={styles.linkbox}>
        <NavLink
          to="/dashboard"
          className={pathname === "/dashboard" ? styles.active : ""}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="analytics"
          className={(navdata) => (navdata.isActive ? styles.active : "")}
        >
          Analytics
        </NavLink>
        <NavLink
          to="create-quiz"
          className={(navdata) => (navdata.isActive ? styles.active : "")}
        >
          Create Quiz
        </NavLink>
      </div>
      <button className={styles.logout} onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
