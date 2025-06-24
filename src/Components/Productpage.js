import React from "react";
// import axios from "axios";
// import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import LoadingSreen from "./LoadingScreen";

function Productpage({products, loading}){

    
    const [search, setSearch] = useState("");
    

    function proof(){
      console.log("I'm working, don't you worry...!")
    }

   
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCart = (product) => {
        let existingProduct = cart.find(item => item.id === product.id);
      
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
      
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      };


    return(
        <>
        <Navbar cart = { cart.length}/>
        <h2>All Products</h2>

   <div className="quantity">
  <input type="text"
   className="search-input" 
   placeholder="Search products by names..."
   onChange={(e)=>setSearch(e.target.value)}
   name = "result"
></input>
  <button className="search-product-button" aria-label="Increase" type="submit" onClick={proof}><i className="fa-solid fa-magnifying-glass"></i></button>
</div>
   
  <>
  {loading && <LoadingSreen/>}
  
    <div  className={loading ? 'hidden' : ''}>
   
    {
      
      products.filter((product)=>{
    return search.toLowerCase() === "" ? product : product.product_name.toLowerCase().includes(search.toLowerCase())
        }).map((product)=>(
     <div key={product.id} className="productContainer"  >
      <div>
      <div className="imageContainer1">
      <img alt={product.product_name} src={product.product_image} className="productImage"></img>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3>{product.product_name}</h3>
      </Link>
      <div>
      <p className="single-price"><b>Price : ${product.product_price}</b></p>
      <button className="cart-button" onClick={() => addToCart(product)}>+ Add To Cart</button>
      </div>
      </div>
     </div>
     

      ))
  }


    </div>
  </>
    
    </>
    )
}

export default Productpage




