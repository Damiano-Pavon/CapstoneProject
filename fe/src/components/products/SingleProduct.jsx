import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./AllProducts.css"

const SingleProduct = ({ product }) => {
  return (
    <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
      <Card className="card">
        <Card.Img variant="top" src={product.image} alt={product.title} />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{product.title}</Card.Title>
          <Card.Text className="">
            <p>
              <strong>Price:</strong> {product.price}$
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
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