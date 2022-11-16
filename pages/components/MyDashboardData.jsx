import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlassMinus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import styles from "./MyDashboardData.module.scss";

const MyDashboardData = ({ item, setToDeleteItem }) => {
  return (
    <tr className={`text-center ${styles.dataContainer}`}>
      <th scope="row">{item?.id}</th>
      <td className="d-flex gap-2 border-0">
        <div
          className="p-2 border border-2 border-light rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "30px", height: "30px" }}
        >
          <Image src={item?.image} width={18} height={18} alt="" />
        </div>
        <span>{item?.title}</span>
      </td>
      <td className="text-uppercase">{item?.category}</td>
      <td className="fw-bold">${item?.price}</td>
      <td>50</td>
      <td
        className="badge rounded-pill text-success d-flex justify-content-center"
        style={{ backgroundColor: "lightgreen" }}
      >
        Selling
      </td>
      <td></td>
      <td>
        <FontAwesomeIcon
          className="text-secondary"
          icon={faMagnifyingGlassMinus}
        />
      </td>
      <td>
        <div className="form-check form-switch d-flex justify-content-center">
          <input
            className="form-check-input bg-success"
            type="checkbox"
            defaultChecked
            style={{ border: "none", boxShadow: "none" }}
          />
        </div>
      </td>
      <td className="d-flex gap-4 border-0">
        <FontAwesomeIcon className="text-secondary" icon={faPenToSquare} />
        <FontAwesomeIcon
          className="text-secondary"
          icon={faTrashCan}
          data-bs-toggle="modal"
          data-bs-target="#deleteProduct"
          onClick={() => setToDeleteItem(item)}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
};

export default MyDashboardData;
