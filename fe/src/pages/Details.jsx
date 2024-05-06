 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import { useParams,Link } from "react-router-dom";
 import { useCart } from "../components/context/CartContext";
 import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


 function Details() {
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const {dispatch}=useCart()

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

   const addToCart = () => {
    console.log("Aggiunto al carrello ",product);
    dispatch({ type: "AGGIUNGI_AL_CARRELLO", payload: product }); 
  };

   if (!product) {
     return <p>Loading...</p>;
   }

   return (
   <div className="container">
   <h1>DETTAGLI</h1>
    <Card >
    <Card.Body >
      <Row>
        <Col sm={4}>
          <Card.Img src={product.image} alt={product.title} />
        </Col>
        <Col sm={8}>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            <p>Price: {product.price}$</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Published on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
          </Card.Text>
          <Button onClick={addToCart}>Aggiungi al Carrello</Button>
          <Link to="/cart">Visualizza Carrello</Link>
        </Col>
      </Row>
    </Card.Body>
  </Card>
  </div>
   );
 }

 export default Details;

 


