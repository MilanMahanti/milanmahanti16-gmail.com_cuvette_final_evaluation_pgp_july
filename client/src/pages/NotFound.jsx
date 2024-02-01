import { Link, useRouteError } from "react-router-dom";
import img from "../assets/notfound.svg";
import styles from "./NotFound.module.css";
function NotFound() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className={styles.main}>
        <img src={img} alt="error" />
        <div className={styles.flex}>
          <h3>Oh! Page not found</h3>
          <p>We can&apos;t seem to find the page you are looking for </p>
          <Link to="/dashboard">back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="full-page">
      <h3>Something went wrong</h3>
      <Link to="/dashboard">Go back to home</Link>
    </div>
  );
}

export default NotFound;
