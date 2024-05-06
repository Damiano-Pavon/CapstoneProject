import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import { CartProvider } from "./components/context/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
