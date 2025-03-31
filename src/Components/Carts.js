// import axios from "axios";
// import react from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";


// function Carts(){

//     const [cartProduct, setCartProduct] = useState([])

//     const navigate = useNavigate()

//     useEffect(() => {
//         axios.get("http://localhost:5001/cart_items", { withCredentials: true })
//         .then(res=>{
//             console.log(res.data.cart)
//         })
//         .catch(error=>{
//             console.error("There was an error retreiving the cart.", error)
//         })
//     }, []);

//     function goToProduct(){
//         navigate("/")
//     }

//     return(
//         <>
//         <Navbar/>
//         <div  className="backButton">
//         <a className="fontstyle" href="#" onClick={goToProduct} ><i class="fa-solid fa-backward-fast"></i> Go to products</a>


//         </div>
//         <h1>welcome to your cart..! You have 0 items in your cart..</h1>
//         </>
//     )
// }

// export default Carts;
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()
  function goToProduct(){
        navigate("/")
       }

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item)=>sum + (item.product_price * item.quantity), 0)

  return (
    <>
    <Navbar/>
    <div>
    <a className="fontstyle" href="#" onClick={goToProduct} ><i className="fa-solid fa-backward-fast"></i> Go to products</a>
      <h2>You have <b>{cart.length}</b> items in your cart, your Cart value is $<b>{totalAmount}</b></h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        cart.map((item, index) => (
          <div className="cartItemContainer" key={index}>
            <img src={item.product_image} alt={item.name} width="50" />
            {/* <p>{item.product_description}</p> */}
            <h3>{item.product_name}</h3>
            <p>Quantity:  {item.quantity}</p>
            <p>Amount:${item.product_price * item.quantity}</p>
            <button className="remove-button" onClick={() => removeItem(index)}><i className="fa-solid fa-trash"></i></button>
          </div>
        ))
      )}
      <a href="/checkout">Proceed to Checkout</a>
    </div>
    
    </>
  );
};

export default Cart;