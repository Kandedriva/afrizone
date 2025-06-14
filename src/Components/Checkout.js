import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";





function CheckOut(){

  const [products, setProduct] = useState([])
const[checkout, setCheckout] = useState({
  fullname: "",
  email: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  cardName: "",
  cardNumber: "",
  expMonth: "",
  expYear: "",
  cvv: ""


})

function handleCheckout(e){
 const name = e.target.name;
 const value = e.target.value;
 setCheckout({
  ...checkout,
  [name]: value
 });
 console.log(name)
 console.log(value)
}

function procedCheckOut(e){
  e.preventDefault();
  console.log(checkout)
  setCheckout("")
}

useEffect(()=>{
  const allCartProducts = (JSON.parse(localStorage.getItem("cart")) || [])
  setProduct(allCartProducts)

}, [])
console.log(products)
const totalAmount = products.reduce((sum, item)=>sum + (item.product_price * item.quantity), 0)




    return(
        <>
        <Navbar/>
        {
          
        
        <form onSubmit={procedCheckOut}>
          <a className="backToCart" href="/cart">return to cart</a>
          <h2 className="checkoutTitle">Enter your informations to Chechout.</h2>
<div>

<table >
   <thead>
   <tr>
      <th>Products</th>
      <th>Prices</th>
    </tr>
   </thead>
    {
    products.map((product, index)=>(
    <tbody key={index}>
    <tr>
      <td >{product.product_name}</td> 
       <td>${product.product_price}</td>
      
       
     </tr>
    </tbody>
    
    ))
  }

  </table>
  <table className="tfoot">
    <tfoot >
    <tr>
      <th>Cart total</th>
      <td>${totalAmount}</td>
    </tr>

    </tfoot>
  </table>

</div>
          <div className="billingAndPayment">
            <div className="personalInfo">
            <h3  className="h3Header">Billing Address</h3>
            <div>
              <label>Full Name</label>
              <input onChange={handleCheckout} type="text" name="fullname" placeholder="Enter your full name">
              </input>
            </div>
            <div>
              <label>Email</label>
              <input onChange={handleCheckout} type = "email" name="email" placeholder="Enter your email"></input>
            </div>
            <div>
              <label>Street address</label>
              <input onChange={handleCheckout} type="text" name="streetAddress" placeholder="123 W. 112 Street"></input>
            </div>
            <div>
              <label>City</label>
              <input onChange={handleCheckout} type="text" name="city" placeholder="New York"></input>
            </div>
            <div>
              <div>
                <label>State</label>
                <input onChange={handleCheckout} type="text" name="state" placeholder="NY"></input>
              </div>
              <div>
                <label>Zip code</label>
                <input onChange={handleCheckout} type="number" name="zipCode" placeholder="10001"></input>
              </div>
            </div>
            </div>
            <hr></hr>

            <div className="payement">
              <h3 className="h3Header">PAYEMENT</h3>
              <div>
                <label>Name on Card</label>
                <input onChange={handleCheckout} type="text" name="cardName" placeholder="Tyson Rake"></input>
              </div>
              <div>
                <label>Card Number</label>
                <input onChange={handleCheckout} type="number" name="cardNumber" placeholder="123456699"></input>
              </div>
              <div>
                <label>Exp Month</label>
                <input onChange={handleCheckout} type="month" placeholder="experation month" name="expMonth"></input>
              </div>
              <div>
                <div>
                  <label>Year</label>
                  <input onChange={handleCheckout} type="date" placeholder="2025" name="expYear" ></input>
                </div>
                <div>
                  <label>CVV</label>
                  <input onChange={handleCheckout} type="number" name="cvv" placeholder="646"></input>
                </div>
              </div>
              <div>
              <label className="checkLabel">
              <input onChange={handleCheckout} className="checkText" type="checkbox" />
               Shipping address same as billing
               </label> 
              </div>
            </div>
            <div>
              <button type="submit" className="btn">continue to checkout</button>
            </div>
          

          </div>
         

        </form> 
        
        }



         </>
    )
}

export default CheckOut;