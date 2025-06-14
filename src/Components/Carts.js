import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Cart = ({addToCart}) => {
  
  const [cart, setCart] = useState([]);
  const [quantityupdate, setQuantityUpdate] = useState(cart)
  const navigate = useNavigate()

  function goToProduct(){
        navigate("/")
       }

       console.log(cart)

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item)=>sum + (item.product_price * item.quantity), 0)
  function goToCheckOut(){
    navigate("/checkout")
}
console.log(cart)

  return (
    <>
    <Navbar/>
    <div>
    <a className="fontstyle" href="#" onClick={goToProduct} ><i className="fa-solid fa-backward-fast"></i> Go to products</a>
      <h2>You have <b>{cart.length}</b> items in your cart, your Cart value is $<b>{totalAmount}</b></h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        cart.map((item, index) => (
          <div className="cartItemContainer" key={index}>
            <img className="cartImage" src={item.product_image} alt={item.name} width="50"/>
            <h3>{item.product_name}</h3>
            <p>{item.product_description}</p>
            <h4 className="cartQuantityTitle">Quantity:</h4>
            <span>{item.quantity}</span>
            <button  type="submet" className="updateQuantityButton" >update</button>
      
            <h4 className="cartItemPrice">Price:${item.product_price * item.quantity}</h4>
            <button className="remove-button" onClick={() => removeItem(index)}><i className="fa-solid fa-trash"></i></button>
          </div>
        ))
      )}
      <button onClick={goToCheckOut} className="ProcedToCheckOut">Proceed to Checkout</button>
    </div>
    
    </>
  );
  // value={item.quantity}
};

export default Cart;