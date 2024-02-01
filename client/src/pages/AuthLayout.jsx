import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.css";

function AuthLayout() {
  const { pathname } = useLocation();
  return (
    <section className="full-page">
      <div className={styles.loginSignupbox}>
        <h1 className={styles.logo}>QUIZZE</h1>
        <div className={styles.layout}>
          <div className={styles["btn-container"]}>
            <NavLink
              to="/"
              className={pathname === "/" ? styles.active : styles.navlink}
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              className={(navdata) =>
                navdata.isActive ? styles.active : styles.navlink
              }
            >
              Login
            </NavLink>
          </div>
          <div className={styles.box}>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
