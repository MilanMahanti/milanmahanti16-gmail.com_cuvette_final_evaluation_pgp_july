import { useMoveBack } from "../hooks/useMoveBack";
function Error({ error }) {
  const moveBack = useMoveBack();
  return (
    <div className="error-container">
      <p className="error">{error.message}</p>
      <button className="error-btn" onClick={moveBack}>
        Go back
      </button>
    </div>
  );
}

export default Error;
