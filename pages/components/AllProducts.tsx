import type { ProductItem } from "../../context/AppContext";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import { useContext } from "react";

import styles from "../products/Products.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartPlus,
  faGlasses,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";

import MyStarRating from "./MyStarRating";

import AppContext from "../../context/AppContext";

const AllProducts = () => {
  const context = useContext(AppContext);

  const { currentUserCart, setCurrentUserCart } = context.currentUserInfo;

  const useGetAllProducts = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: () => {
        return axios.get("/api/getproducts").then((res) => res.data);
      },
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const query = useGetAllProducts();

  const products = query.data?.products as ProductItem[];

  const handleAddToCart = (item: ProductItem) => {
    const itemExists = currentUserCart.find(
      (element) => element["_id"] === item["_id"]
    );
    if (!itemExists) {
      setCurrentUserCart([...currentUserCart, { ...item, quantity: 1 }]);
    } else return;
  };

  return query.isLoading ? (
    <p>Loading Products, please wait...</p>
  ) : (
    <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
      {products?.map((product) => (
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
  );
};

export default AllProducts;
