import './App.css';
import { Routes, Route } from 'react-router-dom';
import Productpage from './Components/Productpage';
import Carts from './Components/Carts';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import Register from './Components/Register';
// import Login from './Components/Login';
import CheckOut from './Components/Checkout';
import EachProducts from './Components/EachProduct';



function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get("https://afrizone-1.onrender.com/productList")
    .then(res=>{
     setProducts(res.data)
     // setIsloading(false)
     })
    .catch(error=>{
     // setIsloading(false)
     console.log(error)
    })
 }, []);

  return (
    <Routes>
      <Route path="/" element={<Productpage products={products}/>} />
      {/* <Route path="/registration" element={<Register />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/cart" element={<Carts />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/product/:id" element={<EachProducts singleProduct={products} />} />
    </Routes>
  );
}

export default App;