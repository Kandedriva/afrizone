import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";





function Navbar({cart}){

   //  const [numberOfItem, setNumberOfItem]= useState([])

    const navigateTo = useNavigate();
     function navigateToLogin(){
        navigateTo("/login")
     }

     function navigateToRegister(){
        navigateTo("/register")
     }

     function goToCart(){
        navigateTo("/cart")
     }
     function productPage(){
      navigateTo("/")
     }

//   useEffect(() => {
//     setNumberOfItem(JSON.parse(localStorage.getItem("cart")) || []);
//   }, []);



    return(
        <>
        <div className="navbar">
        <h1 onClick={productPage} className="firstList-title">Welcome to Afrizone</h1>
       <a className="shoppingCartIcon" href="/cart" onClick={goToCart}><i className="fa-solid fa-cart-shopping">{cart}</i></a>
            <Link  to="/"></Link>
            <div className="navigationLink">
            <a href="/register"><i className="fa-solid fa-user"></i></a><Link className="linkTo" to="/registration" onClick={navigateToRegister}> Register</Link>
            </div>
            <div  className="navigationLink" >
            <Link
            className="linkTo" 
             to="/Login" onClick={navigateToLogin}>Login
             </Link>
             <a href="/Login"><i className="fa-solid fa-right-to-bracket"></i></a>
            </div>
            
        </div>
{/* 
        <div className="quantity">
  <button className="minus" aria-label="Decrease">&minus;</button>
  <input type="number" className="input-box" value="1" min="1" max="10"></input>
  <button className="plus" aria-label="Increase">&plus;</button>
</div> */}
        
        </>
    )
}

export default Navbar;