import { NextPage } from "next";

import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartPlus,
  faGlasses,
  faInfoCircle,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";

import styles from "./Products.module.scss";

import { useContext, useEffect } from "react";

import AppContext from "../../context/AppContext";

import MyStarRating from "../components/MyStarRating";

import clientPromise from "../../lib/mongoConnect";

import { useRouter, NextRouter } from "next/router";

import { ProductItem, ProductItemProps } from "../../context/AppContext";

const Products: NextPage<ProductItemProps> = ({ products }) => {
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

      <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
        {products.map((product) => (
          <div className="col" key={product["_id"].toString()}>
            <div
              className={`card h-100 border-0 rounded-0 shadow ${styles.cardContainer}`}
            >
              {/* PRODUCT OVERLAY */}
              <div className="position-relative overflow-hidden">
                {product?.rating?.rate >= 4 ? (
                  <div className="position-absolute top-5 start-5">
                    <span className="badge bg-info">TOP</span>
                  </div>
                ) : null}
                <Image
                  className="card-img-top p-4"
                  src={product?.image}
                  width={200}
                  height={250}
                  alt=""
                />
                <div className={styles.iconsOverlay}>
                  <div className={`rounded-circle ${styles.iconContainer}`}>
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                  </div>
                  <div className={`rounded-circle ${styles.iconContainer}`}>
                    <FontAwesomeIcon icon={faGlasses} className={styles.icon} />
                  </div>
                  <div className={`rounded-circle ${styles.iconContainer}`}>
                    <FontAwesomeIcon icon={faShuffle} className={styles.icon} />
                  </div>
                </div>
                <div
                  className={styles.addToCartContainer}
                  onClick={() => handleAddToCart(product)}
                >
                  <FontAwesomeIcon icon={faCartPlus} className={styles.icon} />
                  <span> ADD TO CART</span>
                </div>
              </div>

              {/* PRODUCT DETAILS */}
              <div className="card-body">
                <p className="card-text text-muted text-uppercase">
                  {product?.category}
                </p>
                <h5 className="card-title">{product?.title}</h5>
                <p className="card-text text-primary">${product?.price}</p>
                <MyStarRating rating={product?.rating} />
              </div>

              {/* PRODUCT RANGE OF COLORS */}
              <div className="d-flex mb-2 gap-2 position-absolute bottom-0 start-35">
                {["bg-dark", "bg-primary", "bg-success", "bg-danger"].map(
                  (bgColor) => (
                    <span
                      key={bgColor}
                      className={`p-2 ${bgColor} border border-light rounded-circle`}
                    ></span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    const res = await db.collection("products").find({}).toArray();
    const products = res.reverse();

    return {
      props: { products: JSON.parse(JSON.stringify(products)) },
    };
  } catch (e) {
    console.error(e);
  }
};

export default Products;
