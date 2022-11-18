import clientPromise from "../../lib/mongoConnect";

import { NextPage } from "next";

import styles from "./Dashboard.module.scss";

import MyDashboardData from "../components/MyDashboardData";

import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import MyAlert from "../components/MyAlert";
import { useRouter, NextRouter } from "next/router";

import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";

import { ProductItemProps } from "../../context/AppContext";

const Dashboard: NextPage<ProductItemProps> = ({ products }): JSX.Element => {
  const router: NextRouter = useRouter();
  const context = useContext(AppContext);

  const { setCurrentUser } = context.currentUserInfo;

  const [toDeleteItem, setToDeleteItem] = useState(null);
  const [deleteAlertMsg, setDeleteAlertMsg] = useState("");

  const [textSearch, setTextSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");

  const filteredProductsByText = products.filter((element) =>
    element.title.toLowerCase().includes(textSearch)
  );
  const filteredProductsByCategory = products.filter(
    (element) => element.category === categorySearch
  );
  const filteredProductsByPrice = products.filter(
    (element) => element.price >= Number(priceSearch)
  );

  let filteredProducts;

  if (textSearch !== "" && categorySearch !== "" && priceSearch !== "") {
    filteredProducts = filteredProductsByText;
    filteredProducts = filteredProducts.filter(
      (element) => element.category === categorySearch
    );
    filteredProducts = filteredProducts.filter(
      (element) => element.price >= Number(priceSearch)
    );
  } else if (textSearch !== "" && categorySearch !== "") {
    filteredProducts = filteredProductsByText;
    filteredProducts = filteredProducts.filter(
      (element) => element.category === categorySearch
    );
  } else if (textSearch !== "" && priceSearch !== "") {
    filteredProducts = filteredProductsByText;
    filteredProducts = filteredProducts.filter(
      (element) => element.price >= Number(priceSearch)
    );
  } else if (categorySearch !== "" || priceSearch !== "") {
    filteredProducts = filteredProductsByCategory;
    filteredProducts = filteredProducts.filter(
      (element) => element.price >= Number(priceSearch)
    );
  } else if (textSearch !== "" && categorySearch === "" && priceSearch === "") {
    filteredProducts = filteredProductsByText;
  } else if (textSearch === "" && categorySearch !== "" && priceSearch === "") {
    filteredProducts = filteredProductsByCategory;
  } else if (textSearch === "" && categorySearch === "" && priceSearch !== "") {
    filteredProducts = filteredProductsByPrice;
  } else {
    filteredProducts = products;
  }

  const handleLogout = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currUser");
      setCurrentUser(null);
      router.push("/login");
    }
  };

  return (
    <div className={`container bg-light ${styles.dashboardContainer}`}>
      <div className="d-flex justify-content-between align-items-center">
        <p className="h4 fw-bold py-3">Products</p>
        <button
          type="button"
          className="btn btn-success h-50"
          onClick={handleLogout}
        >
          &lArr; Logout
        </button>
      </div>
      {deleteAlertMsg !== "" ? (
        <MyAlert alertMsg={deleteAlertMsg} condition="success" />
      ) : null}

      <div className="container bg-white rounded p-4 d-flex gap-4">
        <input
          className="form-control bg-light text-muted w-25"
          type="text"
          placeholder="Search by product name"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value.toLowerCase())}
        />
        <select
          className="form-select bg-light w-25 text-muted"
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        >
          <option label="Filter By Category" value="">
            Filter By Category
          </option>
          <option value="men's clothing">Men&apos;s Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women&apos;s Clothing</option>
          <option value="jewelery">Jewellery</option>
        </select>

        <select
          className="form-select bg-light w-25 text-muted"
          value={priceSearch}
          onChange={(e) => setPriceSearch(e.target.value)}
        >
          <option label="Filter By Price" value="">
            Filter By Price
          </option>
          <option value="10">$10 &uarr;</option>
          <option value="100">$100 &uarr;</option>
          <option value="500">$500 &uarr;</option>
        </select>

        <button
          type="button"
          className="btn btn-success w-25"
          data-bs-toggle="modal"
          data-bs-target="#addProduct"
        >
          + Add Product
        </button>
      </div>
      <div className="container bg-white rounded p-4 d-flex gap-4 mt-4">
        <button
          type="button"
          className="btn bg-white text-muted w-75"
          style={{ border: "2px dotted #198754" }}
        >
          Drop CSV File
        </button>
        <button type="button" className="btn btn-secondary w-25 text-gray">
          Upload
        </button>
        <button type="button" className="btn btn-success w-25">
          Download
        </button>
      </div>
      <table className="table border border-1">
        <thead>
          <tr className="text-muted text-center">
            <th scope="col">ID</th>
            <th scope="col">PRODUCT NAME</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">PRICE</th>
            <th scope="col">STOCK</th>
            <th scope="col">STATUS</th>
            <th scope="col">DISCOUNT</th>
            <th scope="col">DETAILS</th>
            <th scope="col">PUBLISHED</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredProducts.map((element) => (
            <MyDashboardData
              key={element["_id"].toString()}
              item={element}
              setToDeleteItem={setToDeleteItem}
            />
          ))}
        </tbody>
      </table>
      <AddProductModal />
      <DeleteProductModal
        currItem={toDeleteItem}
        setDeleteAlertMsg={setDeleteAlertMsg}
      />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("lancemeup");

    const response = await db.collection("products").find({}).toArray();
    const products = response.reverse();

    return {
      props: { products: JSON.parse(JSON.stringify(products)) },
    };
  } catch (e) {
    console.error(e);
  }
}
export default Dashboard;
