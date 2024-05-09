 import React, { useEffect, useState } from "react";
 import Button from "react-bootstrap/Button";
 import Form from "react-bootstrap/Form";
 import { Col } from "react-bootstrap";
 import AxiosClient from "../client/client";
 import { useNavigate,Link } from "react-router-dom";
 import MyNavbar from "../components/navbar/MyNavbar";
import Footer from "../components/footer/Footer";
import "./Login&Register.css"

 const Login = () => {
   const client = new AxiosClient();
   const [formData, setFormData] = useState({});
   const [error, setError] = useState(null);
   const navigate = useNavigate();
  
   useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
       navigate("/cart");
    }
   },[])


   const onChangeInput = (e) => {
     const { name, value } = e.target;
     setFormData({
       ...formData,
       [name]: value,
     });
   };


   const onSubmit = async (e) => {
     e.preventDefault();
   try{
     const response = await client.post("/login", formData);
     if (response.statusCode === 200) {
       localStorage.setItem("auth", JSON.stringify(response.token));
       navigate("/cart");
     }
   }catch (e) {
     if (e.response && e.response.status === 401) {
       setError("Non autorizzato: Email o password non valide");
     } else if (e.response && e.response.status === 404) {
       setError("Utente non trovato");
     } else {
       setError("Si è verificato un errore. Si prega di riprovare più tardi.");
     }
   }
   };


    const handleLoginWithGithub = () => {
     window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
   };

   return (
     <>
     <MyNavbar/>
     <div className="login container py-5 ">
     {error && <div className="alert alert-danger">{error}</div>}
     <Form onSubmit={onSubmit} className="container my-5" >
       <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>Email</Form.Label>
         <Form.Control
           name="email"
           type="email"
           onChange={onChangeInput}
           placeholder="Enter email"
         />
       </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Label>Password</Form.Label>
         <Form.Control
           name="password"
           type="password"
           onChange={onChangeInput}
           placeholder="Password"
         />
       </Form.Group>
      
       <Form.Group className="mb-3">
         <Col>
           <Button variant="primary" type="submit">
             Login
           </Button>
         </Col>
       </Form.Group>

       <Form.Group className="mb-3">
         <Col>
         if you are not registered  
           <Link to="/register">
             Register here
           </Link>
         </Col>
       </Form.Group>

       <Form.Group>
         <Col>
           <Button onClick={handleLoginWithGithub} variant="success" type="button">
             Login with Github
           </Button>
         </Col>
       </Form.Group>
      
     </Form>
     </div>
     <Footer/>
     </>
   );
 };

 export default Login;


