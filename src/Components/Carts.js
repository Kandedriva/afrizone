import { useState, useEffect } from "react"; 
import Navbar from "./Navbar";
import axios from "axios";

const Cart = () => {
  
  const [cart, setCart] = useState([]);
  
///////GET THE CART CONTAINER FROM THE LOCAL STORAGE.///////
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  //////REMOVE AN ITEM FROM THE CART.////
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item)=>sum + (item.product_price * item.quantity), 0)

  ////////POST REQUEST TO SEND THE CART CONTAINER TO THE BACKEND./////////////
  const  goToCheckOut = async()=>{
    try {
      const response = await axios.post("https://afrizone-1.onrender.com/create-checkout-session",{
         cartItem: cart.map(item =>({
          name: item.product_name,
          image: item.product_image.startsWith('http')
            ? item.product_image
            : `https://cerulean-pika-4b4fd6.netlify.app${item.product_image.startsWith('/') ? '' : '/'}${item.product_image}`,
          price: item.product_price,
          quantity: item.quantity,
        })) 
      })
      window.location.href = response.data.url;
    } catch (error) {
      console.error(`Checkout error ${error}`)
    }
}
console.log(cart)

  return (
    <>
    <Navbar/>
    <div>
    <a className="fontstyle" href="/" ><i className="fa-solid fa-backward-fast"></i> Go to products</a>
      <h2>You have <b>{cart.length}</b> items in your cart, your Cart value is $<b>{totalAmount}</b></h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        cart.map((item, index) => (
          <div className="cartItemContainer" key={index}>
            <img className="cartImage" src={item.product_image} alt={item.name} width="50"/>
            <h3>{item.product_name}</h3>
            <p>{item.product_description}</p>
            <h4 className="cartQuantityTitle">Quantity:</h4>
           
            <span>{item.quantity}</span>
            {/* <button  type="submet" className="updateQuantityButton" >update</button> */}
      
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



