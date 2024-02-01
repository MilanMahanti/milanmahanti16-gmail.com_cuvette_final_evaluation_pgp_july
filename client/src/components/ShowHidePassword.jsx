import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function ShowHidePassword({ name, label }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = (e) => {
    e.preventDefault();
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <div className="passwrapper">
        <input
          type={passwordShown ? "text" : "password"}
          id={name}
          name={name}
          className="form-input"
          defaultValue={""}
          style={{ width: "100%" }}
          required
        />
        <button className="svg" onClick={(e) => togglePasswordVisiblity(e)}>
          {passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
    </div>
  );
}

export default ShowHidePassword;
