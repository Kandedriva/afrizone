import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productpage from './Components/Productpage';
import Carts from './Components/Carts';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import CheckOut from './Components/Checkout';

function App() {

  // let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // console.log(cart)
  //   const addToCart = (product) => {
  //       let existingProduct = cart.find(item => item.product_id === product.product_id);
      
  //       if (existingProduct) {
  //         // If product exists, increase its quantity
  //         existingProduct.quantity += 1;
  //       } else {
  //         // If product doesn't exist, add it with quantity 1
  //         cart.push({ ...product, quantity: 1 });
  //       }
        
      
  //       localStorage.setItem("cart", JSON.stringify(cart));
  //       alert("Product added to cart!");
  //     };
  return (
  <>
  {/* <CheckOut/> */}
  
    <Routes>
  <Route path="/" element={<Productpage/>} />
  <Route path="/registration" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/cart" element={<Carts/>} />
  <Route path="/checkout" element={<CheckOut/>}/>

    </Routes>

  
  
  {/* <Productpage/>
  <Carts/>
  <Register/>
  <Login/> */}
  

 
 
  </>
  );
}

export default App;
