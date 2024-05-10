 import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import "./Products.css";
import Button from "react-bootstrap/Button";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState(""); 
  const [genderFilter, setGenderFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const getProducts = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product/filter`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: currentPage,
            pageSize,
            searchTerm: searchInput,
            category: genderFilter === "All" ? "" : genderFilter,
          },
        }
      );

      setProducts(resp.data.products);
      setTotalPages(resp.data.totalPages);
      setCurrentPage(resp.data.currentPage);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, genderFilter, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
    getProducts();
  };

  const handleGenderFilterChange = async (e) => {
    const newGenderFilter = e.target.value;
    setGenderFilter(newGenderFilter);
    setCurrentPage(1);

    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product/filter`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            pageSize,
            searchTerm,
            category: newGenderFilter === "All" ? "" : newGenderFilter,
          },
        }
      );

      setProducts(resp.data.products);
      setTotalPages(resp.data.totalPages);
      setCurrentPage(resp.data.currentPage);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

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
  
  return (
    
    <div className="container all-products">
      <div className="products">
      <div className="header-products">
       <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Cerca prodotto"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} 
        />
        <Button className="search-btn" onClick={handleSearch}>Cerca</Button>
        </div>
        <select
          value={genderFilter}
          onChange={handleGenderFilterChange}
        >
          <option value="All">Tutti</option>
          <option value="Uomo">Uomo</option>
          <option value="Donna">Donna</option>
        </select>
      </div>
      <div className="row">
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
      </div>
      <div className="text-center py-5">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        <span className="mx-2">Pagina {currentPage} di {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
    
  );
}
  
export default AllProducts;




  
  

