import { NextPage } from "next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { useContext, useEffect } from "react";

import AppContext from "../../context/AppContext";

import { useRouter, NextRouter } from "next/router";

import { ProductItem } from "../../context/AppContext";
import AllProducts from "../components/AllProducts";

const Products: NextPage = () => {
  const router: NextRouter = useRouter();
  const context = useContext(AppContext);

  const { currentUser, setCurrentUser, currentUserCart, setCurrentUserCart } =
    context.currentUserInfo;

  const handleAddToCart = (item: ProductItem) => {
    const itemExists = currentUserCart.find(
      (element) => element["_id"] === item["_id"]
    );
    if (!itemExists) {
      setCurrentUserCart([...currentUserCart, { ...item, quantity: 1 }]);
    } else return;
  };

  useEffect(() => {
    if (!JSON.parse(JSON.stringify(localStorage.getItem("currUser")))) {
      setCurrentUser(null);
      router.push("/login");
    }

    setCurrentUser(
      JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("currUser"))))
    );
  }, []);

  const handleLogout = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currUser");
      setCurrentUser(null);
      router.push("/login");
    }
  };

  return (
    <div className="container">
      <div
        className="alert alert-success d-flex align-items-center w-50 my-2"
        role="alert"
        style={{ marginLeft: "17.5rem" }}
      >
        <FontAwesomeIcon className="text-success h5 m-2" icon={faInfoCircle} />
        <div>
          Logged in as <span className="fw-bold">{currentUser?.name}</span>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <p className="text-dark h4">Recent Products</p>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            &lArr; Logout
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => router.push("/cart")}
          >
            Your Cart{" "}
            <span className="badge rounded-pill bg-light text-dark">
              {currentUserCart.length}
            </span>
          </button>
        </div>
      </div>
      <AllProducts />
    </div>
  );
};

export default Products;
