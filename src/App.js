import './App.css';
import { Routes, Route } from 'react-router-dom';
import Productpage from './Components/Productpage';
import Carts from './Components/Carts';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CheckoutForm from './Components/CheckoutForm';
import Return from './Components/Return';
import EachProducts from './Components/EachProduct';



function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("https://afrizone-1.onrender.com/productList")
    .then(res=>{
     setProducts(res.data)
     setLoading(false)
     })
    .catch(error=>{
     console.log(error)
    })
 }, []);

  return (
    <Routes>
      <Route path="/" element={<Productpage loading={loading} products={products}/>} />
      <Route path="/cart" element={<Carts />} />
      <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} />
      <Route path="/product/:id" element={<EachProducts singleProduct={products} />} />
    </Routes>
  );
}

export default App;