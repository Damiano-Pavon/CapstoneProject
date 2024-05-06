 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import SingleProduct from "./SingleProduct";
 import "./Products.css";
  
 function AllProducts() {
   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchInput, setSearchInput] = useState(""); 
   const [genderFilter, setGenderFilter] = useState("All");
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const pageSize = 3;
   const token = JSON.parse(localStorage.getItem("auth"));
  
   const getProducts = async (page, category = "", searchTerm = "") => {
     try {
       const resp = await axios.get(
         `${process.env.REACT_APP_SERVER_BASE_URL}/product/${category}`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: token,
           },
           params: {
             page,
             pageSize,
             searchTerm,
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
  
   const handleSearch = () => {
     setSearchTerm(searchInput); 
     setCurrentPage(1);
     getProducts(1, "search", searchInput);
   };
  
   useEffect(() => {
     if (genderFilter === "All") {
       getProducts(currentPage, "", searchTerm);
     } else if (genderFilter === "Uomo") {
       getProducts(currentPage, "men", searchTerm); 
     } else if (genderFilter === "Donna") {
       getProducts(currentPage, "women", searchTerm);
     }
   }, [currentPage, genderFilter, searchTerm]);
  
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
       <div className="header-products">
        <div className="search">
         <input
           className="search-input"
           type="text"
           placeholder="Search product"
           value={searchInput}
           onChange={(e) => setSearchInput(e.target.value)} 
         />
         <button className="search-btn" onClick={handleSearch}>Search</button>
         </div>
         <select
           value={genderFilter}
           onChange={(e) => setGenderFilter(e.target.value)}
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
  
       <div className="text-center py-5">
         <button onClick={handlePrevPage} disabled={currentPage === 1}>
           {"<"}
         </button>
         <span>
            
           Page {currentPage} of {totalPages}
         </span>
         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
           {">"}
         </button>
       </div>
     </div>
   );
 }
  
 export default AllProducts;
  
  
  
  
  

