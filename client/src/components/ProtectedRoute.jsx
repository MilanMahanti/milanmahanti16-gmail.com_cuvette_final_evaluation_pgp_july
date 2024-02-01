import { useEffect } from "react";
import { useCurrUser } from "../queries/useCurrUser";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isGettingUser, user } = useCurrUser();
  useEffect(() => {
    if (!user && !isGettingUser) navigate("/login");
  }, [navigate, user, isGettingUser]);
  if (isGettingUser)
    return (
      <div className="full-page">
        <Loading />
      </div>
    );

  if (user) return children;
}

export default ProtectedRoute;
