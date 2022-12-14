import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FC } from "react";

type TAlertProps = {
  alertMsg: string;
  condition: string;
};

const MyAlert: FC<TAlertProps> = ({ alertMsg, condition }): JSX.Element => {
  return (
    <div
      className={`alert ${
        condition === "danger" ? "alert-danger" : "alert-success"
      } d-flex align-items-center`}
      role="alert"
    >
      <FontAwesomeIcon
        className={`${
          condition === "danger" ? "text-danger" : "text-success"
        } h3 m-2`}
        icon={condition === "danger" ? faExclamationTriangle : faCheckCircle}
      />
      <div>{alertMsg}</div>
    </div>
  );
};

export default MyAlert;
