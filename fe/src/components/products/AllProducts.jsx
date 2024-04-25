import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import "./AllProducts.css"

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 2;
  const token = JSON.parse(localStorage.getItem("auth"));

  const getProducts = async (page) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          params: {
            page,
            pageSize,
          },
        }
      );

      setProducts(resp.data.products);
      setTotalPages(resp.data.totalPages);
      setCurrentPage(resp.data.currentPage);
      return resp;
    } catch (e) {
      console.error("Error fetching product", e);
    }
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (genderFilter === "All" || product.category === genderFilter)
  );

  return (
    <div className="container all-products">
      <div className="header-products">
      <input
        type="text"
        placeholder="Search product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Uomo">Uomo</option>
        <option value="Donna">Donna</option>
      </select>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center py-5">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
