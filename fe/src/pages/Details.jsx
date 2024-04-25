 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import { useParams } from "react-router-dom";

 function Details() {
   const { id } = useParams();
   const [product, setProduct] = useState(null);

   useEffect(() => {
     const getProductDetails = async () => {
       try {
         const resp = await axios.get(
           `${process.env.REACT_APP_SERVER_BASE_URL}/product/${id}`
         );
         setProduct(resp.data);
       } catch (error) {
         console.error("Error fetching product details:", error);
       }
     };

     getProductDetails();
   }, [id]);

   if (!product) {
     return <p>Loading...</p>;
   }

   return (
     <div>
      
       <img style={{width:200}} src={product.image} alt={product.title} />
       <h2>{product.title}</h2>
       <h3>Price: {product.price}$</h3>
       <p><strong>Category:</strong> {product.category}</p>
       <p><strong>Description:</strong> {product.description}</p>
       <p><strong>Published on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
     </div>
   );
 }

 export default Details;

 


