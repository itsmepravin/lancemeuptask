import styles from "./AddProductModal.module.scss";

import axios from "axios";

import { useState } from "react";
import { useRouter, NextRouter } from "next/router";

import MyAlert from "./MyAlert";

import { TAddProduct } from "../../context/AppContext";

const AddProductModal = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("electronics");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const [alertCondition, setAlertCondition] = useState("danger");
  const [alertMsg, setAlertMsg] = useState("");

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    e.target.files instanceof FileList
      ? reader.readAsDataURL(e.target.files[0])
      : null;

    reader.onload = function () {
      setImage(reader.result);
    };
  };

  const handleProductSubmit = async (): Promise<void> => {
    try {
      const res = await axios.post("/api/addproduct", {
        title,
        price,
        category,
        description,
        image,
      });

      const resData: TAddProduct = res.data;

      if (resData.success) {
        setAlertCondition("success");
        setAlertMsg(resData.message);
        setTimeout(() => {
          setAlertMsg("");
          router.reload();
        }, 2000);
      } else {
        setAlertMsg(resData.message);
        setTimeout(() => {
          setAlertMsg("");
        }, 2000);
      }
    } catch (error) {
      setAlertMsg(error.response.data.message);
      setTimeout(() => setAlertMsg(""), 2000);
    }
  };

  return (
    <div className={`modal fade ${styles.modalContainer}`} id="addProduct">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Product</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            {alertMsg !== "" ? (
              <MyAlert alertMsg={alertMsg} condition={alertCondition} />
            ) : null}
            <div className="input-group mb-3">
              <span className="input-group-text">Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Price</span>
              <input
                type="number"
                className="form-control"
                placeholder="Product Price"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected disabled>
                Category
              </option>
              <option value="electronics">Electronics</option>
              <option value="men's clothing">Men&apos;s Clothing</option>
              <option value="women's clothing">Women&apos;s Clothing</option>
              <option value="jewelery">Jewellery</option>
            </select>
            <div className="mt-3">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-3">
              <input
                className="form-control"
                type="file"
                onChange={handleImageInput}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleProductSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
