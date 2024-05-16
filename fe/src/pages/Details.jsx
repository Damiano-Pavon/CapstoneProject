import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from "../components/navbar/MyNavbar";
import "./Details.css"
import Footer from "../components/footer/Footer";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();
  const [addedToCart, setAddedToCart] = useState(false); 

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
    dispatch({ type: "AGGIUNGI_AL_CARRELLO", payload: product });
    setAddedToCart(true); 
    setTimeout(() => {
      setAddedToCart(false); 
    }, 1000);
  };

  return (
    <>
    <MyNavbar/>
    <h2 className="h2-details text-center ">DETTAGLI</h2>
    <div className="detail-product container">
     {product && (
        <Card >
          <Card.Body>
            <Row>
              <Col sm={4}>
                <Card.Img src={product.image} />
              </Col>
              <Col sm={8}>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <p><strong>Price:</strong> {product.price}$</p>
                  <p><strong>Categoria:</strong> {product.category}</p>
                  <p><strong>Descrizione:</strong> {product.description}</p>
                  <p><strong>Pubblicato il:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
                </Card.Text>
                <Button onClick={addToCart}>Aggiungi al Carrello</Button>
                {addedToCart && <p style={{ color: "green" }}>Aggiunto al carrello!</p>}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Details;


