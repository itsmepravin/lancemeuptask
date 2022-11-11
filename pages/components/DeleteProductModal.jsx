import axios from "axios";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteProductModal = ({ currItem, setDeleteAlertMsg }) => {
  const router = useRouter();

  const handleItemDeletion = async () => {
    const res = await axios.post("/api/deleteproduct", {
      _id: currItem["_id"],
    });
    setDeleteAlertMsg(res.data.message);
    setTimeout(() => {
      setDeleteAlertMsg("");
      router.reload();
    }, 3000);
  };
  return (
    <div className="modal fade" id="deleteProduct">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body p-4 d-flex flex-column justify-content-center align-items-center text-center">
            <FontAwesomeIcon
              className="h3"
              icon={faTrashCan}
              style={{ color: "tomato" }}
            />
            <p className="h4">
              Are You Sure! Want to Delete{" "}
              <span style={{ color: "tomato" }}>{currItem?.title}</span> Record?
            </p>
            <p>
              Do you really want to delete this record? You cannot view this in
              your list anymore if you delete it.
            </p>
          </div>
          <div className="modal-footer bg-light border-0 d-flex justify-content-center gap-4">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No, Keep it
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleItemDeletion}
            >
              Yes, Delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
