import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

const MyPasswordInput = ({
  label,
  placeholder,
  id,
  value,
  handlePasswordChange,
  errorMsg,
}) => {
  const [eyeIcon, setEyeIcon] = useState(faEyeSlash);

  const handleEyeClick = (e) => {
    const pass = document.getElementById(id);

    if (pass.type === "password") {
      pass.type = "text";
      setEyeIcon(faEye);
    } else {
      pass.type = "password";
      setEyeIcon(faEyeSlash);
    }
  };
  return (
    <div className="position-relative mb-3">
      <label htmlFor={id} class="form-label">
        {label}
      </label>

      <div className="input-group mb-1">
        <input
          type="password"
          className="form-control"
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={handlePasswordChange}
        />

        <a href="#" onClick={handleEyeClick}>
          <FontAwesomeIcon
            className="text-danger position-absolute top-28 end-5"
            icon={eyeIcon}
            style={{ fontSize: "16px", zIndex: 5 }}
          />
        </a>
      </div>
      {errorMsg !== "" ? (
        <span className="text-danger mb-2">&#10005; {errorMsg}</span>
      ) : null}
    </div>
  );
};

export default MyPasswordInput;
