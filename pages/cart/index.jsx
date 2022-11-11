import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch,
  faBars,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

import styles from "./Cart.module.scss";

import { useContext } from "react";

import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";

const Cart = () => {
  const router = useRouter();
  const context = useContext(AppContext);

  const { currentUserCart, setCurrentUserCart } = context.currentUserInfo;

  const itemTotal = currentUserCart.map(
    (element) => element.price * element.quantity
  );

  const grandTotal =
    itemTotal?.length !== 0
      ? itemTotal.reduce((accu, currValue) => accu + currValue)
      : 0;

  const handleQuantity = (value, item) => {
    if (value === "addition") {
      const updatedCart = currentUserCart.filter((element) =>
        element["_id"] === item["_id"] ? item.quantity++ : element
      );
      setCurrentUserCart(updatedCart);
    } else {
      if (item.quantity <= 1) return;
      else {
        const updatedCart = currentUserCart.filter((element) =>
          element["_id"] === item["_id"] ? item.quantity-- : element
        );
        setCurrentUserCart(updatedCart);
      }
    }
  };

  const handleRemoveItem = (currItem) => {
    const filteredCart = currentUserCart.filter(
      (element) => element["_id"] !== currItem["_id"]
    );
    setCurrentUserCart(filteredCart);
  };

  return (
    <div className="container">
      <div
        className={`d-flex justify-content-between align-items-center px-4 ${styles.cartContainer}`}
      >
        <div className="mb-1 position-relative w-25">
          <input
            type="text"
            className="form-control text-muted border-0 border-2 rounded-0 border-bottom"
            placeholder="Search Anything..."
          />

          <a href="">
            <FontAwesomeIcon
              className="text-secondary position-absolute top-28 end-5"
              icon={faSearch}
              style={{ fontSize: "16px", zIndex: 5 }}
            />
          </a>
        </div>

        <div
          className={`d-flex gap-4 justify-content-center align-items-center ${styles.iconsContainer}`}
        >
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <div className="position-relative">
            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            <span
              className={`position-absolute badge rounded-pill bg-warning ${styles.notification}`}
            >
              0
            </span>
          </div>
          <div className="position-relative">
            <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
            <span
              className={`position-absolute badge rounded-pill bg-warning ${styles.notification}`}
            >
              {currentUserCart.length}
            </span>
          </div>
          <FontAwesomeIcon icon={faBars} className={styles.icon} />
        </div>
      </div>

      {/* CART TABLE */}
      <table className="table table-borderless border-2 border-bottom border-dark container-md mt-4">
        <thead className="bg-light">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {currentUserCart.map((item) => (
            <tr>
              <th scope="row">
                <img src={item?.image} width={40} height={40} />
                <span className="mx-1">{item?.title}</span>
              </th>
              <td>${item?.price}</td>
              <td>
                <div className="d-flex justify-content-around align-items-center">
                  <a
                    href="#"
                    className="text-decoration-none h3"
                    onClick={() => handleQuantity("subtraction", item)}
                  >
                    -
                  </a>
                  <span>{item?.quantity}</span>
                  <a
                    href="#"
                    className="text-decoration-none h3"
                    onClick={() => handleQuantity("addition", item)}
                  >
                    +
                  </a>
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-around align-items-center">
                  <span>${item?.price * item?.quantity}</span>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => handleRemoveItem(item)}
                  >
                    &#10005;
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <div>
          <button
            type="button"
            className="btn btn-dark rounded-0 my-4 w-75"
            onClick={() => router.push("/products")}
          >
            &#8592; Continue Shopping
          </button>
          <p className="fw-bold">Coupon Discount</p>
          <p className="text-secondary">
            Enter your coupon code if you have one.
          </p>
          <input
            type="text"
            className="d-block p-2 mb-4 w-100"
            placeholder="Coupon Code"
          />
          <button
            type="button"
            className="btn btn-outline-dark rounded-0 border-bottom border-start border-end w-50"
          >
            Apply Coupon
          </button>
        </div>

        <div className="d-flex flex-column">
          <button
            type="button"
            className="btn btn-outline-dark rounded-0 my-4 align-self-end w-50"
            onClick={() => setCurrentUserCart([])}
          >
            Clear Cart
          </button>
          <div
            className="bg-light p-4 border border-2 border-top-0 border-end-0"
            style={{ width: "350px" }}
          >
            <p className="d-flex justify-content-between">
              <span className="fw-bold">Subtotal:</span>
              <span>${grandTotal}</span>
            </p>
            <hr />
            <p className="d-flex justify-content-between mb-0">
              <span className="fw-bold">Total:</span>
              <span>${grandTotal}</span>
            </p>
          </div>

          <button type="button" className="btn btn-dark rounded-0 my-4">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
