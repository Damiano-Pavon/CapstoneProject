 import React from "react";
 import Card from "react-bootstrap/Card";
 import { Link } from "react-router-dom";
 import "./Products.css"

 const SingleProduct = ({ product }) => {
   return (
     <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
       <Card >
         <Card.Img variant="top" src={product.image} alt={product.title} />
         <Card.Body className="card-body">
           <Card.Title className="card-title"> { product.title.length > 20 ? product.title.slice(0,45)+"..." : product.title}</Card.Title>
           <Card.Text >
           <span>
              <strong>Price:</strong> {product.price}$
            </span>
            <br />
            <span>
              <strong>Category:</strong> {product.category}
            </span>
           </Card.Text>
           <Link to={`/details/${product._id}`} className="btn btn-primary">
             Dettagli
           </Link>
         </Card.Body>
       </Card>
     </div>
   );
 };

 export default SingleProduct;