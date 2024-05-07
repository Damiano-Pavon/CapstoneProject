import React, { useEffect } from 'react';
import { useCart } from '../components/context/CartContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyNavbar from '../components/navbar/MyNavbar';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const { state, dispatch } = useCart();
    const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('auth');
  if (!token) {
    navigate('/login');
  }
}, [navigate]);

  const incrementQuantity = (productId) => {
    dispatch({ type: "INCREMENTA_QUANTITA", payload: { _id: productId } }); 
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: "DECREMENTA_QUANTITA", payload: { _id: productId } }); 
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "RIMUOVI_DAL_CARRELLO", payload: { _id: productId } }); 
  };



  return (
    <>
    <MyNavbar/>
    <div className='container'>
      <h2>Carrello</h2>
      {state.cart.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <div>
          {state.cart.map((product) => (
            <div key={product._id} className="mb-3">
              <Card>
                <div className="row ">
                  <div className="col-md-4">
                    <Card.Img src={product.image} alt={product.title} />
                  </div>
                  <div className="col-md-8">
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        <p><strong>Prezzo:</strong> {product.price}$</p>
                        <p><strong>Categoria:</strong> {product.category}</p>
                        <p><strong>Descrizione:</strong> {product.description}</p>
                        <div className="quantity-control">
                          <Button variant="outline-secondary" onClick={() => decrementQuantity(product._id)}>-</Button>
                          <span className="quantity">{product.quantity}</span>
                          <Button variant="outline-secondary" onClick={() => incrementQuantity(product._id)}>+</Button>
                        </div>
                        <Button variant="danger" onClick={() => removeFromCart(product._id)}>Rimuovi dal carrello</Button> 
                      </Card.Text>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Cart;




